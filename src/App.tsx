import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LokalLogin from './LokalLogin/LokalLogin';
import RefusjonOversikt from './RefusjonOversikt/RefusjonOversikt';
import RefusjonSide from './RefusjonSide/RefusjonSide';
import { hentInnloggetBruker } from './rest-service';
import VerticalSpacer from './Komponenter/VerticalSpacer';
import ErrorOgSuspenseHandler from './ErrorOgSuspenseHandler';

export type InnloggetSaksbehandler = {
    identifikator: string;
};

function App() {
    const [innloggetIdent, setInnloggetIdent] = useState<InnloggetSaksbehandler>();

    useEffect(() => {
        hentInnloggetBruker()
            .then((ident) => setInnloggetIdent(ident))
            .catch(() => setInnloggetIdent(undefined));
    }, []);
    return (
        <>
            {process.env.NODE_ENV === 'development' && <LokalLogin ident={innloggetIdent} />}
            {innloggetIdent !== undefined && (
                <>
                    <VerticalSpacer rem={1} />
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/">
                                <ErrorOgSuspenseHandler>
                                    <RefusjonOversikt />
                                </ErrorOgSuspenseHandler>
                            </Route>
                            <Route exact path="/refusjon/:id">
                                <ErrorOgSuspenseHandler>
                                    <RefusjonSide />
                                </ErrorOgSuspenseHandler>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </>
            )}
        </>
    );
}

export default App;
