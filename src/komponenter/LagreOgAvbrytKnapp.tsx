import React, { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Alert, Button, ButtonProps } from '@navikt/ds-react';
import { Nettressurs, Status } from '../nettressurs';
import VerticalSpacer from './VerticalSpacer';
import { ApiError, FeilkodeError } from '../types/errors';

type Props = {
    lagreFunksjon: () => Promise<any>;
    avbryt: () => void;
} & HTMLAttributes<HTMLDivElement>;

const LagreOgAvbrytKnapp: FunctionComponent<Props & ButtonProps> = (props) => {
    const [oppslag, setOppslag] = useState<Nettressurs<any>>({ status: Status.IkkeLastet });
    const [feilmelding, setFeilmelding] = useState('');

    // Fungerer i praksis som "omit avbryt og lagrefunksjon"
    const { avbryt, lagreFunksjon, ...knappBaseProps } = props;

    const feilRef = useRef<HTMLDivElement>(null);

    const onClick = async () => {
        try {
            setOppslag({ status: Status.LasterInn });
            await props.lagreFunksjon();
            setOppslag({ status: Status.Sendt });
        } catch (error) {
            let feilmelding = '';
            if (error instanceof FeilkodeError || error instanceof ApiError) {
                feilmelding = error.message;
            } else {
                feilmelding =
                    !!error && typeof error === 'object' && 'feilmelding' in error
                        ? (error.feilmelding as string)
                        : 'Uventet feil';
            }
            setOppslag({ status: Status.Feil, error: feilmelding });
            setFeilmelding(feilmelding);
        }
    };

    useEffect(() => {
        if (oppslag.status === Status.Feil) {
            feilRef.current?.focus();
        }
    }, [oppslag.status]);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                    style={{ padding: '0.5rem 2.5rem' }}
                    loading={oppslag.status === Status.LasterInn}
                    disabled={oppslag.status === Status.LasterInn}
                    onClick={onClick}
                    {...knappBaseProps}
                ></Button>
                <Button style={{ padding: '0.5rem 3rem' }} variant="secondary" onClick={props.avbryt}>
                    Avbryt
                </Button>
            </div>
            {oppslag.status === Status.Feil && (
                <>
                    <VerticalSpacer rem={0.5} />
                    <Alert variant="warning" size="small">
                        <div ref={feilRef} aria-live="polite">
                            {feilmelding}
                        </div>
                    </Alert>
                </>
            )}
        </div>
    );
};

export default LagreOgAvbrytKnapp;
