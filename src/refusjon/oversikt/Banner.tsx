import React, { FunctionComponent } from 'react';
import BEMHelper from '../../utils/bem';
import './Banner.less';
import { Heading } from '@navikt/ds-react';
import { PageableRefusjon } from '../refusjon';

const cls = BEMHelper('Banner');

type Props = {
    refusjoner?: PageableRefusjon;
};

const Banner: FunctionComponent<Props> = (props) => {
    console.log(props.refusjoner);

    return (
        <div className={cls.className}>
            <Heading size="medium">Refusjonsoversikt ({props.refusjoner?.totalItems})</Heading>
        </div>
    );
};

export default Banner;
