import React, { FunctionComponent } from 'react';
import BEMHelper from '../../utils/bem';
import './Banner.less';
import { Heading } from '@navikt/ds-react';
import { PageableRefusjon } from '../refusjon';
import { useFilter } from './FilterContext';
import { useHentRefusjoner } from '../../services/rest-service';

const cls = BEMHelper('Banner');

type Props = {
    refusjoner?: PageableRefusjon;
};

const Banner: FunctionComponent<Props> = (props) => {
    const { filter } = useFilter();

    const refusjonerPage = useHentRefusjoner(filter);
    return (
        <div className={cls.className}>
            <Heading size="medium">Refusjonsoversikt ({refusjonerPage ? refusjonerPage?.totalItems : 0})</Heading>
        </div>
    );
};

export default Banner;
