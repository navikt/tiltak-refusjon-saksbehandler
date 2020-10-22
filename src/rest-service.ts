import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 5000,
    withCredentials: true,
    headers: { Pragma: 'no-cache', 'Cache-Control': 'no-cache' },
});

export const hentInnloggetBruker = async () => {
    const response = await api.get("/innlogget-saksbehandler");
    return response.data;
}