import proxy from 'express-http-proxy';
import config from '../config';
import authUtils from '../auth/utils';

const setup = (router, authClient) => {
    router.use(
        '/modiacontextholder/api/decorator',
        proxy(config.api.url, {
            parseReqBody: false,
            proxyReqPathResolver: (req) => {
                return '/api/innlogget-bruker';
            },
            proxyReqOptDecorator: (options, req) => {
                return new Promise((resolve, reject) =>
                    authUtils.getOnBehalfOfAccessToken(authClient, req).then(
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

    router.use('/internarbeidsflatedecorator', (req, res) => {
        res.redirect(config.decorator.host + req.originalUrl);
    });
};

export default { setup };
