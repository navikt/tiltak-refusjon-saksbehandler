import { File, People, Office1, Receipt } from '@navikt/ds-icons';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import EksternLenke from '../../komponenter/EksternLenke/EksternLenke';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterPeriode } from '../../utils/datoUtils';
import { formatterPenger } from '../../utils/PengeUtils';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Column = styled.div`
    flex-direction: column;
    margin-rigt
`;

const Rad = styled.div`
    display: flex;
    * {
        margin-right: 0.5rem;
    }
`;

const NokkelInfo: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    const avtaleLenke = `http://arbeidsgiver.nav.no/tiltaksgjennomforing/avtale/${refusjon.tilskuddsgrunnlag.avtaleId}`;

    return (
        <div>
            <Wrapper>
                <Column>
                    <Office1 />
                    <Rad>
                        <Element>Arbeidsgiver:</Element>
                        <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNavn}</Normaltekst>
                    </Rad>
                    <VerticalSpacer rem={1} />
                    <Rad>
                        <Element>Bedriftsnummer:</Element>
                        <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNr}</Normaltekst>
                    </Rad>
                    <VerticalSpacer rem={1} />
                    <Rad>
                        <Element>Telefon:</Element>
                        <Normaltekst>{refusjon.tilskuddsgrunnlag.bedriftNr}</Normaltekst>
                    </Rad>
                    <VerticalSpacer rem={1} />
                    <Rad>
                        <Element>Kontonummer:</Element>
                        <Normaltekst>{refusjon.bedriftKontonummer}</Normaltekst>
                    </Rad>
                    <VerticalSpacer rem={1} />
                    <Rad>
                        <EksternLenke href={avtaleLenke}>
                            <File />
                            Avtale om {tiltakstypeTekst[refusjon.tilskuddsgrunnlag.tiltakstype]}
                        </EksternLenke>
                    </Rad>
                </Column>
                <Column>
                    <Receipt />
                    <Rad>
                        <Element>Refusjonsnr:</Element>
                        <Normaltekst>{refusjon.id}</Normaltekst>
                    </Rad>
                    <VerticalSpacer rem={1} />
                    <Rad>
                        <Element>Periode: </Element>
                        <Normaltekst>
                            {formatterPeriode(
                                refusjon.tilskuddsgrunnlag.tilskuddFom,
                                refusjon.tilskuddsgrunnlag.tilskuddTom
                            )}
                        </Normaltekst>
                    </Rad>
                    <VerticalSpacer rem={1} />
                    <Rad>
                        <Element>Frist:</Element>
                        <Normaltekst>{refusjon.fristForGodkjenning}</Normaltekst>
                    </Rad>
                    <VerticalSpacer rem={1} />
                    <Rad>
                        <Element>Avtalt beløp for perioden:</Element>
                        <Normaltekst>inntil {formatterPenger(refusjon.tilskuddsgrunnlag.tilskuddsbeløp)}</Normaltekst>
                    </Rad>
                    <VerticalSpacer rem={1} />
                    <Rad>
                        <People />
                        <Element>Deltaker: </Element>
                        <Normaltekst>
                            {refusjon.tilskuddsgrunnlag.deltakerFornavn} {refusjon.tilskuddsgrunnlag.deltakerEtternavn}
                        </Normaltekst>
                    </Rad>
                </Column>
            </Wrapper>
            {refusjon.bedriftKontonummer === null && (
                <>
                    <VerticalSpacer rem={1} />
                    <AlertStripeAdvarsel>
                        Vi kan ikke finne noe kontonummer på deres virksomhet. Riktig kontonummer må sendes inn via
                        Altinn.
                    </AlertStripeAdvarsel>
                </>
            )}
        </div>
    );
};

export default NokkelInfo;
