import { ReactComponent as Pengesedler } from '@/asset/image/pengesedler.svg';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjonsgrunnlag } from '../refusjon';

const Boks = styled.div`
    display: flex;
    flex-direction: row;
    border: 3px solid #cce1f3;
    border-radius: 4px;
    padding: 1.75rem;
`;

const SummeringBoks: FunctionComponent<{ refusjonsgrunnlag: Refusjonsgrunnlag }> = ({ refusjonsgrunnlag }) => {
    return (
        <Boks>
            <div style={{ paddingRight: '1.5rem' }}>
                <Pengesedler />
            </div>
            <div>
                <Element>Dere får utbetalt</Element>
                <VerticalSpacer rem={0.5} />
                <Normaltekst>
                    <b>{formatterPenger(refusjonsgrunnlag.beregning?.refusjonsbeløp || 0)}</b> for perioden{' '}
                    {formatterPeriode(
                        refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}{' '}
                    til kontonummer {refusjonsgrunnlag.bedriftKontonummer}
                </Normaltekst>
            </div>
        </Boks>
    );
};

export default SummeringBoks;
