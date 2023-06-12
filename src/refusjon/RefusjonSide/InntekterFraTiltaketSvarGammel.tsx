import _ from 'lodash';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjonsgrunnlag } from '../refusjon';
import { BodyShort } from '@navikt/ds-react';

const InntekterFraTiltaketSvarGammel: FunctionComponent<{ refusjonsgrunnlag: Refusjonsgrunnlag }> = (props) => {
    if (!props.refusjonsgrunnlag.inntektsgrunnlag) {
        return null;
    }

    const svar = () => {
        switch (props.refusjonsgrunnlag.inntekterKunFraTiltaket) {
            case true:
                return 'Ja';
            case false:
                return 'Nei';
            default:
                return 'Ikke besvart';
        }
    };

    const inntekterHuketAvForOpptjentIPeriode = props.refusjonsgrunnlag.inntektsgrunnlag!!.inntekter.filter(
        (inntekt) => inntekt.erOpptjentIPeriode
    );
    const sumInntekterOpptjentIPeriode = _.sumBy(inntekterHuketAvForOpptjentIPeriode, 'beløp');

    return (
        <div>
            <Element>
                Er inntektene som vi har hentet ({formatterPenger(sumInntekterOpptjentIPeriode)}) kun fra tiltaket{' '}
                {tiltakstypeTekst[props.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}?{' '}
            </Element>
            <BodyShort size="small">{svar()}</BodyShort>
            {props.refusjonsgrunnlag.endretBruttoLønn !== null &&
                props.refusjonsgrunnlag.endretBruttoLønn !== undefined && (
                    <>
                        <VerticalSpacer rem={1} />
                        <Element>Korrigert bruttolønn:</Element>
                        <BodyShort size="small">{formatterPenger(props.refusjonsgrunnlag.endretBruttoLønn)}</BodyShort>
                    </>
                )}
        </div>
    );
};

export default InntekterFraTiltaketSvarGammel;
