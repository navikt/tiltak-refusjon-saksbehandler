import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { korreksjonsgrunnTekst } from '../../messages';
import { opprettKorreksjonsutkast } from '../../services/rest-service';
import { Korreksjonsgrunn } from '../refusjon';
import { Button, BodyShort, ErrorMessage, Checkbox, CheckboxGroup, TextField } from '@navikt/ds-react';

const OpprettKorreksjon: FunctionComponent<{}> = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const navigate = useNavigate();
    const [åpen, setÅpen] = useState(false);
    const [grunner, setGrunner] = useState<Set<Korreksjonsgrunn>>(new Set<Korreksjonsgrunn>());
    const [unntakOmInntekterFremitid, setUnntakOmInntekterFremitid] = useState<number>();
    const [feilmelding, setFeilmelding] = useState<string>('');
    return (
        <>
            <Button variant="secondary" onClick={() => setÅpen(true)}>
                Opprett korreksjonsutkast
            </Button>
            <BekreftelseModal
                isOpen={åpen}
                lukkModal={() => {
                    setFeilmelding('');
                    setÅpen(false);
                }}
                bekreft={async () => {
                    try {
                        const korreksjon = await opprettKorreksjonsutkast(
                            refusjonId!,
                            Array.from(grunner),
                            unntakOmInntekterFremitid
                        );
                        navigate('/refusjon/' + korreksjon.id);
                    } catch (error) {
                        const feilmelding =
                            'feilmelding' in (error as any) ? (error as any).feilmelding : 'Uventet feil';
                        setFeilmelding(feilmelding);
                    }
                }}
                tittel={'Opprett korreksjonsutkast'}
            >
                <BodyShort size="small">Hvorfor skal det korrigeres?</BodyShort>
                <VerticalSpacer rem={1} />
                <CheckboxGroup legend="">
                    {[Korreksjonsgrunn.HENT_INNTEKTER_PÅ_NYTT, Korreksjonsgrunn.HENT_INNTEKTER_TO_MÅNEDER_FREM].map(
                        (it, index) => (
                            <Checkbox
                                key={index}
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
                            >
                                {korreksjonsgrunnTekst[it]}
                            </Checkbox>
                        )
                    )}
                </CheckboxGroup>
                {grunner.has(Korreksjonsgrunn.HENT_INNTEKTER_TO_MÅNEDER_FREM) && (
                    <TextField
                        style={{ width: '25%' }}
                        size="small"
                        label={`Antall måneder etter perioden det skal hentes innteker (maks 12)`}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const verdi: string = event.currentTarget.value;
                            if (verdi.match(/^\d*$/) && parseInt(verdi, 10) <= 12) {
                                setUnntakOmInntekterFremitid(parseInt(verdi, 10));
                            }
                            if (!verdi) {
                                setUnntakOmInntekterFremitid(2);
                            }
                        }}
                        value={unntakOmInntekterFremitid}
                    />
                )}
                {feilmelding && <ErrorMessage>{feilmelding}</ErrorMessage>}
            </BekreftelseModal>
        </>
    );
};

export default OpprettKorreksjon;
