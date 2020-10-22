import classNames from 'classnames';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import React, { FunctionComponent } from 'react';
import VerticalSpacer from '../Komponenter/VerticalSpacer';
import { Refusjon } from '../types/refusjon';
import bem from '../utils/bem';
import { formatterDato } from '../utils/datoUtils';
import './RefusjonTabell.less';
import { Link } from 'react-router-dom';

type Props = {
    refusjoner: Refusjon[];
};

const cls = bem('refusjon-tabell');

const RefusjonTabell: FunctionComponent<Props> = (props) => {
    return (
        <div className={cls.className}>
            <VerticalSpacer rem={1} />
            <div className={classNames(cls.element('header'), cls.element('rad'))}>
                <div>Bedrift</div>
                <div>Deltaker</div>
                <div>Veileder</div>
                <div>Opprettet</div>
            </div>
            <VerticalSpacer rem={1} />
            {props.refusjoner.map((r) => (
                <LenkepanelBase
                    className={cls.element('rad')}
                    key={r.id}
                    href={'/refusjon/' + r.id}
                    linkCreator={(props: any) => (
                        <Link to={{ pathname: props.href, search: window.location.search }} {...props} />
                    )}
                >
                    <div>{r.bedrift}</div>
                    <div>{r.deltaker}</div>
                    <div>{r.veileder}</div>
                    <div>{formatterDato(r.opprettet_tidspunkt)}</div>
                </LenkepanelBase>
            ))}
        </div>
    );
};

export default RefusjonTabell;
