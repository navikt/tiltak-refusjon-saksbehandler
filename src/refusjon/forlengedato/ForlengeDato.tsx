import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { endreRefusjonFrist } from '../../services/rest-service';
import 'react-day-picker/lib/style.css';
import 'react-day-picker/lib/style.css';
import { Knapp } from 'nav-frontend-knapper';
import { Refusjon } from '../refusjon';
import BEMHelper from '../../utils/bem';
import DayPicker from 'react-day-picker';
import './forlengeDato.less';
import { Label, Input } from 'nav-frontend-skjema';
import GrunnlagTilForlengelse from './GrunnlagTilForlengelse';
import {
    disableAfter,
    formatDateToIsoDateFormat,
    getDateStringFraDatoVelger,
} from '../../utils/forlengeDatoUtils';

interface Props {
    sisteFristDato: string;
    refusjonId: string;
    refusjon: Dispatch<SetStateAction<Refusjon>>;
}

const ForlengeDato: FunctionComponent<Props> = ({ sisteFristDato, refusjonId, refusjon }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [datoFraDatoVelger, setDatoFraDatoVelger] = useState<Date>(new Date(Date.parse(sisteFristDato)));
    const [datoFraInputFelt, setDatoFraInputFelt] = useState<string>(sisteFristDato);
    const [grunnlag, setGrunnlag] = useState<string>('');
    const [annetGrunnlag, setAnnetGrunnlag] = useState<string>('');
    const cls = BEMHelper('forlenge-dato');

    useEffect(() => {
        setDatoFraInputFelt(getDateStringFraDatoVelger(datoFraDatoVelger));
    }, [datoFraDatoVelger]);


    const oppdatereRefusjonFrist = async () => {
        const parseDate = Date.parse(formatDateToIsoDateFormat(datoFraInputFelt));
        if (!isNaN(parseDate) && new Date(parseDate) > new Date(sisteFristDato) && grunnlag.length > 0) {
            console.log('EY', new Date (parseDate).toLocaleDateString(), formatDateToIsoDateFormat(datoFraInputFelt), sisteFristDato);
            const valgGrunn = grunnlag.includes('annet') ? annetGrunnlag : grunnlag;
            try {
                const oppdatertRefusjon = await endreRefusjonFrist(refusjonId,
                    {nyFrist: formatDateToIsoDateFormat(datoFraInputFelt), årsak: valgGrunn});
                refusjon(oppdatertRefusjon);
                setOpen(false);
            } catch (error) {
                console.warn('error:', error);
            }
        }

    };

    return (
        <div className={cls.className}>
            <Knapp onClick={() => setOpen(!open)}>Endre Frist</Knapp>
            <BekreftelseModal
                isOpen={open}
                lukkModal={() => setOpen(false)}
                bekreft={oppdatereRefusjonFrist}
                tittel={'Endre refusjon frist'}
                containerStyle={{ minWidth: '28rem' }}
            >
                <div style={{}} className={cls.element('container')}>
                    <div className={cls.element('dato-velger')}>
                        <DayPicker
                            initialMonth={datoFraDatoVelger}
                            selectedDays={datoFraDatoVelger}
                            onDayClick={day => setDatoFraDatoVelger(day)}
                            disabledDays={{
                                before: new Date(Date.parse(sisteFristDato)),
                                after: new Date(Date.parse(disableAfter(sisteFristDato))),
                            }}
                        />
                    </div>
                    <div className={cls.element('dato-input')}>
                        <Label className={cls.element('label')} htmlFor='dato-label'>Dato</Label>
                        <div className={cls.element('input-wrapper')}>
                            <Input onChange={event => setDatoFraInputFelt(event.target.value)}
                                   className={cls.element('input-felt-dato')} id='dato-input' bredde='S'
                                   value={datoFraInputFelt} />
                        </div>
                    </div>
                    <GrunnlagTilForlengelse grunnlag={grunnlag} setGrunnlag={setGrunnlag} annetGrunnlag={annetGrunnlag}
                                            setAnnetGrunnlag={setAnnetGrunnlag} />
                </div>

            </BekreftelseModal>
        </div>
    );
};

export default ForlengeDato;
