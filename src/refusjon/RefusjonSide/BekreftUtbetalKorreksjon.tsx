import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentKorreksjon, utbetalKorreksjon } from '../../services/rest-service';
import { BodyShort, TextField, Button } from '@navikt/ds-react';

const BekreftUtbetalKorreksjon: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const [isOpen, setisOpen] = useState(false);
    const [kostnadssted, setKostnadssted] = useState('');
    const korreksjon = useHentKorreksjon(korreksjonId!);

    return (
        <div>
            <Button variant="secondary" onClick={() => setisOpen(true)}>
                Send korreksjon til utbetaling
            </Button>

            <BekreftelseModal
                isOpen={isOpen}
                lukkModal={() => setisOpen(false)}
                tittel="Send korreksjon til utbetaling"
                bekreft={() => utbetalKorreksjon(korreksjonId!, kostnadssted)}
            >
                <BodyShort size="small">
                    Du må oppi hvilken enhet korreksjonen skal kostnadsføres på. Den opprinnelige refusjonen ble
                    kostnadsført på enhet {korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet}. Du må velge en enhet
                    som tilhører samme fylke som den opprinnelige refusjonen.
                </BodyShort>
                <VerticalSpacer rem={1} />

                <TextField
                    style={{ width: '25%' }}
                    label="Kostnadssted"
                    size="small"
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
