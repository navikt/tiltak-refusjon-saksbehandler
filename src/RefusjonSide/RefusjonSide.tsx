import React, { FunctionComponent } from 'react';
import { useHentRefusjon } from '../rest-service';
import { useParams } from 'react-router-dom';
import './RefusjonSide.less';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import VerticalSpacer from '../Komponenter/VerticalSpacer';
import HvitBoks from '../Komponenter/HvitBoks';
import { Element } from 'nav-frontend-typografi';
import TilbakeTilOversiktLenke from './TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import BEMHelper from '../utils/bem';
import TekstBlock from './utils/TekstBlock';
import AlertStatusMelding from './utils/AlertStatusMelding';

const RefusjonSide: FunctionComponent = () => {
    const { id } = useParams();
    const refusjon = useHentRefusjon(id);
    const cls = BEMHelper('refusjonside');

    return (
        <>
            <div className={cls.element('container')}>
                <div className={cls.element('tilbakelink')}>
                    <TilbakeTilOversiktLenke onClick={() => {}} />
                </div>
                <HvitBoks className={cls.element('hvitboks')}>
                    <AlertStatusMelding status={refusjon.status}></AlertStatusMelding>
                    <VerticalSpacer rem={1} />
                    <Undertittel role="heading"> Refusjon av sommerjobb </Undertittel>
                    <VerticalSpacer rem={1} />
                    <TekstBlock label={'Frist'} tekst={refusjon.fristForGodkjenning}></TekstBlock>
                    <VerticalSpacer rem={1} />
                    <TekstBlock
                        label={'Periode'}
                        tekst={`${refusjon.tilskuddsgrunnlag.tilskuddFom} - ${refusjon.tilskuddsgrunnlag.tilskuddTom}`}
                    ></TekstBlock>
                    <VerticalSpacer rem={1} />
                    <TekstBlock
                        label={'Beløp i perioden'}
                        tekst={`Inntil ${refusjon.tilskuddsgrunnlag.tilskuddsbeløp} kr`}
                    ></TekstBlock>
                    <VerticalSpacer rem={1} />
                    <TekstBlock label={'Veileder'} tekst={refusjon.veileder}></TekstBlock>
                    <VerticalSpacer rem={1} />
                    <TekstBlock
                        label={'Deltager'}
                        tekst={`${refusjon.tilskuddsgrunnlag.deltakerFornavn} ${refusjon.tilskuddsgrunnlag.deltakerEtternavn}`}
                    ></TekstBlock>
                    <VerticalSpacer rem={1} />
                    <Element>Arbeidsgiver</Element>
                    <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNavn}</Normaltekst>
                    <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNavn}</Normaltekst>
                    <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNavn}</Normaltekst>
                    <VerticalSpacer rem={1} />
                    <TekstBlock label={'Enhet'} tekst={'Hardkodet 0904'}></TekstBlock>
                </HvitBoks>
            </div>
        </>
    );
};

export default RefusjonSide;
