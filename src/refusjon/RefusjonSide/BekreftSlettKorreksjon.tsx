import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { slettKorreksjonsutkast, useHentKorreksjon } from '../../services/rest-service';

const BekreftSlettKorreksjon: FunctionComponent = () => {
    const { korreksjonId } = useParams();
    const korreksjon = useHentKorreksjon(korreksjonId);

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
                    await slettKorreksjonsutkast(korreksjonId);
                    history.push('/refusjon/' + korreksjon.korrigererRefusjonId);
                }}
                tittel={'Slett korreksjonsutkast'}
            >
                <Normaltekst>Vil du slette utkastet?</Normaltekst>
            </BekreftelseModal>
        </>
    );
};

export default BekreftSlettKorreksjon;
