import React, { FunctionComponent, useState } from 'react';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { korriger } from '../../services/rest-service';
import { useParams } from 'react-router';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router-dom';
import { Korreksjonsgrunn } from '../refusjon';
import { Checkbox } from 'nav-frontend-skjema';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { korreksjonsgrunnTekst } from '../../messages';

interface Props {}

const BekreftKorreksjon: FunctionComponent<Props> = () => {
    const { refusjonId } = useParams();
    const history = useHistory();
    const [åpen, setÅpen] = useState(false);
    const [grunner, setGrunner] = useState<Set<Korreksjonsgrunn>>(new Set<Korreksjonsgrunn>());
    const [feilmelding, setFeilmelding] = useState('');
    return (
        <>
            <Knapp
                onClick={() => {
                    setÅpen(true);
                }}
            >
                Korriger
            </Knapp>
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
                tittel={'Korriger'}
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

export default BekreftKorreksjon;
