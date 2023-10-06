import { File } from '@navikt/ds-icons';
import { EnvelopeClosedIcon, CheckmarkCircleIcon, DocPencilIcon, ClockIcon } from '@navikt/aksel-icons';
import { ReactNode } from 'react';

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

export const HendelseType: { [key in EventTyper]: ReactNode } = {
    RefusjonOpprettet: (
        <>
            <File style={{ marginRight: '0.2rem' }} /> {'Refusjon opprettet'}
        </>
    ),
    BeregningUtført: (
        <>
            <DocPencilIcon style={{ marginRight: '0.2rem' }} /> {'Beregning utført'}
        </>
    ),
    GodkjentAvArbeidsgiver: (
        <>
            <CheckmarkCircleIcon style={{ marginRight: '0.2rem' }} /> {'Godkjent av arbeidsgiver'}
        </>
    ),
    SendtVarsel: (
        <>
            <EnvelopeClosedIcon style={{ marginRight: '0.2rem' }} /> {'Sendt varsel'}
        </>
    ),
    FristForlenget: (
        <>
            <ClockIcon style={{ marginRight: '0.2rem' }} /> {'Frist forlenget'}
        </>
    ),
};
