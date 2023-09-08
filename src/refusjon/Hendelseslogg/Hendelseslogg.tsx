import React, { useState } from 'react';
import BEMHelper from '../../utils/bem';
import bekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { Button, Modal, Table } from '@navikt/ds-react';
import { storForbokstav } from '../../utils/stringUtils';

const cls = BEMHelper('hendelseslogg');
const HendelsesLogg = () => {
    // const { data: hendelser, isLoading, isError } = useHendelser();
    // const { data: refusjoner } = useRefusjoner();o
    const [open, setOpen] = useState<boolean>(false);
    const sortertListe = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    //
    // if (isLoading) {
    //     return <Spinner />;
    // }
    //
    // if (isError) {
    //     return <Feilmelding />;
    // }

    // const refusjonerMedHendelser = refusjoner?.map((refusjon) => {
    //     const hendelserForRefusjon = hendelser?.filter((hendelse) => hendelse.refusjonId === refusjon.id);
    //     return {
    //         ...refusjon,
    //         hendelser: hendelserForRefusjon,
    //     };
    // });

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
                        hei
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell scope="col"> Tidspunkt </Table.HeaderCell>
                                    <Table.HeaderCell scope="col"> Hendelse </Table.HeaderCell>
                                    <Table.HeaderCell scope="col"> Utført av </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {sortertListe.map((varsel) => (
                                    <Table.Row key={varsel} role="row">
                                        <Table.DataCell role="cell" aria-labelledby="tidspunkt">
                                            1
                                        </Table.DataCell>
                                        <Table.DataCell role="cell">
                                            <div style={{ display: 'flex' }} aria-labelledby="varsel">
                                                <span style={{ marginRight: '0.5rem' }} aria-hidden="true"></span>
                                            </div>
                                        </Table.DataCell>
                                        <Table.DataCell role="cell" aria-labelledby="utført_av"></Table.DataCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
        // <div className="hendelseslogg">
        //     <div className="hendelseslogg__tittel">
        //     </div>
        //     <div className="hendelseslogg__innhold">
        //     </div>
        // </div>
    );
};
export default HendelsesLogg;
