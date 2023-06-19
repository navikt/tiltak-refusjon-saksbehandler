import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdvarselBannerTestversjon from './AdvarselBannerTestversjon/AdvarselBannerTestversjon';
import './App.css';
import { BrukerProvider } from './bruker/BrukerContext';
import ErrorOgSuspenseHandler from './ErrorOgSuspenseHandler';
import ScrollToTop from './komponenter/ScrollToTop';
import OversiktSide from './refusjon/OversiktSide/OversiktSide';
import Refusjon from './refusjon/RefusjonSide/Refusjon';
import InternflateDekoratør from './InternflateDekoratør';
import { FeatureToggleProvider } from './featureToggles/FeatureToggleProvider';
import { FilterProvider } from './refusjon/oversikt/FilterContext';
import Korreksjon from './KorreksjonSide/Korreksjon';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AdvarselBannerTestversjon />
            <InternflateDekoratør />
            <Routes>
                <Route
                    path="*"
                    element={
                        <BrukerProvider>
                            <FeatureToggleProvider>
                                <FilterProvider>
                                    <div style={{ minHeight: '10rem', padding: '0.5rem' }}>
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={
                                                    <ErrorOgSuspenseHandler>
                                                        <OversiktSide />
                                                    </ErrorOgSuspenseHandler>
                                                }
                                            ></Route>
                                            <Route
                                                path="/refusjon/:refusjonId"
                                                element={
                                                    <ErrorOgSuspenseHandler>
                                                        <Refusjon />
                                                    </ErrorOgSuspenseHandler>
                                                }
                                            ></Route>
                                            <Route
                                                path="/korreksjon/:korreksjonId"
                                                element={
                                                    <ErrorOgSuspenseHandler>
                                                        <Korreksjon />
                                                    </ErrorOgSuspenseHandler>
                                                }
                                            ></Route>
                                        </Routes>
                                    </div>
                                </FilterProvider>
                            </FeatureToggleProvider>
                        </BrukerProvider>
                    }
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
