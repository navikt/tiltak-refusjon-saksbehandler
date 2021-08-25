import { EtikettInfo } from 'nav-frontend-etiketter';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { statusTekst } from '../../messages';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '../../utils/datoUtils';
import { storForbokstav } from '../../utils/stringUtils';
import NokkelInfo from '../RefusjonSide/NokkelInfo';
import SummeringBoks from '../RefusjonSide/SummeringBoks';
import Utregning from '../RefusjonSide/Utregning';
import BekreftKorreksjon from '../RefusjonSide/BekreftKorreksjon';

const KvitteringSide: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <HvitBoks>
            {refusjon.korrigeresAvId === null && <BekreftKorreksjon />}

            <VerticalSpacer rem={2} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Innholdstittel role="heading">Kvittering for refusjon</Innholdstittel>
                <EtikettInfo>
                    {storForbokstav(statusTekst[refusjon.status])}{' '}
                    {refusjon.godkjentAvArbeidsgiver &&
                        formatterDato(refusjon.godkjentAvArbeidsgiver, NORSK_DATO_OG_TID_FORMAT)}
                </EtikettInfo>
            </div>
            <VerticalSpacer rem={1} />
            <Normaltekst>
                Refusjonskravet er nå sendt. Det vil ta 3–4 dager før pengene kommer på kontoen. Denne refusjonen vil
                bli tatt vare på under “Sendt krav”.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <NokkelInfo />
            <VerticalSpacer rem={2} />
            <Utregning refusjon={refusjon} />
            <VerticalSpacer rem={4} />
            <SummeringBoks />
        </HvitBoks>
    );
};

export default KvitteringSide;
