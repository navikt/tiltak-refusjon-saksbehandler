import { Alert, BodyShort, Heading, Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import StatusTekst from '../../komponenter/StatusTekst/StatusTekst';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import { useHentRefusjon } from '../../services/rest-service';
import InformasjonFraAvtalen from './InformasjonFraAvtalen';
import InntekterFraAMeldingen from './InntekterFraAMeldingen/InntekterFraAMeldingen';
import InntekterFraTiltaketSvarGammel from './InntekterFraTiltaketSvarGammel';
import './RefusjonSide.less';
import TidligereRefunderbarBeløpKvittering from './TidligereRefunderbarBeløpKvittering';
import Utregning from './Utregning';

const RefusjonSide: FunctionComponent = () => {
    const { refusjonId } = useParams<{ refusjonId: string }>();

    if (refusjonId === undefined) return null;

    const refusjon = useHentRefusjon(refusjonId);

    return (
        <HvitBoks>
            {refusjon.status === 'KLAR_FOR_INNSENDING' && refusjon.refusjonsgrunnlag.inntektsgrunnlag === null && (
                <Alert variant="info" size="small">
                    <Label> Obs! Arbeidsgiver har ikke vært inne på denne refusjonen.</Label>
                    Det har aldri vært forsøkt hentet inntektsgrunnlag og kontonummer, noe som gjøres hver gang
                    arbeidsgiver åpner refusjoner som er klare for innsending.
                </Alert>
            )}
            <VerticalSpacer rem={2} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading size="large">Beregning av refusjon</Heading>
                <StatusTekst
                    status={refusjon.status}
                    tilskuddFom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom}
                    tilskuddTom={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom}
                />
            </div>

            <VerticalSpacer rem={1} />
            <BodyShort size="small">
                Vi henter inntektsopplysninger for deltakeren fra a-meldingen automatisk. Hvis inntektsopplysningene
                ikke stemmer så må det{' '}
                <EksternLenke href={'https://www.altinn.no/skjemaoversikt/a-ordningen/a-melding2/'}>
                    oppdateres i A-meldingen hos Altinn.
                </EksternLenke>
                Feriepenger, innskudd obligatorisk tjenestepensjon, arbeidsgiveravgiften og lønnstilskuddsprosenten er
                hentet fra avtalen om midlertidig lønnstilskudd.
            </BodyShort>
            <VerticalSpacer rem={2} />
            <InformasjonFraAvtalen
                tilskuddsgrunnlag={refusjon.refusjonsgrunnlag.tilskuddsgrunnlag}
                bedriftKid={refusjon.refusjonsgrunnlag.bedriftKid}
                bedriftKontonummer={refusjon.refusjonsgrunnlag.bedriftKontonummer}
                bedriftKontonummerInnhentetTidspunkt={refusjon.refusjonsgrunnlag.bedriftKontonummerInnhentetTidspunkt}
                fristForGodkjenning={refusjon.fristForGodkjenning}
                forrigeFristForGodkjenning={refusjon.forrigeFristForGodkjenning}
            />
            <VerticalSpacer rem={2} />
            <InntekterFraAMeldingen
                inntektsgrunnlag={refusjon.refusjonsgrunnlag.inntektsgrunnlag}
                kvitteringVisning={true}
                refusjonsgrunnlag={refusjon.refusjonsgrunnlag}
                unntakOmInntekterFremitid={refusjon.unntakOmInntekterFremitid}
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
