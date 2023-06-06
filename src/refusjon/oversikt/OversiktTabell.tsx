import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';
import StatusTekst from '../../komponenter/StatusTekst/StatusTekst';
import BEMHelper from '../../utils/bem';
import { formatterDato } from '../../utils/datoUtils';
import { Refusjon } from '../refusjon';

type Props = {
    refusjoner: Refusjon[];
};
const cls = BEMHelper('oversikt');
const Kolonne: FunctionComponent = (props) => <div className={cls.element('kolonne')}>{props.children}</div>;

const OversiktTabell: FunctionComponent<Props> = (props) => {
    const history = useHistory();

    return (
        <>
            {props.refusjoner.map((refusjon) => (
                //@ts-ignore
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
        </>
    );
};

export default OversiktTabell;
