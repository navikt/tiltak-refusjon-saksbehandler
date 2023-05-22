import KnappBase, { Knapp, KnappBaseProps } from 'nav-frontend-knapper';
import React, { FunctionComponent, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Alert } from '@navikt/ds-react';
import { Nettressurs, Status } from '../nettressurs';
import { handterFeil } from '../utils/apiFeilUtils';
import VerticalSpacer from './VerticalSpacer';

type Props = {
    lagreFunksjon: () => Promise<any>;
    avbryt: () => void;
} & HTMLAttributes<HTMLDivElement>;

const LagreOgAvbrytKnapp: FunctionComponent<Props & KnappBaseProps> = (props) => {
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
            const feilmelding = 'feilmelding' in (error as any) ? (error as any).feilmelding : 'Uventet feil';
            setOppslag({ status: Status.Feil, error: feilmelding });
            handterFeil(error as any, setFeilmelding);
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
                <KnappBase
                    spinner={oppslag.status === Status.LasterInn}
                    disabled={oppslag.status === Status.LasterInn}
                    onClick={onClick}
                    type="hoved"
                    {...knappBaseProps}
                />
                <Knapp onClick={props.avbryt}>Avbryt</Knapp>
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
