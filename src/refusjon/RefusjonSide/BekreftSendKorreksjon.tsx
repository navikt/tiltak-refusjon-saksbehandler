import React, { FunctionComponent, useState } from 'react';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { useParams } from 'react-router';
import { utbetalKorreksjon } from '../../services/rest-service';
import { Normaltekst } from 'nav-frontend-typografi';
import { Input } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';

const BekreftSendKorreksjon: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const [isOpen, setisOpen] = useState(false);
    const [beslutterIdent, setBeslutterIdent] = useState('');

    const utbetal = () => {
        if (beslutterIdent) {
            utbetalKorreksjon(refusjonId, beslutterIdent);
        }
    };

    return (
        <div>
            <Knapp onClick={() => setisOpen(true)}>Send korreksjon til utbetaling</Knapp>

            <BekreftelseModal
                isOpen={isOpen}
                lukkModal={() => setisOpen(false)}
                tittel="Send korreksjon til utbetaling"
                bekreft={() => utbetal}
            >
                <Normaltekst>Vennligst oppgi ident til beslutter</Normaltekst>
                <Input value={beslutterIdent} onChange={(e) => setBeslutterIdent(e.currentTarget.value)} />
            </BekreftelseModal>
        </div>
    );
};

export default BekreftSendKorreksjon;
