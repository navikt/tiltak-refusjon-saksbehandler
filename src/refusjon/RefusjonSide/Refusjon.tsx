import React, { FunctionComponent, Suspense } from 'react';
import { useParams } from 'react-router';
import TilbakeTilOversikt from '../../komponenter/tilbake-til-oversikt/TilbakeTilOversikt';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterDato } from '../../utils/datoUtils';
import KvitteringSide from '../KvitteringSide/KvitteringSide';
import { Status } from '../status';
import FeilSide from './FeilSide';
import HenterInntekterBoks from './HenterInntekterBoks';
import RefusjonSide from './RefusjonSide';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { Link } from 'react-router-dom';
import { useFeatureToggles } from '../../featureToggles/FeatureToggleProvider';
import { Feature } from '../../featureToggles/features';
import ForlengFrist from '../ForlengFrist/ForlengFrist';

const Advarsler: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const featureToggles = useFeatureToggles();

    return (
        <>
            {featureToggles[Feature.Korreksjon] && refusjon.korreksjonId && (
                <>
                    <AlertStripeInfo>
                        Denne refusjonen er det gjort korrigeringer på.{' '}
                        <Link to={`/korreksjon/${refusjon.korreksjonId}`}>Klikk her for å åpne korreksjonen.</Link>
                    </AlertStripeInfo>
                    <VerticalSpacer rem={1} />
                </>
            )}
        </>
    );
};

const Komponent: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    switch (refusjon.status) {
        case Status.FOR_TIDLIG:
            return (
                <FeilSide
                    advarselType="info"
                    feiltekst={`Du kan søke om refusjon fra ${formatterDato(
                        refusjon.tilskuddsgrunnlag.tilskuddTom
                    )} når perioden er over.`}
                />
            );
        case Status.KLAR_FOR_INNSENDING:
            return (
                <>
                    <ForlengFrist />
                    <VerticalSpacer rem={1} />
                    <RefusjonSide />
                </>
            );
        case Status.UTGÅTT:
            return (
                <>
                    <ForlengFrist />
                    <VerticalSpacer rem={1} />
                    <FeilSide
                        advarselType="advarsel"
                        feiltekst={`Fristen for å søke om refusjon for denne perioden gikk ut ${formatterDato(
                            refusjon.fristForGodkjenning
                        )}.`}
                    />
                </>
            );
        case Status.ANNULLERT:
            return <FeilSide advarselType="advarsel" feiltekst="Refusjonen er annullert. Avtalen ble annullert." />;
        case Status.SENDT_KRAV:
        case Status.UTBETALT:
        case Status.UTBETALING_FEILET:
        case Status.KORRIGERT:
            return <KvitteringSide />;
    }
};

const Refusjon: FunctionComponent = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ flex: '0 0 55rem', flexShrink: 1 }}>
                <TilbakeTilOversikt />
                <Suspense fallback={<HenterInntekterBoks />}>
                    <Advarsler />
                    <Komponent />
                </Suspense>
            </div>
        </div>
    );
};

export default Refusjon;
