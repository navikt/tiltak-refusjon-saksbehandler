import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { InnloggetBruker } from '../bruker/BrukerContextType';
import { feilmelding } from '../feilkodemapping';
import { Filter } from '../refusjon/oversikt/FilterContext';
import { Refusjon } from '../refusjon/refusjon';
import { Feature } from '../featureToggles/features';

export const API_URL = '/api/saksbehandler';

export class FeilkodeError extends Error {}

const api = axios.create({
    baseURL: '/api/saksbehandler',
    timeout: 30000,
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
    validateStatus: (status) => status < 400,
});

// eslint-disable-next-line
const håndterFeil = (error: AxiosError) => {
    const feilkode = error.response?.headers.feilkode;
    if (feilkode) {
        return Promise.reject({ feilkode, feilmelding: feilmelding(feilkode) });
    }
    return Promise.reject(error);
};

const axiosFetcher = (url: string) => api.get(url).then((res) => res.data);

const swrConfig = {
    fetcher: axiosFetcher,
    suspense: true,
};

export const hentInnloggetBruker = async () => {
    const response = await axios.get<InnloggetBruker>(`${API_URL}/innlogget-bruker`);
    return response.data;
};

export const useHentRefusjoner = (filter: Filter) => {
    const manglerSøkekriterier =
        !filter.veilederNavIdent && !filter.enhet && !filter.deltakerFnr && !filter.bedriftNr && !filter.avtaleNr;
    const urlSearchParams = new URLSearchParams(removeEmpty(filter));
    const { data } = useSWR<Refusjon[]>(manglerSøkekriterier ? null : `/refusjon?${urlSearchParams}`, swrConfig);
    return data;
};

const removeEmpty = (obj: any) => {
    Object.keys(obj).forEach((k) => !obj[k] && delete obj[k]);
    return obj;
};

export const useHentRefusjon = (refusjonId: string) => {
    const { data } = useSWR<Refusjon>(`/refusjon/${refusjonId}`, swrConfig);
    return data!;
};

export const useHentTidligereRefusjoner = (refusjonId: string) => {
    const { data } = useSWR<Refusjon[]>(`/refusjon/${refusjonId}/tidligere-refusjoner`, swrConfig);
    return data!;
};

export const hentFeatureToggles = async (featureToggles: Feature[]) => {
    const response = await api.get('/feature?' + featureToggles.map((feature) => `feature=${feature}`).join('&'));
    return response.data;
};
