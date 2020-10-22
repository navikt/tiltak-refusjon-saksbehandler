import axios from 'axios';
import useSWR, { responseInterface } from 'swr';
import { InnloggetSaksbehandler } from './App';
import { Refusjon } from './types/refusjon';

export type Laster = { laster: true; feil: boolean };
export type Lastet<T> = { data: T; laster: false; feil: boolean };
export type Nettressurs<T> = Laster | Lastet<T>;

function tilNettressurs<T>({ data, error }: responseInterface<T, any>): Nettressurs<T> {
    const laster = !error && !data;
    if (laster) {
        return { laster, feil: !!error };
    } else {
        return { data: data!, laster, feil: !!error };
    }
}

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

export const useHentRefusjon = (id: string): Nettressurs<Refusjon> => {
    return tilNettressurs(
        useSWR<Refusjon>(`/refusjon/${id}`, {
            fetcher: axiosFetcher,
        })
    );
};
