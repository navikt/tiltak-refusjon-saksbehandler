import _ from 'lodash';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Radio } from 'nav-frontend-skjema';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { lønnsbeskrivelseTekst } from '../../messages';
import { setInntektslinjeOpptjentIPeriode } from '../../services/rest-service';
import { formatterDato, formatterPeriode, NORSK_DATO_OG_TID_FORMAT, NORSK_MÅNEDÅR_FORMAT } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Inntektsgrunnlag } from '../refusjon';

const GråBoks = styled.div`
    background-color: #eee;
    border-radius: 4px;
    padding: 1.5rem min(1.5rem, 2%);
`;

const Fleks = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: baseline;
`;

const InntekterTabell = styled.table`
    width: 100%;
    th,
    td {
        text-align: left;
        padding: 0.35rem 0.5rem;
    }
    th:first-child,
    td:first-child {
        padding: 0.35rem 0;
    }
    th:last-child,
    td:last-child {
        text-align: right;
        padding: 0.35rem 0;
    }
`;

export const inntektBeskrivelse = (beskrivelse: string | undefined) => {
    if (beskrivelse === undefined) {
        return '';
    } else if (beskrivelse === '') {
        return 'Inntekt';
    } else {
        return lønnsbeskrivelseTekst[beskrivelse] ?? 'Inntekt: ' + beskrivelse;
    }
};

type Props = {
    inntektsgrunnlag: Inntektsgrunnlag | undefined;
    kvitteringVisning: boolean;
    korreksjonId?: string;
};

const InntekterFraAMeldingen: FunctionComponent<Props> = (props) => {
    const antallInntekterSomErMedIGrunnlag = props.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.erMedIInntektsgrunnlag
    ).length;

    const ingenInntekter = !props.inntektsgrunnlag || props.inntektsgrunnlag?.inntekter.length === 0;

    const ingenRefunderbareInntekter: boolean =
        !!props.inntektsgrunnlag &&
        props.inntektsgrunnlag.inntekter.length > 0 &&
        antallInntekterSomErMedIGrunnlag === 0;

    // TODO: Bør denne fikses?
    // const harInntekterMenIkkeForHeleTilskuddsperioden = false;
    // props.status === 'KLAR_FOR_INNSENDING' &&
    // !props.harInntektIAlleMåneder &&
    // !!props.inntektsgrunnlag &&
    // props.inntektsgrunnlag.inntekter.find((inntekt) => inntekt.erMedIInntektsgrunnlag) !== undefined;

    return (
        <GråBoks>
            <Fleks>
                <Undertittel style={{ marginBottom: '1rem' }}>Inntekter hentet fra a-meldingen</Undertittel>
                {props.inntektsgrunnlag && (
                    <Normaltekst>
                        Sist hentet:{' '}
                        {formatterDato(props.inntektsgrunnlag.innhentetTidspunkt, NORSK_DATO_OG_TID_FORMAT)}
                    </Normaltekst>
                )}
            </Fleks>
            {props.inntektsgrunnlag?.bruttoLønn !== undefined && props.inntektsgrunnlag?.bruttoLønn !== null && (
                <i>Her hentes inntekter rapportert inn til a-meldingen i tilskuddsperioden og en måned etter.</i>
            )}
            {props.inntektsgrunnlag &&
                props.inntektsgrunnlag.inntekter.find((inntekt) => inntekt.erMedIInntektsgrunnlag) && (
                    <>
                        <VerticalSpacer rem={1} />
                        <InntekterTabell>
                            <thead>
                                <tr>
                                    <th>Beskriv&shy;else</th>
                                    <th>År/mnd</th>
                                    <th>Opptjenings&shy;periode</th>
                                    <th>Opptjent i perioden?</th>
                                    <th>Beløp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {_.sortBy(
                                    props.inntektsgrunnlag.inntekter.filter(
                                        (inntekt) => inntekt.erMedIInntektsgrunnlag
                                    ),
                                    ['måned', 'opptjeningsperiodeFom', 'opptjeningsperiodeTom', 'beskrivelse', 'id']
                                ).map((inntekt) => (
                                    <tr key={inntekt.id}>
                                        <td>{inntektBeskrivelse(inntekt.beskrivelse)}</td>
                                        <td>{formatterDato(inntekt.måned, NORSK_MÅNEDÅR_FORMAT)}</td>

                                        <td>
                                            {inntekt.opptjeningsperiodeFom && inntekt.opptjeningsperiodeTom ? (
                                                formatterPeriode(
                                                    inntekt.opptjeningsperiodeFom,
                                                    inntekt.opptjeningsperiodeTom,
                                                    'DD.MM'
                                                )
                                            ) : (
                                                <em>Ikke rapportert opptjenings&shy;periode</em>
                                            )}
                                        </td>

                                        {props.inntektsgrunnlag?.inntekter.filter(
                                            (currInntekt) => currInntekt.erOpptjentIPeriode
                                        ) && (
                                            <td>
                                                {!props.kvitteringVisning && props.korreksjonId && (
                                                    <div style={{ display: 'flex', columnGap: '3em' }}>
                                                        <Radio
                                                            label={'Ja'}
                                                            checked={inntekt.erOpptjentIPeriode === true}
                                                            onChange={(e) => {
                                                                setInntektslinjeOpptjentIPeriode(
                                                                    props.korreksjonId!,
                                                                    inntekt.id,
                                                                    true
                                                                );
                                                            }}
                                                            name={inntekt.id}
                                                        />
                                                        <Radio
                                                            label={'Nei'}
                                                            checked={inntekt.erOpptjentIPeriode === false}
                                                            onChange={(e) => {
                                                                setInntektslinjeOpptjentIPeriode(
                                                                    props.korreksjonId!,
                                                                    inntekt.id,
                                                                    false
                                                                );
                                                            }}
                                                            name={inntekt.id}
                                                        />
                                                    </div>
                                                )}
                                                {props.kvitteringVisning && (
                                                    <div style={{ display: 'flex', columnGap: '3em' }}>
                                                        {inntekt.erOpptjentIPeriode && <label>{'Ja'}</label>}
                                                        {inntekt.erOpptjentIPeriode === false && <label>{'Nei'}</label>}
                                                        {(inntekt.erOpptjentIPeriode === undefined ||
                                                            inntekt.erOpptjentIPeriode === null) && (
                                                            <label>{'Ikke besvart'}</label>
                                                        )}
                                                    </div>
                                                )}
                                            </td>
                                        )}

                                        <td>{formatterPenger(inntekt.beløp)}</td>
                                    </tr>
                                ))}
                                {/* {props.inntektsgrunnlag?.bruttoLønn && (
                                    <tr>
                                        <td colSpan={3}>
                                            <b>Sum</b>
                                        </td>
                                        <td>
                                            <b style={{ whiteSpace: 'nowrap' }}>
                                                {formatterPenger(props.inntektsgrunnlag.bruttoLønn)}
                                            </b>
                                        </td>
                                    </tr>
                                )} */}
                            </tbody>
                        </InntekterTabell>
                    </>
                )}
            {ingenInntekter && (
                <>
                    <VerticalSpacer rem={1} />
                    <AlertStripeAdvarsel>
                        Vi kan ikke finne inntekter fra a-meldingen for denne perioden. Når a-meldingen er oppdatert vil
                        inntektsopplysningene vises her automatisk.
                    </AlertStripeAdvarsel>
                    <VerticalSpacer rem={1} />
                </>
            )}
            {ingenRefunderbareInntekter && (
                <>
                    <VerticalSpacer rem={1} />
                    <AlertStripeAdvarsel>
                        Vi kan ikke finne noen lønnsinntekter for denne perioden. Når a-meldingen er oppdatert vil
                        inntektsopplysningene vises her automatisk.
                    </AlertStripeAdvarsel>
                    <VerticalSpacer rem={1} />
                </>
            )}
            {/*{harInntekterMenIkkeForHeleTilskuddsperioden && (*/}
            {/*    <>*/}
            {/*        <VerticalSpacer rem={1} />*/}
            {/*        <AlertStripeAdvarsel>*/}
            {/*            Vi kan ikke finne inntekter for hele perioden som er avtalt. Dette kan skyldes at det ikke er*/}
            {/*            rapportert inn inntekter for alle månedene i den avtalte perioden enda.*/}
            {/*            <Element>*/}
            {/*                Du kan kun søke om refusjon for den avtalte perioden{' '}*/}
            {/*                {formatterPeriode(props.tilskuddsgrunnlag.tilskuddFom, props.tilskuddsgrunnlag.tilskuddTom)}{' '}*/}
            {/*                én gang. Sikre deg derfor at alle inntekter innenfor perioden er rapportert før du klikker*/}
            {/*                fullfør.*/}
            {/*            </Element>*/}
            {/*        </AlertStripeAdvarsel>*/}
            {/*        <VerticalSpacer rem={1} />*/}
            {/*    </>*/}
            {/*)}*/}
        </GråBoks>
    );
};

export default InntekterFraAMeldingen;
