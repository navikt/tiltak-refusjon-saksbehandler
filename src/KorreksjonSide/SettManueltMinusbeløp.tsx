import { TextField } from '@navikt/ds-react';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFeatureToggles } from '../featureToggles/FeatureToggleProvider';
import { Feature } from '../featureToggles/features';
import { settMinusbeløpManuelt } from '../services/rest-service';

const SettManueltMinusbeløp: FunctionComponent = () => {
    const { korreksjonId } = useParams<{ korreksjonId: string }>();
    const [belop, setBelop] = useState<string>('');
    const featureToggles = useFeatureToggles();

    if (!featureToggles[Feature.OpprettNullBelopKorreksjon]) {
        return null;
    } else {
        return (
            <div>
                <TextField
                    size="small"
                    label={`Refusjonsbeløpet på grunn av fravær`}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        const verdi: string = event.currentTarget.value;
                        if (verdi.match(/^\d*$/)) {
                            setBelop(verdi);
                        }
                        if (!verdi) {
                            setBelop('');
                        }
                    }}
                    onBlur={() => settMinusbeløpManuelt(korreksjonId!, parseInt(belop, 10))}
                    value={belop}
                />
            </div>
        );
    }
};

export default SettManueltMinusbeløp;
