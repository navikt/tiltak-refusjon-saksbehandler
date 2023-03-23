import { AlertStripeAdvarsel, AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import StatusTekst from '../../komponenter/StatusTekst/StatusTekst';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import InformasjonFraAvtalen from './InformasjonFraAvtalen';
import InntekterFraAMeldingen from './InntekterFraAMeldingen';
import InntekterFraTiltaketSvarGammel from './InntekterFraTiltaketSvarGammel';
import './RefusjonSide.less';
import Utregning from './Utregning';
import Lenke from 'nav-frontend-lenker';
import TidligereRefunderbarBeløpKvittering from './TidligereRefunderbarBeløpKvittering';

const RefusjonSide: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <HvitBoks>
            {refusjon.forrigeRefusjonSomSkalSendesFørst != null && (
                <>
                    <AlertStripeAdvarsel>
                        <Lenke href={'/refusjon/' + refusjon.forrigeRefusjonSomSkalSendesFørst.id}>
                            <b>Refusjon:</b>{' '}
                            {refusjon.forrigeRefusjonSomSkalSendesFørst.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr}-
                            {refusjon.forrigeRefusjonSomSkalSendesFørst.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer}
                        </Lenke>{' '}
                        må sendes inn før du kan sende inn denne refusjonen:{' '}
                        {refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.avtaleNr +
                            '-' +
                            refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.løpenummer}
                        .
                    </AlertStripeAdvarsel>
                    <VerticalSpacer rem={1} />
                </>
            )}
            {refusjon.status === 'KLAR_FOR_INNSENDING' && refusjon.refusjonsgrunnlag.inntektsgrunnlag === null && (
                <AlertStripeInfo>
                    <Element> Obs! Arbeidsgiver har ikke vært inne på denne refusjonen.</Element>
                    Det har aldri vært forsøkt hentet inntektsgrunnlag og kontonummer, noe som gjøres hver gang
                    arbeidsgiver åpner refusjoner som er klare for innsending.
                </AlertStripeInfo>
            )}
            <VerticalSpacer rem={2} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Innholdstittel role="heading">Beregning av refusjon</Innholdstittel>
                <StatusTekst
                    status={refusjon.status}
                    tilskuddFom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom}
                    tilskuddTom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom}
                />
            </div>

            <VerticalSpacer rem={1} />
            <Normaltekst>
                Vi henter inntektsopplysninger for deltakeren fra a-meldingen automatisk. Hvis inntektsopplysningene
                ikke stemmer så må det{' '}
                <EksternLenke href={'https://www.altinn.no/skjemaoversikt/a-ordningen/a-melding2/'}>
                    oppdateres i A-meldingen hos Altinn.
                </EksternLenke>
                Feriepenger, innskudd obligatorisk tjenestepensjon, arbeidsgiveravgiften og lønnstilskuddsprosenten er
                hentet fra avtalen om midlertidig lønnstilskudd.
            </Normaltekst>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKontonummer={refusjon.refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={refusjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
                fristForGodkjenning={refusjon.fristForGodkjenning}
                forrigeFristForGodkjenning={refusjon.forrigeFristForGodkjenning}
            />
            <VerticalSpacer rem={2} />
            <InntekterFraAMeldingen
                inntektsgrunnlag={refusjon.refusjonsgrunnlag.inntektsgrunnlag}
                kvitteringVisning={true}
            />
            <VerticalSpacer rem={2} />
            <InntekterFraTiltaketSvarGammel refusjonsgrunnlag={refusjon.refusjonsgrunnlag} />
            <VerticalSpacer rem={2} />
            <TidligereRefunderbarBeløpKvittering refusjon={refusjon} />
            <VerticalSpacer rem={2} />
            {refusjon.refusjonsgrunnlag.beregning && (
                <Utregning
                    beregning={refusjon.refusjonsgrunnlag.beregning}
                    tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                    forrigeRefusjonMinusBeløp={refusjon.refusjonsgrunnlag.forrigeRefusjonMinusBeløp}
                />
            )}
        </HvitBoks>
    );
};

export default RefusjonSide;
