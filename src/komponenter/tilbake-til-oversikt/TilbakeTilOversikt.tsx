import { VenstreChevron } from 'nav-frontend-chevron';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import ForlengeDato from '../../refusjon/forlengedato/ForlengeDato';
import BEMHelper from '../../utils/bem';
import "./tilbaketTilOversikt.less";

const TilbakeTilOversikt: FunctionComponent = () => {
    const cls = BEMHelper('tilbake-til-oversikt')
    return (
        <div className={cls.className}>
            <Link
                to={{ pathname: '/', search: window.location.search }}
                className={cls.element('lenke')}
            >
                <div aria-hidden={true}>
                    <VenstreChevron />
                </div>
                Tilbake til oversikt
            </Link>
            <ForlengeDato />
        </div>
    );
};

export default TilbakeTilOversikt;
