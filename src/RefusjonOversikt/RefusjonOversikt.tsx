import React, { FunctionComponent, useState } from 'react';
import { useHentRefusjoner } from '../rest-service';
import BEMHelper from '../utils/bem';
import Filtrering from './Filtrering/Filtrering';
import RefusjonTabell from './RefusjonTabell';
import useAvtaleOversiktLayout from './useAvtaleOversiktLayout';
import './RefusjonOversikt.less';
import { Søkekriterier } from './Filtrering/søkekriterier';

type Props = {};

const RefusjonOversikt: FunctionComponent<Props> = (props) => {
    const refusjoner = useHentRefusjoner();
    const cls = BEMHelper('refusjonoversikt');
    const layout = useAvtaleOversiktLayout();

    const [søkekriterier, setSøkekriterier] = useState<Søkekriterier>({});

    const endreSøk = (endredeSøkekriterier: Søkekriterier) => {
        setSøkekriterier({ ...søkekriterier, ...endredeSøkekriterier });
    };

    return (
        <main className={cls.className} style={{ padding: layout.mellomromPåHverSide }}>
            <div
                style={layout.stylingAvFilterOgTabell}
                className={cls.element('filter-og-tabell')}
                aria-labelledby={cls.element('filter-og-tabell')}
                role="complementary"
                id={cls.element('filter-og-tabell')}
            >
                <aside style={layout.stylingAvFilter}>
                    <Filtrering endreSøk={endreSøk} navEnheter={['406', '407']} />
                </aside>
                <section style={layout.stylingAvTabell}>
                    <RefusjonTabell refusjoner={refusjoner} />
                </section>
            </div>
        </main>
    );
};

export default RefusjonOversikt;
