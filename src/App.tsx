import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LokalLogin from './LokalLogin/LokalLogin';
import RefusjonOversikt from './RefusjonOversikt/RefusjonOversikt';
import RefusjonSide from './RefusjonSide/RefusjonSide';
import { hentInnloggetBruker } from './rest-service';
import VerticalSpacer from './Komponenter/VerticalSpacer';
import ErrorBoundary from './ErrorBoundary';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';

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
                                <ErrorBoundary
                                    fallback={<AlertStripeFeil>Feil ved lasting av oversikt.</AlertStripeFeil>}
                                    key={1}
                                >
                                    <Suspense fallback={null}>
                                        <RefusjonOversikt />
                                    </Suspense>
                                </ErrorBoundary>
                            </Route>
                            <Route exact path="/refusjon/:id">
                                <ErrorBoundary
                                    fallback={<AlertStripeFeil>Feil ved lasting av refusjon.</AlertStripeFeil>}
                                    key={2}
                                >
                                    <Suspense fallback={null}>
                                        <RefusjonSide />
                                    </Suspense>
                                </ErrorBoundary>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </>
            )}
        </>
    );
}

export default App;
