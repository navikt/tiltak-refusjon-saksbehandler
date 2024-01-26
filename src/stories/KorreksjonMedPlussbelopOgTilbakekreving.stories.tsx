import KorreksjonKvitteringSide from '@/KorreksjonKvitteringSide/KorreksjonKvitteringSide';
import { Korreksjon, Korreksjonsgrunn, Tiltak, KorreksjonStatus } from '@/refusjon/refusjon';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'KvitteringKorreksjon',
    component: KorreksjonKvitteringSide,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof KorreksjonKvitteringSide>;

export default meta;
type Story = StoryObj<typeof meta>;

const korreksjon: Korreksjon = {
    korrigererRefusjonId: '01HMRW629X08FN1WNPVJWTNTF1',
    refusjonsgrunnlag: {
        tilskuddsgrunnlag: {
            avtaleId: 'a2bfd3ef-6e81-4f63-b631-f4d00aebe68a',
            tilskuddsperiodeId: 'c936b415-3fdd-4234-8b7e-d12df08984b9',
            deltakerFornavn: 'Formye',
            deltakerEtternavn: 'Ferietrekksen',
            deltakerFnr: '28061827902',
            veilederNavIdent: 'Z123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2023-12-01',
            tilskuddTom: '2023-12-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.SOMMERJOBB,
            tilskuddsbeløp: 13337,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HMRW629XHD1N2W33BDFTVJTJ',
        },
        inntektsgrunnlag: {
            inntekter: [
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'trekkILoennForFerie',
                    beløp: -35000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2024-01-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: undefined,
                    id: '01HMRW9MH7CRGT6JTW38HM7EQA',
                    erMedIInntektsgrunnlag: false,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 30000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2024-01-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: true,
                    id: '01HMRW9MH7H2V8NGVGH9AT9NF9',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 2000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: false,
                    id: '01HMRW9MH7QA6JM9PDPG6F5KBE',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 30000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: true,
                    id: '01HMRW9MH7BVRRVAPY7ZMKA92V',
                    erMedIInntektsgrunnlag: true,
                },
            ],
            bruttoLønn: 62000.0,
            innhentetTidspunkt: '2024-01-22T16:23:18.951698',
        },
        bedriftKontonummer: '10000008145',
        bedriftKid: undefined,
        inntekterKunFraTiltaket: true,
        endretBruttoLønn: undefined,
        harFerietrekkForSammeMåned: false,
        fratrekkRefunderbarBeløp: false,
        forrigeRefusjonMinusBeløp: 0,
        beregning: {
            lønn: 60000,
            lønnFratrukketFerie: 25000,
            feriepenger: 3000,
            tjenestepensjon: 560,
            arbeidsgiveravgift: 4027,
            sumUtgifter: 32587,
            beregnetBeløp: 13035,
            refusjonsbeløp: -302,
            overTilskuddsbeløp: false,
            tidligereUtbetalt: 13337,
            fratrekkLønnFerie: -35000,
            tidligereRefundertBeløp: 0,
            sumUtgifterFratrukketRefundertBeløp: 32587,
            id: '01HMRW9XMVT78J74YMEZSVM1KD',
        },
    },
    deltakerFnr: '28061827902',
    bedriftNr: '999999999',
    id: '01HMRW9JTD7GRJGSPSGAJQN20N',
    korreksjonsgrunner: [Korreksjonsgrunn.HENT_INNTEKTER_PÅ_NYTT],
    status: KorreksjonStatus.TILBAKEKREVING,
    kostnadssted: undefined,
    harInntektIAlleMåneder: false,
    harTattStillingTilAlleInntektslinjer: true,
};

export const KorreksjonMedPlussbelopOgTilbakekreving: Story = {
    name: 'Korreksjon med plussbeløp og tilbakekreving',
    args: { korreksjon: korreksjon },
    decorators: [
        (Story, args) => (
            <div>
                <h1>KvitteringKorreksjon: Korreksjon med plussbeløp og tilbakekreving</h1>
                <Story {...args} />
            </div>
        ),
    ],
};
