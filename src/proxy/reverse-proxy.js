import authUtils from '../auth/utils';
import proxy from 'express-http-proxy';
import config from '../config';

const setup = (router, authClient) => {
    router.use("/api/*", proxy(config.api.url,{
        parseReqBody: false,
        proxyReqOptDecorator: (options, req) => {
            return new Promise(((resolve, reject) =>
                    authUtils.getOnBehalfOfAccessToken(
                        authClient, req
                    ).then(access_token => {
                            options.headers.Authorization = `Bearer ${access_token}`;
                            resolve(options)
                        },
                        error => reject(error))
            ))
        },
        proxyReqPathResolver: req => {
            console.log("req.url: " + req.url);
            const nyUrl = req.url.replace("/tiltak-refusjon/api", "/tiltak-refusjon-api");
            console.log("ny path: " + nyUrl);
            return nyUrl;
        }
    }));
};

export default {setup}
