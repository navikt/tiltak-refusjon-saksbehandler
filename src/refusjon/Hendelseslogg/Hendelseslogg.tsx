import React, { FunctionComponent, useState } from 'react';
import BEMHelper from '../../utils/bem';
import { Button, Modal, Table } from '@navikt/ds-react';
import { storForbokstav } from '../../utils/stringUtils';
import { Hendelse, HendelseType, EventTyper } from './Hendelseslogg.spec';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '../../utils/datoUtils';
import { File } from '@navikt/ds-icons';
import './Hendelseslogg.less';

type Props = {
    hendelser: Hendelse[];
};
const cls = BEMHelper('hendelseslogg');

const HendelsesLogg: FunctionComponent<Props> = (props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className={cls.className}>
            <Button
                size="small"
                variant="secondary"
                className={cls.element('openButton')}
                onClick={() => setOpen(!open)}
            >
                Hendelselogg
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-label="Hendelseslogg"
                className={cls.element('modal')}
            >
                <Modal.Header>
                    <h1>Hendelseslogg</h1>
                </Modal.Header>
                <Modal.Body>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell scope="col"> Tidspunkt </Table.HeaderCell>
                                <Table.HeaderCell scope="col"> Hendelse </Table.HeaderCell>
                                <Table.HeaderCell scope="col"> Utført av </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {props.hendelser.map((varsel) => (
                                <Table.Row key={varsel.id} role="row">
                                    <Table.DataCell role="cell" aria-labelledby="tidspunkt">
                                        {formatterDato(varsel.tidspunkt, NORSK_DATO_OG_TID_FORMAT)}
                                    </Table.DataCell>
                                    <Table.DataCell
                                        className={cls.className}
                                        role="cell"
                                        aria-labelledby={'event'}
                                        key={'event'}
                                    >
                                        <div className={cls.element('ikonRad')}>
                                            <File />
                                            <span style={{ marginRight: '0.5rem' }} aria-hidden="true">
                                                {storForbokstav(HendelseType[varsel.event as EventTyper])}
                                            </span>
                                        </div>
                                    </Table.DataCell>
                                    <Table.DataCell role="cell" aria-labelledby={'utførtAv'} key={'utførtAv'}>
                                        <div className={'ikonRad'} aria-labelledby="varsel">
                                            <span style={{ marginRight: '0.5rem' }} aria-hidden="true">
                                                {storForbokstav(varsel['utførtAv' as keyof Hendelse] || '')}
                                            </span>
                                        </div>
                                    </Table.DataCell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default HendelsesLogg;
