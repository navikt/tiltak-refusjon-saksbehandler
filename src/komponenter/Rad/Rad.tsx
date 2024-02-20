import React, { PropsWithChildren } from 'react';
import BEMHelper from '../../utils/bem';
import './Rad.less';

interface Props {
    noSpace? : boolean
    children? : React.ReactNode
}

const Row: React.FunctionComponent<Props> = ({children, noSpace}) => {

    const cls = BEMHelper('rad');

    console.log(cls.className + ' ' +  (noSpace ? ' ' : cls.element('space')))

    return (
        <div className={cls.className + ' ' +  (noSpace ? ' ' : cls.element('space'))}>
        {children}
        </div>
    );
};

export default Row;
