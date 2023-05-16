import { Knapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentKorreksjon, utbetalKorreksjon } from '../../services/rest-service';

const BekreftUtbetalKorreksjon: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const [isOpen, setisOpen] = useState(false);
    const [beslutterIdent, setBeslutterIdent] = useState('');
    const [kostnadssted, setKostnadssted] = useState('');
    const korreksjon = useHentKorreksjon(korreksjonId);

    return (
        <div>
            <Knapp onClick={() => setisOpen(true)}>Send korreksjon til utbetaling</Knapp>

            <BekreftelseModal
                isOpen={isOpen}
                lukkModal={() => setisOpen(false)}
                tittel="Send korreksjon til utbetaling"
                bekreft={() => utbetalKorreksjon(korreksjonId, beslutterIdent, kostnadssted)}
            >
                <Normaltekst>
                    For å utbetale korreksjon må det besluttes av noen med budsjettdisponeringsmyndighet. Skriv inn
                    denne personens NAV-ident under når denne personen har godkjent.
                </Normaltekst>
                <VerticalSpacer rem={1} />
                <Normaltekst>
                    Du må også oppi hvilken enhet korreksjonen skal kostnadsføres på. Den opprinnelige refusjonen ble
                    kostnadsført på enhet {korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet}.
                </Normaltekst>
                <VerticalSpacer rem={1} />

                <Input
                    label="Beslutters NAV-ident"
                    bredde="S"
                    value={beslutterIdent}
                    onChange={(e) => setBeslutterIdent(e.currentTarget.value)}
                />
                <VerticalSpacer rem={1} />
                <Input
                    label="Kostnadssted"
                    bredde="S"
                    value={kostnadssted}
                    maxLength={4}
                    onChange={(e) => {
                        const verdi = e.currentTarget.value;
                        if (verdi.match(/^\d{0,4}$/)) {
                            setKostnadssted(verdi);
                        }
                    }}
                />
            </BekreftelseModal>
        </div>
    );
};

export default BekreftUtbetalKorreksjon;
