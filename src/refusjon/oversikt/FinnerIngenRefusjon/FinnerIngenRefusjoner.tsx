import React, { FunctionComponent } from 'react';
import BEMHelper from '../../../utils/bem';
import { Heading } from '@navikt/ds-react';
import { ReactComponent as InfoIkon } from '@/asset/image/info.svg';
import './finnerIngenRefusjoner.less';

const cls = BEMHelper('finnerIngenRefusjoner');

const FinnerIngenRefusjoner: FunctionComponent = () => {
    return (
        <div className={cls.className}>
            <Heading size="small" role="heading" className={cls.element('tittel')}>
                <InfoIkon className={cls.element('ikon')} width={48} />
                Finner ingen refusjoner
            </Heading>
        </div>
    );
};

export default FinnerIngenRefusjoner;
