import { Søkeknapp } from 'nav-frontend-ikonknapper';
import { Input, InputProps } from 'nav-frontend-skjema';
import React, { FormEvent, FunctionComponent, useState } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';

type Props = {
    utførSøk: (søkeord: string) => void;
    feiletSøk: () => void;
    valider: (verdi: string) => string | undefined;
};

export const SøkeInput: FunctionComponent<Props & { inputProps?: InputProps }> = (props) => {
    const [søkeord, setSøkeord] = useState<string>('');
    const [feil, setFeil] = useState<string>();

    const utførSøk = () => {
        if (props.valider(søkeord) === undefined) {
            props.utførSøk(søkeord);
        } else {
            props.feiletSøk();
        }
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
                props.utførSøk(nyttSøkeord);
            } else {
                props.feiletSøk();
            }
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
