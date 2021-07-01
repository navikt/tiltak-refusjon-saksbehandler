import React, { FunctionComponent } from 'react';
import BEMHelper from '../../../utils/bem';
import { Undertittel } from 'nav-frontend-typografi';
import { ReactComponent as InfoIkon } from '@/asset/image/info.svg';
import './finnerIngenRefusjoner.less';

const cls = BEMHelper('finnerIngenRefusjoner');

const FinnerIngenRefusjoner: FunctionComponent = () => {
    return (
        <div className={cls.className}>
            <Undertittel role="heading" className={cls.element('tittel')}>
                <InfoIkon className={cls.element('ikon')} width={48} />
                Finner ingen refusjoner
            </Undertittel>
        </div>
    );
};

export default FinnerIngenRefusjoner;
