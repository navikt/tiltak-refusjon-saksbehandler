import { Heading, Label, Radio, RadioGroup, TextField } from '@navikt/ds-react';
import _ from 'lodash';
import { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { endreBruttolønn } from '../../services/rest-service';
import { formatterPenger } from '../../utils/PengeUtils';
import { Refusjonsgrunnlag } from '../refusjon';
import InntekterOpptjentIPeriodeTabell from './InntekterOpptjentIPeriodeTabell';

export const GrønnBoks = styled.div`
    background-color: #ccf1d6;
    padding: 1em;
    border: 4px solid #99dead;
`;

const InntekterFraTiltaketSpørsmål: FunctionComponent<{ refusjonsgrunnlag: Refusjonsgrunnlag }> = (props) => {
    const { korreksjonId } = useParams<{korreksjonId: string}>();
    const refusjonsgrunnlag = props.refusjonsgrunnlag;
    const [inntekterKunFraTiltaket, setInntekterKunFraTiltaket] = useState(refusjonsgrunnlag.inntekterKunFraTiltaket);
    const [endretBruttoLønn, setEndretBruttoLønn] = useState(refusjonsgrunnlag.endretBruttoLønn);
    if (!refusjonsgrunnlag.inntektsgrunnlag) {
        return null;
    }
    const bruttoLønn = refusjonsgrunnlag.inntektsgrunnlag.bruttoLønn;

    const svarPåSpørsmål = (checked: boolean) => {
        setInntekterKunFraTiltaket(checked);
        if (checked) {
            setEndretBruttoLønn(undefined);
            endreBruttolønn(korreksjonId!, checked, undefined);
        }
    };

    // const sumInntekterOpptjentIPeriode = props.refusjonsgrunnlag.inntektsgrunnlag?.inntekter
    // .filter((inntekt) => inntekt.erOpptjentIPeriode)
    // .map((el) => el.beløp)
    // .reduce((el, el2) => el + el2, 0);
    const inntekterOpptentIPeriode = props.refusjonsgrunnlag.inntektsgrunnlag?.inntekter.filter((inntekt) => inntekt.erOpptjentIPeriode);
    const sumInntekterOpptjentIPeriode = _.sumBy(inntekterOpptentIPeriode, 'beløp');

    return (
        <GrønnBoks>
            <Heading size="small">Inntekter fra {tiltakstypeTekst[refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}</Heading>
            <VerticalSpacer rem={1} />

            <InntekterOpptjentIPeriodeTabell inntekter={props.refusjonsgrunnlag.inntektsgrunnlag?.inntekter!} />



            <VerticalSpacer rem={1} />
                    <Label htmlFor={'inntekterKunFraTiltaket'}>
                        Er inntektene som du har huket av for{' '}
                        {sumInntekterOpptjentIPeriode > 0 && <>({formatterPenger(sumInntekterOpptjentIPeriode)})</>} kun
                        fra tiltaket {tiltakstypeTekst[props.refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]}?
                    </Label>
            <p>
                <i>Du skal svare "nei" hvis noen av inntektene er fra f. eks. vanlig lønn eller lønnstilskudd</i>
            </p>
            <RadioGroup legend="" value={inntekterKunFraTiltaket}>
                <Radio 
                    name="inntekterKunFraTiltaket"
                    value={true}
                    checked={inntekterKunFraTiltaket === true}
                    onChange={() => svarPåSpørsmål(true)}
                >Ja
                </Radio>
                <Radio 
                    name="inntekterKunFraTiltaket"
                    value={false}
                    checked={inntekterKunFraTiltaket === false}
                    onChange={() => svarPåSpørsmål(false)}
                    >
                        Nei
                </Radio>
            </RadioGroup>
            {inntekterKunFraTiltaket === false && (
                <>
                    <VerticalSpacer rem={1} />
                    <TextField
                        size="small"
                        label={`Skriv inn bruttolønn utbetalt for ${
                            tiltakstypeTekst[refusjonsgrunnlag.tilskuddsgrunnlag.tiltakstype]
                        }`}
                        onChange={(event: any) => {
                            const verdi = event.currentTarget.value;
                            if (verdi.match(/^\d*$/) && verdi <= bruttoLønn) {
                                setEndretBruttoLønn(verdi as number);
                            }
                        }}
                        onBlur={() => endreBruttolønn(korreksjonId!, false, endretBruttoLønn)}
                        value={endretBruttoLønn}
                    />
                </>
            )}
        </GrønnBoks>
    );
};

export default InntekterFraTiltaketSpørsmål;
