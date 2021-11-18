import React from 'react';
import { KorreksjonStatus, Status } from './status';
import { Tiltak } from './tiltak';

export interface Refusjon {
    id: string;
    bedriftNr: string;
    bedriftKontonummer?: string;
    deltakerFnr: string;
    godkjentAvArbeidsgiver?: string;
    godkjentAvSaksbehandler?: string;
    status: Status;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    inntektsgrunnlag?: Inntektsgrunnlag;
    beregning?: Beregning;
    forrigeFristForGodkjenning: string;
    fristForGodkjenning: string;
    harInntektIAlleMåneder: boolean;
    korreksjonsgrunner: Korreksjonsgrunn[];
    inntekterKunFraTiltaket?: boolean;
    endretBruttoLønn?: number;
    korreksjonId?: string;
    refusjonsgrunnlag: Refusjonsgrunnlag;
}

export interface Korreksjon {
    id: string;
    korrigererRefusjonId: string;
    bedriftNr: string;
    deltakerFnr: string;
    status: KorreksjonStatus;
    harInntektIAlleMåneder: boolean;
    kostnadssted?: string;
    korreksjonsgrunner: Korreksjonsgrunn[];
    refusjonsgrunnlag: Refusjonsgrunnlag;
}

export interface Refusjonsgrunnlag {
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    inntektsgrunnlag?: Inntektsgrunnlag;
    inntekterKunFraTiltaket?: boolean;
    endretBruttoLønn?: number;
    bedriftKontonummer?: string;
    beregning?: Beregning;
}

export interface Tilskuddsgrunnlag {
    arbeidsgiveravgiftSats: number;
    avtaleId: string;
    avtaleNr: number;
    løpenummer: number;
    bedriftNavn: string;
    bedriftNr: string;
    deltakerEtternavn: string;
    deltakerFnr: string;
    deltakerFornavn: string;
    feriepengerSats: number;
    id: string;
    lønnstilskuddsprosent: number;
    otpSats: number;
    tilskuddFom: string;
    tilskuddTom: string;
    tilskuddsbeløp: number;
    tilskuddsperiodeId: string;
    tiltakstype: Tiltak;
    veilederNavIdent: string;
    enhet: string;
}

export interface Inntektsgrunnlag {
    innhentetTidspunkt: string;
    inntekter: Inntektslinje[];
    bruttoLønn: number;
}

export interface Inntektslinje {
    inntektType: string;
    beskrivelse?: string;
    beløp: number;
    måned: string;
    id: string;
    opptjeningsperiodeFom?: string;
    opptjeningsperiodeTom?: string;
    erMedIInntektsgrunnlag: boolean;
}

export interface Beregning {
    arbeidsgiveravgift: number;
    commitHash: string;
    feriepenger: number;
    id: string;
    lønn: number;
    refusjonsbeløp: number;
    beregnetBeløp: number;
    overTilskuddsbeløp: boolean;
    sumUtgifter: number;
    tjenestepensjon: number;
    tidligereUtbetalt: number;
}

export enum Korreksjonsgrunn {
    // REBEREGNING = 'REBEREGNING',
    UTBETALT_HELE_TILSKUDDSBELØP = 'UTBETALT_HELE_TILSKUDDSBELØP',
    INNTEKTER_RAPPORTERT_ETTER_TILSKUDDSPERIODE = 'INNTEKTER_RAPPORTERT_ETTER_TILSKUDDSPERIODE',
    HENT_INNTEKTER_PÅ_NYTT = 'HENT_INNTEKTER_PÅ_NYTT',
}

export interface AlleSteg {
    path: string;
    label: string;
    komponent: React.ReactNode;
    disabled: boolean;
}
