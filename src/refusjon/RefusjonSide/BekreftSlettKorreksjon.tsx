import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { slettKorreksjon } from '../../services/rest-service';

interface Props {}

const BekreftSlettKorreksjon: FunctionComponent<Props> = (props) => {
    const { refusjonId } = useParams();
    const history = useHistory();

    const [åpen, setÅpen] = useState(false);
    return (
        <>
            <Knapp
                onClick={() => {
                    setÅpen(true);
                }}
            >
                Slett korreksjonsutkast
            </Knapp>
            <BekreftelseModal
                isOpen={åpen}
                lukkModal={() => setÅpen(false)}
                bekreft={async () => {
                    const korreksjon = await slettKorreksjon(refusjonId);
                    history.push('/refusjon/' + korreksjon.korreksjonAvId);
                }}
                tittel={'Slett korreksjonsutkast'}
            >
                <Normaltekst>Vil du slette utkastet?</Normaltekst>
            </BekreftelseModal>
        </>
    );
};

export default BekreftSlettKorreksjon;
