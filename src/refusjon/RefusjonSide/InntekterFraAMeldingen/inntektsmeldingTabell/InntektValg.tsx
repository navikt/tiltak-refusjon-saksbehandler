import { Radio } from 'nav-frontend-skjema';
import { FunctionComponent } from 'react';
import { setInntektslinjeOpptjentIPeriode } from '../../../../services/rest-service';
import { Inntektslinje } from '../../../refusjon';

interface Props {
    inntekt: Inntektslinje;
    korreksjonId?: string;
    kvitteringVisning: boolean;
}

const InntektValg: FunctionComponent<Props> = (props) => {
    return (
        <td>
            {!props.kvitteringVisning && (
                <div className="inntektsmelding__inntektsvalg">
                    <Radio
                        label="Ja"
                        checked={props.inntekt.erOpptjentIPeriode}
                        onChange={() => {
                            setInntektslinjeOpptjentIPeriode(props.korreksjonId!!, props.inntekt.id, true);
                        }}
                        name={props.inntekt.id}
                    />
                    <Radio
                        label="Nei"
                        checked={
                            typeof props.inntekt.erOpptjentIPeriode === 'boolean' && !props.inntekt.erOpptjentIPeriode
                        }
                        onChange={() => {
                            setInntektslinjeOpptjentIPeriode(props.korreksjonId!!, props.inntekt.id, false);
                        }}
                        name={props.inntekt.id}
                    />
                </div>
            )}
            {props.kvitteringVisning && (
                <div className="inntektsmelding__valgtInntekt">
                    {props.inntekt.erOpptjentIPeriode && <label>Ja</label>}
                    {props.inntekt.erOpptjentIPeriode === false && <label>Nei</label>}
                    {(props.inntekt.erOpptjentIPeriode === undefined || props.inntekt.erOpptjentIPeriode === null) && (
                        <label>Ikke valgt</label>
                    )}
                </div>
            )}
        </td>
    );
};
export default InntektValg;
