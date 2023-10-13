import { File } from '@navikt/ds-icons';
import {
    EnvelopeClosedIcon,
    CheckmarkCircleIcon,
    DocPencilIcon,
    ClockIcon,
    PersonPencilIcon,
} from '@navikt/aksel-icons';
import { FunctionComponent, ReactNode } from 'react';
import { HendelseType } from '../refusjon';

// export interface Hendelse {
//     id: string;
//     // appImageId: string;
//     refusonId: string;
//     event: string;
//     smsType?: string;
//     utførtAv?: string;
//     tidspunkt: string;
// }
//
// // flytte tingene til messages og refusjon.ts
// export type EventTyper =
//     | 'RefusjonOpprettet'
//     | 'BeregningUtført'
//     | 'GodkjentAvArbeidsgiver'
//     | 'RefusjonGodkjentNullBeløp'
//     | 'RefusjonGodkjentMinusBeløp'
//     | 'FristForlenget'
//     | 'KorreksjonBeregningUtført'
//     | 'KorreksjonMerketForOppgjort'
//     | 'KorreksjonMerketForTilbakekreving'
//     | 'KorreksjonSendtTilUtbetaling'
//     | 'KLAR'
//     | 'REVARSEL'
//     | 'FRIST_FORLENGET'
//     | 'KORRIGERT';
//
// export const HendelseType: { [key in EventTyper]: ReactNode } = {
//     RefusjonOpprettet: (
//         <>
//             <File /> {'Refusjon opprettet'}
//         </>
//     ),
//     BeregningUtført: (
//         <>
//             <DocPencilIcon /> {'Beregning utført'}
//         </>
//     ),
//     GodkjentAvArbeidsgiver: (
//         <>
//             <CheckmarkCircleIcon /> {'Godkjent av arbeidsgiver'}
//         </>
//     ),
//     RefusjonGodkjentNullBeløp: (
//         <>
//             <CheckmarkCircleIcon /> {'Refusjon Godkjent (NullBeløp)'}
//         </>
//     ),
//     RefusjonGodkjentMinusBeløp: (
//         <>
//             <CheckmarkCircleIcon /> {'Refusjon Godkjent (MinusBeløp)'}
//         </>
//     ),
//     FristForlenget: (
//         <>
//             <ClockIcon /> {'Frist forlenget'}
//         </>
//     ),
//     KorreksjonBeregningUtført: (
//         <>
//             <PersonPencilIcon /> {'Korreksjonberegning'}
//         </>
//     ),
//     KorreksjonMerketForOppgjort: (
//         <>
//             <PersonPencilIcon /> {'Korreksjon oppgjort'}
//         </>
//     ),
//     KorreksjonMerketForTilbakekreving: (
//         <>
//             <PersonPencilIcon /> {'Korreksjon tilbakekreving'}
//         </>
//     ),
//     KorreksjonSendtTilUtbetaling: (
//         <>
//             <PersonPencilIcon /> {'Korreksjon sendt til utbetaling'}
//         </>
//     ),
//     KORRIGERT: (
//         <>
//             <EnvelopeClosedIcon /> {'Sendt varsel på sms (korrigert)'}
//         </>
//     ),
//     KLAR: (
//         <>
//             <EnvelopeClosedIcon /> {'Sendt varsel på sms'}
//         </>
//     ),
//     REVARSEL: (
//         <>
//             <EnvelopeClosedIcon /> {'Sendt varsel på sms (revarsel)'}
//         </>
//     ),
//     FRIST_FORLENGET: (
//         <>
//             <EnvelopeClosedIcon /> {'Sendt varsel på sms (frist forlenget)'}
//         </>
//     ),
// };

interface Props {
    hendelse: HendelseType;
}

const hendelsesIkon: { [key in HendelseType]: ReactNode } = {
    RefusjonOpprettet: <File />,
    BeregningUtført: <DocPencilIcon />,
    GodkjentAvArbeidsgiver: <CheckmarkCircleIcon />,
    RefusjonGodkjentNullBeløp: <CheckmarkCircleIcon />,
    RefusjonGodkjentMinusBeløp: <CheckmarkCircleIcon />,
    FristForlenget: <ClockIcon />,
    KorreksjonBeregningUtført: <PersonPencilIcon />,
    KorreksjonMerketForOppgjort: <PersonPencilIcon />,
    KorreksjonMerketForTilbakekreving: <PersonPencilIcon />,
    KorreksjonSendtTilUtbetaling: <PersonPencilIcon />,
    KLAR: <EnvelopeClosedIcon />,
    REVARSEL: <EnvelopeClosedIcon />,
    FRIST_FORLENGET: <EnvelopeClosedIcon />,
    KORRIGERT: <EnvelopeClosedIcon />,
};

const HendelseIkon: FunctionComponent<Props> = (props): ReactNode => {
    if (props.hendelse) {
        return hendelsesIkon[props.hendelse];
    } else {
        return null;
    }
};

export default HendelseIkon;
