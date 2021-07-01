import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';

interface Props {
    label: string;
    tekst: string;
}

const TekstBlock: FunctionComponent<Props> = ({ label, tekst }) => {
    return (
        <>
            <Element>{label}</Element>
            <Normaltekst>{tekst}</Normaltekst>
        </>
    );
};
export default TekstBlock;
