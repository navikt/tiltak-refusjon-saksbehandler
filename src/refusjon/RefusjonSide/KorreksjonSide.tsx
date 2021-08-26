import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import StatusTekst from '../../komponenter/StatusTekst/StatusTekst';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import NokkelInfo from './NokkelInfo';
import './RefusjonSide.less';
import Utregning from './Utregning';
import BekreftSlettKorreksjon from './BekreftSlettKorreksjon';

const KorreksjonSide: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <HvitBoks>
            <BekreftSlettKorreksjon />

            <VerticalSpacer rem={2} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Innholdstittel role="heading">Korreksjon av refusjon</Innholdstittel>
                <StatusTekst
                    status={refusjon.status}
                    tilskuddFom={refusjon.tilskuddsgrunnlag.tilskuddFom}
                    tilskuddTom={refusjon.tilskuddsgrunnlag.tilskuddTom}
                />
            </div>

            <VerticalSpacer rem={1} />
            <Normaltekst>
                Dette er en korreksjon av tidligere utbetalt refusjon. Det beregnes her et foreløpig oppgjør fratrukket
                beløpet som er utbetalt tidligere.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <NokkelInfo />
            <VerticalSpacer rem={2} />
            <Utregning refusjon={refusjon} />
        </HvitBoks>
    );
};

export default KorreksjonSide;
