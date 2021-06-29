import TilbakeTilOversiktLenke from '../TilbakeTilOversiktLenke/TilbakeTilOversiktLenke';
import BEMHelper from '../../utils/bem';
import React, { useEffect, useState } from 'react';

interface Props {
    enableScreenSizeCheck: boolean;
}

const cls = BEMHelper('avtaleside');

const OppgaveLinje: React.FunctionComponent<Props> = (props) => {
    const checksize: boolean = props.enableScreenSizeCheck ? window.innerWidth < 768 : !props.enableScreenSizeCheck;
    const [isMobile, setIsMobile] = useState<boolean>(checksize);

    useEffect(() => {
        document.addEventListener('resize', () => setIsMobile(checksize));
        return () => {
            document.removeEventListener('resize', () => setIsMobile(checksize));
        };
    }, [props.enableScreenSizeCheck, checksize]);

    return (
        <>
            {!isMobile && (
                <>
                    <div className={cls.element('lenkerlinje')} role="menu">
                        <TilbakeTilOversiktLenke onClick={() => {}} />
                        <div className={cls.element('avbrytOgDelLenk')}></div>
                    </div>
                </>
            )}
        </>
    );
};

export default OppgaveLinje;
