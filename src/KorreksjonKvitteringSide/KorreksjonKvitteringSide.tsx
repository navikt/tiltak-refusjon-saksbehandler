import { EtikettInfo } from 'nav-frontend-etiketter';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import { useHentKorreksjon } from '../services/rest-service';
import HvitBoks from '../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import { korreksjonStatusTekst } from '../messages';
import InformasjonFraAvtalen from '../refusjon/RefusjonSide/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '../refusjon/RefusjonSide/InntekterFraAMeldingen';
import InntekterFraTiltaketSvar from '../refusjon/RefusjonSide/InntekterFraTiltaketSvar';
import Utregning from '../refusjon/RefusjonSide/Utregning';
import SummeringBoks from '../refusjon/RefusjonSide/SummeringBoks';
import { storForbokstav } from '../utils/stringUtils';

const KorreksjonKvitteringSide: FunctionComponent = () => {
    const { korreksjonId } = useParams();
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
                bedriftKontonummer={korreksjon.refusjonsgrunnlag.bedriftKontonummer}
            />
            <VerticalSpacer rem={2} />
            <InntekterFraAMeldingen inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag} />
            <VerticalSpacer rem={2} />
            <InntekterFraTiltaketSvar refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
            <VerticalSpacer rem={2} />
            <Utregning
                beregning={korreksjon.refusjonsgrunnlag.beregning}
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
            />
            <VerticalSpacer rem={4} />
            <SummeringBoks refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
        </HvitBoks>
    );
};

export default KorreksjonKvitteringSide;
