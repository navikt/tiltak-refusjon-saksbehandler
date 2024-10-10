import React from 'react';
import BEMHelper from '../../utils/bem';
import TableHeader from '@/refusjon/oversikt/TableHeader';
import { Table } from '@navikt/ds-react';

const cls = BEMHelper('oversiktTabell');

export default function OversiktSkeleton() {
    return (
            <Table className={cls.className}>
                <TableHeader/>
            </Table>
         
   
    );
}
