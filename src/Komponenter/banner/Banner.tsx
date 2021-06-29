import { Innholdstittel } from 'nav-frontend-typografi';
import React from 'react';
import './Banner.less';

interface Props {
    tekst: string;
}

const Banner: React.FunctionComponent<Props> = ({ tekst }) => {
    return (
        <div className="banner">
            <Innholdstittel role="heading" aria-level={1}>
                {tekst}
            </Innholdstittel>
        </div>
    );
};

export default Banner;
