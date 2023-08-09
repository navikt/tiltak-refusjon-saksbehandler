import React, { CSSProperties, FunctionComponent, PropsWithChildren } from 'react';
import { Modal, Heading } from '@navikt/ds-react';
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

const BekreftelseModal: FunctionComponent<Props & PropsWithChildren> = (props) => {
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
                open={props.isOpen}
                onClose={() => props.lukkModal()}
                aria-label="modal"
                className={cls.element('container')}
                style={{ content: props.containerStyle }}
            >
                <Modal.Content>
                    <div className={cls.element('wrapper')}>
                        <Heading size="large" className={cls.element('tittel')}>
                            {props.tittel}
                        </Heading>
                        {props.children}
                        <div className={cls.element('knapp-panel')}>
                            <VerticalSpacer rem={2} />
                            <LagreOgAvbrytKnapp lagreFunksjon={props.bekreft} avbryt={() => props.lukkModal()}>
                                OK
                            </LagreOgAvbrytKnapp>
                        </div>
                    </div>
                </Modal.Content>
            </Modal>
        </div>
    );
};

export default BekreftelseModal;
