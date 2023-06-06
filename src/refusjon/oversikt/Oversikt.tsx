import _ from 'lodash';
import { LinkPanel, BodyShort } from '@navikt/ds-react';
import React, { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import StatusTekst from '../../komponenter/StatusTekst/StatusTekst';
import Info from './Info';
import { useHentRefusjoner } from '../../services/rest-service';
import BEMHelper from '../../utils/bem';
import { formatterDato } from '../../utils/datoUtils';
import { useFilter } from './FilterContext';
import LabelRad from './LabelRad';
import './oversikt.less';
import { Refusjon, RefusjonStatus } from '../refusjon';

const cls = BEMHelper('oversikt');

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
        <div className={cls.className} aria-label="Main">
            <LabelRad />
            {_.sortBy<Refusjon>(refusjoner, [
                (refusjon) => Object.keys(RefusjonStatus).indexOf(refusjon.status),
                'fristForGodkjenning',
            ]).map((refusjon) => (
                <LinkPanel
                    className={cls.element('linkPanel')}
                    border={false}
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
                    <LinkPanel.Title className={cls.element('linkpanel_title_row')}>
                        <BodyShort
                            size="small"
                            className={cls.element('title_row_column')}
                            aria-labelledby={cls.element('veileder')}
                        >
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.veilederNavIdent}
                        </BodyShort>
                        <BodyShort
                            size="small"
                            className={cls.element('title_row_column')}
                            aria-labelledby={cls.element('deltaker')}
                        >
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerFornavn}{' '}
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.deltakerEtternavn}
                        </BodyShort>
                        <BodyShort
                            size="small"
                            className={cls.element('title_row_column')}
                            aria-labelledby={cls.element('arbeidsgiver')}
                        >
                            {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.bedriftNavn}
                        </BodyShort>
                        <BodyShort
                            size="small"
                            className={cls.element('title_row_column')}
                            aria-labelledby={cls.element('enhet')}
                        >
                            <strong>{refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.enhet}</strong>
                        </BodyShort>
                        <div className={cls.element('title_row_column')}>
                            <StatusTekst
                                status={refusjon.status}
                                tilskuddFom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom}
                                tilskuddTom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom}
                            />
                        </div>
                        <BodyShort
                            size="small"
                            className={cls.element('title_row_column')}
                            aria-labelledby={cls.element('frist-godkjenning')}
                        >
                            {formatterDato(refusjon.fristForGodkjenning)}
                        </BodyShort>
                    </LinkPanel.Title>
                </LinkPanel>
            ))}
        </div>
    );
};

export default Oversikt;
