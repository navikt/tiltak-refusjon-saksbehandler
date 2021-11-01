import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { fullførKorreksjonVedTilbakekreving } from '../../services/rest-service';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import VerticalSpacer from '../../komponenter/VerticalSpacer';

const BekreftTilbakekrevKorreksjon: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const [isOpen, setisOpen] = useState(false);

    return (
        <div>
            <Knapp onClick={() => setisOpen(true)}>Fullfør tilbakekreving</Knapp>

            <BekreftelseModal
                isOpen={isOpen}
                lukkModal={() => setisOpen(false)}
                tittel="Merk korreksjon for tilbakekreving"
                bekreft={() => fullførKorreksjonVedTilbakekreving(refusjonId)}
            >
                <Normaltekst>
                    Ved å fullføre korreksjonen vil arbeidsgiver få en bekreftelse på at utbetalt beløp er for høyt, og
                    at det vil bli tilbakekrevd.
                </Normaltekst>
                <VerticalSpacer rem={1} />
                <AlertStripeInfo>Du må iverksette en manuell tilbakekrevingsprosess</AlertStripeInfo>
            </BekreftelseModal>
        </div>
    );
};

export default BekreftTilbakekrevKorreksjon;
