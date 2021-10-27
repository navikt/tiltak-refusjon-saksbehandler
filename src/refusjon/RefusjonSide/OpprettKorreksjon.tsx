import { Knapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { korreksjonsgrunnTekst } from '../../messages';
import { korriger } from '../../services/rest-service';
import { Korreksjonsgrunn } from '../refusjon';

const OpprettKorreksjon: FunctionComponent<{}> = () => {
    const { refusjonId } = useParams();
    const history = useHistory();
    const [åpen, setÅpen] = useState(false);
    const [grunner, setGrunner] = useState<Set<Korreksjonsgrunn>>(new Set<Korreksjonsgrunn>());
    const [feilmelding, setFeilmelding] = useState<string>('');
    return (
        <>
            <Knapp onClick={() => setÅpen(true)}>Opprett korreksjonsutkast</Knapp>
            <BekreftelseModal
                isOpen={åpen}
                lukkModal={() => {
                    setFeilmelding('');
                    setÅpen(false);
                }}
                bekreft={async () => {
                    try {
                        const korreksjon = await korriger(refusjonId, Array.from(grunner));
                        history.push('/refusjon/' + korreksjon.id);
                    } catch (error) {
                        setFeilmelding(error.feilmelding ?? 'Det har skjedd en feil');
                    }
                }}
                tittel={'Opprett korreksjonsutkast'}
            >
                <Normaltekst>Hvorfor skal det korrigeres?</Normaltekst>
                <VerticalSpacer rem={1} />
                {[
                    Korreksjonsgrunn.HENT_INNTEKTER_PÅ_NYTT,
                    Korreksjonsgrunn.UTBETALT_HELE_TILSKUDDSBELØP,
                    Korreksjonsgrunn.INNTEKTER_RAPPORTERT_ETTER_TILSKUDDSPERIODE,
                ].map((it) => (
                    <>
                        <Checkbox
                            label={korreksjonsgrunnTekst[it]}
                            checked={grunner.has(it)}
                            onClick={(e) => {
                                const nyeGrunner = new Set(grunner);
                                if (e.currentTarget.checked) {
                                    nyeGrunner.add(it);
                                } else {
                                    nyeGrunner.delete(it);
                                }
                                setGrunner(nyeGrunner);
                            }}
                        />
                        <VerticalSpacer rem={1} />
                    </>
                ))}
                {feilmelding && <Feilmelding>{feilmelding}</Feilmelding>}
            </BekreftelseModal>
        </>
    );
};

export default OpprettKorreksjon;
