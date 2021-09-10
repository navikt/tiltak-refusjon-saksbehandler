export interface NyFristRequest {
    nyFrist: string;
    årsak: string
}

export const disableAfter = (sisteFristDato: string, antallMnd: number): string => {
    return sisteFristDato.split('-').map((dato, index) => index === 1 ?
        (parseInt(dato) + antallMnd).toFixed(0) : dato).join('-');
};


export const getDateStringFraDatoVelger = (datoFraDatoVelger: Date): string => {
    return datoFraDatoVelger.toLocaleDateString('no-No').split('.').map((d, i) =>
        d.length === 1 ? '0'.concat(d) : d).join('.');
};


export const formatDateToIsoDateFormat = (date: string): string => {
    const d = date.split('.').map((d, i) =>
        d.length === 1 ? '0'.concat(d) : d).join('.').split('.');
    return d.length === 3 ? d[2].concat('-').concat(d[1]).concat('-').concat(d[0]) : date;
};
