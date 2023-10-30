import React, { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';
import BEMHelper from '../../utils/bem';
import { Button, Checkbox, CheckboxGroup, Modal, Table } from '@navikt/ds-react';
import { storForbokstav } from '../../utils/stringUtils';
import HendelseIkon from './HendelseIkon';
import { formatterDato, NORSK_DATO_OG_TID_FORMAT } from '../../utils/datoUtils';
import './Hendelseslogg.less';
import { Hendelse, HendelseType } from '../refusjon';
import { hendelseTekst } from '../../messages';
import { hentHendelser } from '../../services/rest-service';
import { Nettressurs, Status } from '../../nettressurs';

type Props = {
    refusjonId?: string;
};
const cls = BEMHelper('hendelseslogg');

interface SortertListe extends Hendelse {
    skjules: boolean;
}

const HendelsesLogg: FunctionComponent<Props> = (props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [komprimer, setKomprimer] = useState<string[]>(['']);
    const [hendelselogg, setHendelselogg] = useState<Nettressurs<SortertListe[]>>({ status: Status.IkkeLastet });

    const UtgråetTekst: FunctionComponent<PropsWithChildren<{ grå: boolean; title?: string }>> = ({
        children,
        grå,
        title,
    }) => (
        <span title={title} style={{ color: grå ? 'grey' : undefined, whiteSpace: 'pre-wrap' }}>
            {children}
        </span>
    );

    useEffect(() => {
        if (open) {
            setHendelselogg({ status: Status.LasterInn });
            hentHendelser(props.refusjonId!)
                .then((data: Hendelse[]) =>
                    setHendelselogg({
                        status: Status.Lastet,
                        data: data
                            .map((v) => ({ ...v, skjules: false }))
                            .sort((a, b) => {
                                if (a.tidspunkt < b.tidspunkt) {
                                    return -1;
                                }
                                if (a.tidspunkt > b.tidspunkt) {
                                    return 1;
                                }
                                return 0;
                            }),
                    })
                )
                .catch((error: Error) => setHendelselogg({ status: Status.Feil, error: error.message }));
        }
    }, [open]);

    let finnesMinstEnSomSkjules = false;

    if (hendelselogg.status === Status.Lastet) {
        for (let i = 1; i < hendelselogg.data.length; i++) {
            const forrigeVarsel = hendelselogg.data[i - 1];
            const gjeldendeVarsel = hendelselogg.data[i];

            if (forrigeVarsel.event === gjeldendeVarsel.event && forrigeVarsel.utførtAv === gjeldendeVarsel.utførtAv) {
                forrigeVarsel.skjules = true;
                finnesMinstEnSomSkjules = true;
            }
        }
    }

    return (
        <div className={cls.className}>
            <Button
                size="small"
                variant="secondary"
                className={cls.element('openButton')}
                onClick={() => setOpen(!open)}
            >
                Hendelselogg
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-label="Hendelseslogg"
                className={cls.element('modal')}
            >
                <Modal.Header>
                    <h1>Hendelseslogg</h1>
                </Modal.Header>
                <Modal.Body>
                    {finnesMinstEnSomSkjules && (
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <CheckboxGroup legend="" onChange={(value: any) => setKomprimer(value)}>
                                <Checkbox value="ikke_komprimer">Vis alle hendelser</Checkbox>
                            </CheckboxGroup>
                        </div>
                    )}
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell scope="col"> Tidspunkt </Table.HeaderCell>
                                <Table.HeaderCell scope="col"> Hendelse </Table.HeaderCell>
                                <Table.HeaderCell scope="col"> Utført av </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {hendelselogg.status === Status.Lastet &&
                                hendelselogg.data
                                    .filter((v) => !v.skjules || komprimer.includes('ikke_komprimer'))
                                    .map((varsel) => (
                                        <Table.Row key={varsel.id} role="row">
                                            <Table.DataCell role="cell" aria-labelledby="tidspunkt">
                                                <UtgråetTekst
                                                    title={formatterDato(varsel.tidspunkt)}
                                                    grå={varsel.skjules}
                                                >
                                                    {formatterDato(varsel.tidspunkt, NORSK_DATO_OG_TID_FORMAT)}
                                                </UtgråetTekst>
                                            </Table.DataCell>
                                            <Table.DataCell
                                                className={cls.className}
                                                role="cell"
                                                aria-labelledby={'event'}
                                                key={'event'}
                                            >
                                                <div className={cls.element('ikonRad')} about={varsel.event}>
                                                    <HendelseIkon hendelse={varsel.event as HendelseType} />
                                                    <span style={{ marginLeft: '0.2rem' }}>
                                                        <UtgråetTekst
                                                            title={formatterDato(varsel.tidspunkt)}
                                                            grå={varsel.skjules}
                                                        >
                                                            {hendelseTekst[varsel.event] +
                                                                ` ${
                                                                    varsel.metadata &&
                                                                    'antallMndFremITid' in varsel.metadata
                                                                        ? `(${varsel.metadata.antallMndFremITid} måneder)`
                                                                        : ''
                                                                }`}
                                                        </UtgråetTekst>
                                                    </span>
                                                </div>
                                            </Table.DataCell>
                                            <Table.DataCell role="cell" aria-labelledby={'utførtAv'} key={'utførtAv'}>
                                                <div className={'ikonRad'} aria-labelledby="varsel">
                                                    <span style={{ marginRight: '0.5rem' }} aria-hidden="true">
                                                        <UtgråetTekst
                                                            title={formatterDato(varsel.tidspunkt)}
                                                            grå={varsel.skjules}
                                                        >
                                                            {storForbokstav(varsel.utførtAv ? varsel.utførtAv : '')}
                                                        </UtgråetTekst>
                                                    </span>
                                                </div>
                                            </Table.DataCell>
                                        </Table.Row>
                                    ))}
                        </Table.Body>
                    </Table>
                </Modal.Body>
            </Modal>
        </div>
    );
};
export default HendelsesLogg;
