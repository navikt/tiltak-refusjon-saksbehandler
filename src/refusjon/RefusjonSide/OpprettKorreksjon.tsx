import { Knapp } from 'nav-frontend-knapper';
import { Checkbox } from 'nav-frontend-skjema';
import { Feilmelding, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { korreksjonsgrunnTekst } from '../../messages';
import { opprettKorreksjonsutkast } from '../../services/rest-service';
import { Korreksjonsgrunn } from '../refusjon';

const OpprettKorreksjon: FunctionComponent<{}> = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
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
                        const korreksjon = await opprettKorreksjonsutkast(refusjonId, Array.from(grunner));
                        history.push('/refusjon/' + korreksjon.id);
                    } catch (error) {
                        const feilmelding =
                            'feilmelding' in (error as any) ? (error as any).feilmelding : 'Uventet feil';
                        setFeilmelding(feilmelding);
                    }
                }}
                tittel={'Opprett korreksjonsutkast'}
            >
                <Normaltekst>Hvorfor skal det korrigeres?</Normaltekst>
                <VerticalSpacer rem={1} />
                {[Korreksjonsgrunn.HENT_INNTEKTER_PÅ_NYTT, Korreksjonsgrunn.HENT_INNTEKTER_TO_MÅNEDER_FREM].map(
                    (it, index) => (
                        <React.Fragment key={index}>
                            <Checkbox
                                label={korreksjonsgrunnTekst[it]}
                                checked={grunner.has(it)}
                                onChange={(e) => {
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
                        </React.Fragment>
                    )
                )}
                {feilmelding && <Feilmelding>{feilmelding}</Feilmelding>}
            </BekreftelseModal>
        </>
    );
};

export default OpprettKorreksjon;
