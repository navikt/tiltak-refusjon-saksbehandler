import React, { FunctionComponent } from 'react';
import { useHentRefusjoner } from '../rest-service';
import RefusjonTabell from './RefusjonTabell';

type Props = {};

const RefusjonOversikt: FunctionComponent<Props> = (props) => {
    const refusjoner = useHentRefusjoner();
    return <RefusjonTabell refusjoner={refusjoner} />;
};

export default RefusjonOversikt;
