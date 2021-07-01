import { EtikettAdvarsel, EtikettInfo, EtikettSuksess } from 'nav-frontend-etiketter';
import * as React from 'react';
import { FunctionComponent } from 'react';
import { statusTekst } from '../../types/messages';
import { Status } from '../../types/refusjon';

import { formatterDato } from '../../utils/datoUtils';
import { storForbokstav } from '../../utils/stringUtils';

interface Props {
    status: Status;
    tilskuddFom: string;
    tilskuddTom: string;
}

const StatusTekst: FunctionComponent<Props> = (props) => {
    if (props.status === 'KLAR_FOR_INNSENDING') {
        return <EtikettSuksess>Klar for innsending</EtikettSuksess>;
    } else if (props.status === 'FOR_TIDLIG') {
        return <EtikettInfo>Søk fra {formatterDato(props.tilskuddTom)}</EtikettInfo>;
    } else if (props.status === 'UTGÅTT' || props.status === 'ANNULLERT') {
        return <EtikettAdvarsel>{storForbokstav(statusTekst[props.status])}</EtikettAdvarsel>;
    }
    return <EtikettInfo>{storForbokstav(statusTekst[props.status])}</EtikettInfo>;
};

export default StatusTekst;
