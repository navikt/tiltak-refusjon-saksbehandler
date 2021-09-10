import React, { FunctionComponent, useEffect, useState } from 'react';
import BekreftelseModal from '../../komponenter/bekreftelse-modal/BekreftelseModal';
import { endreRefusjonFrist, useHentRefusjon } from '../../services/rest-service';
import 'react-day-picker/lib/style.css';
import 'react-day-picker/lib/style.css';
import { Knapp } from 'nav-frontend-knapper';
import BEMHelper from '../../utils/bem';
import DayPicker from 'react-day-picker';
import './forlengeDato.less';
import { Label, Input } from 'nav-frontend-skjema';
import GrunnlagTilForlengelse from './GrunnlagTilForlengelse';
import {
    disableAfter, ForlengeDatoSkjemaGruppeFeil,
    formatDateToIsoDateFormat,
    getDateStringFraDatoVelger, finnFeilMeldingFraInputDialog,
} from '../../utils/forlengeDatoUtils';
import { useParams } from 'react-router';

const ForlengeDato: FunctionComponent<{  }> = () => {
        const { refusjonId } = useParams();
        const refusjon = useHentRefusjon(refusjonId);
        const { fristForGodkjenning, tilskuddsgrunnlag } = refusjon;
        const [open, setOpen] = useState<boolean>(false);
        const [datoFraDatoVelger, setDatoFraDatoVelger] = useState<Date>(new Date(Date.parse(fristForGodkjenning)));
        const [datoFraInputFelt, setDatoFraInputFelt] = useState<string>(fristForGodkjenning);
        const [grunnlag, setGrunnlag] = useState<string>('');
        const [annetGrunnlag, setAnnetGrunnlag] = useState<string>('');
        const [skjemaGruppeFeilmeldinger, setSkjemaGruppeFeilmeldinger] =
            useState<ForlengeDatoSkjemaGruppeFeil[] | []>([]);
        const [modalSize, setModalSize] = useState<string>(window.innerWidth > 768 ? '28' : '20');
        const cls = BEMHelper('forlenge-dato');

        useEffect(() => {
            setDatoFraInputFelt(getDateStringFraDatoVelger(datoFraDatoVelger));
        }, [datoFraDatoVelger]);

        useEffect(() => {
            const modalSize = () => {
                setModalSize(window.innerWidth > 768 ? '28' : '20');
            }
            window.addEventListener('resize', modalSize);
            window.removeEventListener('resize', modalSize);
        })

        const lukkModalOgResettState = () => {
            setDatoFraDatoVelger(new Date(Date.parse(fristForGodkjenning)));
            setDatoFraInputFelt(fristForGodkjenning);
            setGrunnlag('');
            setAnnetGrunnlag('');
            setSkjemaGruppeFeilmeldinger([]);
            setOpen(false);
        };

        const setNyFeilMelding = (id: string, feilMelding: string) => {
            setSkjemaGruppeFeilmeldinger(prevState => (
                [...prevState, ...[{ id: id, feilMelding: feilMelding }]]
            ));
        };

        const sjekkInnsendingsInformasjon = () => {
            let KAN_SENDE_INN: boolean = true;
            setSkjemaGruppeFeilmeldinger([]);
            const parseDate = Date.parse(formatDateToIsoDateFormat(datoFraInputFelt));
            if (isNaN(parseDate)) {
                setNyFeilMelding('ugyldig-datoformat', 'Ugyldig datoformat. DD.MM.YYYY.');
                KAN_SENDE_INN = false;
            }
            if (new Date(parseDate) < new Date(fristForGodkjenning)) {
                setNyFeilMelding('for-kort-frist', 'Fristen kan ikke settes kortere enn opprinnelig utløpsdato.');
                KAN_SENDE_INN = false;
            }
            if (new Date(parseDate) > new Date(Date.parse(disableAfter(tilskuddsgrunnlag.tilskuddTom, 3)))) {
                setNyFeilMelding('for-lang-frist', 'Fristen kan ikke overstige 1 måned.');
                KAN_SENDE_INN = false;
            }
            if (grunnlag.length === 0) {
                setNyFeilMelding('mangler-grunnlag', 'Må sette grunn til forlengelse.');
                KAN_SENDE_INN = false;
            }
            if (grunnlag.includes('annet') && annetGrunnlag.length === 0) {
                setNyFeilMelding('mangler-annet', 'Mangler text for annet grunnlag.');
                KAN_SENDE_INN = false;
            }
            if (KAN_SENDE_INN) {
                setSkjemaGruppeFeilmeldinger([]);
                oppdatereRefusjonFrist();
            }
        };

        const oppdatereRefusjonFrist = async () => {
            const valgGrunn = grunnlag.includes('annet') ? annetGrunnlag : grunnlag;
            try {
                await endreRefusjonFrist(refusjonId,
                    { nyFrist: formatDateToIsoDateFormat(datoFraInputFelt), årsak: valgGrunn });
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
                    lukkModal={lukkModalOgResettState}
                    bekreft={sjekkInnsendingsInformasjon}
                    tittel={'Endre refusjon frist'}
                    containerStyle={{ minWidth: modalSize.concat('rem') }}
                >
                    <div className={cls.className}>
                        <div className={cls.element('container')}>
                            <div className={cls.element('dato-velger')}>
                                <DayPicker
                                    initialMonth={datoFraDatoVelger}
                                    selectedDays={datoFraDatoVelger}
                                    onDayClick={day => setDatoFraDatoVelger(day)}
                                    disabledDays={{
                                        before: new Date(Date.parse(fristForGodkjenning)),
                                        after: new Date(Date.parse(disableAfter(tilskuddsgrunnlag.tilskuddTom, 3))),
                                    }}
                                />
                            </div>
                            <div className={cls.element('dato-input')}>
                                <Label className={cls.element('label')} htmlFor='dato-label'>Dato</Label>
                                <div className={cls.element('input-wrapper')}>
                                    <Input
                                        feil={finnFeilMeldingFraInputDialog(['ugyldig-datoformat', 'for-kort-frist', 'for-lang-frist'],
                                            skjemaGruppeFeilmeldinger)}
                                        onChange={event => setDatoFraInputFelt(event.target.value)}
                                        className={cls.element('input-felt-dato')} id='dato-input' bredde='S'
                                        value={datoFraInputFelt} />
                                </div>
                            </div>
                            <GrunnlagTilForlengelse
                                grunnlag={grunnlag}
                                setGrunnlag={setGrunnlag}
                                annetGrunnlag={annetGrunnlag}
                                setAnnetGrunnlag={setAnnetGrunnlag}
                                skjemaGruppeFeilmeldinger={skjemaGruppeFeilmeldinger}
                            />
                        </div>
                    </div>
                </BekreftelseModal>
            </div>
        );
    };

export default ForlengeDato;
