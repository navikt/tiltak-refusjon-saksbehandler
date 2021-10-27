import axios from 'axios';
import useSWR, { mutate } from 'swr';
import { InnloggetBruker } from '../bruker/BrukerContextType';
import { Feature } from '../featureToggles/features';
import { Filter } from '../refusjon/oversikt/FilterContext';
import { Korreksjonsgrunn, Refusjon } from '../refusjon/refusjon';
import { ApiError, FeilkodeError } from '../types/errors';

const api = axios.create({
    baseURL: '/api/saksbehandler',
    timeout: 30000,
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
    validateStatus: (status) => status < 400,
});

const axiosFetcher = (url: string) => api.get(url).then((res) => res.data);

const swrConfig = {
    fetcher: axiosFetcher,
    suspense: true,
};

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 400 && error.response?.headers.feilkode) {
            throw new FeilkodeError(error.response?.headers.feilkode);
        }
        if (error.response?.status === 401 || error.response?.status === 403) {
            // Uinnlogget - vil ikke skje i miljø da appen er beskyttet
            return Promise.reject(error);
        }
        throw new ApiError('Feil ved kontakt mot baksystem.');
    }
);

export const hentInnloggetBruker = async () => {
    const response = await api.get<InnloggetBruker>(`/innlogget-bruker`);
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
    const response = await api.post<Refusjon>(`/refusjon/${refusjonId}/korriger`, { korreksjonsgrunner });

    return response.data;
};

export const endreBruttolønn = async (refusjonId: string, inntekterKunFraTiltaket: boolean, bruttoLønn?: number) => {
    const response = await api.post(`/refusjon/${refusjonId}/endre-bruttolønn`, {
        inntekterKunFraTiltaket,
        bruttoLønn,
    });

    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};

export const slettKorreksjon = async (refusjonId: string) => {
    const response = await api.post<Refusjon>(`/refusjon/${refusjonId}/slett-korreksjon`);

    return response.data;
};

export const hentFeatureToggles = async (featureToggles: Feature[]) => {
    const response = await api.get('/feature?' + featureToggles.map((feature) => `feature=${feature}`).join('&'));
    return response.data;
};

export interface ForlengFristRequest {
    nyFrist: string;
    årsak: string;
}

export const forlengFrist = async (refusjonId: string, nyFristValue: ForlengFristRequest) => {
    const response = await api.post<Refusjon>(`/refusjon/${refusjonId}/forleng-frist`, nyFristValue);
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};

export const utbetalKorreksjon = async (refusjonId: string, beslutterNavIdent: string) => {
    const response = await api.post<Refusjon>(`/refusjon/${refusjonId}/utbetal-korreksjon`, { beslutterNavIdent });
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};
export const fullførKorreksjonVedOppgjort = async (refusjonId: string) => {
    const response = await api.post<Refusjon>(`/refusjon/${refusjonId}/fullfør-korreksjon-ved-oppgjort`);
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};
export const fullførKorreksjonVedTilbakekreving = async (refusjonId: string) => {
    const response = await api.post<Refusjon>(`/refusjon/${refusjonId}/fullfør-korreksjon-ved-tilbakekreving`);
    await mutate(`/refusjon/${refusjonId}`);
    return response.data;
};
