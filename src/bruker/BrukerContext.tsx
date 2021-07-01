import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { hentInnloggetBruker } from '../services/rest-service';
import { BrukerContextType, InnloggetBruker } from './BrukerContextType';
import LokalLogin from '../LokalLogin/LokalLogin';

const BrukerContext = React.createContext<BrukerContextType | undefined>(undefined);

// Egen hook fordi det sjekkes at den blir brukt riktig, og kan ha undefined som defaultValue
export const useInnloggetBruker = () => {
    const context = useContext(BrukerContext);
    if (context === undefined) {
        throw new Error('Kan kun brukes innenfor BrukerProvider');
    }
    return context;
};

export const BrukerProvider: FunctionComponent = (props) => {
    const [innloggetBruker, setInnloggetBruker] = useState<InnloggetBruker>();

    useEffect(() => {
        hentInnloggetBruker().then(setInnloggetBruker);
    }, []);

    return (
        <>
            {(process.env.NODE_ENV === 'development' || window.location.hostname.includes('labs.nais.io')) && (
                <LokalLogin innloggetBruker={innloggetBruker} />
            )}
            {innloggetBruker && (
                <BrukerContext.Provider
                    value={{
                        innloggetBruker,
                    }}
                >
                    {props.children}
                </BrukerContext.Provider>
            )}
        </>
    );
};
