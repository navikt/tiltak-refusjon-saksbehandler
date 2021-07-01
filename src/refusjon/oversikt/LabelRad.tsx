import React from 'react';
import BEMHelper from '../../utils/bem';
import { Element } from 'nav-frontend-typografi';

interface Props {
    className: string;
}

const LabelRad = (props: Props) => {
    const cls = BEMHelper(props.className);
    return (
        <div className={cls.element('label-rad')} aria-label="rad overkrifter for kolonnene i refusonslisten">
            <div className={cls.element('kolonne')} id={cls.element('deltaker')}>
                <Element>Deltaker</Element>
            </div>
            <div className={cls.element('kolonne')} id={cls.element('periode')}>
                <Element>Periode</Element>
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
