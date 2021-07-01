import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { FunctionComponent } from 'react';

type Feilkode =
    | 'TEKNISK_FEIL_INNTEKTSOPPSLAG'
    | 'INNTEKT_HENTET_FOR_TIDLIG'
    | 'UGYLDIG_STATUS'
    | 'ETTER_FRIST'
    | 'INGEN_INNTEKTER'
    | 'TEKNISK_FEIL_BANKKONTONUMMEROPPSLAG'
    | 'INGEN_BEDRIFTKONTONUMMER';

const Feilmelding: FunctionComponent<{ feilkode: Feilkode }> = (props) => {
    return <Normaltekst>{feilmelding(props.feilkode)}</Normaltekst>;
};

export default Feilmelding;

export const feilmelding = (feilkode: Feilkode) => {
    switch (feilkode) {
        case 'TEKNISK_FEIL_INNTEKTSOPPSLAG':
            return 'Feil ved inntektsoppslag.';
        case 'INNTEKT_HENTET_FOR_TIDLIG':
            return 'Refusjonen kan ikke startes før tilskuddsperioden har utløpt.';
        case 'UGYLDIG_STATUS':
            return 'Handlingen kan ikke utføres fordi refusjonen har ugyldig status.';
        case 'ETTER_FRIST':
            return 'Fristen for å be om refusjon er utgått (2 måneder etter sluttdato for perioden).';
        case 'INGEN_INNTEKTER':
            return 'Ingen inntekter for perioden ble funnet.';
        case 'TEKNISK_FEIL_BANKKONTONUMMEROPPSLAG':
            return 'Feil ved henting av kontonummer oppslag';
        case 'INGEN_BEDRIFTKONTONUMMER':
            return 'Mangler kontonummer for bedriften';
    }
};
