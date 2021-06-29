import { Refusjon, Status } from '../../types/refusjon';

export type Søkekriterier = Partial<Refusjon> & {
    sorteringskolonne?: keyof Refusjon;
    status?: Status;
};
