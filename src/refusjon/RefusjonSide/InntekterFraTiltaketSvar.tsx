import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useParams } from 'react-router';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { tiltakstypeTekst } from '../../messages';
import { useHentRefusjon } from '../../services/rest-service';
import { formatterPenger } from '../../utils/PengeUtils';

const InntekterFraTiltaketSvar: FunctionComponent = () => {
    const { refusjonId } = useParams();
    const refusjon = useHentRefusjon(refusjonId);

    const svar = () => {
        switch (refusjon.inntekterKunFraTiltaket) {
            case true:
                return 'Ja';
            case false:
                return 'Nei';
            default:
                return 'Ikke besvart';
        }
    };

    return (
        <div>
            <Element>
                Er inntektene som vi har hentet ({formatterPenger(refusjon.inntektsgrunnlag!!.bruttoLønn)}) kun fra
                tiltaket {tiltakstypeTekst[refusjon.tilskuddsgrunnlag.tiltakstype]}?{' '}
            </Element>
            <Normaltekst>{svar()}</Normaltekst>
            {refusjon.korrigertBruttoLønn !== null && refusjon.korrigertBruttoLønn !== undefined && (
                <>
                    <VerticalSpacer rem={1} />
                    <Element>Korrigert brutto lønn:</Element>
                    <Normaltekst>{formatterPenger(refusjon.korrigertBruttoLønn)}</Normaltekst>
                </>
            )}
        </div>
    );
};

export default InntekterFraTiltaketSvar;
