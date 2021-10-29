import React, { FunctionComponent, useContext, useState } from 'react';
import { Status } from '../status';
import { Tiltak } from '../tiltak';
import { useOversiktCookie } from './OversiktCookie/OversiktCookie';

export interface Filter {
    deltakerFnr?: string;
    enhet?: string;
    avtaleNr?: string;
    veilederNavIdent?: string;
    bedriftNr?: string;
    status?: Status;
    tiltakstype?: Tiltak;
}

type FilterContextType = { filter: Filter; oppdaterFilter: (nyttFilter: Partial<Filter>) => void };

const FilterContext = React.createContext<FilterContextType | undefined>(undefined);

// Egen hook fordi det sjekkes at den blir brukt riktig, og kan ha undefined som defaultValue
export const useFilter = () => {
    const context = useContext(FilterContext);
    const filterCookie = useOversiktCookie();
    console.log('context filter', context);

    if (context === undefined) {
        throw new Error('Kan kun brukes innenfor FilterProvider');
    }
    console.log(filterCookie.oversiktTreffCookie);
    if (Object.keys(context?.filter).length === 0 && Object.keys(filterCookie.oversiktTreffCookie).length !== 0) {
        //setFilter hvis ikke cookie er tom
        context.oppdaterFilter({ ...filterCookie.oversiktTreffCookie });
    }
    return context;
};

export const FilterProvider: FunctionComponent = (props) => {
    const [filter, setFilter] = useState<Filter>({});
    const filterCookie = useOversiktCookie();
    const oppdaterFilter = (nyttFilter: Partial<Filter>) => {
        setFilter({ ...filter, ...nyttFilter });
        filterCookie.oppdatereSokeVerdiCookie({ ...{ ...filter, ...nyttFilter } });
    };

    return (
        <FilterContext.Provider
            value={{
                filter,
                oppdaterFilter,
            }}
        >
            {props.children}
        </FilterContext.Provider>
    );
};
