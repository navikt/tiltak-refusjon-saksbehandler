import { Alert, Heading } from '@navikt/ds-react';
import _ from 'lodash';
import { Fragment, FunctionComponent } from 'react';
import styled from 'styled-components';
import VerticalSpacer from '../../../komponenter/VerticalSpacer';
import { lønnsbeskrivelseTekst } from '../../../messages';
import BEMHelper from '../../../utils/bem';
import { formatterPeriode, månedsNavn } from '../../../utils/datoUtils';
import { Inntektsgrunnlag, Refusjonsgrunnlag } from '../../refusjon';
import './inntektsMelding.less';
import InntektsmeldingTabellBody from './inntektsmeldingTabell/InntektsmeldingTabellBody';
import InntektsmeldingTabellHeader from './inntektsmeldingTabell/InntektsmeldingTabellHeader';
import InntektsMeldingHeader from './InntektsMeldingHeader';

const GråBoks = styled.div`
    background-color: #f7f7f7;
    border-radius: 4px;
    padding: 1.5rem min(1.5rem, 2%);
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
    const inntektGrupperListeSortert = _.sortBy(inntektGrupperListe, [(i) => i[0]]);

    return (
        <GråBoks>
            <InntektsMeldingHeader
                refusjonsgrunnlag={props.refusjonsgrunnlag}
                unntakOmInntekterFremitid={props.unntakOmInntekterFremitid}
            />
            {harBruttolønn && (
                <i>
                    Her hentes inntekter i form av fastlønn, timelønn, faste tillegg og uregelmessige tillegg knyttet
                    til arbeidet tid, som er rapportert inn i a-meldingen for måneden refusjonen gjelder for (
                    {formatterPeriode(
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}
                    ) {props.unntakOmInntekterFremitid ? <>og {props.unntakOmInntekterFremitid} måneder etter</> : ''}
                    {props.unntakOmInntekterFremitid === 1 &&
                        props.hentInntekterLengerFrem !== null &&
                        'og 1 måned frem'}
                    . Løsningen henter også inntekt rapportert inn fra veldedige eller allmennyttige organisasjoner.
                </i>
            )}

            {props.inntektsgrunnlag?.inntekter.find((inntekt) => inntekt.erMedIInntektsgrunnlag) && (
                <>
                    <VerticalSpacer rem={1} />
                    {inntektGrupperListeSortert.map(([aarManed, inntektslinjer]) => (
                        <Fragment key={aarManed}>
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
                        </Fragment>
                    ))}
                </>
            )}
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
