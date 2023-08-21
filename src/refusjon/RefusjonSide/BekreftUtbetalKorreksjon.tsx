import { BodyShort, Button } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { useHentKorreksjon, utbetalKorreksjon } from '../../services/rest-service';

const BekreftUtbetalKorreksjon: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const [isOpen, setisOpen] = useState(false);
    const [kostnadssted] = useState('');
    const korreksjon = useHentKorreksjon(korreksjonId!);

    const openModal = () => {
        setisOpen(true);
    };

    return (
        <div>
            <Button variant="secondary" onClick={() => openModal()}>
                Send korreksjon til utbetaling
            </Button>

            <BekreftelseModal
                isOpen={isOpen}
                lukkModal={() => setisOpen(false)}
                tittel="Send korreksjon til utbetaling"
                bekreft={() => utbetalKorreksjon(korreksjonId!, kostnadssted)}
            >
                <BodyShort size="small">
                    Korreksjonen vil bli kostnadsført på den samme enheten som den opprinnelige refusjonen. Refusjonen
                    ble kostnadsført på enhet {korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet}.
                </BodyShort>
                <VerticalSpacer rem={1} />
            </BekreftelseModal>
        </div>
    );
};

export default BekreftUtbetalKorreksjon;
