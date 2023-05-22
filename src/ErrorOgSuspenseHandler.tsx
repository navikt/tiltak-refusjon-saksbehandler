import React, { FunctionComponent, Suspense } from 'react';
import { Alert } from '@navikt/ds-react';
import ErrorBoundary from './ErrorBoundary';

interface Props {}

const ErrorOgSuspenseHandler: FunctionComponent<Props> = (props) => {
    const key = window.location.pathname;
    return (
        // @ts-ignore
        <ErrorBoundary
            key={key}
            fallback={
                <Alert variant="error" size="small">
                    Feil ved lasting.
                </Alert>
            }
        >
            <Suspense fallback={null}>{props.children}</Suspense>
        </ErrorBoundary>
    );
};

export default ErrorOgSuspenseHandler;
