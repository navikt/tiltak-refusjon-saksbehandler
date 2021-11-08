import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import { useHentKorreksjon } from '../services/rest-service';
import HvitBoks from '../komponenter/hvitboks/HvitBoks';
import BekreftSlettKorreksjon from '../refusjon/RefusjonSide/BekreftSlettKorreksjon';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import InformasjonFraAvtalen from '../refusjon/RefusjonSide/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '../refusjon/RefusjonSide/InntekterFraAMeldingen';
import InntekterFraTiltaketSpørsmål from '../refusjon/RefusjonSide/InntekterFraTiltaketSpørsmål';
import Utregning from '../refusjon/RefusjonSide/Utregning';
import BekreftUtbetalKorreksjon from '../refusjon/RefusjonSide/BekreftUtbetalKorreksjon';
import BekreftTilbakekrevKorreksjon from '../refusjon/RefusjonSide/BekreftTilbakekrevKorreksjon';
import BekreftOppgjørKorreksjon from '../refusjon/RefusjonSide/BekreftOppgjørKorreksjon';
import { KorreksjonStatus } from '../refusjon/status';

const KorreksjonSide: FunctionComponent = () => {
    const { korreksjonId } = useParams();
    const korreksjon = useHentKorreksjon(korreksjonId);

    const korreksjonstype = (): KorreksjonStatus | null => {
        if (!korreksjon.refusjonsgrunnlag.beregning) {
            return null;
        }
        if (korreksjon.refusjonsgrunnlag.beregning.refusjonsbeløp > 0) {
            return KorreksjonStatus.TILLEGSUTBETALING;
        } else if (korreksjon.refusjonsgrunnlag.beregning.refusjonsbeløp < 0) {
            return KorreksjonStatus.TILBAKEKREVING;
        } else {
            return KorreksjonStatus.OPPGJORT;
        }
    };

    return (
        <HvitBoks>
            <BekreftSlettKorreksjon />

            <VerticalSpacer rem={2} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Innholdstittel role="heading">Korreksjon av refusjon</Innholdstittel>
                {/*<StatusTekst*/}
                {/*    status={korreksjon.status}*/}
                {/*    tilskuddFom={korreksjon.tilskuddsgrunnlag.tilskuddFom}*/}
                {/*    tilskuddTom={korreksjon.tilskuddsgrunnlag.tilskuddTom}*/}
                {/*/>*/}
            </div>

            <VerticalSpacer rem={1} />
            <Normaltekst>
                Dette er en korreksjon av tidligere utbetalt refusjon. Det beregnes her et foreløpig oppgjør fratrukket
                beløpet som er utbetalt tidligere. Dette er foreløpig et utkast, og den vises ikke for arbeidsgiver før
                den fullføres.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKontonummer={korreksjon.refusjonsgrunnlag.bedriftKontonummer}
            />
            <VerticalSpacer rem={2} />
            <InntekterFraAMeldingen inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag} />
            <VerticalSpacer rem={2} />
            <InntekterFraTiltaketSpørsmål refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
            <VerticalSpacer rem={2} />
            {korreksjon.refusjonsgrunnlag.beregning && (
                <>
                    <Utregning
                        beregning={korreksjon.refusjonsgrunnlag.beregning}
                        tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                    />
                    <VerticalSpacer rem={1} />
                    {korreksjonstype() === 'TILLEGSUTBETALING' && <BekreftUtbetalKorreksjon />}
                    {korreksjonstype() === 'TILBAKEKREVING' && <BekreftTilbakekrevKorreksjon />}
                    {korreksjonstype() === 'OPPGJORT' && <BekreftOppgjørKorreksjon />}
                </>
            )}
        </HvitBoks>
    );
};

export default KorreksjonSide;
