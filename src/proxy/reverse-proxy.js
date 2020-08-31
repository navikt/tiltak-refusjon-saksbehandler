import authUtils from '../auth/utils';
import proxy from 'express-http-proxy';

const setup = (router, authClient) => {
    router.use("/api", proxy({
        parseReqBody: false,
        proxyReqOptDecorator: async (options, req) => {
            const accessToken = await authUtils.getOnBehalfOfAccessToken(authClient, req)
            options.headers.Authorization = `Bearer ${accessToken}`;
        },
        proxyReqPathResolver: req => {
            return req.url.replace("/tiltak-refusjon/api", "/tiltak-refusjon-api");
        }
    }));
};

export default {setup}
