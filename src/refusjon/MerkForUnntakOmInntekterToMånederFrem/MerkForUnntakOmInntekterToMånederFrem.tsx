import React, { ChangeEvent, FunctionComponent, useState } from 'react';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { useParams } from 'react-router';
import { merkForUnntakOmInntekterToMånederFrem, useHentRefusjon } from '../../services/rest-service';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { BodyShort, TextField, Button } from '@navikt/ds-react';

const MerkForUnntakOmInntekterToMånederFrem: FunctionComponent = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();
    const refusjon = useHentRefusjon(refusjonId);
    const [open, setOpen] = useState<boolean>(false);
    const [merking, setMerking] = useState<number>(refusjon.unntakOmInntekterFremitid);

    return (
        <div>
            <Button size="small" variant="secondary" style={{backgroundColor:'white'}} onClick={() => setOpen(!open)}>Hent inntekter lenger frem</Button>
            <BekreftelseModal
                isOpen={open}
                lukkModal={() => {
                    setOpen(false);
                    setMerking(refusjon.unntakOmInntekterFremitid);
                }}
                bekreft={async () => {
                    await merkForUnntakOmInntekterToMånederFrem(refusjonId, merking);
                    setOpen(false);
                }}
                tittel={'Merk refusjonen for henting av inntekter frem i tid'}
                containerStyle={{ minWidth: 'unset' }}
            >
                <BodyShort size="small">
                    Hvis unntaksregelen er aktivert vil systemet hente inntekter for valgt antall måneder etter perioden, i
                    stedet for én måned som standard. Nytt inntektsoppslag vil gjøres neste gang arbeidsgiver åpner
                    refusjonen.
                </BodyShort>
                <VerticalSpacer rem={1} />
                <TextField
                    style={{width:"25%"}}
                        size="small"
                        label={`Antall ekstra måneder etter perioden systemet skal hente innteker (maks 12)`}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            const verdi: string = event.currentTarget.value;
                            if (verdi.match(/^\d*$/) && parseInt(verdi, 10) <= 12) {
                                setMerking(parseInt(verdi, 10));
                            }
                            if(!verdi) {
                                setMerking(refusjon.unntakOmInntekterFremitid);
                            }
                        }}
                        value={merking}
                    />

            </BekreftelseModal>
        </div>
    );
};

export default MerkForUnntakOmInntekterToMånederFrem;
