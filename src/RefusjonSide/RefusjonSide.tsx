import AlertStripe from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import HvitBoks from '../Komponenter/HvitBoks';
import VerticalSpacer from '../Komponenter/VerticalSpacer';
import { Refusjon } from '../types/refusjon';

type Props = {
    refusjon?: Refusjon;
};

const RefusjonSide: FunctionComponent<Props> = (props) => {
    return (
        <div>
            <VerticalSpacer rem={2} />
            <HvitBoks style={{ margin: '0 auto', width: '40rem' }}>
                <Undertittel>Informasjon om tiltaket</Undertittel>
                <AlertStripe type="advarsel" form="inline">
                    Arbeidsgiver ønsker korrigeringer i refusjonsgrunnlaget
                </AlertStripe>
            </HvitBoks>
            <VerticalSpacer rem={1} />
            <HvitBoks style={{ margin: '0 auto', width: '40rem' }}>
                <Undertittel>Fravær som gir trekk</Undertittel>
            </HvitBoks>
            <VerticalSpacer rem={1} />
            <HvitBoks style={{ margin: '0 auto', width: '40rem' }}>
                <Undertittel>Korrigeringsønsker fra arbeidsgiver</Undertittel>
            </HvitBoks>
            <VerticalSpacer rem={1} />
            <HvitBoks style={{ margin: '0 auto', width: '40rem' }}>
                <Undertittel>NAVs utregning</Undertittel>
            </HvitBoks>
        </div>
    );
};

export default RefusjonSide;
