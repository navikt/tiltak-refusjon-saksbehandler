import React, { createContext, FunctionComponent, useState } from 'react';
import VarselKomponent from './Komponenter/varsel/VarselKomponent';

export const FeilVarselContext = createContext<(feilmelding?: string) => void>(() => {});

export const FeilVarselProvider: FunctionComponent = (props) => {
    const [feilVarsel, setFeilVarsel] = useState<string | undefined>(undefined);

    return (
        <>
            {feilVarsel && (
                <VarselKomponent kanLukkes={true} type="advarsel" onLukkVarsel={() => setFeilVarsel(undefined)}>
                    {feilVarsel}
                </VarselKomponent>
            )}
            <FeilVarselContext.Provider value={setFeilVarsel}>{props.children}</FeilVarselContext.Provider>
        </>
    );
};
