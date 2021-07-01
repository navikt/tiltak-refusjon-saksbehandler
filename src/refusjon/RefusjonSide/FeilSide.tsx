import AlertStripe, { AlertStripeType } from 'nav-frontend-alertstriper';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';

type Props = {
    feiltekst: string;
    advarselType: AlertStripeType;
};

const FeilSide: FunctionComponent<Props> = (props) => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <HvitBoks>
            <AlertStripe type={props.advarselType}>{props.feiltekst}</AlertStripe>
            <VerticalSpacer rem={2} />
            <Innholdstittel>Refusjon av {tiltakstypeTekst[refusjon.tilskuddsgrunnlag.tiltakstype]}</Innholdstittel>
            <VerticalSpacer rem={1} />
            <Element>Periode:</Element>
            <Normaltekst>
                {formatterPeriode(refusjon.tilskuddsgrunnlag.tilskuddFom, refusjon.tilskuddsgrunnlag.tilskuddTom)}
            </Normaltekst>
            <VerticalSpacer rem={1} />
            <Element>Beløp i perioden:</Element>
            <Normaltekst>Inntil {formatterPenger(refusjon.tilskuddsgrunnlag.tilskuddsbeløp)}</Normaltekst>
            <VerticalSpacer rem={1} />
            <Element>Deltaker:</Element>
            <Normaltekst>{`${refusjon.tilskuddsgrunnlag.deltakerFornavn} ${refusjon.tilskuddsgrunnlag.deltakerEtternavn}`}</Normaltekst>
        </HvitBoks>
    );
};

export default FeilSide;
