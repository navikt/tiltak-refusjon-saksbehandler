import React, { FunctionComponent } from 'react';
import { Calender, File, FileContent, Money, People, Warning, Office1 } from '@navikt/ds-icons';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { useParams } from 'react-router';
import styled from 'styled-components';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterDato, formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';

const IkonRad = styled.div`
    display: flex;
    * {
        margin-right: 0.5rem;
    }
`;

const GråBoks = styled.div`
    background-color: #f1f1f1;
    border-radius: 4px;
    padding: 1.5rem;
`;

const InformasjonFraAvtalen: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const avtaleLenke = `https://arbeidsgiver.nais.adeo.no/tiltaksgjennomforing/avtale/${refusjon.tilskuddsgrunnlag.avtaleId}`;
    const refusjonsnummer = `${refusjon.tilskuddsgrunnlag.avtaleNr}-${refusjon.tilskuddsgrunnlag.løpenummer}`;

    return (
        <GråBoks>
            <Undertittel>Informasjon hentet fra avtalen</Undertittel>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <EksternLenke href={avtaleLenke}>
                    <File />
                    Avtale om {tiltakstypeTekst[refusjon.tilskuddsgrunnlag.tiltakstype]}
                </EksternLenke>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Office1 style={{marginTop: '0.125rem'}} />
                <div>
                    <div style={{display: 'flex'}}>
                        <Element>Bedriftsnavn: </Element>
                        <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNavn}</Normaltekst>
                    </div>
                    <div style={{display: 'flex'}}>
                        <Element>Bedriftsnummer: </Element>
                        <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNr}</Normaltekst>
                    </div>
                </div>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <File />
                <Element>Refusjonsnummer: </Element>
                <Normaltekst>{refusjonsnummer}</Normaltekst>
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
                <Warning />
                <Element>Frist: </Element>
                <Normaltekst>
                    {formatterDato(refusjon.fristForGodkjenning)}
                    {refusjon.forrigeFristForGodkjenning
                        ? `  (tidligere frist: ${formatterDato(refusjon.forrigeFristForGodkjenning)})`
                        : ''}
                </Normaltekst>
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
                    <AlertStripeFeil>
                        Vi kan ikke finne noe kontonummer på deres virksomhet. Riktig kontonummer må{' '}
                        <EksternLenke
                            href='https://www.altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/bankkontonummer-for-refusjoner-fra-nav-til-arbeidsgiver/'>
                            sendes inn via Altinn.
                        </EksternLenke>
                    </AlertStripeFeil>
                </>
            )}
        </GråBoks>
    );
};

export default InformasjonFraAvtalen;
