import { ReactComponent as Bygg } from '@/asset/image/bygg.svg';
import { ReactComponent as ErlikTegn } from '@/asset/image/erlikTegn.svg';
import { ReactComponent as Pengesekken } from '@/asset/image/pengesekkdollar.svg';
import { ReactComponent as PlussTegn } from '@/asset/image/plussTegn.svg';
import { ReactComponent as MinusTegn } from '@/asset/image/minusTegn.svg';
import { ReactComponent as ProsentTegn } from '@/asset/image/prosentTegn.svg';
import { ReactComponent as Sparegris } from '@/asset/image/sparegris.svg';
import { ReactComponent as Stranden } from '@/asset/image/strand.svg';
import { Warning } from '@navikt/ds-icons';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Element, Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import React, { Fragment, FunctionComponent } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { lønnsbeskrivelseTekst } from '../../messages';
import BEMHelper from '../../utils/bem';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjon } from '../refusjon';
import './Utregning.less';
import Utregningsrad from './Utregningsrad';

interface Props {
    refusjon: Refusjon;
}

const cls = BEMHelper('utregning');

const Utregning: FunctionComponent<Props> = (props) => {
    const bruttoLønnLabel = (
        <>
            Brutto lønn i perioden (hentet fra a-meldingen)
            {props.refusjon.inntektsgrunnlag && (
                <Element>
                    Sist hentet:{' '}
                    {formatterDato(props.refusjon.inntektsgrunnlag.innhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)}
                </Element>
            )}
        </>
    );

    const harInntekterMenIkkeForHeleTilskuddsperioden =
        !props.refusjon.harInntektIAlleMåneder &&
        !!props.refusjon.inntektsgrunnlag &&
        props.refusjon.inntektsgrunnlag.inntekter.length > 0;

    return (
        <div className={cls.className}>
            <VerticalSpacer rem={1} />
            <Systemtittel>Utregningen</Systemtittel>
            <VerticalSpacer rem={1} />
            <Utregningsrad
                labelIkon={<Pengesekken />}
                labelTekst={bruttoLønnLabel}
                verdi={props.refusjon.beregning?.lønn || 0}
                border="INGEN"
            />
            {props.refusjon.inntektsgrunnlag && props.refusjon.inntektsgrunnlag.inntekter.length > 0 && (
                <>
                    <div className={cls.element('inntekter')}>
                        <Element>Lønnsbeskrivelse</Element>
                        <Element>Opptjeningsperiode</Element>
                        <Element>Beløp</Element>
                        <Element>Refunderes</Element>
                        {props.refusjon.inntektsgrunnlag.inntekter.map((inntekt) => (
                            <Fragment key={inntekt.id}>
                                <Normaltekst>
                                    {inntekt.beskrivelse === undefined
                                        ? ''
                                        : lønnsbeskrivelseTekst[inntekt.beskrivelse] ??
                                          'Inntekt: ' + inntekt.beskrivelse}
                                </Normaltekst>

                                <Normaltekst>
                                    {inntekt.opptjeningsperiodeFom && inntekt.opptjeningsperiodeTom ? (
                                        formatterPeriode(inntekt.opptjeningsperiodeFom, inntekt.opptjeningsperiodeTom)
                                    ) : (
                                        <div>
                                            <Warning style={{ marginRight: '0.25rem', marginBottom: '-0.175rem' }} />
                                            <em>Ikke rapportert opptjeningsperiode</em>
                                        </div>
                                    )}
                                </Normaltekst>

                                <Normaltekst>{formatterPenger(inntekt.beløp)}</Normaltekst>

                                <Normaltekst>{inntekt.erMedIInntektsgrunnlag ? 'Ja' : 'Nei'}</Normaltekst>
                            </Fragment>
                        ))}
                    </div>
                    <VerticalSpacer rem={2} />
                    <div style={{ borderBottom: '1px solid #c6c2bf' }}></div>
                </>
            )}
            {(!props.refusjon.inntektsgrunnlag || props.refusjon.inntektsgrunnlag?.inntekter.length === 0) && (
                <>
                    <VerticalSpacer rem={1} />
                    <AlertStripeAdvarsel>
                        Vi kan ikke finne inntekter fra a-meldingen for denne perioden. Oppdater a-meldingen i Altinn,
                        når du kommer tilbake hit vil inntektsopplysningen være oppdatert automatisk.
                    </AlertStripeAdvarsel>
                    <VerticalSpacer rem={2} />
                </>
            )}

            {harInntekterMenIkkeForHeleTilskuddsperioden && (
                <>
                    <VerticalSpacer rem={1} />
                    <AlertStripeAdvarsel>
                        Vi kan ikke finne inntekter for hele perioden som er avtalt. Dette kan skyldes at det ikke er
                        rapportert inn inntekter for alle månedene i den avtalte perioden enda.
                        <Element>
                            Du kan kun søke om refusjon for den avtalte perioden{' '}
                            {formatterPeriode(
                                props.refusjon.tilskuddsgrunnlag.tilskuddFom,
                                props.refusjon.tilskuddsgrunnlag.tilskuddTom
                            )}{' '}
                            én gang. Sikre deg derfor at alle inntekter innenfor perioden er rapportert før du klikker
                            fullfør.
                        </Element>
                    </AlertStripeAdvarsel>
                    <VerticalSpacer rem={2} />
                </>
            )}

            <Utregningsrad
                labelIkon={<Stranden />}
                labelTekst="Feriepenger"
                labelSats={props.refusjon.tilskuddsgrunnlag.feriepengerSats}
                verdiOperator={<PlussTegn />}
                verdi={props.refusjon.beregning?.feriepenger || 0}
            />
            <Utregningsrad
                labelIkon={<Sparegris />}
                labelTekst="Innskudd obligatorisk tjenestepensjon"
                labelSats={props.refusjon.tilskuddsgrunnlag.otpSats}
                verdiOperator={<PlussTegn />}
                verdi={props.refusjon.beregning?.tjenestepensjon || 0}
            />
            <Utregningsrad
                labelIkon={<Bygg />}
                labelTekst="Arbeidsgiveravgift"
                labelSats={props.refusjon.tilskuddsgrunnlag.arbeidsgiveravgiftSats}
                verdiOperator={<PlussTegn />}
                verdi={props.refusjon.beregning?.arbeidsgiveravgift || 0}
            />
            <Utregningsrad
                labelTekst="Refusjonsgrunnlag"
                verdiOperator={<ErlikTegn />}
                verdi={props.refusjon.beregning?.sumUtgifter || 0}
            />
            <Utregningsrad
                labelTekst="Tilskuddsprosent"
                verdiOperator={<ProsentTegn />}
                ikkePenger
                verdi={props.refusjon.tilskuddsgrunnlag.lønnstilskuddsprosent}
            />
            <VerticalSpacer rem={3} />
            {props.refusjon.beregning &&
                (props.refusjon.beregning.overTilskuddsbeløp || props.refusjon.beregning.tidligereUtbetalt > 0) && (
                    <Utregningsrad
                        labelTekst="Beregnet beløp"
                        verdiOperator={<ErlikTegn />}
                        verdi={props.refusjon.beregning?.beregnetBeløp || 0}
                        border="TYKK"
                    />
                )}
            {props.refusjon.beregning && props.refusjon.beregning.tidligereUtbetalt > 0 && (
                <Utregningsrad
                    labelTekst="Tidligere utbetalt"
                    verdiOperator={<MinusTegn />}
                    verdi={props.refusjon.beregning.tidligereUtbetalt}
                    border="TYKK"
                />
            )}
            <Utregningsrad
                labelTekst="Refusjonsbeløp"
                verdiOperator={<ErlikTegn />}
                verdi={props.refusjon.beregning?.refusjonsbeløp || 'kan ikke beregne'}
                ikkePenger={props.refusjon.beregning === undefined}
                border="TYKK"
            />
            <VerticalSpacer rem={1} />
            {props.refusjon.beregning?.overTilskuddsbeløp && (
                <AlertStripeAdvarsel>
                    Beregnet beløp er høyere enn refusjonsbeløpet. Avtalt beløp er inntil{' '}
                    {formatterPenger(props.refusjon.tilskuddsgrunnlag.tilskuddsbeløp)} for denne perioden. Lønn i denne
                    refusjonsperioden kan ikke endres og dere vil få utbetalt maks av avtalt beløp.
                </AlertStripeAdvarsel>
            )}
        </div>
    );
};

export default Utregning;
