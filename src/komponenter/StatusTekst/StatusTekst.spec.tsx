import { render } from '@testing-library/react';
import moment from 'moment';
import * as React from 'react';
import { Status } from '../../refusjon/status';
import { datoString, formatterDato } from '../../utils/datoUtils';
import StatusTekst from './StatusTekst';

describe('Skal vise riktig statustekst', () => {
    test('Ny, kan ikke påbegynnes', () => {
        const tilskuddTom = datoString(moment().add(1, 'days'));
        const { getByText } = render(
            <StatusTekst
                status={Status.KLAR_FOR_INNSENDING}
                tilskuddFom={datoString(moment().subtract(2, 'days'))}
                tilskuddTom={tilskuddTom}
            />
        );
        expect(getByText('Ny - søk fra ' + formatterDato(tilskuddTom))).toBeInTheDocument();
    });

    test('Ny, kan påbegynnes', () => {
        const { getByText } = render(
            <StatusTekst
                status={Status.KLAR_FOR_INNSENDING}
                tilskuddFom={datoString(moment())}
                tilskuddTom={datoString(moment())}
            />
        );
        expect(getByText('Ny - søk om refusjon')).toBeInTheDocument();
    });
});
