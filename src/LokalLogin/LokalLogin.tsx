import axios from 'axios';
import { Flatknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import { useCookies } from 'react-cookie';

const COOKIE_NAME = `aad-token`;

const LokalLogin: FunctionComponent = () => {
    const [subject, setSubject] = useState('X123456');

    const [cookies, setCookie, removeCookie] = useCookies();

    const erLoggetInn = cookies[COOKIE_NAME] !== undefined;

    const loggUtClick = () => {
        removeCookie(COOKIE_NAME);
        window.location.reload();
    };
    const loggInnKnapp = async (subject: string) => {
        const response = await axios.get(
            `https://tiltak-fakelogin.labs.nais.io/token?aud=aud-localhost&iss=aad&sub=${subject}&NAVident=${subject}`
        );
        setCookie(COOKIE_NAME, response.data);
        window.location.reload();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', padding: '0.5rem' }}>
            <div />
            <div>
                {erLoggetInn ? (
                    <div>
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
