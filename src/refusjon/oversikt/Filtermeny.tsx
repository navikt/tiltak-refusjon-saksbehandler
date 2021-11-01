import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { Radio, RadioGruppe } from 'nav-frontend-skjema';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { statusTekst } from '../../messages';
import { storForbokstav } from '../../utils/stringUtils';
import { Status } from '../status';
import { Tiltak } from '../tiltak';
import { useFilter } from './FilterContext';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import VisRefusjonerFilter from './VisRefusjonerFilter';
import { useFeatureToggles } from '../../featureToggles/FeatureToggleProvider';
import { Feature } from '../../featureToggles/features';

const Filtermeny: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();
    const erDesktopStorrelse = useMediaQuery({ minWidth: 768 });
    const [statusPanelOpen, setStatusPanelOpen] = useState(erDesktopStorrelse);
    const [tiltaksPanelOpen, setTiltaksPanelOpen] = useState(erDesktopStorrelse);
    const featureToggles = useFeatureToggles();

    useEffect(() => {
        setStatusPanelOpen(erDesktopStorrelse);
        setTiltaksPanelOpen(erDesktopStorrelse);
    }, [setStatusPanelOpen, setTiltaksPanelOpen, erDesktopStorrelse]);

    return (
        <div role="menubar" aria-label="meny for filtrering av refusjoner">
            <VisRefusjonerFilter />
            <VerticalSpacer rem={1.25} />
            <EkspanderbartpanelBase
                tittel="Status"
                role="radiogroup"
                apen={statusPanelOpen}
                onClick={(event) => {
                    setStatusPanelOpen(!statusPanelOpen);
                }}
                style={{ minWidth: '14.375rem' }}
            >
                <RadioGruppe legend="">
                    <Radio
                        role="radio"
                        label="Alle"
                        checked={filter.status === undefined}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: undefined })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.FOR_TIDLIG])}
                        checked={filter.status === Status.FOR_TIDLIG}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.FOR_TIDLIG })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.KLAR_FOR_INNSENDING])}
                        checked={filter.status === Status.KLAR_FOR_INNSENDING}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.KLAR_FOR_INNSENDING })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.ANNULLERT])}
                        checked={filter.status === Status.ANNULLERT}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.ANNULLERT })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.SENDT_KRAV])}
                        checked={filter.status === Status.SENDT_KRAV}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.SENDT_KRAV })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.UTBETALT])}
                        checked={filter.status === Status.UTBETALT}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.UTBETALT })}
                    />
                    <Radio
                        role="radio"
                        label={storForbokstav(statusTekst[Status.UTGÅTT])}
                        checked={filter.status === Status.UTGÅTT}
                        name={'status'}
                        onChange={() => oppdaterFilter({ status: Status.UTGÅTT })}
                    />
                    {featureToggles[Feature.Korreksjon] && (
                        <Radio
                            role="radio"
                            label={storForbokstav(statusTekst[Status.KORREKSJON_UTKAST])}
                            checked={filter.status === Status.KORREKSJON_UTKAST}
                            name={'status'}
                            onChange={() => oppdaterFilter({ status: Status.KORREKSJON_UTKAST })}
                        />
                    )}
                </RadioGruppe>
            </EkspanderbartpanelBase>
            <VerticalSpacer rem={1.25} />
            <EkspanderbartpanelBase
                tittel="Tiltakstype"
                role="radiogroup"
                apen={tiltaksPanelOpen}
                onClick={() => setTiltaksPanelOpen(!tiltaksPanelOpen)}
                style={{ minWidth: '14.375rem' }}
            >
                <RadioGruppe legend="">
                    <Radio
                        role="radio"
                        label={'Alle'}
                        name="ALLE"
                        checked={filter.tiltakstype === undefined}
                        onChange={() => oppdaterFilter({ tiltakstype: undefined })}
                    />
                    <Radio
                        role="radio"
                        label={'Midlertidig lønnstilskudd'}
                        checked={filter.tiltakstype === Tiltak.MIDLERTIDIG_LØNNSTILSKUDD}
                        name={Tiltak.MIDLERTIDIG_LØNNSTILSKUDD}
                        onChange={() => oppdaterFilter({ tiltakstype: Tiltak.MIDLERTIDIG_LØNNSTILSKUDD })}
                    />
                    <Radio
                        role="radio"
                        label={'Varig lønnstilskudd'}
                        name={Tiltak.VARIG_LØNNSTILSKUDD}
                        checked={filter.tiltakstype === Tiltak.VARIG_LØNNSTILSKUDD}
                        onChange={() => oppdaterFilter({ tiltakstype: Tiltak.VARIG_LØNNSTILSKUDD })}
                    />
                    <Radio
                        role="radio"
                        label={'Sommerjobb'}
                        name={Tiltak.SOMMERJOBB}
                        checked={filter.tiltakstype === Tiltak.SOMMERJOBB}
                        onChange={() => oppdaterFilter({ tiltakstype: Tiltak.SOMMERJOBB })}
                    />
                </RadioGruppe>
            </EkspanderbartpanelBase>
        </div>
    );
};

export default Filtermeny;
