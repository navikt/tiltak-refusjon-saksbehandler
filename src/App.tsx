import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdvarselBannerTestversjon from './AdvarselBannerTestversjon/AdvarselBannerTestversjon';
import './App.css';
import { BrukerProvider } from './bruker/BrukerContext';
import ErrorOgSuspenseHandler from './ErrorOgSuspenseHandler';
import ScrollToTop from './komponenter/ScrollToTop';
import OversiktSide from './refusjon/OversiktSide/OversiktSide';
import Refusjon from './refusjon/RefusjonSide/Refusjon';
import InternflateDekoratør from './InternflateDekoratør';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AdvarselBannerTestversjon />
            <InternflateDekoratør />
            <Switch>
                <BrukerProvider>
                    <div style={{ minHeight: '10rem', padding: '0.5rem' }}>
                        <Route exact path="/">
                            <ErrorOgSuspenseHandler>
                                <OversiktSide />
                            </ErrorOgSuspenseHandler>
                        </Route>
                        <Route path="/refusjon/:refusjonId">
                            <ErrorOgSuspenseHandler>
                                <Refusjon />
                            </ErrorOgSuspenseHandler>
                        </Route>
                    </div>
                </BrukerProvider>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
