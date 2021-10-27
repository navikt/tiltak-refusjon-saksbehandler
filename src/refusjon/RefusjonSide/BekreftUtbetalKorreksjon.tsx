import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { utbetalKorreksjon } from '../../services/rest-service';

const BekreftUtbetalKorreksjon: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const [isOpen, setisOpen] = useState(false);
    const [beslutterIdent, setBeslutterIdent] = useState('');

    return (
        <div>
            <Knapp onClick={() => setisOpen(true)}>Send korreksjon til utbetaling</Knapp>

            <BekreftelseModal
                isOpen={isOpen}
                lukkModal={() => setisOpen(false)}
                tittel="Send korreksjon til utbetaling"
                bekreft={() => utbetalKorreksjon(refusjonId, beslutterIdent)}
            >
                <Normaltekst>
                    For å utbetale korreksjon må det besluttes av noen med budsjettdisponeringsmyndighet. Skriv inn
                    denne personens NAV-ident under når denne personen har godkjent.
                </Normaltekst>
                <VerticalSpacer rem={1} />
                <Input
                    label="Beslutters NAV-ident"
                    bredde="S"
                    value={beslutterIdent}
                    onChange={(e) => setBeslutterIdent(e.currentTarget.value)}
                />
            </BekreftelseModal>
        </div>
    );
};

export default BekreftUtbetalKorreksjon;
