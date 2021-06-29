export type Refusjon = {
    id: string;
    deltaker: string;
    tiltakstype: 'MIDLERTIDLIG_LONNSTILSKUDD' | 'VARIG_LONNSTILSKUDD';
    deltakerFnr: string;
    veileder: string;
    bedrift: string;
    bedriftnummer: string;
    feriedager: number;
    fristForGodkjenning: string;
    trekkFeriedagerBeløp: number;
    sykedager: number;
    sykepenger: number;
    status: 'KLAR_FOR_INNSENDING' | 'ANNULLERT' | 'SENDT_KRAV' | 'UTBETALT' | 'UTGÅTT' | 'FOR_TIDLIG';
    stillingsprosent: number;
    månedslønn: number;
    nettoMånedslønn: number;
    satsOtp: number;
    beløpOtp: number;
    satsFeriepenger: number;
    feriepenger: number;
    satsArbeidsgiveravgift: number;
    arbeidsgiveravgift: number;
    sumUtgifterArbeidsgiver: number;
    satsRefusjon: number;
    refusjonPrMåned: number;
    fraDato: string;
    tilDato: string;
    opprettetTidspunkt: string;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
};

type Tilskuddsgrunnlag = {
    arbeidsgiveravgiftSats: number;
    avtaleId: string;
    avtaleNr: number;
    bedriftNavn: string;
    bedriftNr: string;
    deltakerEtternavn: string;
    deltakerFnr: string;
    deltakerFornavn: string;
    feriepengerSats: number;
    id: string;
    lønnstilskuddsprosent: number;
    løpenummer: number;
    otpSats: number;
    tilskuddFom: string;
    tilskuddTom: string;
    tilskuddsbeløp: number;
    tilskuddsperiodeId: string;
    tiltakstype: string;
    veilederNavIdent: string;
};

export type Status = 'KLAR_FOR_INNSENDING' | 'ANNULLERT' | 'SENDT_KRAV' | 'UTBETALT' | 'UTGÅTT' | 'FOR_TIDLIG';

export type TiltaksType =
    | 'ARBEIDSTRENING'
    | 'MIDLERTIDIG_LONNSTILSKUDD'
    | 'VARIG_LONNSTILSKUDD'
    | 'MENTOR'
    | 'SOMMERJOBB';

/*
bedriftKontonummer: null
bedriftNr: "999999999"
beregning: null
deltakerFnr: "12345678901"
fristForGodkjenning: "2021-09-28"
godkjentAvArbeidsgiver: null
godkjentAvSaksbehandler: null
id: "01F996DS4X0N1K1D9B6K2718XM"
innhentetBedriftKontonummerTidspunkt: null
inntektsgrunnlag: null
status: "FOR_TIDLIG"
tilskuddsgrunnlag:
arbeidsgiveravgiftSats: 0.141
avtaleId: "01F996DS4XZBMD1VKCTK1C1NKK"
avtaleNr: 3456
bedriftNavn: "Kiwi Majorstuen"
bedriftNr: "999999999"
deltakerEtternavn: "Bjørnson"
deltakerFnr: "28128521498"
deltakerFornavn: "Bjørnstjerne"
feriepengerSats: 0.12
id: "01F996DS4X0WSX02KHGJG81A8B"
lønnstilskuddsprosent: 40
løpenummer: 3
otpSats: 0.02
tilskuddFom: "2021-04-28"
tilskuddTom: "2021-07-28"
tilskuddsbeløp: 20579
tilskuddsperiodeId: "01F996DS4XYM131F82BH7G0XWE"
tiltakstype: "MIDLERTIDIG_LONNSTILSKUDD"
veilederNavIdent: ""
*/
