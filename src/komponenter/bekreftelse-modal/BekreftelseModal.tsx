import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import Modal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import BEMHelper from '../../utils/bem';
import './bekreftelseModal.less';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
    bekreft: () => void;
    tittel: string;
};

const BekreftelseModal: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('bekreftelse-modal');
    const setModalElement = () => {
        if (document.getElementById('root')) {
            return '#root';
        }
        return 'body';
    };
    if (typeof window !== 'undefined') {
        Modal.setAppElement(setModalElement());
    }

    return (
        <div className={cls.className}>
            <Modal isOpen={props.isOpen} onRequestClose={() => props.lukkModal()} contentLabel='modal'
                   className={cls.element('container')}>
                <div className={cls.element('wrapper')}>
                    <Innholdstittel className={cls.element('tittel')}>{props.tittel}</Innholdstittel>
                    {props.children}
                    <div className={cls.element('knapp-panel')}>
                        <Hovedknapp onClick={props.bekreft}>OK</Hovedknapp>
                        <Knapp onClick={() => props.lukkModal()}>Avbryt</Knapp>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
