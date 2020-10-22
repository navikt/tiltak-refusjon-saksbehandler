import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';
import * as React from 'react';
import { CSSProperties, FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

type Props = {
    type?: KnappBaseProps['type'];
    path: string;
    style?: CSSProperties;
};

const LenkeKnapp: FunctionComponent<Props> = (props) => {
    const history = useHistory();

    return (
        <Knapp
            style={props.style}
            type={props.type || 'hoved'}
            onClick={() => history.push({ pathname: props.path, search: window.location.search })}
        >
            {props.children}
        </Knapp>
    );
};

export default LenkeKnapp;
