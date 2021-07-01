import { HoyreChevron, VenstreChevron } from 'nav-frontend-chevron';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import BEMHelper from '../utils/bem';
import { AlleSteg } from '../refusjon/refusjon';

interface Props {
    alleSteg: AlleSteg[];
    index: number;
    url: string;
}

const cls = BEMHelper('refusjonside');

const FremTilbakeNavigasjon: FunctionComponent<Props> = (props: Props) => {
    const skalViseNavigasjon = props.alleSteg.filter((steg) => !steg.disabled).length > 1;

    return skalViseNavigasjon ? (
        <nav className={cls.element('fremTilbakeNavigasjon')}>
            <Link
                className={cls.element('navigasjon')}
                to={{
                    pathname: `${props.url}/${props.alleSteg[props.index === 0 ? 0 : props.index - 1].path}`,
                    search: window.location.search,
                }}
            >
                <div aria-hidden={true}>
                    <VenstreChevron />
                </div>
                <span>Tilbake</span>
            </Link>
            <Link
                className={cls.element('navigasjon')}
                to={{
                    pathname: `${props.url}/${
                        props.alleSteg[props.index === props.alleSteg.length - 2 ? props.index : props.index + 1].path
                    }`,
                    search: window.location.search,
                }}
            >
                <span>Neste</span>
                <div aria-hidden={true}>
                    <HoyreChevron />
                </div>
            </Link>
        </nav>
    ) : null;
};

export default FremTilbakeNavigasjon;
