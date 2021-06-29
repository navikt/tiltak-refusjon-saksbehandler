import { Radio } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import { OptionProps } from '../../Komponenter/form/SelectInput';
import { TiltaksType } from '../../types/refusjon';
import { Filter } from './Filter';

export type FiltreringMedBeslutterProps = {
    //endreSøk: (søkekriterier: Partial<Refusjon>) => void;
    erBeslutter: boolean;
};
const TiltakstypeFilter: FunctionComponent<FiltreringMedBeslutterProps> = (props) => {
    const [valgtTiltakstype, setValgtTiltakstype] = useState<TiltaksType | ''>('');

    const alleTiltakstyperBeslutter: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
        { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
        { value: 'SOMMERJOBB', label: 'Sommerjobb' },
    ];

    const alleTiltakstyper: OptionProps[] = [
        { value: '', label: 'Alle' },
        { value: 'ARBEIDSTRENING', label: 'Arbeidstrening' },
        { value: 'MIDLERTIDIG_LONNSTILSKUDD', label: 'Midlertidig lønnstilskudd' },
        { value: 'VARIG_LONNSTILSKUDD', label: 'Varig lønnstilskudd' },
        { value: 'SOMMERJOBB', label: 'Sommerjobb' },
    ];

    const tiltakstyper = props.erBeslutter ? alleTiltakstyperBeslutter : alleTiltakstyper;

    return (
        <Filter tittel="Tiltakstype">
            {tiltakstyper.map((tiltakstype) => (
                <Radio
                    key={tiltakstype.label}
                    label={tiltakstype.label}
                    name={'tiltakstype'}
                    value={tiltakstype.value}
                    checked={tiltakstype.value === valgtTiltakstype}
                    onChange={(event) => {
                        const nyTiltakstype = event.currentTarget.value as TiltaksType;
                        setValgtTiltakstype(nyTiltakstype);
                        //props.endreSøk({ tiltakstype: nyTiltakstype });
                    }}
                    role="radio"
                />
            ))}
        </Filter>
    );
};

export default TiltakstypeFilter;
