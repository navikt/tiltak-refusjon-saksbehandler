import proxy from 'express-http-proxy';
import authUtils from '../auth/utils';
import config from '../config';
import logger from '../logger';

const setup = (router, authClient) => {
    router.use(
        '/api',
        proxy(config.api.url, {
            parseReqBody: false,
            proxyReqPathResolver: (req) => {
                return req.originalUrl;
            },
            proxyReqOptDecorator: (options, req) => {
                return new Promise((resolve, reject) =>
                    authUtils.getOnBehalfOfAccessToken(authClient, req).then(
                        (access_token) => {
                            options.headers.Authorization = `Bearer ${access_token}`;
                            logger.info(access_token);
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
