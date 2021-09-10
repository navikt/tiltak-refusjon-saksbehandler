import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Radio, RadioGruppe, SkjemaGruppe, TextareaControlled } from 'nav-frontend-skjema';
import { ForlengeDatoSkjemaGruppeFeil, finnFeilMeldingFraInputDialog } from '../../utils/forlengeDatoUtils';

interface Props {
    grunnlag: string;
    setGrunnlag: Dispatch<SetStateAction<string>>
    annetGrunnlag: string;
    setAnnetGrunnlag: Dispatch<SetStateAction<string>>
    skjemaGruppeFeilmeldinger: ForlengeDatoSkjemaGruppeFeil[] | []
}

const GrunnlagTilForlengelse: FunctionComponent<Props> = (props) => {
    const { grunnlag, setGrunnlag, annetGrunnlag, setAnnetGrunnlag, skjemaGruppeFeilmeldinger } = props;
    return (
        <div>
            <SkjemaGruppe>
                <RadioGruppe feil={finnFeilMeldingFraInputDialog(['mangler-grunnlag'], skjemaGruppeFeilmeldinger)}
                             legend='Årsaker til forlengelse av godkjenningsfristen?'>
                    <Radio label='Ikke tilgang' name='begrunnelse'
                           onClick={() => setGrunnlag('Ikke-tilgang')} />
                    <Radio label='Finner ikke inntekt fra a-melding' name='begrunnelse'
                           onClick={() => setGrunnlag('Finner ikke inntekt')} />
                    <Radio label='Ikke motttatt SMS med lenke til refusjon og varsel' name='begrunnelse'
                           onClick={() => setGrunnlag('Ikke mottatt SMS med lenke til refusjon og varsel')} />
                    <Radio label='annet' name='begrunnelse' onClick={() => setGrunnlag('annet')} />
                </RadioGruppe>
                {grunnlag.includes('annet') &&
                <TextareaControlled defaultValue=''
                                    feil={finnFeilMeldingFraInputDialog(['mangler-annet'], skjemaGruppeFeilmeldinger)}
                                    label='Oppgi grunnlag' maxLength={100}
                                    value={annetGrunnlag}
                                    onChange={event => setAnnetGrunnlag(event.target.value)} />}

            </SkjemaGruppe>
        </div>
    );
};
export default GrunnlagTilForlengelse;