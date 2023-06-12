import { Calender, File, FileContent, Money, Office1, People, Warning } from '@navikt/ds-icons';
import { Element, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Tilskuddsgrunnlag } from '../refusjon';
import { BodyShort } from '@navikt/ds-react';

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
    bedriftKid: string | null | undefined;
    bedriftKontonummer: string | null | undefined;
    bedriftKontonummerInnhentetTidspunkt: string | null | undefined;
}> = (props) => {
    const avtaleLenke = `https://tiltaksgjennomforing.intern.nav.no/tiltaksgjennomforing/avtale/${props.tilskuddsgrunnlag.avtaleId}`;
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
                        <BodyShort size="small">{props.tilskuddsgrunnlag.bedriftNavn}</BodyShort>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Element>Virksomhetsnummer: </Element>
                        <BodyShort size="small">{props.tilskuddsgrunnlag.bedriftNr}</BodyShort>
                    </div>
                </div>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <File />
                <Element>Refusjonsnummer: </Element>
                <BodyShort size="small">{refusjonsnummer}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <People />
                <Element>Deltaker: </Element>
                <BodyShort size="small">
                    {props.tilskuddsgrunnlag.deltakerFornavn} {props.tilskuddsgrunnlag.deltakerEtternavn}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Calender />
                <Element>Periode: </Element>
                <BodyShort size="small">
                    {formatterPeriode(props.tilskuddsgrunnlag.tilskuddFom, props.tilskuddsgrunnlag.tilskuddTom)}
                </BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            {props.fristForGodkjenning && (
                <IkonRad>
                    <Warning />
                    <Element>Frist: </Element>
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
                <Element>Avtalt beløp for perioden:</Element>
                <BodyShort size="small">Inntil {formatterPenger(props.tilskuddsgrunnlag.tilskuddsbeløp)}</BodyShort>
            </IkonRad>
            <VerticalSpacer rem={1} />
            <IkonRad>
                <Money />
                <Element>Kontonummer:</Element>
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
                <Element>KID:</Element>
                <BodyShort size="small">{props.bedriftKid ? props.bedriftKid : 'Ikke oppgitt'}</BodyShort>
            </IkonRad>
        </GråBoks>
    );
};

export default InformasjonFraAvtalen;
