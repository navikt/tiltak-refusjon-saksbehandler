import { Alert, BodyShort, Button, Label, TextField } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { hentEnhet, useHentKorreksjon, utbetalKorreksjon } from '../../services/rest-service';

const BekreftUtbetalKorreksjon: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const [isOpen, setisOpen] = useState(false);
    const [beslutterIdent, setBeslutterIdent] = useState('');
    const [kostnadssted, setKostnadssted] = useState('');
    const korreksjon = useHentKorreksjon(korreksjonId!);
    const [enhetNavn, setEnhetNavn] = useState<string | null>(null);
    const [enhetNavnTilskudd, setEnhetNavnTilskudd] = useState<string | null>(null);

    const hentOgSettEnhetNavn = (enhet: string) => {
        hentEnhet(enhet, korreksjon.id).then((res) => setEnhetNavn(res));
    };

    const openModal = () => {
        hentEnhet(korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet, korreksjon.id).then((res) =>
            setEnhetNavnTilskudd(res)
        );
        setisOpen(true);
    };
    // if (isOpen && !enhetNavnTilskudd) {
    //     hentEnhet(korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet, korreksjon.id).then((res) => setEnhetNavnTilskudd(res));
    // }
    // useEffect(() => {
    //     if (isOpen) {
    //         hentEnhet(korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet, korreksjon.id).then((res) => setEnhetNavnTilskudd(res));
    //     }
    // }, [isOpen])

    const visUlikEnhetAdvarsel = () => {
        if (kostnadssted && kostnadssted.length === 4 && korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet) {
            return kostnadssted !== korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet;
        }
        return false;
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
                bekreft={() => utbetalKorreksjon(korreksjonId!, beslutterIdent, kostnadssted)}
            >
                <BodyShort size="small">
                    For å utbetale korreksjon må det besluttes av noen med budsjettdisponeringsmyndighet. Skriv inn
                    denne personens NAV-ident under når denne personen har godkjent.
                </BodyShort>
                <VerticalSpacer rem={1} />
                <BodyShort size="small">
                    Du må også oppi hvilken enhet korreksjonen skal kostnadsføres på. Den opprinnelige refusjonen ble
                    kostnadsført på enhet {korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet}.
                </BodyShort>
                <VerticalSpacer rem={1} />

                <TextField
                    style={{ width: '25%' }}
                    label="Beslutters NAV-ident"
                    size="small"
                    value={beslutterIdent}
                    onChange={(e) => setBeslutterIdent(e.currentTarget.value)}
                />
                <VerticalSpacer rem={1} />
                <Label>Kostnadssted</Label>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '9rem' }}>
                        <TextField
                            label=""
                            size="small"
                            value={kostnadssted}
                            maxLength={4}
                            onChange={(e) => {
                                const verdi = e.currentTarget.value;
                                if (verdi.match(/^\d{0,4}$/)) {
                                    setKostnadssted(verdi);
                                    if (verdi.length === 4) {
                                        hentOgSettEnhetNavn(verdi);
                                    } else {
                                        setEnhetNavn(null);
                                    }
                                }
                            }}
                        />
                    </div>
                    <div style={{ marginLeft: '1rem', marginTop: '0.9rem' }}>
                        <BodyShort size="small">{enhetNavn}</BodyShort>
                    </div>
                </div>
                {visUlikEnhetAdvarsel() && (
                    <Alert variant="warning" style={{ marginTop: '1rem' }}>
                        OBS! Du har valgt at korreksjonen skal kostnadsføres på enhet:{' '}
                        <b>
                            {kostnadssted} - {enhetNavn}
                        </b>
                        . Dette er ikke samme enhet som refusjonen du korrigerer ble kostnadsført på (
                        <b>
                            {korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet} - {enhetNavnTilskudd}
                        </b>
                        ).
                    </Alert>
                )}
                <VerticalSpacer rem={1} />
            </BekreftelseModal>
        </div>
    );
};

export default BekreftUtbetalKorreksjon;
