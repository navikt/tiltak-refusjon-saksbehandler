import { ReactComponent as InfoIkon } from '@/asset/image/info.svg';
import { Pagination } from '@navikt/ds-react';
import { Undertittel } from 'nav-frontend-typografi';
import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useHentRefusjoner } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import { useFilter } from './FilterContext';
import LabelRad from './LabelRad';
import OversiktTabell from './OversiktTabell';
import './oversikt.less';

const cls = BEMHelper('oversikt');

const AvrundetHvitBoks = styled.div`
    border-radius: 4px;
    background-color: white;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    > * {
        margin-right: 1rem;
    }
`;

const Info: FunctionComponent<{ tekst: string }> = (props: PropsWithChildren<{ tekst: string }>) => (
    <AvrundetHvitBoks>
        <InfoIkon />
        <Undertittel tag="p">{props.tekst}</Undertittel>
    </AvrundetHvitBoks>
);

const Oversikt: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();

    const refusjonerPage = useHentRefusjoner(filter);

    if (refusjonerPage === undefined) {
        return <Info tekst="Oppgi søkekriterier for å finne refusjoner" />;
    }

    if (refusjonerPage.totalItems === 0) {
        return <Info tekst="Finner ingen refusjoner" />;
    }

    return (
        <nav className={cls.className} aria-label="Main">
            <div role="list">
                <LabelRad className={cls.className} />
                <OversiktTabell refusjoner={refusjonerPage.refusjoner} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    page={refusjonerPage.currentPage + 1}
                    onPageChange={(x) => oppdaterFilter({ page: x - 1 })}
                    count={refusjonerPage.totalPages}
                    boundaryCount={1}
                    siblingCount={1}
                />
            </div>
        </nav>
    );
};

export default Oversikt;
