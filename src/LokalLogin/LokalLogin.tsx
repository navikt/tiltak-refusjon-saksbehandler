import axios from 'axios';
import { Flatknapp, Hovedknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import React, { FunctionComponent, useState } from 'react';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import { Element } from 'nav-frontend-typografi';
import { InnloggetBruker } from '../bruker/BrukerContextType';
import { useCookies } from 'react-cookie';

const AAD_COOKIE_NAME = `aad-token`,
    TOKENX_COOKIE_NAME = `tokenx-token`;

type Props = {
    innloggetBruker: InnloggetBruker | undefined;
};

const LokalLogin: FunctionComponent<Props> = (props) => {
    const [subject, setSubject] = useState('X123456');
    const [, , removeCookie] = useCookies();

    const loggInnKnapp = async (subject: string) => {
        const response = await axios.get(
            `https://tiltak-fakelogin.labs.nais.io/token?aud=aud-aad&iss=aad&sub=${subject}&NAVident=${subject}`
        );
        document.cookie = `${AAD_COOKIE_NAME}=${response.data};expires=Tue, 15 Jan 2044 21:47:38 GMT;domain=${window.location.hostname};path=/`;
        window.location.reload();
    };

    const loggUtClick = () => {
        removeCookie(AAD_COOKIE_NAME);
        removeCookie(TOKENX_COOKIE_NAME);
        window.location.reload();
    };

    if (props.innloggetBruker !== undefined) {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white', padding: '0.5rem' }}>
                <Flatknapp style={{ marginLeft: '0.5rem' }} onClick={loggUtClick}>
                    Logg ut
                </Flatknapp>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <VerticalSpacer rem={2} />
            <Element>Logg inn med NAV-ident</Element>
            <VerticalSpacer rem={1} />
            <div style={{ display: 'flex' }}>
                <Input
                    placeholder="Logg inn som"
                    value={subject}
                    onChange={(event) => setSubject(event.currentTarget.value)}
                    maxLength={7}
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
