import { Tag, Heading } from '@navikt/ds-react';
import { FunctionComponent, ReactElement } from 'react';
import { useParams } from 'react-router';
import { useFeatureToggles } from '../../featureToggles/FeatureToggleProvider';
import { Feature } from '../../featureToggles/features';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import { statusTekst } from '../../messages';
import { useHentRefusjon } from '../../services/rest-service';
import { NORSK_DATO_OG_TID_FORMAT, formatterDato } from '../../utils/datoUtils';
import { storForbokstav } from '../../utils/stringUtils';
import InformasjonFraAvtalen from '../RefusjonSide/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '../RefusjonSide/InntekterFraAMeldingen/InntekterFraAMeldingen';
import InntekterFraAMeldingenGammel from '../RefusjonSide/InntekterFraAmeldingenGammel';
import InntekterFraTiltaketSvar from '../RefusjonSide/InntekterFraTiltaketSvar';
import InntekterFraTiltaketSvarGammel from '../RefusjonSide/InntekterFraTiltaketSvarGammel';
import OpprettKorreksjon from '../RefusjonSide/OpprettKorreksjon';
import SummeringBoks from '../RefusjonSide/SummeringBoks';
import TidligereRefunderbarBeløpKvittering from '../RefusjonSide/TidligereRefunderbarBeløpKvittering';
import Utregning from '../RefusjonSide/Utregning';
import { Refusjon, RefusjonStatus } from '../refusjon';
import Statusmelding from './Statusmelding';

const etikettForRefusjonStatus = (refusjon: Refusjon): ReactElement => {
    if (refusjon.status === RefusjonStatus.UTBETALING_FEILET) {
        return <Tag variant="warning">{storForbokstav(statusTekst[refusjon.status])} </Tag>;
    }
    return (
        <Tag variant="info">
            {storForbokstav(statusTekst[refusjon.status])}{' '}
            {refusjon.godkjentAvArbeidsgiver &&
                formatterDato(refusjon.godkjentAvArbeidsgiver, NORSK_DATO_OG_TID_FORMAT)}
        </Tag>
    );
};
const KvitteringSide: FunctionComponent = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const refusjon = useHentRefusjon(refusjonId);
    const refusjonsgrunnlag = refusjon.refusjonsgrunnlag;
    const featureToggles = useFeatureToggles();

    return (
        <HvitBoks>
            {featureToggles[Feature.Korreksjon] &&
                !refusjon.korreksjonId &&
                refusjon.status !== RefusjonStatus.UTBETALING_FEILET && <OpprettKorreksjon />}

            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading size="large" role="heading">
                    Kvittering for refusjon
                </Heading>
                {etikettForRefusjonStatus(refusjon)}
            </div>
            <VerticalSpacer rem={1} />
            <Statusmelding status={refusjon.status} />
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
                fristForGodkjenning={refusjon.fristForGodkjenning}
                forrigeFristForGodkjenning={refusjon.forrigeFristForGodkjenning}
            />
            <VerticalSpacer rem={2} />

            {refusjon.harTattStillingTilAlleInntektslinjer ? (
                <>
                    <InntekterFraAMeldingen
                        inntektsgrunnlag={refusjonsgrunnlag.inntektsgrunnlag}
                        kvitteringVisning={true}
                        refusjonsgrunnlag={refusjonsgrunnlag}
                        hentInntekterLengerFrem={refusjon.hentInntekterLengerFrem}
                        unntakOmInntekterFremitid={refusjon.unntakOmInntekterFremitid}
                    />
                    <VerticalSpacer rem={2} />
                    <InntekterFraTiltaketSvar refusjonsgrunnlag={refusjonsgrunnlag} />
                    <VerticalSpacer rem={2} />
                    <TidligereRefunderbarBeløpKvittering refusjon={refusjon} />
                </>
            ) : (
                <>
                    <InntekterFraAMeldingenGammel inntektsgrunnlag={refusjonsgrunnlag.inntektsgrunnlag} />
                    <VerticalSpacer rem={2} />
                    <InntekterFraTiltaketSvarGammel refusjonsgrunnlag={refusjonsgrunnlag} />
                    <VerticalSpacer rem={2} />
                    <TidligereRefunderbarBeløpKvittering refusjon={refusjon} />
                </>
            )}
            <VerticalSpacer rem={2} />
            <Utregning
                beregning={refusjonsgrunnlag.beregning}
                tilskuddsgrunnlag={refusjonsgrunnlag.tilskuddsgrunnlag}
            />
            <VerticalSpacer rem={4} />
            <SummeringBoks refusjonsgrunnlag={refusjonsgrunnlag} enhet={refusjonsgrunnlag.tilskuddsgrunnlag.enhet} />
        </HvitBoks>
    );
};

export default KvitteringSide;
