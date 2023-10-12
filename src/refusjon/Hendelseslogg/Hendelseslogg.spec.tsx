import { File } from '@navikt/ds-icons';
import {
    EnvelopeClosedIcon,
    CheckmarkCircleIcon,
    DocPencilIcon,
    ClockIcon,
    PersonPencilIcon,
} from '@navikt/aksel-icons';
import { ReactNode } from 'react';

export interface Hendelse {
    id: string;
    // appImageId: string;
    refusonId: string;
    event: string;
    smsType?: string;
    utførtAv?: string;
    tidspunkt: string;
}

export type EventTyper =
    | 'RefusjonOpprettet'
    | 'BeregningUtført'
    | 'GodkjentAvArbeidsgiver'
    | 'FristForlenget'
    | 'KorreksjonBeregningUtført'
    | 'KorreksjonMerketForOppgjort'
    | 'KorreksjonMerketForTilbakekreving'
    | 'KorreksjonSendtTilUtbetaling'
    | 'KLAR'
    | 'REVARSEL'
    | 'FRIST_FORLENGET'
    | 'KORRIGERT';

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
    FristForlenget: (
        <>
            <ClockIcon style={{ marginRight: '0.2rem' }} /> {'Frist forlenget'}
        </>
    ),
    KorreksjonBeregningUtført: (
        <>
            <PersonPencilIcon style={{ marginRight: '0.2rem' }} /> {'KorreksjonBeregningUtført'}
        </>
    ),
    KorreksjonMerketForOppgjort: (
        <>
            <PersonPencilIcon style={{ marginRight: '0.2rem' }} /> {'KorreksjonMerketForOppgjort'}
        </>
    ),
    KorreksjonMerketForTilbakekreving: (
        <>
            <PersonPencilIcon style={{ marginRight: '0.2rem' }} /> {'KorreksjonMerketForTilbakekreving'}
        </>
    ),
    KorreksjonSendtTilUtbetaling: (
        <>
            <PersonPencilIcon style={{ marginRight: '0.2rem' }} /> {'KorreksjonSendtTilUtbetaling'}
        </>
    ),
    KORRIGERT: (
        <>
            <EnvelopeClosedIcon style={{ marginRight: '0.2rem' }} /> {'Sendt varsel på sms (korrigert)'}
        </>
    ),
    KLAR: (
        <>
            <EnvelopeClosedIcon style={{ marginRight: '0.2rem' }} /> {'Sendt varsel på sms'}
        </>
    ),
    REVARSEL: (
        <>
            <EnvelopeClosedIcon style={{ marginRight: '0.2rem' }} /> {'Sendt varsel på sms (revarsel)'}
        </>
    ),
    FRIST_FORLENGET: (
        <>
            <EnvelopeClosedIcon style={{ marginRight: '0.2rem' }} /> {'Sendt varsel på sms (frist forlenget)'}
        </>
    ),
};
