import AlertStripe from 'nav-frontend-alertstriper';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import HvitBoks from '../Komponenter/HvitBoks';
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
