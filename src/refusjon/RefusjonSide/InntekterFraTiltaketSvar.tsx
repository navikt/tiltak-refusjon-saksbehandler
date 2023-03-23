import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjonsgrunnlag } from '../refusjon';
import { GrønnBoks } from './InntekterFraTiltaketSpørsmål';
import InntekterOpptjentIPeriodeTabell from './InntekterOpptjentIPeriodeTabell';

type Props = {
    refusjonsgrunnlag: Refusjonsgrunnlag;
};

const InntekterFraTiltaketSvar: FunctionComponent<Props> = (props) => {
    if (
        props.refusjonsgrunnlag.inntekterKunFraTiltaket === null ||
        props.refusjonsgrunnlag.inntekterKunFraTiltaket === undefined
    ) {
        return null;
    }

    const valgtBruttoLønn = props.refusjonsgrunnlag.inntektsgrunnlag?.inntekter
        .filter((inntekt) => inntekt.erOpptjentIPeriode)
        .map((el) => el.beløp)
        .reduce((el, el2) => el + el2, 0);

    if (!props.refusjonsgrunnlag.inntektsgrunnlag?.inntekter) {
        return null;
    }

    return (
        <div>
            <GrønnBoks>
                <Undertittel>
                    Inntekter som refunderes for{' '}
                    {formatterPeriode(
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}
                </Undertittel>
                <VerticalSpacer rem={1} />
                <InntekterOpptjentIPeriodeTabell inntekter={props.refusjonsgrunnlag.inntektsgrunnlag.inntekter} />
                <VerticalSpacer rem={2} />
                <Element>
                    Er inntektene du har valgt ({formatterPenger(valgtBruttoLønn as number)}) kun fra tiltaket{' '}
                    {tiltakstypeTekst[props.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}?{' '}
                </Element>
                <Normaltekst>{props.refusjonsgrunnlag.inntekterKunFraTiltaket ? 'Ja' : 'Nei'}</Normaltekst>
                {props.refusjonsgrunnlag.endretBruttoLønn !== null &&
                    props.refusjonsgrunnlag.endretBruttoLønn !== undefined && (
                        <>
                            <VerticalSpacer rem={1} />
                            <Element>Korrigert bruttolønn:</Element>
                            <Normaltekst>{formatterPenger(props.refusjonsgrunnlag.endretBruttoLønn)}</Normaltekst>
                        </>
                    )}
            </GrønnBoks>
        </div>
    );
};

export default InntekterFraTiltaketSvar;
