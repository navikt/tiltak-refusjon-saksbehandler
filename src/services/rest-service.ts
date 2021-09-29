import axios, { AxiosError } from 'axios';
import useSWR, { mutate } from 'swr';
import { InnloggetBruker } from '../bruker/BrukerContextType';
import { feilmelding } from '../feilkodemapping';
import { Filter } from '../refusjon/oversikt/FilterContext';
import { Korreksjonsgrunn, Refusjon } from '../refusjon/refusjon';
import { Feature } from '../featureToggles/features';
import { NyFristRequest } from '../utils/forlengeDatoUtils';

export const API_URL = '/api/saksbehandler';

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

export const korriger = async (refusjonId: string, korreksjonsgrunner: Korreksjonsgrunn[]) => {
    const response = await axios
        .post<Refusjon>(`${API_URL}/refusjon/${refusjonId}/korriger`, { korreksjonsgrunner })
        .catch(håndterFeil);
    return response.data;
};

export const korrigerBruttolønn = async (
    refusjonId: string,
    inntekterKunFraTiltaket: boolean,
    korrigertBruttoLønn?: number
) => {
    const response = await axios
        .post(`${API_URL}/refusjon/${refusjonId}/korriger-bruttolønn`, {
            inntekterKunFraTiltaket: inntekterKunFraTiltaket,
            korrigertBruttoLønn: korrigertBruttoLønn,
        })
        .catch(håndterFeil);
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};

export const slettKorreksjon = async (refusjonId: string) => {
    const response = await axios
        .post<Refusjon>(`${API_URL}/refusjon/${refusjonId}/slett-korreksjon`)
        .catch(håndterFeil);
    return response.data;
};

export const utbetalKorreksjon = async (refusjonId: string) => {
    const response = await axios
        .post<Refusjon>(`${API_URL}/refusjon/${refusjonId}/utbetal-korreksjon`)
        .catch(håndterFeil);
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};

export const hentFeatureToggles = async (featureToggles: Feature[]) => {
    const response = await api.get('/feature?' + featureToggles.map((feature) => `feature=${feature}`).join('&'));
    return response.data;
};

export const endreRefusjonFrist = async (refusjonId: string, nyFristValue: NyFristRequest) => {
    const response = await axios
        .post<Refusjon>(`${API_URL}/refusjon/${refusjonId}/endre-refusjon-frist`, { ...nyFristValue })
        .catch(håndterFeil);
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};
