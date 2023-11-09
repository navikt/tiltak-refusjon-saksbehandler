import React, { FunctionComponent } from 'react';
import Info from './Info';
import { Pagination } from '@navikt/ds-react';
import BEMHelper from '../../utils/bem';
import { useFilter } from './FilterContext';
import LabelRad from './LabelRad';
import OversiktTabell from './OversiktTabell';
import { PageableRefusjon } from '../refusjon';
const cls = BEMHelper('oversikt');

type Props = {
    refusjonerPage?: PageableRefusjon;
};

const Oversikt: FunctionComponent<Props> = (props) => {
    const { oppdaterFilter } = useFilter();

    if (props.refusjonerPage === undefined) {
        return <Info tekst="Oppgi søkekriterier for å finne refusjoner" />;
    }

    if (props.refusjonerPage.totalItems === 0) {
        return <Info tekst="Finner ingen refusjoner" />;
    }

    return (
        <nav className={cls.className} aria-label="Main">
            <div role="list">
                <LabelRad />
                <OversiktTabell refusjoner={props.refusjonerPage.refusjoner} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    page={props.refusjonerPage.currentPage + 1}
                    onPageChange={(x) => oppdaterFilter({ page: x - 1 })}
                    count={props.refusjonerPage.totalPages}
                    boundaryCount={1}
                    siblingCount={1}
                />
            </div>
        </nav>
    );
};

export default Oversikt;
