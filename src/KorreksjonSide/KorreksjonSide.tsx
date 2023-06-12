import { Innholdstittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import HvitBoks from '../komponenter/hvitboks/HvitBoks';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import { KorreksjonStatus } from '../refusjon/refusjon';
import BekreftOppgjørKorreksjon from '../refusjon/RefusjonSide/BekreftOppgjørKorreksjon';
import BekreftSlettKorreksjon from '../refusjon/RefusjonSide/BekreftSlettKorreksjon';
import BekreftTilbakekrevKorreksjon from '../refusjon/RefusjonSide/BekreftTilbakekrevKorreksjon';
import BekreftUtbetalKorreksjon from '../refusjon/RefusjonSide/BekreftUtbetalKorreksjon';
import InformasjonFraAvtalen from '../refusjon/RefusjonSide/InformasjonFraAvtalen';
import InntekterFraAMeldingen from '../refusjon/RefusjonSide/InntekterFraAMeldingen';
import InntekterFraTiltaketSpørsmål from '../refusjon/RefusjonSide/InntekterFraTiltaketSpørsmål';
import Utregning from '../refusjon/RefusjonSide/Utregning';
import { useHentKorreksjon } from '../services/rest-service';
import { BodyShort } from '@navikt/ds-react';

const KorreksjonSide: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
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
                <Innholdstittel role="heading">Korreksjonsutkast</Innholdstittel>
            </div>

            <VerticalSpacer rem={1} />
            <BodyShort size="small">
                Dette er en korreksjon av tidligere utbetalt refusjon. Det beregnes her et foreløpig oppgjør fratrukket
                beløpet som er utbetalt tidligere. Dette er foreløpig et utkast, og den vises ikke for arbeidsgiver før
                den fullføres.
            </BodyShort>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={korreksjon.refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={korreksjon.refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={korreksjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
            />
            <VerticalSpacer rem={2} />
            <InntekterFraAMeldingen
                inntektsgrunnlag={korreksjon.refusjonsgrunnlag.inntektsgrunnlag}
                refusjonsgrunnlag={korreksjon.refusjonsgrunnlag}
                unntakOmInntekterFremitid={0}
                kvitteringVisning={false}
                korreksjonId={korreksjon.id}
            />
            <VerticalSpacer rem={2} />
            {korreksjon.harTattStillingTilAlleInntektslinjer && (
                <>
                    <InntekterFraTiltaketSpørsmål refusjonsgrunnlag={korreksjon.refusjonsgrunnlag} />
                    <VerticalSpacer rem={2} />
                    {korreksjon.refusjonsgrunnlag.beregning && (
                        <>
                            <Utregning
                                beregning={korreksjon.refusjonsgrunnlag.beregning}
                                tilskuddsgrunnlag={korreksjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                                forrigeRefusjonMinusBeløp={korreksjon.refusjonsgrunnlag.forrigeRefusjonMinusBeløp}
                            />
                            <VerticalSpacer rem={1} />
                            {korreksjonstype() === 'TILLEGSUTBETALING' && <BekreftUtbetalKorreksjon />}
                            {korreksjonstype() === 'TILBAKEKREVING' && <BekreftTilbakekrevKorreksjon />}
                            {korreksjonstype() === 'OPPGJORT' && <BekreftOppgjørKorreksjon />}
                        </>
                    )}
                </>
            )}
        </HvitBoks>
    );
};

export default KorreksjonSide;
