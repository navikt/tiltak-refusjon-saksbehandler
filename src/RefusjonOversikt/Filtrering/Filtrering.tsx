import React, { FunctionComponent } from 'react';
import { Refusjon, Status } from '../../types/refusjon';
import BEMHelper from '../../utils/bem';
import { DeltakerOgBedriftFilter } from './DeltakerOgBedriftFilter';
import './Filtrering.less';
import StatusFilter from './StatusFilter';
import TiltakstypeFilter from './TiltakstypeFilter';

const cls = BEMHelper('filtrering');

export type FiltreringProps = {
    navEnheter?: string[];
    endreSøk: (søkekriterier: Partial<Refusjon> & { status?: Status; navEnhet?: string }) => void;
};

const VeilederFiltrering: FunctionComponent<FiltreringProps> = (props) => {
    return (
        <div className={cls.className}>
            <DeltakerOgBedriftFilter {...props} />
            <StatusFilter {...props} />
            <TiltakstypeFilter {...props} erBeslutter={false} />
        </div>
    );
};

export default VeilederFiltrering;
