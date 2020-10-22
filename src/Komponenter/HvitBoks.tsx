import React, { FunctionComponent, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

const HvitBoks: FunctionComponent<Props> = (props) => {
    return (
        <div
            style={{
                ...props.style,
                borderRadius: '4px',
                padding: '3rem 1rem',
                backgroundColor: 'white',
                width: '40rem',
            }}
            {...props}
        />
    );
};

export default HvitBoks;
