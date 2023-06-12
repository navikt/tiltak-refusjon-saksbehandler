import { ReactComponent as Pengesedler } from '@/asset/image/pengesedler.svg';
import { Element } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjonsgrunnlag } from '../refusjon';
import { BodyShort } from '@navikt/ds-react';

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
                {props.refusjonsgrunnlag.beregning?.refusjonsbeløp != null &&
                    props.refusjonsgrunnlag.beregning?.refusjonsbeløp < 0 && (
                        <BodyShort size="small">
                            Siden fratrekk for ferie er større enn bruttolønn i perioden vil det negative
                            refusjonsbeløpet overføres til neste periode. Dere må fortsatt trykke fullfør under.
                        </BodyShort>
                    )}
                <VerticalSpacer rem={0.5} />
                <BodyShort size="small">
                    <b>{formatterPenger(props.refusjonsgrunnlag.beregning?.refusjonsbeløp || 0)}</b> for perioden{' '}
                    {formatterPeriode(
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}{' '}
                    til kontonummer {props.refusjonsgrunnlag.bedriftKontonummer}
                </BodyShort>
                <BodyShort size="small">Midlene vil bli kostnadsført på enhet {props.enhet}</BodyShort>
            </div>
        </Boks>
    );
};

export default SummeringBoks;
