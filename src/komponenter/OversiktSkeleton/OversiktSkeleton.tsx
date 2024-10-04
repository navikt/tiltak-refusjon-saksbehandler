import React from 'react';
import Skeleton from 'react-loading-skeleton';
import BEMHelper from '../../utils/bem';
import TableHeader from '@/refusjon/oversikt/TableHeader';
import { Table } from '@navikt/ds-react';

const cls = BEMHelper('oversikt');

export default function OversiktSkeleton() {
    return (
        <div className={cls.className}>
            <Table>
                <TableHeader/>
            </Table>
            <Skeleton count={3} className={cls.element('rad')} />
        </div>
    );
}
