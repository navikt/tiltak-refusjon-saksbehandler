import classNames from 'classnames';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../Komponenter/VerticalSpacer';
import { Refusjon } from '../types/refusjon';
import BEMHelper from '../utils/bem';
import { formatterDato } from '../utils/datoUtils';
import './RefusjonTabell.less';
import { Link } from 'react-router-dom';
import StatusTekst from '../Komponenter/StatusTekst/StatusTekst';

type Props = {
    refusjoner: Refusjon[];
};

const cls = BEMHelper('refusjon-tabell');

const RefusjonTabell: FunctionComponent<Props> = (props) => {
    return (
        <div className={cls.className}>
            <VerticalSpacer rem={1} />
            <div className={classNames(cls.element('header'), cls.element('rad'))}>
                <div>Veileder</div>
                <div>Deltaker</div>
                <div>Arbeidsgiver</div>
                <div>Enhet</div>
                <div>Status</div>
                <div>Frist</div>
            </div>
            <VerticalSpacer rem={1} />
            {props.refusjoner.map((refusjon) => (
                <LenkepanelBase
                    className={cls.element('rad')}
                    key={refusjon.id}
                    href={'/refusjon/' + refusjon.id}
                    linkCreator={(props: any) => (
                        <Link to={{ pathname: props.href, search: window.location.search }} {...props} />
                    )}
                >
                    <div>{refusjon.tilskuddsgrunnlag.veilederNavIdent}</div>
                    <div>{refusjon.tilskuddsgrunnlag.deltakerFornavn}</div>
                    <div>{refusjon.tilskuddsgrunnlag.bedriftNavn}</div>
                    <div>enhet</div>

                    <StatusTekst
                        status={refusjon.status}
                        tilskuddFom={refusjon.tilskuddsgrunnlag.tilskuddFom}
                        tilskuddTom={refusjon.tilskuddsgrunnlag.tilskuddTom}
                    />
                    <div>{formatterDato(refusjon.opprettetTidspunkt)}</div>
                </LenkepanelBase>
            ))}
        </div>
    );
};

export default RefusjonTabell;
