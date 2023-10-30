import React, { FunctionComponent } from 'react';
import { Alert, Heading } from '@navikt/ds-react';
import { useParams } from 'react-router';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { useHentRefusjon } from '../../services/rest-service';
import InformasjonFraAvtalen from './InformasjonFraAvtalen';
import { Feature } from '../../featureToggles/features';
import OpprettKorreksjon from './OpprettKorreksjon';
import { useFeatureToggles } from '../../featureToggles/FeatureToggleProvider';

type AlertStripeType = 'info' | 'success' | 'warning' | 'error';

type Props = {
    feiltekst: string;
    advarselType: AlertStripeType;
};

const FeilSide: FunctionComponent<Props> = (props) => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const refusjon = useHentRefusjon(refusjonId!);
    const featureToggles = useFeatureToggles();

    return (
        <HvitBoks>
            {featureToggles[Feature.OpprettNullBelopKorreksjon] && (
                <>
                    <OpprettKorreksjon />
                    <VerticalSpacer rem={1} />
                </>
            )}
            <Alert variant={props.advarselType} size="small">
                {props.feiltekst}
            </Alert>
            <VerticalSpacer rem={2} />
            <Heading size="large">
                Refusjon av {tiltakstypeTekst[refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}
            </Heading>
            <VerticalSpacer rem={1} />
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={refusjon.refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={refusjon.refusjonsgrunnlag.bedriftKontonummer}
                fristForGodkjenning={refusjon.fristForGodkjenning}
                bedriftKontonummerInnhentetTidspunkt={refusjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
            />
        </HvitBoks>
    );
};

export default FeilSide;
