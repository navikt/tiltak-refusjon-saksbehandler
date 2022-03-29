import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjonsgrunnlag } from '../refusjon';

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

    return (
        <div>
            <Element>
                Er inntektene som vi har hentet (
                {formatterPenger(props.refusjonsgrunnlag.inntektsgrunnlag!!.bruttoLønn)}) kun fra tiltaket{' '}
                {tiltakstypeTekst[props.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}?{' '}
            </Element>
            <Normaltekst>{svar()}</Normaltekst>
            {props.refusjonsgrunnlag.endretBruttoLønn !== null &&
                props.refusjonsgrunnlag.endretBruttoLønn !== undefined && (
                    <>
                        <VerticalSpacer rem={1} />
                        <Element>Korrigert brutto lønn:</Element>
                        <Normaltekst>{formatterPenger(props.refusjonsgrunnlag.endretBruttoLønn)}</Normaltekst>
                    </>
                )}
        </div>
    );
};

export default InntekterFraTiltaketSvarGammel;
