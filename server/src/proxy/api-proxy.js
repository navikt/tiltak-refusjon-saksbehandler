import proxy from 'express-http-proxy';
import jwt from 'jsonwebtoken';
import authUtils from '../auth/utils';
import config from '../config';

const setup = (router, authClient, tokenEndpoint) => {
    router.use(
        '/api',
        proxy(config.api().url, {
            proxyReqPathResolver: (req) => {
                return req.originalUrl;
            },
            proxyReqOptDecorator: (options, req) => {
                return new Promise((resolve, reject) => {
                    // Sjekk om vi har en gyldig token i cachen
                    const tokenFraAzure = req.headers.authorization.replace('Bearer', '').trim();

                    const oboTokenFraCache = global.tokenCache.get(tokenFraAzure);
                    if (oboTokenFraCache) {
                        const decodedOboTokenFraCache = jwt.decode(oboTokenFraCache, { complete: true });
                        if (
                            decodedOboTokenFraCache &&
                            decodedOboTokenFraCache.payload.exp > (new Date().getTime() - 1) / 1000
                        ) {
                            options.headers.Authorization = `Bearer ${oboTokenFraCache}`;
                            resolve(options);
                            return;
                        }
                    }
                    global.tokenCache.delete(tokenFraAzure);
                    authUtils.getOnBehalfOfAccessToken(authClient, tokenEndpoint, req).then(
                        (access_token) => {
                            options.headers.Authorization = `Bearer ${access_token}`;
                            global.tokenCache.set(tokenFraAzure, access_token);
                            resolve(options);
                        },
                        (error) => reject(error)
                    );
                });
            },
        })
    );
};

export default { setup };
