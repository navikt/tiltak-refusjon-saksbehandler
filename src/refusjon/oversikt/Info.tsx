import styled from 'styled-components';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { ReactComponent as InfoIkon } from '@/asset/image/info.svg';
import { Undertittel } from 'nav-frontend-typografi';

const AvrundetHvitBoks = styled.div`
    border-radius: 4px;
    background-color: white;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    > * {
        margin-right: 1rem;
    }
`;

const Info: FunctionComponent<{ tekst: string }> = (props: PropsWithChildren<{ tekst: string }>) => (
    <AvrundetHvitBoks>
        <InfoIkon />
        <Undertittel tag="p">{props.tekst}</Undertittel>
    </AvrundetHvitBoks>
);

export default Info;
