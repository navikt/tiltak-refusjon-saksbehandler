import React, { FunctionComponent, useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { useParams } from 'react-router';
import { merkForUnntakOmInntekterToMånederFrem, useHentRefusjon } from '../../services/rest-service';
import { Normaltekst } from 'nav-frontend-typografi';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { Checkbox } from 'nav-frontend-skjema';

const MerkForUnntakOmInntekterToMånederFrem: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);
    const [open, setOpen] = useState<boolean>(false);
    const [merking, setMerking] = useState<boolean>(refusjon.unntakOmInntekterToMånederFrem);

    return (
        <div>
            <Knapp onClick={() => setOpen(!open)}>Hent inntekter lenger frem</Knapp>
            <BekreftelseModal
                isOpen={open}
                lukkModal={() => {
                    setOpen(false);
                    setMerking(refusjon.unntakOmInntekterToMånederFrem);
                }}
                bekreft={async () => {
                    await merkForUnntakOmInntekterToMånederFrem(refusjonId, merking);
                    setOpen(false);
                }}
                tittel={'Merk refusjon for henting av inntekter to måneder frem'}
                containerStyle={{ minWidth: 'unset' }}
            >
                <Normaltekst>
                    Hvis unntaksregelen er aktivert vil systemet hente inntekter to måneder etter avsluttet periode, i
                    stedet for én måned som standard. Nytt inntektsoppslag vil gjøres neste gang arbeidsgiver åpner
                    refusjonen.
                </Normaltekst>
                <VerticalSpacer rem={1} />
                <Checkbox
                    label="Hent inntekter for to måneder etter avsluttet periode"
                    checked={merking}
                    onClick={() => setMerking(!merking)}
                />
            </BekreftelseModal>
        </div>
    );
};

export default MerkForUnntakOmInntekterToMånederFrem;
