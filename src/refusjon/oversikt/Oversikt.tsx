import { ReactComponent as InfoIkon } from '@/asset/image/info.svg';
import _ from 'lodash';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent, PropsWithChildren } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import StatusTekst from '../../komponenter/StatusTekst/StatusTekst';
import { useHentRefusjoner } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import { formatterDato } from '../../utils/datoUtils';
import { useFilter } from './FilterContext';
import LabelRad from './LabelRad';
import './oversikt.less';
import { Refusjon } from '../refusjon';

const cls = BEMHelper('oversikt');

const Kolonne: FunctionComponent = (props) => <div className={cls.element('kolonne')}>{props.children}</div>;

const AvrundetHvitBoks = styled.div`
    border-radius: 4px;
    background-color: white;
    padding: 2rem 1rem;
    display: flex;
    align-items: center;
    > * {
        margin-right: 1rem;
    }
`;

const sorteringIndexRefusjonStatus = [
    'KLAR_FOR_INNSENDING',
    'FOR_TIDLIG',
    'SENDT_KRAV',
    'UTBETALT',
    'UTBETALING_FEILET',
    'UTGÅTT',
    'ANNULLERT',
    'KORRIGERT',
];

const Info: FunctionComponent<{ tekst: string }> = (props: PropsWithChildren<{ tekst: string }>) => (
    <AvrundetHvitBoks>
        <InfoIkon />
        <Undertittel tag="p">{props.tekst}</Undertittel>
    </AvrundetHvitBoks>
);

const Oversikt: FunctionComponent = () => {
    const { filter } = useFilter();

    const refusjoner = useHentRefusjoner(filter);
    const history = useHistory();

    if (refusjoner === undefined) {
        return <Info tekst="Oppgi søkekriterier for å finne refusjoner" />;
    }

    if (refusjoner.length === 0) {
        return <Info tekst="Finner ingen refusjoner" />;
    }

    return (
        <nav className={cls.className} aria-label="Main">
            <div role="list">
                <LabelRad className={cls.className} />

                {_.sortBy<Refusjon>(refusjoner, [
                    (refusjon) => sorteringIndexRefusjonStatus.indexOf(refusjon.status),
                    'fristForGodkjenning',
                ]).map((refusjon) => (
                    <LenkepanelBase
                        className={cls.element('rad')}
                        role="listitem"
                        key={refusjon.id}
                        onClick={(event) => {
                            event.preventDefault();
                            history.push({
                                pathname: `/refusjon/${refusjon.id}`,
                                search: window.location.search,
                            });
                        }}
                        href={`/refusjon/${refusjon.id}`}
                    >
                        <Kolonne aria-labelledby={cls.element('veileder')}>
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.veilederNavIdent}
                        </Kolonne>
                        <Kolonne aria-labelledby={cls.element('deltaker')}>
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn}{' '}
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}
                        </Kolonne>
                        <Kolonne aria-labelledby={cls.element('arbeidsgiver')}>
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.bedriftNavn}
                        </Kolonne>
                        <Kolonne aria-labelledby={cls.element('enhet')}>
                            <strong>{refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet}</strong>
                        </Kolonne>
                        <Kolonne aria-labelledby={cls.element('status')}>
                            <StatusTekst
                                status={refusjon.status}
                                tilskuddFom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom}
                                tilskuddTom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom}
                            />
                        </Kolonne>
                        <Kolonne aria-labelledby={cls.element('frist-godkjenning')}>
                            {formatterDato(refusjon.fristForGodkjenning)}
                        </Kolonne>
                    </LenkepanelBase>
                ))}
            </div>
        </nav>
    );
};

export default Oversikt;
