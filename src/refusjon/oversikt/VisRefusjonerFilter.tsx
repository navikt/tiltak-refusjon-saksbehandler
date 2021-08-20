import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Radio } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useFilter } from './FilterContext';
import { SøkeInput } from './SøkeInput';

type Søketype = 'deltaker' | 'bedrift' | 'veileder' | 'enhet' | 'avtaleNr';

const tomtSøk = {
    deltakerFnr: undefined,
    bedriftNr: undefined,
    veilederNavIdent: undefined,
    enhet: undefined,
    avtalenr: undefined,
};

const VisRefusjonerFilter: FunctionComponent = () => {
    const { oppdaterFilter } = useFilter();
    const [aktivSøketype, setAktivSøketype] = useState<Søketype>();
    const [panelÅpen, setPanelÅpen] = useState(true);
    const [inputKey, setInputKey] = useState(0); // Brukes for å unmounte søkeinput ved endring av søkevalg, slik at søkeord tømmes

    const søkevalg: { value: Søketype; label: string; input: React.ReactNode }[] = [
        {
            value: 'veileder',
            label: 'På en veileder',
            input: (
                <SøkeInput
                    key={inputKey}
                    utførSøk={(søkeord) => {
                        oppdaterFilter({ ...tomtSøk, veilederNavIdent: søkeord });
                    }}
                    feiletSøk={() => oppdaterFilter(tomtSøk)}
                    valider={(verdi: string) =>
                        verdi.search(/^[A-Z]\d{6}$/) === -1 ? 'Ikke gyldig NAV-ident' : undefined
                    }
                    inputProps={{ placeholder: 'NAV-ident', maxLength: 7 }}
                />
            ),
        },
        {
            value: 'deltaker',
            label: 'På en deltaker',
            input: (
                <SøkeInput
                    key={inputKey}
                    utførSøk={(søkeord) => {
                        oppdaterFilter({ ...tomtSøk, deltakerFnr: søkeord });
                    }}
                    feiletSøk={() => oppdaterFilter(tomtSøk)}
                    valider={(verdi: string) =>
                        verdi.search(/^\d{11}$/) === -1 ? 'Ikke gyldig fødselsnummer' : undefined
                    }
                    inputProps={{ placeholder: 'Fødselsnummer', maxLength: 11 }}
                />
            ),
        },
        {
            value: 'bedrift',
            label: 'På en virksomhet',
            input: (
                <SøkeInput
                    key={inputKey}
                    utførSøk={(søkeord) => {
                        oppdaterFilter({ ...tomtSøk, bedriftNr: søkeord });
                    }}
                    feiletSøk={() => oppdaterFilter(tomtSøk)}
                    valider={(verdi: string) =>
                        verdi.search(/^\d{9}$/) === -1 ? 'Ikke gyldig bedriftnummer' : undefined
                    }
                    inputProps={{ placeholder: 'Bedriftnummmer', maxLength: 9 }}
                />
            ),
        },
        {
            value: 'enhet',
            label: 'På en enhet',
            input: (
                <SøkeInput
                    key={inputKey}
                    utførSøk={(søkeord) => {
                        oppdaterFilter({ ...tomtSøk, enhet: søkeord });
                    }}
                    feiletSøk={() => oppdaterFilter(tomtSøk)}
                    valider={(verdi: string) =>
                        verdi.search(/^\d{4}$/) === -1 ? 'Ikke gyldig enhetsnummer' : undefined
                    }
                    inputProps={{ placeholder: 'Enhet (4 siffer)', maxLength: 4 }}
                />
            ),
        },
        {
            value: 'avtaleNr',
            label: 'På et avtalenummer',
            input: (
                <SøkeInput
                    key={inputKey}
                    utførSøk={(søkeord) => {
                        oppdaterFilter({ ...tomtSøk, avtaleNr: søkeord });
                    }}
                    feiletSøk={() => oppdaterFilter(tomtSøk)}
                    valider={(verdi: string) =>
                        verdi.search('^[0-9]*$') === -1 ? 'Ikke gyldig avtalenummer' : undefined
                    }
                    inputProps={{ placeholder: 'Avtalenummer', maxLength: 5 }}
                />
            ),
        },
    ];

    return (
        <EkspanderbartpanelBase
            tittel="Vis refusjoner"
            role="radiogroup"
            apen={panelÅpen}
            onClick={() => {
                setPanelÅpen(!panelÅpen);
            }}
            style={{ minWidth: '14.375rem' }}
        >
            {søkevalg.map((it) => (
                <>
                    <Radio
                        label={it.label}
                        name="aktivSøketype"
                        value={it.value}
                        checked={aktivSøketype === it.value}
                        onChange={() => {
                            setAktivSøketype(it.value);
                            setInputKey(inputKey + 1); // Brukes for å unmounte søkeinput, slik at søkeord tømmes
                            oppdaterFilter(tomtSøk);
                        }}
                        role="radio"
                    />
                    <VerticalSpacer rem={1} />
                </>
            ))}
            <VerticalSpacer rem={1} />
            {søkevalg.find((it) => it.value === aktivSøketype)?.input}
        </EkspanderbartpanelBase>
    );
};

export default VisRefusjonerFilter;
