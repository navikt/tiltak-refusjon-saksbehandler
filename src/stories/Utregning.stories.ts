import type { Meta, StoryObj } from '@storybook/react';

import Utregning from '@/refusjon/RefusjonSide/Utregning';
import { Tiltak } from '@/refusjon/refusjon';

const meta = {
    title: 'Example/Utregning',
    component: Utregning,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Utregning>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Regnestykke: Story = {
    args: {
        beregning: {
            lønn: 7777,
            lønnFratrukketFerie: 7777,
            feriepenger: 933,
            tjenestepensjon: 174,
            arbeidsgiveravgift: 1253,
            sumUtgifter: 10137,
            beregnetBeløp: 4055,
            refusjonsbeløp: 1357,
            overTilskuddsbeløp: true,
            tidligereUtbetalt: 0,
            fratrekkLønnFerie: 0,
            tidligereRefundertBeløp: 0,
            sumUtgifterFratrukketRefundertBeløp: 10137,
            commitHash: "",
            id: '01HHHVSFQ7BDKMFXAC54SA469K',
        },
        tilskuddsgrunnlag: {
            avtaleId: '65e384db-6b2f-440b-ba85-f965bcbd1655',
            //avtaleFom: null,
            //avtaleTom: null,
            tilskuddsperiodeId: '77342527-431f-4e9e-8a0d-b28182c7437a',
            deltakerFornavn: 'Alexander',
            deltakerEtternavn: 'Kielland',
            deltakerFnr: '07098142678',
            //arbeidsgiverFornavn: 'Arne',
            // arbeidsgiverEtternavn: 'Arbeidsgiver',
            // arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'Z123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2023-06-01',
            tilskuddTom: '2023-11-29',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.SOMMERJOBB,
            tilskuddsbeløp: 1357,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            //resendingsnummer: 1,
            enhet: '1000',
            //godkjentAvBeslutterTidspunkt: '2023-09-01T16:12:43.236956',
            id: '01HHHVSFQ5RAVDMZ09A269K4QB',
        },
        forrigeRefusjonMinusBeløp: 0,
        inntektsgrunnlag: {
            inntekter: [
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'timeloenn',
                    beløp: 7777,
                    måned: '2023-06',
                    opptjeningsperiodeFom: undefined,
                    opptjeningsperiodeTom: undefined,
                    erOpptjentIPeriode: true,
                    id: '01HHHVSFQ52SPF7GKNZ9RW67CW',
                    erMedIInntektsgrunnlag: true,
                },
            ],
            bruttoLønn: 7777,
            //id: '01HHHVSFQ5CQD1GXYNW53X3MXE',
            innhentetTidspunkt: '2023-12-13T16:12:43.237641',
        },
    },
};
