import React, { FunctionComponent } from 'react';
import { useHentRefusjon } from '../rest-service';
import { useParams } from 'react-router-dom';
import './RefusjonSide.less';
import bem from '../utils/bem';

const cls = bem('refusjon-side');

const RefusjonSide: FunctionComponent = () => {
    const { id } = useParams();
    const refusjon = useHentRefusjon(id);

    return <div className={cls.className}></div>;
};

export default RefusjonSide;
