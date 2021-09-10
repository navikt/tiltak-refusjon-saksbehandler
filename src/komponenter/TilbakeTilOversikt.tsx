import { VenstreChevron } from 'nav-frontend-chevron';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import ForlengeDato from '../refusjon/forlengedato/ForlengeDato';

const TilbakeTilOversikt: FunctionComponent = () => {
    return (
        <div style={{ padding: '1rem 0 0.75rem 0.125rem', width: '100%' }}>
            <Link
                to={{ pathname: '/', search: window.location.search }}
                style={{ display: 'flex', alignItems: 'center', color: '#0067c5' }}
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
