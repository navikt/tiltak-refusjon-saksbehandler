import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from './VerticalSpacer';

type Props = {
    isOpen: boolean;
    lukkModal: () => void;
    bekreft: () => void;
    tittel: string;
};

const BekreftModal: FunctionComponent<Props> = (props) => {
    return (
        <Modal isOpen={props.isOpen} onRequestClose={() => props.lukkModal()} contentLabel="">
            <div style={{ margin: '2rem', maxWidth: '40rem' }}>
                <Innholdstittel style={{ textAlign: 'center' }}>{props.tittel}</Innholdstittel>
                <VerticalSpacer rem={2} />
                {props.children}
                <VerticalSpacer rem={2} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Hovedknapp onClick={props.bekreft}>OK</Hovedknapp>
                    <span style={{ minWidth: '2rem' }} />
                    <Knapp onClick={() => props.lukkModal()}>Avbryt</Knapp>
                </div>
            </div>
        </Modal>
    );
};

export default BekreftModal;
