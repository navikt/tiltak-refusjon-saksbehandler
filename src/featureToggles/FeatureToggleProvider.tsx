import React, { createContext, useContext, useEffect, useState } from 'react';
import { Feature } from './features';
import { hentFeatureToggles } from '../services/rest-service';

export const alleFeatures = Object.values(Feature);

export interface FeatureToggles {
    [toggles: string]: boolean;
}

export const FeatureToggleContext = createContext<FeatureToggles>({});

export const FeatureToggleProvider = (props: any) => {
    const [featureToggles, setFeatureToggles] = useState<FeatureToggles>({});

    useEffect(() => {
        hentFeatureToggles(alleFeatures).then(setFeatureToggles);
    }, []);

    return <FeatureToggleContext.Provider value={featureToggles}>{props.children}</FeatureToggleContext.Provider>;
};

export const useFeatureToggles = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    if (!featureToggleContext) {
        throw Error('Kan kun brukes innenfor FeatureToggleProvider');
    }
    return featureToggleContext;
};
