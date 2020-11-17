import AlertStripe from 'nav-frontend-alertstriper';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import HvitBoks from '../Komponenter/HvitBoks';
import { useHentRefusjon } from '../rest-service';
import { useParams } from 'react-router-dom';
import './RefusjonSide.less';
import bem from '../utils/bem';

const cls = bem('refusjon-side');

const RefusjonSide: FunctionComponent = () => {
    const { id } = useParams();
    const refusjon = useHentRefusjon(id);

    return (
        <div className={cls.className}>
            <div className={cls.element('kolonne')}>
                <HvitBoks>
                    <Undertittel>Informasjon om tiltaket</Undertittel>
                    <AlertStripe type="advarsel" form="inline">
                        Arbeidsgiver ønsker korrigeringer i refusjonsgrunnlaget
                    </AlertStripe>
                    <Element>Type tiltak</Element>
                    <Normaltekst>{refusjon.tiltakstype}</Normaltekst>
                </HvitBoks>
                <HvitBoks>
                    <Undertittel>Fravær som gir trekk</Undertittel>
                </HvitBoks>
                <HvitBoks>
                    <Undertittel>Korrigeringsønsker fra arbeidsgiver</Undertittel>
                </HvitBoks>
            </div>
            <div className={cls.element('kolonne')}>
                <HvitBoks>
                    <Undertittel>NAVs utregning</Undertittel>
                </HvitBoks>
            </div>
        </div>
    );
};

export default RefusjonSide;
