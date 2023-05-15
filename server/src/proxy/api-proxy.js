import proxy from 'express-http-proxy';
import authUtils from '../auth/utils';
import config from '../config';
import logger from '../logger';

const setup = (router, authClient, tokenEndpoint) => {
    logger.info(`SETUP tokenEndpoint ${tokenEndpoint}`);
    router.use(
        '/api',
        proxy(config.api().url, {
            proxyReqPathResolver: (req) => {
                logger.info(`proxyReqPathResolver ${req}`);
                return req.originalUrl;
            },
            proxyReqOptDecorator: (options, req) => {
                logger.info(`proxyReqOptDecorator ${options}`);
                return new Promise((resolve, reject) =>
                    authUtils.getOnBehalfOfAccessToken(authClient, tokenEndpoint, req).then(
                        (access_token) => {
                            options.headers.Authorization = `Bearer ${access_token}`;
                            resolve(options);
                        },
                        (error) => reject(error)
                    )
                );
            },
        })
    );
};

export default { setup };
