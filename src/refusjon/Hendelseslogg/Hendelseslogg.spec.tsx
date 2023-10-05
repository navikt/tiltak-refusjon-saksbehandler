export interface Hendelse {
    id: string;
    // appImageId: string;
    refusonId: string;
    event: string;
    utførtAv?: string;
    tidspunkt: string;
}

export type EventTyper =
    | 'RefusjonOpprettet'
    | 'BeregningUtført'
    | 'GodkjentAvArbeidsgiver'
    | 'SendtVarsel'
    | 'FristForlenget';

export const HendelseType: { [key in EventTyper]: string } = {
    RefusjonOpprettet: 'Refusjon opprettet',
    BeregningUtført: 'Beregning utført',
    GodkjentAvArbeidsgiver: 'Godkjent av arbeidsgiver',
    SendtVarsel: 'Sendt varsel',
    FristForlenget: 'Frist forlenget',
};
