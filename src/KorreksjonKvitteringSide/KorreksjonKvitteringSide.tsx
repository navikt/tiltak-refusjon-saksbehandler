import { Heading, Tag } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import HvitBoks from '../komponenter/hvitboks/HvitBoks';
import { korreksjonStatusTekst } from '../messages';
import InformasjonFraAvtalen from '../refusjon/RefusjonSide/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '../refusjon/RefusjonSide/InntekterFraAMeldingen/InntekterFraAMeldingen';
import InntekterFraAMeldingenGammel from '../refusjon/RefusjonSide/InntekterFraAmeldingenGammel';
import InntekterFraTiltaketSvar from '../refusjon/RefusjonSide/InntekterFraTiltaketSvar';
import InntekterFraTiltaketSvarGammel from '../refusjon/RefusjonSide/InntekterFraTiltaketSvarGammel';
import TidligereRefunderbarBeløpKvittering from '../refusjon/RefusjonSide/TidligereRefunderbarBeløpKvittering';
import Utregning from '../refusjon/RefusjonSide/Utregning';
import { storForbokstav } from '../utils/stringUtils';
import KorreksjonSummeringBoks from './KorreksjonSummeringsBoks';
import { Korreksjon } from '@/refusjon/refusjon';

type Props = {
    korreksjon: Korreksjon;
};

const KorreksjonKvitteringSide: FunctionComponent<Props> = ({ korreksjon }) => {
    return (
        <HvitBoks>
            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading size="large" role="heading">
                    Korreksjon av refusjon
                </Heading>
                <Tag variant="info">{storForbokstav(korreksjonStatusTekst[korreksjon.status])}</Tag>
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
                        refusjonsgrunnlag={korreksjon.refusjonsgrunnlag}
                        unntakOmInntekterFremitid={0}
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
            <TidligereRefunderbarBeløpKvittering refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
            <VerticalSpacer rem={2} />
            <Utregning
                beregning={korreksjon.refusjonsgrunnlag.beregning}
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag}
                korreksjonSide={true}
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
