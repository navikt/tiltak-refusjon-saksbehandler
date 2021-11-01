export type Feilkode =
    | 'TEKNISK_FEIL_INNTEKTSOPPSLAG'
    | 'INNTEKT_HENTET_FOR_TIDLIG'
    | 'UGYLDIG_STATUS'
    | 'ETTER_FRIST'
    | 'INGEN_INNTEKTER'
    | 'TEKNISK_FEIL_BANKKONTONUMMEROPPSLAG'
    | 'INGEN_BEDRIFTKONTONUMMER'
    | 'INGEN_KORREKSJONSGRUNNER'
    | 'KORREKSJONSBELOP_NEGATIVT'
    | 'SAMME_SAKSBEHANDLER_OG_BESLUTTER'
    | 'INGEN_BESLUTTER';

export const Feilmeldinger: { [key in Feilkode]: string } = {
    TEKNISK_FEIL_INNTEKTSOPPSLAG: 'Feil ved inntektsoppslag.',
    INNTEKT_HENTET_FOR_TIDLIG: 'Refusjonen kan ikke startes før tilskuddsperioden har utløpt.',
    UGYLDIG_STATUS: 'Handlingen kan ikke utføres fordi refusjonen har ugyldig status.',
    ETTER_FRIST: 'Fristen for å be om refusjon er utgått (2 måneder etter sluttdato for perioden).',
    INGEN_INNTEKTER: 'Ingen inntekter for perioden ble funnet.',
    TEKNISK_FEIL_BANKKONTONUMMEROPPSLAG: 'Feil ved henting av kontonummer oppslag',
    INGEN_BEDRIFTKONTONUMMER: 'Mangler kontonummer for bedriften',
    KORREKSJONSBELOP_NEGATIVT: 'Korreksjon kan kun sendes til utbetaling om restbeløpet er positivt.',
    SAMME_SAKSBEHANDLER_OG_BESLUTTER: 'Kan ikke beslutte egne korreksjoner',
    INGEN_KORREKSJONSGRUNNER: 'Manger korreksjonsgrunn',
    INGEN_BESLUTTER: 'Du må oppgi en beslutter',
};
