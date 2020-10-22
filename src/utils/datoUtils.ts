import moment from 'moment';

const NORSK_DATO_FORMAT = 'DD.MM.YYYY';
export const formatterDato = (dato: string) => {
    try {
        const formattertDato = moment(dato).format(NORSK_DATO_FORMAT);
        return !formattertDato.includes('NaN') ? formattertDato : dato;
    } catch (e) {
        // Kunne ikke caste stringen til dato.
        return dato;
    }
};
