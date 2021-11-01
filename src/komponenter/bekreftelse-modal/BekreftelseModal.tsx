import Modal from 'nav-frontend-modal';
import { Innholdstittel } from 'nav-frontend-typografi';
import React, { CSSProperties, FunctionComponent } from 'react';
import BEMHelper from '../../utils/bem';
import LagreOgAvbrytKnapp from '../LagreOgAvbrytKnapp';
import VerticalSpacer from '../VerticalSpacer';
import './bekreftelseModal.less';

interface Props {
    isOpen: boolean;
    lukkModal: () => void;
    bekreft: () => Promise<any>;
    tittel: string;
    containerStyle?: CSSProperties;
}

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
            <Modal
                isOpen={props.isOpen}
                onRequestClose={() => props.lukkModal()}
                contentLabel="modal"
                className={cls.element('container')}
                style={{ content: props.containerStyle }}
            >
                <div className={cls.element('wrapper')}>
                    <Innholdstittel className={cls.element('tittel')}>{props.tittel}</Innholdstittel>
                    {props.children}
                    <div className={cls.element('knapp-panel')}>
                        <VerticalSpacer rem={2} />
                        <LagreOgAvbrytKnapp lagreFunksjon={props.bekreft} avbryt={() => props.lukkModal()}>
                            OK
                        </LagreOgAvbrytKnapp>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
