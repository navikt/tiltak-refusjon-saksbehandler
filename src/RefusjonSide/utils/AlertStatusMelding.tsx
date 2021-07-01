import AlertStripe from 'nav-frontend-alertstriper';
import React, { FunctionComponent } from 'react';

interface Props {
    status: string;
}

const AlertStatusMelding: FunctionComponent<Props> = ({ status }) => {
    const statusMelding = () => {
        switch (status) {
            case 'KLAR_FOR_INNSENDING':
                return <AlertStripe type="suksess">Klar for innsending</AlertStripe>;
            case 'ANNULLERT':
                return <AlertStripe type="suksess">Klar for innsending</AlertStripe>;
            case 'SENDT_KRAV':
                return <AlertStripe type="suksess">Klar for innsending</AlertStripe>;
            case 'UTBETALT':
                return <AlertStripe type="suksess">Klar for innsending</AlertStripe>;
            case 'UTGÅTT':
                return <AlertStripe type="suksess">Klar for innsending</AlertStripe>;
            case 'FOR_TIDLIG':
                return <AlertStripe type="suksess">Klar for innsending</AlertStripe>;
            default:
                return;
        }
    };

    return <>{statusMelding()}</>;
};

export default AlertStatusMelding;
