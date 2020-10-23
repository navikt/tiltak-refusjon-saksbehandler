import axios from 'axios';
import useSWR from 'swr';
import { InnloggetSaksbehandler } from './App';
import { Refusjon } from './types/refusjon';

const api = axios.create({
    baseURL: '/api',
    timeout: 5000,
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
});

const axiosFetcher = (url: string) => api.get(url).then((res) => res.data);

const swrConfig = {
    fetcher: axiosFetcher,
    suspense: true,
};

export const hentInnloggetBruker = async () => {
    const response = await api.get('/innlogget-saksbehandler');
    return response.data as InnloggetSaksbehandler;
};

export const useHentRefusjoner = () => {
    const { data } = useSWR<Refusjon[]>(`/refusjon`, swrConfig);
    return data!;
};

export const useHentRefusjon = (id: string) => {
    const { data } = useSWR<Refusjon>(`/refusjon/${id}`, swrConfig);
    return data!;
};