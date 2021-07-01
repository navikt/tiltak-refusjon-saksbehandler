import NavFrontendSpinner from 'nav-frontend-spinner';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { Normaltekst } from 'nav-frontend-typografi';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';

import React, { FunctionComponent } from 'react';

const HenterInntekterBoks: FunctionComponent = () => {
    return (
        <HvitBoks style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <NavFrontendSpinner type="XL" />
            <VerticalSpacer rem={1} />
            <Normaltekst>Henter inntektsopplysninger fra a-meldingen...</Normaltekst>
        </HvitBoks>
    );
};

export default HenterInntekterBoks;
