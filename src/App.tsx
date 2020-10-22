import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LokalLogin from './LokalLogin/LokalLogin';
import RefusjonOversikt from './RefusjonOversikt/RefusjonOversikt';
import RefusjonSide from './RefusjonSide/RefusjonSide';
import { hentInnloggetBruker } from './rest-service';
import VerticalSpacer from './Komponenter/VerticalSpacer';

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
            <VerticalSpacer rem={1} />
            {innloggetIdent ? (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <RefusjonOversikt />
                        </Route>
                        <Route exact path="/refusjon/:id">
                            <RefusjonSide />
                        </Route>
                    </Switch>
                </BrowserRouter>
            ) : (
                <div>Er ikke logget inn</div>
            )}
        </>
    );
}

export default App;
