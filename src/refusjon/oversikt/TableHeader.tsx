import { Table, Label } from '@navikt/ds-react';

const TableHeader = () => {
    return (
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell scope="col">
                <Label>Refusjon</Label>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                <Label>Veileder</Label>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                <Label>Deltaker</Label>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                <Label>Arbeidsgiver</Label>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                <Label>Enhet</Label>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                <Label>Status</Label>
                </Table.HeaderCell>
                <Table.HeaderCell scope="col">
                <Label>Frist for godkjenning</Label>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Header>
    );
};

export default TableHeader;
