import { Radio } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import { Status } from '../../types/refusjon';
import { statusTekst } from '../../types/messages';
import { Filter } from './Filter';
import { FiltreringProps } from './Filtrering';

type SokeType = Status | '';

const StatusFilter: FunctionComponent<FiltreringProps> = (props) => {
    const [valgtStatus, setValgtStatus] = useState<SokeType>('');

    const alleStatuser: SokeType[] = [
        '',
        'KLAR_FOR_INNSENDING',
        'ANNULLERT',
        'SENDT_KRAV',
        'UTBETALT',
        'UTGÅTT',
        'FOR_TIDLIG',
    ];
    return (
        <Filter tittel="Status">
            {alleStatuser.map((s) => (
                <Radio
                    key={s}
                    label={s === '' ? 'Alle Statuser' : statusTekst[s]}
                    name={'status'}
                    value={s}
                    checked={s === valgtStatus}
                    onChange={(event) => {
                        const nyStatus = event.currentTarget.value as SokeType;
                        setValgtStatus(nyStatus);
                        props.endreSøk({ status: nyStatus || undefined });
                    }}
                    role="radio"
                />
            ))}
        </Filter>
    );
};

export default StatusFilter;
