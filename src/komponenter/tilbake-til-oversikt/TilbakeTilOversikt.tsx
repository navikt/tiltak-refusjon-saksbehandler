import { VenstreChevron } from 'nav-frontend-chevron';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import ForlengFrist from '../../refusjon/ForlengFrist/ForlengFrist';
import BEMHelper from '../../utils/bem';
import './tilbaketTilOversikt.less';

const TilbakeTilOversikt: FunctionComponent = () => {
    const cls = BEMHelper('tilbake-til-oversikt');
    return (
        <div className={cls.className}>
            <Link to={{ pathname: '/', search: window.location.search }} className={cls.element('lenke')}>
                <div aria-hidden={true}>
                    <VenstreChevron />
                </div>
                Tilbake til oversikt
            </Link>
            <ForlengFrist />
        </div>
    );
};

export default TilbakeTilOversikt;
