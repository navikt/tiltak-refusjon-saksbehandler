import axios from 'axios';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import { useCookies } from 'react-cookie';
import VerticalSpacer from '../Komponenter/VerticalSpacer';
import { Element } from 'nav-frontend-typografi';

const AAD_COOKIE_NAME = `aad-token`;
const TOKENX_COOKIE_NAME = `tokenx-token`;

const LokalLogin: FunctionComponent = () => {
    const [subject, setSubject] = useState('X123456');

    const [cookies, setCookie, removeCookie] = useCookies();

    const erLoggetInn = cookies[AAD_COOKIE_NAME] !== undefined;

    const loggUtClick = () => {
        removeCookie(AAD_COOKIE_NAME);
        removeCookie(TOKENX_COOKIE_NAME);
        window.location.reload();
    };
    const loggInnKnapp = async (subject: string) => {
        const response = await axios.get(
            `https://tiltak-fakelogin.labs.nais.io/token?aud=aud-aad&iss=aad&sub=${subject}&NAVident=${subject}`
        );
        setCookie(AAD_COOKIE_NAME, response.data);
        window.location.reload();
    };

    return erLoggetInn ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'white', padding: '0.5rem' }}>
            <div />
            <Flatknapp style={{ marginLeft: '0.5rem' }} onClick={loggUtClick}>
                Logg ut
            </Flatknapp>
        </div>
    ) : (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <VerticalSpacer rem={2} />
            <Element>Logg inn med NAV-ident</Element>
            <VerticalSpacer rem={1} />
            <div style={{ display: 'flex' }}>
                <Input
                    label="Logg inn som"
                    placeholder="Logg inn som"
                    value={subject}
                    onChange={(event) => setSubject(event.currentTarget.value)}
                />
                <Hovedknapp style={{ marginLeft: '0.5rem' }} disabled={!subject} onClick={() => loggInnKnapp(subject)}>
                    Logg inn
                </Hovedknapp>
            </div>
            <VerticalSpacer rem={2} />
        </div>
    );
};

export default LokalLogin;
