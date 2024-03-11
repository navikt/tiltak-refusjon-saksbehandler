import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
const axios = require('axios');

function parseCookies(request) {
    const list = {};
    const cookieHeader = request.headers?.cookie;
    if (!cookieHeader) return list;

    cookieHeader.split(`;`).forEach(function (cookie) {
        let [name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
    });

    return list;
}

// https://vitejs.dev/config/
export default defineConfig({
    preview: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        },
    },
    plugins: [react(), svgr()],

    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                bypass(req, res, options) {
                    const token = parseCookies(req)['aad-token'];
                    const headers = req.headers;
                    if (token) {
                        headers['Authorization'] = 'Bearer ' + token;
                    }
                    res.appendHeader('content-type', 'application/json');
                    axios.get('http://localhost:8081' + req.url, { headers }).then(
                        (response) => {
                            res.end(JSON.stringify(response.data));
                        },
                        (error) => {
                            res.end();
                        }
                    );
                },
            },
            '/modiacontextholder/api/decorator': {
                target: 'http://localhost:8081',
                bypass(req, res, options) {
                    const token = parseCookies(req)['aad-token'];
                    const headers = req.headers;
                    if (token) {
                        headers['Authorization'] = 'Bearer ' + token;
                    }
                    res.appendHeader('content-type', 'application/json');
                    axios.get('http://localhost:8081/api/saksbehandler/innlogget-bruker', { headers }).then(
                        (response) => {
                            res.end(JSON.stringify({ ...response.data, ident: response.data.identifikator || '' }));
                        },
                        (error) => {
                            res.end(JSON.stringify({ authenticated: false }));
                        }
                    );
                },
            },
            '/internarbeidsflatedecorator': {
                target: 'https://navikt.github.io/',
                changeOrigin: true,
                rewrite(path) {
                    return path.replace(
                        '/internarbeidsflatedecorator',
                        'https://navikt.github.io/internarbeidsflatedecorator'
                    );
                },
            },
        },
    },
});
