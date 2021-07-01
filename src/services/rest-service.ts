import axios, { AxiosError } from 'axios';
import useSWR from 'swr';
import { InnloggetBruker } from '../bruker/BrukerContextType';
import { feilmelding } from '../feilkodemapping';
import { Refusjon } from '../refusjon/refusjon';
import { Status } from '../refusjon/status';
import { Tiltak } from '../refusjon/tiltak';

export const API_URL = '/api/saksbehandler';

export class FeilkodeError extends Error {}

const api = axios.create({
    baseURL: '/api/saksbehandler',
    timeout: 5000,
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

export const useHentRefusjoner = (bedriftnummer?: string, status?: Status, tiltakstype?: Tiltak) => {
    const { data } = useSWR<Refusjon[]>(
        `/refusjon?bedriftNr=${bedriftnummer || ''}&status=${status || ''}&tiltakstype=${tiltakstype || ''}`,
        swrConfig
    );
    return data!;
};

export const useHentRefusjon = (refusjonId: string) => {
    const { data } = useSWR<Refusjon>(`/refusjon/${refusjonId}`, swrConfig);
    return data!;
};

export const useHentTidligereRefusjoner = (refusjonId: string) => {
    const { data } = useSWR<Refusjon[]>(`/refusjon/${refusjonId}/tidligere-refusjoner`, swrConfig);
    return data!;
};
