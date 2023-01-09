import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import React, { FunctionComponent, Suspense } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Feature } from '../../featureToggles/features';
import { useFeatureToggles } from '../../featureToggles/FeatureToggleProvider';
import TilbakeTilOversikt from '../../komponenter/tilbake-til-oversikt/TilbakeTilOversikt';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterDato } from '../../utils/datoUtils';
import ForlengFrist from '../ForlengFrist/ForlengFrist';
import KvitteringSide from '../KvitteringSide/KvitteringSide';
import MerkForUnntakOmInntekterToMånederFrem from '../MerkForUnntakOmInntekterToMånederFrem/MerkForUnntakOmInntekterToMånederFrem';
import { RefusjonStatus } from '../refusjon';
import FeilSide from './FeilSide';
import HenterInntekterBoks from './HenterInntekterBoks';
import RefusjonSide from './RefusjonSide';

const Fleks = styled.div`
    display: flex;
    > * {
        margin-right: 1rem;
    }
`;

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
    const featureToggles = useFeatureToggles();

    switch (refusjon.status) {
        case RefusjonStatus.FOR_TIDLIG:
            return (
                <FeilSide
                    advarselType="info"
                    feiltekst={`Du kan søke om refusjon fra ${formatterDato(
                        refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )} når perioden er over.`}
                />
            );
        case RefusjonStatus.KLAR_FOR_INNSENDING:
            return (
                <>
                    <Fleks>
                        <ForlengFrist />
                        {featureToggles[Feature.Korreksjon] && <MerkForUnntakOmInntekterToMånederFrem />}
                    </Fleks>
                    <VerticalSpacer rem={1} />
                    <RefusjonSide />
                </>
            );
        case RefusjonStatus.UTGÅTT:
            return (
                <>
                    <VerticalSpacer rem={1} />
                    <FeilSide
                        advarselType="advarsel"
                        feiltekst={`Fristen for å søke om refusjon for denne perioden gikk ut ${formatterDato(
                            refusjon.fristForGodkjenning
                        )}. Fristen kan ikke forlenges etter at den er utgått.`}
                    />
                </>
            );
        case RefusjonStatus.ANNULLERT:
            return <FeilSide advarselType="advarsel" feiltekst="Refusjonen er annullert. Avtalen ble annullert." />;
        case RefusjonStatus.SENDT_KRAV:
        case RefusjonStatus.GODKJENT_MINUSBELØP:
        case RefusjonStatus.UTBETALT:
        case RefusjonStatus.UTBETALING_FEILET:
        case RefusjonStatus.KORRIGERT:
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
