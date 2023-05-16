import { EtikettInfo } from 'nav-frontend-etiketter';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import HvitBoks from '../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import { korreksjonStatusTekst } from '../messages';
import InformasjonFraAvtalen from '../refusjon/RefusjonSide/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '../refusjon/RefusjonSide/InntekterFraAMeldingen';
import InntekterFraAMeldingenGammel from '../refusjon/RefusjonSide/InntekterFraAmeldingenGammel';
import InntekterFraTiltaketSvar from '../refusjon/RefusjonSide/InntekterFraTiltaketSvar';
import InntekterFraTiltaketSvarGammel from '../refusjon/RefusjonSide/InntekterFraTiltaketSvarGammel';
import Utregning from '../refusjon/RefusjonSide/Utregning';
import { useHentKorreksjon } from '../services/rest-service';
import { storForbokstav } from '../utils/stringUtils';
import KorreksjonSummeringBoks from './KorreksjonSummeringsBoks';

const KorreksjonKvitteringSide: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const korreksjon = useHentKorreksjon(korreksjonId);

    return (
        <HvitBoks>
            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Innholdstittel role="heading">Korreksjon av refusjon</Innholdstittel>
                <EtikettInfo>{storForbokstav(korreksjonStatusTekst[korreksjon.status])}</EtikettInfo>
            </div>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={korreksjon.refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={korreksjon.refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={korreksjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
            />
            <VerticalSpacer rem={2} />

            {korreksjon.harTattStillingTilAlleInntektslinjer ? (
                <>
                    <InntekterFraAMeldingen
                        inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag}
                        kvitteringVisning={true}
                    />
                    <VerticalSpacer rem={2} />
                    <InntekterFraTiltaketSvar refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
                </>
            ) : (
                <>
                    <InntekterFraAMeldingenGammel inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag} />
                    <InntekterFraTiltaketSvarGammel refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
                </>
            )}
            <VerticalSpacer rem={2} />
            <Utregning
                beregning={korreksjon.refusjonsgrunnlag.beregning}
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
            />
            <VerticalSpacer rem={4} />
            <KorreksjonSummeringBoks
                refusjonsgrunnlag={korreksjon.refusjonsgrunnlag}
                enhet={korreksjon.kostnadssted!}
                korreksjon={korreksjon}
            />
        </HvitBoks>
    );
};

export default KorreksjonKvitteringSide;
