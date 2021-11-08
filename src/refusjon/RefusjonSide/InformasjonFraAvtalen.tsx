import React, { FunctionComponent } from 'react';
import { Calender, File, FileContent, Money, Office1, People, Warning } from '@navikt/ds-icons';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import styled from 'styled-components';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { formatterDato, formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Tilskuddsgrunnlag } from '../refusjon';

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

const InformasjonFraAvtalen: FunctionComponent<{
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    fristForGodkjenning?: string;
    forrigeFristForGodkjenning?: string;
    bedriftKontonummer: string | null | undefined;
}> = (props) => {
    const avtaleLenke = `https://arbeidsgiver.nais.adeo.no/tiltaksgjennomforing/avtale/${props.tilskuddsgrunnlag.avtaleId}`;
    const refusjonsnummer = `${props.tilskuddsgrunnlag.avtaleNr}-${props.tilskuddsgrunnlag.løpenummer}`;

    return (
        <GråBoks>
            <Undertittel>Informasjon hentet fra avtalen</Undertittel>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <EksternLenke href={avtaleLenke}>
                    <File />
                    Avtale om {tiltakstypeTekst[props.tilskuddsgrunnlag.tiltakstype]}
                </EksternLenke>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Office1 style={{ marginTop: '0.125rem' }} />
                <div>
                    <div style={{ display: 'flex' }}>
                        <Element>Bedriftsnavn: </Element>
                        <Normaltekst>{props.tilskuddsgrunnlag.bedriftNavn}</Normaltekst>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Element>Bedriftsnummer: </Element>
                        <Normaltekst>{props.tilskuddsgrunnlag.bedriftNr}</Normaltekst>
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
                    {props.tilskuddsgrunnlag.deltakerFornavn} {props.tilskuddsgrunnlag.deltakerEtternavn}
                </Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Calender />
                <Element>Periode: </Element>
                <Normaltekst>
                    {formatterPeriode(props.tilskuddsgrunnlag.tilskuddFom, props.tilskuddsgrunnlag.tilskuddTom)}
                </Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            {props.fristForGodkjenning && (
                <IkonRad>
                    <Warning />
                    <Element>Frist: </Element>
                    <Normaltekst>
                        {formatterDato(props.fristForGodkjenning)}
                        {props.forrigeFristForGodkjenning
                            ? `  (tidligere frist: ${formatterDato(props.forrigeFristForGodkjenning)})`
                            : ''}
                    </Normaltekst>
                </IkonRad>
            )}
            <VerticalSpacer rem={1} />
            <IkonRad>
                <FileContent />
                <Element>Avtalt beløp for perioden:</Element>
                <Normaltekst>Inntil {formatterPenger(props.tilskuddsgrunnlag.tilskuddsbeløp)}</Normaltekst>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Money />
                <Element>Kontonummer:</Element>
                <Normaltekst>{props.bedriftKontonummer ?? 'ikke oppgitt'}</Normaltekst>
            </IkonRad>
            {props.bedriftKontonummer === null && (
                <>
                    <VerticalSpacer rem={1} />
                    <AlertStripeFeil>
                        Vi kan ikke finne noe kontonummer på deres virksomhet. Riktig kontonummer må{' '}
                        <EksternLenke href="https://www.altinn.no/skjemaoversikt/arbeids--og-velferdsetaten-nav/bankkontonummer-for-refusjoner-fra-nav-til-arbeidsgiver/">
                            sendes inn via Altinn.
                        </EksternLenke>
                    </AlertStripeFeil>
                </>
            )}
        </GråBoks>
    );
};

export default InformasjonFraAvtalen;
