import { Heading, Tag } from '@navikt/ds-react';
import { FunctionComponent, ReactElement } from 'react';
import { useParams } from 'react-router';
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
import { useInnloggetBruker } from '../../bruker/BrukerContext';
import { BrukerContextType } from '../../bruker/BrukerContextType';

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
    const refusjon = useHentRefusjon(refusjonId!);
    const brukerContext: BrukerContextType = useInnloggetBruker();
    const refusjonsgrunnlag = refusjon.refusjonsgrunnlag;

    return (
        <HvitBoks>
            {brukerContext.innloggetBruker.harKorreksjonTilgang && !refusjon.korreksjonId && <OpprettKorreksjon />}

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

            {refusjon.refusjonsgrunnlag?.inntektsgrunnlag?.inntekter.find((i) => i.erOpptjentIPeriode === true) ? (
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
                    <TidligereRefunderbarBeløpKvittering refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
                </>
            ) : (
                <>
                    <InntekterFraAMeldingenGammel inntektsgrunnlag={refusjonsgrunnlag.inntektsgrunnlag} />
                    <VerticalSpacer rem={2} />
                    <InntekterFraTiltaketSvarGammel refusjonsgrunnlag={refusjonsgrunnlag} />
                    <VerticalSpacer rem={2} />
                    <TidligereRefunderbarBeløpKvittering refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
                </>
            )}
            <VerticalSpacer rem={2} />
            <Utregning
                beregning={refusjonsgrunnlag.beregning}
                tilskuddsgrunnlag={refusjonsgrunnlag.tilskuddsgrunnlag}
                forrigeRefusjonMinusBeløp={refusjon.refusjonsgrunnlag.forrigeRefusjonMinusBeløp}
                inntektsgrunnlag={refusjonsgrunnlag.inntektsgrunnlag}
            />
            <VerticalSpacer rem={4} />
            <SummeringBoks refusjonsgrunnlag={refusjonsgrunnlag} enhet={refusjonsgrunnlag.tilskuddsgrunnlag.enhet} />
        </HvitBoks>
    );
};

export default KvitteringSide;
