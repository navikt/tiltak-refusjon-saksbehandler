import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import HvitBoks from '../../komponenter/hvitboks/HvitBoks';
import StatusTekst from '../../komponenter/StatusTekst/StatusTekst';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { useHentRefusjon } from '../../services/rest-service';
import './RefusjonSide.less';
import Utregning from './Utregning';
import InformasjonFraAvtalen from './InformasjonFraAvtalen';
import InntekterFraAMeldingen from './InntekterFraAMeldingen';
import InntekterFraTiltaketSvar from './InntekterFraTiltaketSvar';

const RefusjonSide: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    return (
        <HvitBoks>
            <VerticalSpacer rem={2} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Innholdstittel role="heading">Beregning av refusjon</Innholdstittel>
                <StatusTekst
                    status={refusjon.status}
                    tilskuddFom={refusjon.tilskuddsgrunnlag.tilskuddFom}
                    tilskuddTom={refusjon.tilskuddsgrunnlag.tilskuddTom}
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
            <InformasjonFraAvtalen />
            <VerticalSpacer rem={2} />
            <InntekterFraAMeldingen />
            <VerticalSpacer rem={2} />
            <InntekterFraTiltaketSvar />
            <VerticalSpacer rem={2} />
            {refusjon.beregning && (
                <Utregning refusjon={refusjon} />
            )}
        </HvitBoks>
    );
};

export default RefusjonSide;
