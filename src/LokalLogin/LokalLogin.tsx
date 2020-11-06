import { ReactComponent as NavIkon } from '@/ikoner/navikon.svg';
import axios from 'axios';
import { Flatknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import { InnloggetSaksbehandler } from '../App';

type Props = {
    ident: InnloggetSaksbehandler | undefined;
};

const COOKIE_NAME = `aad-token`;

const LokalLogin: FunctionComponent<Props> = (props) => {
    const [subject, setSubject] = useState('X123456');

    const loggUtClick = () => {
        document.cookie = COOKIE_NAME + '=;expires=Tue, 15 Jan 2000 21:47:38 GMT;domain=localhost;path=/';
        window.location.reload();
    };
    const loggInnKnapp = async (subject: string) => {
        const response = await axios.get(
            `https://tiltak-fakelogin.labs.nais.io/token?aud=aud-localhost&iss=aad&sub=${subject}&NAVident=${subject}`
        );
        document.cookie =
            COOKIE_NAME + '=' + response.data + ';expires=Tue, 15 Jan 2044 21:47:38 GMT;domain=localhost;path=/';
        window.location.reload();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', padding: '0.5rem' }}>
            <div>
                <NavIkon
                    onClick={() => {
                        window.location.href = '/';
                    }}
                />
            </div>
            <div>
                {props.ident ? (
                    <div>
                        <span>{props.ident.identifikator}</span>
                        <Flatknapp style={{ marginLeft: '0.5rem' }} onClick={loggUtClick}>
                            Logg ut
                        </Flatknapp>
                    </div>
                ) : (
                    <div style={{ display: 'flex' }}>
                        <Input
                            placeholder="Logg inn som"
                            value={subject}
                            onChange={(event) => setSubject(event.currentTarget.value)}
                        />
                        <Flatknapp
                            style={{ marginLeft: '0.5rem' }}
                            disabled={!subject}
                            onClick={() => loggInnKnapp(subject)}
                        >
                            Logg inn
                        </Flatknapp>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LokalLogin;
