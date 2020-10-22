import NavFrontendSpinner from 'nav-frontend-spinner';
import React, { FunctionComponent } from 'react';
import { useHentRefusjoner } from '../rest-service';
import RefusjonTabell from './RefusjonTabell';

type Props = {};

const RefusjonOversikt: FunctionComponent<Props> = (props) => {
    const { refusjoner, isLoading, isError } = useHentRefusjoner();

    if (isLoading) {
        return <NavFrontendSpinner />;
    } else if (isError) {
        return <>NOE GIKK FRYKTELIG GALT.</>;
    } else if (refusjoner) {
        return <RefusjonTabell refusjoner={refusjoner} />;
    }
    return <div>OVERSIKT</div>;
};

export default RefusjonOversikt;
