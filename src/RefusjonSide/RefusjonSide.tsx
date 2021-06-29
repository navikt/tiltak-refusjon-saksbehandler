import React, { FunctionComponent } from 'react';
import { useHentRefusjon } from '../rest-service';
import { useParams } from 'react-router-dom';
import './RefusjonSide.less';
import BEMHelper from '../utils/bem';
import { Normaltekst } from 'nav-frontend-typografi';
import VerticalSpacer from '../Komponenter/VerticalSpacer';
import AlertStripe from 'nav-frontend-alertstriper';
import HvitBoks from '../Komponenter/HvitBoks';
import { Element } from 'nav-frontend-typografi';
import TilbakeTilOversiktLenke from './TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';

const cls = BEMHelper('refusjon-side');

const RefusjonSide: FunctionComponent = () => {
    const { id } = useParams();
    const refusjon = useHentRefusjon(id);

    return (
        <>
            <TilbakeTilOversiktLenke onClick={() => {}} />
            <HvitBoks>
                {refusjon.status === 'KLAR_FOR_INNSENDING' && (
                    <AlertStripe type="suksess">Klar for innsending</AlertStripe>
                )}
                <Normaltekst>Refusjon av sommerjobb</Normaltekst>
                <VerticalSpacer rem={1} />
                <Element>Frist:</Element>
                <Normaltekst>{refusjon.fristForGodkjenning}</Normaltekst>
                <VerticalSpacer rem={1} />
                <Element>Periode:</Element>
                <Normaltekst>
                    {refusjon.tilskuddsgrunnlag.tilskuddFom} - {refusjon.tilskuddsgrunnlag.tilskuddTom}
                </Normaltekst>
                <VerticalSpacer rem={1} />
                <Element>Beløp i perioden:</Element>
                <Normaltekst>Inntil {refusjon.tilskuddsgrunnlag.tilskuddsbeløp}</Normaltekst>
                <VerticalSpacer rem={1} />
                <Element>Veileder:</Element>
                <Normaltekst>{refusjon.veileder}</Normaltekst>
                <VerticalSpacer rem={1} />
                <Element>Deltager:</Element>
                <Normaltekst>
                    {refusjon.tilskuddsgrunnlag.deltakerFornavn} {refusjon.tilskuddsgrunnlag.deltakerEtternavn}
                </Normaltekst>
                <Element>Arbeidsgiver:</Element>
                <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNavn}</Normaltekst>
                <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNavn}</Normaltekst>
                <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNavn}</Normaltekst>
                <VerticalSpacer rem={1} />
                <Element>Enhet:</Element>
                <Normaltekst>Hardkodet 0904</Normaltekst>
            </HvitBoks>
        </>
    );
};

export default RefusjonSide;
