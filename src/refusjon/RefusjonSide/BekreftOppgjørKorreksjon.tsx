import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { fullførKorreksjonVedOppgjort } from '../../services/rest-service';

const BekreftOppgjørKorreksjon: FunctionComponent = () => {
    const { korreksjonId } = useParams();
    const [isOpen, setisOpen] = useState(false);

    return (
        <div>
            <Knapp onClick={() => setisOpen(true)}>Fullfør</Knapp>

            <BekreftelseModal
                isOpen={isOpen}
                lukkModal={() => setisOpen(false)}
                tittel="Merk korreksjon som oppgjort"
                bekreft={() => fullførKorreksjonVedOppgjort(korreksjonId)}
            >
                <Normaltekst>
                    Ved å fullføre korreksjonen vil arbeidsgiver få en bekreftelse på at utbetalt beløp er riktig.
                </Normaltekst>
            </BekreftelseModal>
        </div>
    );
};

export default BekreftOppgjørKorreksjon;
