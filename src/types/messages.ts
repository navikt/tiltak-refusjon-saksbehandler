import { Status } from './refusjon';

export const avtaleStatusTekst: { [key in Status]: string } = {
    KLAR_FOR_INNSENDING: 'Klar for innsending',
    ANNULLERT: 'Annullert',
    SENDT_KRAV: 'Sendt krav',
    UTBETALT: 'Utbetalt',
    UTGÅTT: 'Frist utgått',
    FOR_TIDLIG: 'For tidlig',
};
