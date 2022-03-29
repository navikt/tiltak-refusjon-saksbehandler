export enum Tiltak {
    MENTOR = 'MENTOR',
    MIDLERTIDIG_LØNNSTILSKUDD = 'MIDLERTIDIG_LONNSTILSKUDD',
    VARIG_LØNNSTILSKUDD = 'VARIG_LONNSTILSKUDD',
    SOMMERJOBB = 'SOMMERJOBB',
}

export enum RefusjonStatus {
    KLAR_FOR_INNSENDING = 'KLAR_FOR_INNSENDING',
    FOR_TIDLIG = 'FOR_TIDLIG',
    SENDT_KRAV = 'SENDT_KRAV',
    UTBETALT = 'UTBETALT',
    UTBETALING_FEILET = 'UTBETALING_FEILET',
    UTGÅTT = 'UTGÅTT',
    ANNULLERT = 'ANNULLERT',
    KORRIGERT = 'KORRIGERT',
}

export enum KorreksjonStatus {
    UTKAST = 'UTKAST',
    TILLEGSUTBETALING = 'TILLEGSUTBETALING',
    OPPGJORT = 'OPPGJORT',
    TILBAKEKREVING = 'TILBAKEKREVING',
}

export interface Refusjon {
    id: string;
    bedriftNr: string;
    deltakerFnr: string;
    godkjentAvArbeidsgiver?: string;
    status: RefusjonStatus;
    forrigeFristForGodkjenning?: string;
    fristForGodkjenning: string;
    harInntektIAlleMåneder: boolean;
    korreksjonId?: string;
    refusjonsgrunnlag: Refusjonsgrunnlag;
    unntakOmInntekterToMånederFrem: boolean;
    harTattStillingTilAlleInntektslinjer: boolean;
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
    harTattStillingTilAlleInntektslinjer: boolean;
}

export interface Refusjonsgrunnlag {
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    inntektsgrunnlag?: Inntektsgrunnlag;
    inntekterKunFraTiltaket?: boolean;
    endretBruttoLønn?: number;
    bedriftKontonummer?: string;
    bedriftKontonummerInnhentetTidspunkt?: string;
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
    erOpptjentIPeriode: boolean;
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
    UTBETALT_HELE_TILSKUDDSBELØP = 'UTBETALT_HELE_TILSKUDDSBELØP',
    HENT_INNTEKTER_TO_MÅNEDER_FREM = 'HENT_INNTEKTER_TO_MÅNEDER_FREM',
    HENT_INNTEKTER_PÅ_NYTT = 'HENT_INNTEKTER_PÅ_NYTT',
}
