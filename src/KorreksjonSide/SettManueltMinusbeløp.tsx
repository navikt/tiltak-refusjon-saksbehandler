import { Alert, TextField } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFeatureToggles } from '../featureToggles/FeatureToggleProvider';
import { Feature } from '../featureToggles/features';
import VerticalSpacer from '../komponenter/VerticalSpacer';
import { settMinusbeløpManuelt } from '../services/rest-service';

const SettManueltMinusbeløp: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const [belop, setBelop] = useState<string>('');
    const featureToggles = useFeatureToggles();

    if (!featureToggles[Feature.ManueltMinusbelop]) {
        return null;
    } else {
        return (
            <>
                <VerticalSpacer rem={1} />
                <div>
                    <Alert variant="warning">
                        <TextField
                            style={{ width: '12rem' }}
                            size="small"
                            label="Manuelt minusbeløp"
                            description="Skriv inn manuelt minusbeløp her. Dette vil bli lagt til i utregningen som om det hadde ligget i minusbeløptabellen"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                const verdi: string = event.currentTarget.value;
                                if (verdi.match(/^-\d*$/)) {
                                    setBelop(verdi);
                                }
                                if (!verdi) {
                                    setBelop('');
                                }
                            }}
                            onBlur={() => settMinusbeløpManuelt(korreksjonId!, parseInt(belop, 10))}
                            value={belop}
                        />
                    </Alert>
                </div>
                <VerticalSpacer rem={1} />
            </>
        );
    }
};

export default SettManueltMinusbeløp;
