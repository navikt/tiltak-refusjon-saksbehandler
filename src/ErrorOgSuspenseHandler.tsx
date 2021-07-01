import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import * as React from 'react';
import { FunctionComponent, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface Props {}

const ErrorOgSuspenseHandler: FunctionComponent<Props> = (props) => {
    const key = window.location.pathname;
    return (
        <ErrorBoundary key={key} fallback={<AlertStripeFeil>Feil ved lasting.</AlertStripeFeil>}>
            <Suspense fallback={null}>{props.children}</Suspense>
        </ErrorBoundary>
    );
};

export default ErrorOgSuspenseHandler;
