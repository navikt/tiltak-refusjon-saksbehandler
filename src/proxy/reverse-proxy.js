import authUtils from '../auth/utils';
import { createProxyMiddleware } from 'http-proxy-middleware';

const setup = (router, authClient) => {
    router.use("/api", createProxyMiddleware({
        changeOrigin: true,
        target: process.env.API_URL || 'http://localhost:8080',
        pathRewrite: {"^/tiltak-refusjon/api": "/tiltak-refusjon-api"},
        xfwd: true,
        onProxyReq: async (proxyReq, req, res) => {
            const accessToken = await authUtils.getOnBehalfOfAccessToken(
                authClient, req
            );
            proxyReq.setHeader("Authorization", `Bearer ${accessToken}`)
        }
    }));
};

export default { setup }
