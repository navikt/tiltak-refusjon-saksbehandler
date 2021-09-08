import { Normaltekst } from 'nav-frontend-typografi';
import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import BekreftModal from '../../komponenter/BekreftModal';
import { endreRefusjonFrist } from '../../services/rest-service';

import 'react-day-picker/lib/style.css';
import 'react-day-picker/lib/style.css';
import { Knapp } from 'nav-frontend-knapper';
import { Modifier } from 'react-day-picker/types/Modifiers';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import DayPicker, { DateUtils } from 'react-day-picker';
import { Refusjon } from '../refusjon';

interface Props {
    dato: string;
    refusjonId: string;
    refusjon: Dispatch<SetStateAction<Refusjon>>;
}

const ForlengeDato: FunctionComponent<Props> = ({ dato, refusjonId, refusjon }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [nyDato, setNyDato] = useState<Modifier>(new Date(dato));
    const [feilmelding, setFeilmelding] = useState('');
    const FORMAT = 'dd/MM/yyyy';

    const endreDato = (endretDato: any) => {
        setNyDato(endretDato);
    };

    function parseDate(str: any, format: any, locale: any) {
        const parsed = dateFnsParse(str, format, new Date(), { locale });
        if (DateUtils.isDate(parsed)) {
            return parsed;
        }
        return undefined;
    }

    function formatDate(date: any, format: any, locale: any) {
        return dateFnsFormat(date, format, { locale });
    }

    const oppdatereRefusjonFrist = async () => {
        try {
            const oppdatertRefusjon = await endreRefusjonFrist(refusjonId, nyDato);
            refusjon(oppdatertRefusjon);
            setOpen(false);
        } catch (error) {
            setFeilmelding(error.feilmelding ?? 'Det har skjedd en feil');
        }
    };

    const maxFrist = () => {
        const firstDato = new Date(dato);
        console.log(dato);
        const fristDatoOm3Måneder = firstDato.getMonth();
    };

    console.log('dato', dato);

    return (
        <div>
            <Knapp onClick={() => setOpen(!open)}>Endre Frist</Knapp>
            <BekreftModal
                isOpen={open}
                lukkModal={() => setOpen(false)}
                bekreft={oppdatereRefusjonFrist}
                tittel={'Endre refusjon frist'}
            >
                <div>
                    <Normaltekst>Vil du endre fristen på refusjonene</Normaltekst>

                    {/*<p>Do valgte dato {nyDato}</p>*/}
                    <div style={{ height: '400px', display: 'block' }}>
                        <DayPickerInput
                            style={{ Width: '10rem' }}
                            //value={nyDato?.toString()}
                            showOverlay={true}
                            onDayChange={(dato) => endreDato(dato)}
                            hideOnDayClick={false}
                            formatDate={formatDate}
                            format={FORMAT}
                            parseDate={parseDate}
                            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                            /* disabledDays={[{maxFrist},]}
                            month={new Date(2018, 8)}
                            fromMonth={new Date(2018, 8)}
                            //toMonth={new Date(2018, 11)}
                            toMonth={nyDat}*/
                            //maxDate={new Date(2020, 1, 29)}
                            //fromMonth={new Date(2020, 1, 29)}
                        />
                    </div>

                    <DayPicker
                        selectedDays={nyDato}
                        onDayClick={(date: any) => setNyDato(date)}
                        initialMonth={new Date(2021, 0)}
                        //fromMonth={new Date(2021, 1, 29)}
                        //toMonth={new Date(2021, 1, 31)}
                        disabledDays={[
                            new Date(2021, 3, 12),
                            new Date(2021, 3, 2),
                            {
                                before: new Date(dato),
                                /*after: new Date(dato).setMonth(dato.getMonth()+3),*/
                            },
                        ]}
                    ></DayPicker>
                </div>
            </BekreftModal>
        </div>
    );
};

export default ForlengeDato;
