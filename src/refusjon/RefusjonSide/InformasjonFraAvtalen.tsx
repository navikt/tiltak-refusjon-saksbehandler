import { Calender, File, FileContent, Money, Office1, People, Warning } from '@navikt/ds-icons';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Tilskuddsgrunnlag } from '../refusjon';
import { BodyShort, Heading, Label } from '@navikt/ds-react';

const IkonRad = styled.div`
    display: flex;
    * {
        margin-right: 0.5rem;
    }
`;

const GråBoks = styled.div`
    background-color: #eee;
    border-radius: 4px;
    padding: 1.5rem;
`;

const InformasjonFraAvtalen: FunctionComponent<{
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    fristForGodkjenning?: string;
    forrigeFristForGodkjenning?: string;
    bedriftKid: string | null | undefined;
    bedriftKontonummer: string | null | undefined;
    bedriftKontonummerInnhentetTidspunkt: string | null | undefined;
}> = (props) => {
    const avtaleLenke = `https://tiltaksgjennomforing.intern.nav.no/tiltaksgjennomforing/avtale/${props.tilskuddsgrunnlag.avtaleId}`;
    const refusjonsnummer = `${props.tilskuddsgrunnlag.avtaleNr}-${props.tilskuddsgrunnlag.løpenummer}`;

    return (
        <GråBoks>
            <Heading size="small">Informasjon hentet fra avtalen</Heading>
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
                        <Label>Bedriftsnavn: </Label>
                        <BodyShort size="small">{props.tilskuddsgrunnlag.bedriftNavn}</BodyShort>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Label>Virksomhetsnummer: </Label>
                        <BodyShort size="small">{props.tilskuddsgrunnlag.bedriftNr}</BodyShort>
                    </div>
                </div>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <File />
                <Label>Refusjonsnummer: </Label>
                <BodyShort size="small">{refusjonsnummer}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <People />
                <Label>Deltaker: </Label>
                <BodyShort size="small">
                    {props.tilskuddsgrunnlag.deltakerFornavn} {props.tilskuddsgrunnlag.deltakerEtternavn}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Calender />
                <Label>Periode: </Label>
                <BodyShort size="small">
                    {formatterPeriode(props.tilskuddsgrunnlag.tilskuddFom, props.tilskuddsgrunnlag.tilskuddTom)}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            {props.fristForGodkjenning && (
                <IkonRad>
                    <Warning />
                    <Label>Frist: </Label>
                    <BodyShort size="small">
                        {formatterDato(props.fristForGodkjenning)}
                        {props.forrigeFristForGodkjenning
                            ? `  (tidligere frist: ${formatterDato(props.forrigeFristForGodkjenning)})`
                            : ''}
                    </BodyShort>
                </IkonRad>
            )}
            <VerticalSpacer rem={1} />
            <IkonRad>
                <FileContent />
                <Label>Avtalt beløp for perioden:</Label>
                <BodyShort size="small">Inntil {formatterPenger(props.tilskuddsgrunnlag.tilskuddsbeløp)}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Money />
                <Label>Kontonummer:</Label>
                <BodyShort size="small">
                    {props.bedriftKontonummerInnhentetTidspunkt ? (
                        <>
                            {props.bedriftKontonummer ?? 'Ikke funnet'} (hentet{' '}
                            {formatterDato(props.bedriftKontonummerInnhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)})
                        </>
                    ) : (
                        'Ikke oppgitt'
                    )}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Money />
                <Label>KID:</Label>
                <BodyShort size="small">{props.bedriftKid ? props.bedriftKid : 'Ikke oppgitt'}</BodyShort>
            </IkonRad>
        </GråBoks>
    );
};

export default InformasjonFraAvtalen;
