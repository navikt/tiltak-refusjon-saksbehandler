import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import StatusTekst from '../../komponenter/StatusTekst/StatusTekst';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import BekreftOppgjørKorreksjon from './BekreftOppgjørKorreksjon';
import BekreftSlettKorreksjon from './BekreftSlettKorreksjon';
import BekreftTilbakekrevKorreksjon from './BekreftTilbakekrevKorreksjon';
import BekreftUtbetalKorreksjon from './BekreftUtbetalKorreksjon';
import InformasjonFraAvtalen from './InformasjonFraAvtalen';
import InntekterFraAMeldingen from './InntekterFraAMeldingen';
import InntekterFraTiltaketSpørsmål from './InntekterFraTiltaketSpørsmål';
import './RefusjonSide.less';
import Utregning from './Utregning';

const KorreksjonSide: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    type REFUSJONSTYPE = 'ETTERBETALING' | 'TILBAKEKREVING' | 'OPPGJORT';

    const korreksjonstype = (): REFUSJONSTYPE | null => {
        if (!refusjon.beregning) {
            return null;
        }
        if (refusjon.beregning.refusjonsbeløp > 0) {
            return 'ETTERBETALING';
        } else if (refusjon.beregning.refusjonsbeløp < 0) {
            return 'TILBAKEKREVING';
        } else {
            return 'OPPGJORT';
        }
    };

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
                beløpet som er utbetalt tidligere. Dette er foreløpig et utkast, og den vises ikke for arbeidsgiver før
                den fullføres.
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
                    {korreksjonstype() === 'ETTERBETALING' && <BekreftUtbetalKorreksjon />}
                    {korreksjonstype() === 'TILBAKEKREVING' && <BekreftTilbakekrevKorreksjon />}
                    {korreksjonstype() === 'OPPGJORT' && <BekreftOppgjørKorreksjon />}
                </>
            )}
        </HvitBoks>
    );
};

export default KorreksjonSide;
