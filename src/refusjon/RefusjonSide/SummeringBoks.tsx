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

type Props = {
    refusjonsgrunnlag: Refusjonsgrunnlag;
    enhet: string;
};

const SummeringBoks: FunctionComponent<Props> = (props) => {
    return (
        <Boks>
            <div style={{ paddingRight: '1.5rem' }}>
                <Pengesedler />
            </div>
            <div>
                <Element>Arbeidsgiver vil få utbetalt</Element>
                <VerticalSpacer rem={0.5} />
                <Normaltekst>
                    <b>{formatterPenger(props.refusjonsgrunnlag.beregning?.refusjonsbeløp || 0)}</b> for perioden{' '}
                    {formatterPeriode(
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}{' '}
                    til kontonummer {props.refusjonsgrunnlag.bedriftKontonummer}
                </Normaltekst>
                <Normaltekst>Midlene vil bli kostnadsført på enhet {props.enhet}</Normaltekst>
            </div>
        </Boks>
    );
};

export default SummeringBoks;
