import { Element } from 'nav-frontend-typografi';
import React from 'react';
import BEMHelper from '../../utils/bem';
import './LabelRad.less';

const LabelRad = () => {
    const cls = BEMHelper('label-rad');
    return (
        <div className={cls.className} aria-label="rad overkrifter for kolonnene i refusonslisten">
            <div className={cls.element('kolonne')} id={cls.element('veileder')}>
                <Element>Veileder</Element>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('deltaker')}>
                <Element>Deltaker</Element>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('arbeidsgiver')}>
                <Element>Arbeidsgiver</Element>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('Enhet')}>
                <Element>Enhet</Element>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('status')}>
                <Element>Status</Element>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('frist-godkjenning')}>
                <Element>Frist for godkjenning</Element>
            </div>
        </div>
    );
};

export default LabelRad;
