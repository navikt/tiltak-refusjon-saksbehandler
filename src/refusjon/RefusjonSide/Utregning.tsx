import Bygg from '@/asset/image/bygg.svg?react';
import Endret from '@/asset/image/endret.svg?react';
import ErlikTegn from '@/asset/image/erlikTegn.svg?react';
import MinusTegn from '@/asset/image/minusTegn.svg?react';
import Pengesekken from '@/asset/image/pengesekkdollar.svg?react';
import PlussTegn from '@/asset/image/plussTegn.svg?react';
import ProsentTegn from '@/asset/image/prosentTegn.svg?react';
import RefusjonAvLønn from '@/asset/image/refusjonAvLønn.svg?react';
import Sparegris from '@/asset/image/sparegris.svg?react';
import Stillingsprosent from '@/asset/image/stillingsprosent.svg?react';
import Stranden from '@/asset/image/strand.svg?react';
import { Alert, BodyShort, Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { formatterPenger } from '../../utils/PengeUtils';
import { Beregning, Inntektsgrunnlag, Tilskuddsgrunnlag } from '../refusjon';
import Utregningsrad from './Utregningsrad';

interface Props {
    refusjonsnummer: { avtaleNr: number; løpenummer: number };
    beregning?: Beregning;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    forrigeRefusjonMinusBeløp?: number;
    inntektsgrunnlag?: Inntektsgrunnlag;
    korreksjonSide?: Boolean;
}

const GråRamme = styled.div`
    border: 4px solid #eee;
    border-radius: 4px;
    padding: 1.5rem;
`;

const Utregning: FunctionComponent<Props> = (props) => {
    const { beregning, tilskuddsgrunnlag, forrigeRefusjonMinusBeløp } = props;
    const bruttoLønnsInntekter = props.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.erMedIInntektsgrunnlag && inntekt.erOpptjentIPeriode === true
    );
    const ferietrekkInntekter = props.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.beskrivelse === 'trekkILoennForFerie'
    );

    const { refusjonsnummer } = props;

    const harMinusBeløp = forrigeRefusjonMinusBeløp != null && forrigeRefusjonMinusBeløp < 0;

    const feriepenger = beregning?.feriepenger || 0;
    const tjenestepensjon = beregning?.tjenestepensjon || 0;
    const arbeidsgiveravgift = beregning?.arbeidsgiveravgift || 0;

    return (
        <GråRamme>
            <Heading size="medium">Utregningen</Heading>
            <VerticalSpacer rem={1} />
            <Utregningsrad
                labelIkon={<Pengesekken />}
                labelTekst={'Bruttolønn i perioden'}
                verdi={beregning?.lønn || 0}
                inntekter={bruttoLønnsInntekter}
            />

            {beregning && beregning.fratrekkLønnFerie !== 0 && (
                <Utregningsrad
                    labelIkon={<Endret />}
                    labelTekst="Fratrekk for ferie (hentet fra A-meldingen)"
                    verdiOperator={<MinusTegn />}
                    verdi={
                        beregning!.fratrekkLønnFerie < 0 ? -beregning!.fratrekkLønnFerie : beregning!.fratrekkLønnFerie
                    }
                    inntekter={ferietrekkInntekter}
                    tilskuddsgunnlag={props.tilskuddsgrunnlag}
                />
            )}

            <>
                <Utregningsrad
                    labelIkon={<Stranden />}
                    labelTekst="Feriepenger"
                    labelSats={props.tilskuddsgrunnlag.feriepengerSats}
                    verdiOperator={feriepenger > 0 ? <PlussTegn /> : <MinusTegn />}
                    verdi={feriepenger > 0 ? feriepenger : -feriepenger}
                />
                <Utregningsrad
                    labelIkon={<Sparegris />}
                    labelTekst="Innskudd obligatorisk tjenestepensjon"
                    labelSats={props.tilskuddsgrunnlag.otpSats}
                    verdiOperator={tjenestepensjon > 0 ? <PlussTegn /> : <MinusTegn />}
                    verdi={tjenestepensjon > 0 ? tjenestepensjon : -tjenestepensjon}
                />
                <Utregningsrad
                    labelIkon={<Bygg />}
                    labelTekst="Arbeidsgiveravgift"
                    labelSats={props.tilskuddsgrunnlag.arbeidsgiveravgiftSats}
                    verdiOperator={arbeidsgiveravgift > 0 ? <PlussTegn /> : <MinusTegn />}
                    verdi={arbeidsgiveravgift > 0 ? arbeidsgiveravgift : -arbeidsgiveravgift}
                    border={beregning && beregning?.tidligereRefundertBeløp > 0 ? 'TYKK' : undefined}
                />
                {beregning && beregning?.tidligereRefundertBeløp > 0 ? (
                    <>
                        <Utregningsrad
                            labelIkon={<Pengesekken />}
                            labelTekst="Sum brutto lønnsutgifter"
                            verdiOperator={<ErlikTegn />}
                            verdi={beregning?.sumUtgifter || 0}
                        />
                        <Utregningsrad
                            labelIkon={<Endret />}
                            labelTekst="Refunderbar lønn"
                            verdiOperator={<MinusTegn />}
                            verdi={beregning?.tidligereRefundertBeløp}
                        />
                        <Utregningsrad
                            labelIkon={<Pengesekken />}
                            labelTekst="Refusjonsgrunnlag"
                            verdiOperator={<ErlikTegn />}
                            verdi={beregning?.sumUtgifterFratrukketRefundertBeløp}
                            border="TYKK"
                        />
                    </>
                ) : (
                    <Utregningsrad
                        labelIkon={<Pengesekken />}
                        labelTekst="Refusjonsgrunnlag"
                        verdiOperator={<ErlikTegn />}
                        verdi={beregning?.sumUtgifter || 0}
                        border="TYKK"
                    />
                )}
                <Utregningsrad
                    labelIkon={<Stillingsprosent />}
                    labelTekst="Tilskuddsprosent"
                    verdiOperator={<ProsentTegn />}
                    ikkePenger
                    verdi={tilskuddsgrunnlag.lønnstilskuddsprosent}
                />
            </>

            <VerticalSpacer rem={3} />
            {beregning && (beregning.overTilskuddsbeløp || beregning.tidligereUtbetalt !== 0 || harMinusBeløp) && (
                <Utregningsrad
                    labelIkon={<Pengesekken />}
                    labelTekst="Beregning basert på innhentede innteker"
                    verdiOperator={<ErlikTegn />}
                    ignorert={beregning.overTilskuddsbeløp}
                    verdi={beregning.beregnetBeløp}
                    border="INGEN"
                />
            )}
            {beregning?.overTilskuddsbeløp && beregning?.tidligereUtbetalt != 0 && (
                <Alert variant="warning" size="small">
                    Beregnet beløp {formatterPenger(beregning!.beregnetBeløp)} er høyere enn avtalt tilskuddsbeløp, som
                    er inntil {formatterPenger(tilskuddsgrunnlag.tilskuddsbeløp)} for denne perioden.
                </Alert>
            )}
            {beregning && beregning.overTilskuddsbeløp && (
                <Utregningsrad
                    labelIkon={<Pengesekken />}
                    labelTekst="Avtalt tilskuddsbeløp"
                    verdiOperator={<ErlikTegn />}
                    verdi={tilskuddsgrunnlag.tilskuddsbeløp}
                    border="TYKK"
                />
            )}
            {beregning && beregning.overTilskuddsbeløp && beregning.tidligereUtbetalt > 0 && (
                <Utregningsrad
                    labelIkon={<Pengesekken />}
                    labelTekst="Tilskuddsbeløp (avtalt beløp for perioden)"
                    verdi={props.tilskuddsgrunnlag.tilskuddsbeløp}
                    border="TYKK"
                />
            )}
            {harMinusBeløp && (
                <Utregningsrad
                    labelIkon={<Endret />}
                    labelTekst={'Resterende fratrekk for ferie fra tidligere refusjoner'}
                    verdiOperator={<MinusTegn />}
                    verdi={-forrigeRefusjonMinusBeløp}
                    border="TYKK"
                />
            )}
            {((beregning && beregning.tidligereUtbetalt !== 0) || props.korreksjonSide === true) && (
                <Utregningsrad
                    labelIkon={<Endret />}
                    labelTekst={
                        refusjonsnummer
                            ? 'Opprinnelig refusjonsbeløp fra refusjonsnummer ' +
                              refusjonsnummer?.avtaleNr +
                              '-' +
                              refusjonsnummer?.løpenummer
                            : 'Opprinnelig refusjonsbeløp'
                    }
                    verdiOperator={beregning && beregning.tidligereUtbetalt < 0 ? <PlussTegn /> : <MinusTegn />}
                    verdi={
                        beregning
                            ? beregning.tidligereUtbetalt < 0
                                ? -beregning.tidligereUtbetalt
                                : beregning.tidligereUtbetalt
                            : 0
                    }
                    border="TYKK"
                    underTekst={
                        <>
                            <BodyShort size="small" style={{ paddingLeft: '2rem' }}>
                                Det negative beløpet i opprinnelig refusjon, (
                                {formatterPenger(beregning?.tidligereUtbetalt || 0)}) blir trukket i senere
                                refusjon(er).
                            </BodyShort>
                            <BodyShort size="small" style={{ paddingLeft: '2rem' }}>
                                Vi kompenserer for det i denne korreksjonen.
                            </BodyShort>
                        </>
                    }
                />
            )}
            <Utregningsrad
                labelIkon={<RefusjonAvLønn />}
                labelTekst="Nytt korrigert refusjonsbeløp til utbetaling"
                verdiOperator={<ErlikTegn />}
                verdi={beregning?.refusjonsbeløp ?? 'kan ikke beregne'}
                ikkePenger={beregning === undefined}
                border="TYKK"
            />
            <VerticalSpacer rem={1} />
            {beregning?.overTilskuddsbeløp && beregning?.tidligereUtbetalt == 0 && (
                <Alert variant="warning" size="small">
                    Beregnet beløp er høyere enn refusjonsbeløpet. Avtalt beløp er inntil{' '}
                    {formatterPenger(tilskuddsgrunnlag.tilskuddsbeløp)} for denne perioden. Lønn i denne
                    refusjonsperioden kan ikke endres og dere vil få utbetalt maks av avtalt beløp.
                </Alert>
            )}
        </GråRamme>
    );
};

export default Utregning;
