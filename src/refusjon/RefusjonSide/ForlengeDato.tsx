import { Normaltekst } from 'nav-frontend-typografi';
import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { endreRefusjonFrist } from '../../services/rest-service';
import 'react-day-picker/lib/style.css';
import 'react-day-picker/lib/style.css';
import { Knapp } from 'nav-frontend-knapper';
import { Modifier } from 'react-day-picker/types/Modifiers';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import { DateUtils } from 'react-day-picker';
import { Refusjon } from '../refusjon';

interface Props {
    dato: string;
    refusjonId: string;
    refusjon: Dispatch<SetStateAction<Refusjon>>;
}

const ForlengeDato: FunctionComponent<Props> = ({ dato, refusjonId, refusjon }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [nyDato, setNyDato] = useState<Modifier>(new Date(dato));
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
           console.warn('error:', error);
        }
    };

    return (
        <div>
            <Knapp onClick={() => setOpen(!open)}>Endre Frist</Knapp>
            <BekreftelseModal
                isOpen={open}
                lukkModal={() => setOpen(false)}
                bekreft={oppdatereRefusjonFrist}
                tittel={'Endre refusjon frist'}
            >
                <div>
                    <Normaltekst>Vil du endre fristen på refusjonene</Normaltekst>
                    <div style={{ height: '400px', display: 'block' }}>
                        <DayPickerInput
                            style={{ Width: '10rem' }}
                            showOverlay={true}
                            onDayChange={(dato) => endreDato(dato)}
                            hideOnDayClick={false}
                            formatDate={formatDate}
                            format={FORMAT}
                            parseDate={parseDate}
                            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                            dayPickerProps={{disabledDays: {
                                after: new Date()
                                }}}
                        />
                    </div>
                </div>

            </BekreftelseModal>
        </div>
    );
};

export default ForlengeDato;
