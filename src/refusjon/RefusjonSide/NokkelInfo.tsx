import { Calender, File, FileContent, Money, People, Receipt } from '@navikt/ds-icons';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjon } from '../refusjon';
import ForlengeDato from '../forlengedato/ForlengeDato';

const IkonRad = styled.div`
    display: flex;
    * {
        margin-right: 0.5rem;
    }
`;

const NokkelInfo: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const [refusjon, setRefusjon] = useState<Refusjon>(useHentRefusjon(refusjonId));
    const avtaleLenke = `https://arbeidsgiver.nais.adeo.no/tiltaksgjennomforing/avtale/${refusjon.tilskuddsgrunnlag.avtaleId}`;

    return (
        <div>
            <IkonRad>
                <EksternLenke href={avtaleLenke}>
                    <File />
                    Avtale om {tiltakstypeTekst[refusjon.tilskuddsgrunnlag.tiltakstype]}
                </EksternLenke>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Receipt />
                <Element>Avtalenummer:</Element>
                <Normaltekst>{refusjon.tilskuddsgrunnlag.avtaleNr}</Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Receipt />
                <Element>Refusjonsnummer:</Element>
                <Normaltekst>
                    {refusjon.tilskuddsgrunnlag.avtaleNr}-{refusjon.tilskuddsgrunnlag.løpenummer}
                </Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <People />
                <Element>Deltaker: </Element>
                <Normaltekst>
                    {refusjon.tilskuddsgrunnlag.deltakerFornavn} {refusjon.tilskuddsgrunnlag.deltakerEtternavn}
                </Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Calender />
                <Element>Periode: </Element>
                <Normaltekst>
                    {formatterPeriode(refusjon.tilskuddsgrunnlag.tilskuddFom, refusjon.tilskuddsgrunnlag.tilskuddTom)}
                </Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Calender />
                <Element>Frist: </Element>
                <Normaltekst>{refusjon.fristForGodkjenning}</Normaltekst>
                <ForlengeDato
                    fristForGodkjenning={refusjon.fristForGodkjenning}
                    forrigeFristForGodkjenning={refusjon.forrigeFristForGodkjenning}
                    refusjonId={refusjonId}
                    refusjon={setRefusjon} />
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <FileContent />
                <Element>Avtalt beløp for perioden:</Element>
                <Normaltekst>Inntil {formatterPenger(refusjon.tilskuddsgrunnlag.tilskuddsbeløp)}</Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Money />
                <Element>Kontonummer:</Element>
                <Normaltekst>{refusjon.bedriftKontonummer ?? 'ikke oppgitt'}</Normaltekst>
            </IkonRad>
            {refusjon.bedriftKontonummer === null && (
                <>
                    <VerticalSpacer rem={1} />
                    <AlertStripeAdvarsel>
                        Vi kan ikke finne noe kontonummer på deres virksomhet. Riktig kontonummer må sendes inn via
                        Altinn.
                    </AlertStripeAdvarsel>
                </>
            )}
        </div>
    );
};

export default NokkelInfo;
