import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { Input, InputProps } from 'nav-frontend-skjema';
import React, { FormEvent, FunctionComponent, useState } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';

interface Props {
    utførSøk: (søkeord: string) => void;
    feiletSøk: () => void;
    valider: (verdi: string) => string | undefined;
    tidligereSok?: string;
};

export const SøkeInput: FunctionComponent<Props & { inputProps?: InputProps }> = (props) => {
    const [søkeord, setSøkeord] = useState<string>(props.tidligereSok ?? '');
    const [feil, setFeil] = useState<string>();

    const utførSøk = () => {
        if (props.valider(søkeord) === undefined) {
            return props.utførSøk(søkeord);
        }
        return props.feiletSøk();
    };

    const onBlur = () => {
        setFeil(props.valider(søkeord));
    };

    const onChange = (event: FormEvent<HTMLInputElement>) => {
        setSøkeord(event.currentTarget.value.toUpperCase());
        setFeil(undefined);
    };

    const enterKlikk = (event: any) => {
        if (event.key === 'Enter') {
            const nyttSøkeord = event.currentTarget.value;
            setSøkeord(nyttSøkeord);
            const feil = props.valider(søkeord);
            setFeil(feil);
            if (feil === undefined) {
                return props.utførSøk(nyttSøkeord);
            }
            return props.feiletSøk();
        }
    };

    return (
        <>
            <Input
                {...props.inputProps}
                value={søkeord}
                onChange={onChange}
                onBlur={onBlur}
                onKeyPress={enterKlikk}
                feil={feil}
            />
            <VerticalSpacer rem={0.5} />
            <Søkeknapp onClick={utførSøk} />
        </>
    );
};
