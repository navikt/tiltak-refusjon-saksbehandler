import { Alert, Heading } from '@navikt/ds-react';
import _ from 'lodash';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { lønnsbeskrivelseTekst } from '../../../messages';
import { formatterPenger } from '../../../utils/PengeUtils';
import BEMHelper from '../../../utils/bem';
import { NORSK_DATO_OG_TID_FORMAT, formatterDato, formatterPeriode, månedsNavn } from '../../../utils/datoUtils';
import { Inntektsgrunnlag, Refusjonsgrunnlag } from '../../refusjon';
import './inntektsMelding.less';
import InntektsmeldingTabellBody from './inntektsmeldingTabell/InntektsmeldingTabellBody';
import InntektsmeldingTabellHeader from './inntektsmeldingTabell/InntektsmeldingTabellHeader';

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
    refusjonsgrunnlag: Refusjonsgrunnlag;
    kvitteringVisning: boolean;
    korreksjonId?: string;
    unntakOmInntekterFremitid: number;
    hentInntekterLengerFrem?: string;
};

const InntekterFraAMeldingen: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('inntektsmelding');
    const antallInntekterSomErMedIGrunnlag = props.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.erMedIInntektsgrunnlag
    ).length;

    const ingenInntekter = !props.inntektsgrunnlag || props.inntektsgrunnlag?.inntekter.length === 0;

    const harBruttolønn = props.inntektsgrunnlag ? props.inntektsgrunnlag?.bruttoLønn > 0 : false;

    const ingenRefunderbareInntekter: boolean =
        !!props.inntektsgrunnlag &&
        props.inntektsgrunnlag.inntekter.length > 0 &&
        antallInntekterSomErMedIGrunnlag === 0;

    const inntektGrupperObjekt = _.groupBy(props.inntektsgrunnlag?.inntekter, (inntekt) => inntekt.måned);
    const inntektGrupperListe = Object.entries(inntektGrupperObjekt);

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
            {harBruttolønn && (
                <i>
                    Her hentes inntekter rapportert inn til a-meldingen for måneden refusjonen gjelder for (
                    {formatterPeriode(
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}
                    ) {props.unntakOmInntekterFremitid ? <>og {props.unntakOmInntekterFremitid} måneder etter</> : ''}
                    {props.unntakOmInntekterFremitid === 1 &&
                        props.hentInntekterLengerFrem !== null &&
                        'og 1 måned frem'}
                    .
                </i>
            )}

            {props.inntektsgrunnlag?.inntekter.find((inntekt) => inntekt.erMedIInntektsgrunnlag) && (
                <>
                    <VerticalSpacer rem={1} />
                    {inntektGrupperListe.map(([aarManed, inntektslinjer]) => (
                        <>
                            <Heading level="4" size="small" style={{ display: 'flex', justifyContent: 'center' }}>
                                Inntekt rapportert for {månedsNavn(aarManed)} ({aarManed})
                            </Heading>
                            <div style={{ borderTop: '1px solid #06893b' }}>
                                <table className={cls.element('inntektstabell')}>
                                    <InntektsmeldingTabellHeader refusjonsgrunnlag={props.refusjonsgrunnlag} />
                                    <InntektsmeldingTabellBody
                                        inntektslinjer={inntektslinjer}
                                        kvitteringVisning={props.kvitteringVisning}
                                        korreksjonId={props.korreksjonId}
                                    />
                                </table>
                            </div>
                            <VerticalSpacer rem={1} />
                        </>
                    ))}
                </>
            )}

            {/* {props.inntektsgrunnlag &&
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
                                ))} */}
            {props.inntektsgrunnlag?.bruttoLønn && (
                <tr>
                    <td colSpan={3}>
                        <b>Sum</b>
                    </td>
                    <td>
                        <b style={{ whiteSpace: 'nowrap' }}>{formatterPenger(props.inntektsgrunnlag.bruttoLønn)}</b>
                    </td>
                </tr>
            )}
            {/* </tbody>
                        </InntekterTabell>
                    </>
                )} */}
            {ingenInntekter && (
                <>
                    <VerticalSpacer rem={1} />
                    <Alert variant="warning" size="small">
                        Vi kan ikke finne inntekter fra a-meldingen for denne perioden. Når a-meldingen er oppdatert vil
                        inntektsopplysningene vises her automatisk.
                    </Alert>
                    <VerticalSpacer rem={1} />
                </>
            )}
            {ingenRefunderbareInntekter && (
                <>
                    <VerticalSpacer rem={1} />
                    <Alert variant="warning" size="small">
                        Vi kan ikke finne noen lønnsinntekter for denne perioden. Når a-meldingen er oppdatert vil
                        inntektsopplysningene vises her automatisk.
                    </Alert>
                    <VerticalSpacer rem={1} />
                </>
            )}
        </GråBoks>
    );
};

export default InntekterFraAMeldingen;
