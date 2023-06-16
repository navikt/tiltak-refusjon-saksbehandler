import React, { FunctionComponent, Suspense, PropsWithChildren } from 'react';

import ErrorBoundary from './ErrorBoundary';

const ErrorOgSuspenseHandler: FunctionComponent<PropsWithChildren> = (props) => {
    const key = window.location.pathname;
    return (
        // @ts-ignore
        <ErrorBoundary key={key}>
            <Suspense fallback={null}>
                <div>{props.children}</div>
            </Suspense>
        </ErrorBoundary>
    );
};

export default ErrorOgSuspenseHandler;
