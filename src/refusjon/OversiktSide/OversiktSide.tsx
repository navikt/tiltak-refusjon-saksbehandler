import React, { FunctionComponent, Suspense } from 'react';
import OversiktSkeleton from '../../komponenter/OversiktSkeleton/OversiktSkeleton';
import BEMHelper from '../../utils/bem';
import Filtermeny from '../oversikt/Filtermeny';
import Oversikt from '../oversikt/Oversikt';
import './OversiktSide.less';
import Banner from '../oversikt/Banner';
import { useFilter } from '../oversikt/FilterContext';
import { useHentRefusjoner } from '../../services/rest-service';

const cls = BEMHelper('OversiktSide');

const OversiktSide: FunctionComponent = () => {
    const { filter } = useFilter();

    const refusjonerPage = useHentRefusjoner(filter);

    return (
        <div className={cls.className}>
            <div className={cls.element('banner')}>
                <Banner refusjoner={refusjonerPage} />
            </div>
            <div className={cls.element('oversikt')}>
                <div className={cls.element('wrapper')}>
                    <div className={cls.element('meny')}>
                        <Filtermeny />
                    </div>
                    <div className={cls.element('container')}>
                        <Suspense fallback={<OversiktSkeleton />}>
                            <Oversikt refusjonerPage={refusjonerPage} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OversiktSide;
