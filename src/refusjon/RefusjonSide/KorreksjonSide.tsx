import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import StatusTekst from '../../komponenter/StatusTekst/StatusTekst';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon, utbetalKorreksjon } from '../../services/rest-service';
import './RefusjonSide.less';
import Utregning from './Utregning';
import BekreftSlettKorreksjon from './BekreftSlettKorreksjon';
import InformasjonFraAvtalen from './InformasjonFraAvtalen';
import InntekterFraTiltaketSpørsmål from './InntekterFraTiltaketSpørsmål';
import InntekterFraAMeldingen from './InntekterFraAMeldingen';
import LagreKnapp from '../../komponenter/LagreKnapp';

const KorreksjonSide: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <HvitBoks>
            <BekreftSlettKorreksjon />

            <VerticalSpacer rem={2} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Innholdstittel role="heading">Korreksjon av refusjon</Innholdstittel>
                <StatusTekst
                    status={refusjon.status}
                    tilskuddFom={refusjon.tilskuddsgrunnlag.tilskuddFom}
                    tilskuddTom={refusjon.tilskuddsgrunnlag.tilskuddTom}
                />
            </div>

            <VerticalSpacer rem={1} />
            <Normaltekst>
                Dette er en korreksjon av tidligere utbetalt refusjon. Det beregnes her et foreløpig oppgjør fratrukket
                beløpet som er utbetalt tidligere.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen />
            <VerticalSpacer rem={2} />
            <InntekterFraAMeldingen />
            <VerticalSpacer rem={2} />
            <InntekterFraTiltaketSpørsmål />
            <VerticalSpacer rem={2} />
            {refusjon.beregning && (
                <>
                    <Utregning beregning={refusjon.beregning} tilskuddsgrunnlag={refusjon.tilskuddsgrunnlag} />
                    <VerticalSpacer rem={1} />
                    <LagreKnapp lagreFunksjon={() => utbetalKorreksjon(refusjonId)}>
                        Send korreksjon til utbetaling
                    </LagreKnapp>
                </>
            )}
        </HvitBoks>
    );
};

export default KorreksjonSide;
