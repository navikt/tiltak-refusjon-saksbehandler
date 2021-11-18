import { EtikettAdvarsel, EtikettInfo } from 'nav-frontend-etiketter';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, ReactElement } from 'react';
import { useParams } from 'react-router';
import { Feature } from '../../featureToggles/features';
import { useFeatureToggles } from '../../featureToggles/FeatureToggleProvider';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { statusTekst } from '../../messages';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '../../utils/datoUtils';
import { storForbokstav } from '../../utils/stringUtils';
import { Refusjon } from '../refusjon';
import InformasjonFraAvtalen from '../RefusjonSide/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '../RefusjonSide/InntekterFraAMeldingen';
import InntekterFraTiltaketSvar from '../RefusjonSide/InntekterFraTiltaketSvar';
import OpprettKorreksjon from '../RefusjonSide/OpprettKorreksjon';
import SummeringBoks from '../RefusjonSide/SummeringBoks';
import Utregning from '../RefusjonSide/Utregning';
import { Status } from '../status';
import Statusmelding from './Statusmelding';

const etikettForRefusjonStatus = (refusjon: Refusjon): ReactElement => {
    if (refusjon.status === Status.UTBETALING_FEILET) {
        return <EtikettAdvarsel>{storForbokstav(statusTekst[refusjon.status])} </EtikettAdvarsel>;
    }
    return (
        <EtikettInfo>
            {storForbokstav(statusTekst[refusjon.status])}{' '}
            {refusjon.godkjentAvArbeidsgiver &&
                formatterDato(refusjon.godkjentAvArbeidsgiver, NORSK_DATO_OG_TID_FORMAT)}
        </EtikettInfo>
    );
};
const KvitteringSide: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const featureToggles = useFeatureToggles();

    return (
        <HvitBoks>
            {featureToggles[Feature.Korreksjon] && !refusjon.korreksjonId && <OpprettKorreksjon />}

            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Innholdstittel role="heading">Kvittering for refusjon</Innholdstittel>
                {etikettForRefusjonStatus(refusjon)}
            </div>
            <VerticalSpacer rem={1} />
            <Statusmelding status={refusjon.status} />
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKontonummer={refusjon.refusjonsgrunnlag.bedriftKontonummer}
            />
            <VerticalSpacer rem={2} />
            <InntekterFraAMeldingen inntektsgrunnlag={refusjon.inntektsgrunnlag} />
            <VerticalSpacer rem={2} />
            <InntekterFraTiltaketSvar refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
            <VerticalSpacer rem={2} />
            <Utregning beregning={refusjon.beregning} tilskuddsgrunnlag={refusjon.tilskuddsgrunnlag} />
            <VerticalSpacer rem={4} />
            <SummeringBoks refusjonsgrunnlag={refusjon.refusjonsgrunnlag} enhet={refusjon.tilskuddsgrunnlag.enhet} />
        </HvitBoks>
    );
};

export default KvitteringSide;
