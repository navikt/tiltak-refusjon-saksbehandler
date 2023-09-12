import React, { FunctionComponent, useState } from 'react';
import BEMHelper from '../../utils/bem';
import bekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { Button, Modal, Table } from '@navikt/ds-react';
import { storForbokstav } from '../../utils/stringUtils';
import { Hendelse } from './Hendelseslogg.spec';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '../../utils/datoUtils';

type Props = {
    hendelser: Hendelse[];
};

const cls = BEMHelper('hendelseslogg');

const HendelsesLogg: FunctionComponent<Props> = (props) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div>
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
                className={cls.element('container')}
            >
                <Modal.Header>
                    <h1>Hendelseslogg</h1>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell scope="col"> Utført av </Table.HeaderCell>
                                    <Table.HeaderCell scope="col"> Hendelse </Table.HeaderCell>
                                    <Table.HeaderCell scope="col"> Tidspunkt </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {props.hendelser.map((varsel) => (
                                    <Table.Row key={varsel.id} role="row">
                                        {['utførtAv', 'event'].map((label) => (
                                            <Table.DataCell role="cell" aria-labelledby={label} key={label}>
                                                <div style={{ display: 'flex' }} aria-labelledby="varsel">
                                                    <span style={{ marginRight: '0.5rem' }} aria-hidden="true">
                                                        {storForbokstav(varsel[label as keyof Hendelse] || '')}
                                                    </span>
                                                </div>
                                            </Table.DataCell>
                                        ))}
                                        <Table.DataCell role="cell" aria-labelledby="tidspunkt">
                                            {formatterDato(varsel.tidspunkt, NORSK_DATO_OG_TID_FORMAT)}
                                        </Table.DataCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default HendelsesLogg;
