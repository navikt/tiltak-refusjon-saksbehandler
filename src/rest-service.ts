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

export const hentInnloggetBruker = async () => {
    const response = await api.get('/innlogget-saksbehandler');
    return response.data as InnloggetSaksbehandler;
};

export const hentRefusjoner = async () => {
    const response = await api.get('/refusjon');
    return response.data as Refusjon[];
};

export const useHentRefusjoner = () => {
    const { data, error } = useSWR(`/refusjon`, axiosFetcher);
    return {
        refusjoner: data as Refusjon[],
        isLoading: !error && !data,
        isError: error,
    };
};

export const useHentRefusjon = (id: string) => {
    const { data, error } = useSWR(`/refusjon/${id}`, {
        fetcher: axiosFetcher,
    });
    return {
        refusjon: data as Refusjon,
        isLoading: !error && !data,
        isError: error,
    };
};
