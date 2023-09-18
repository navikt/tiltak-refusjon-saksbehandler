import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import apiProxy from './proxy/api-proxy';
import decoratorProxy from './proxy/decorator-proxy';
import config from './config';

const router = express.Router();

const ensureAuthenticated = async (azureAdConfig, azureJwksClient) => async (req, res, next) => {
    if (req.headers['authorization']) {
        const bearerToken = req.headers.authorization?.replace('Bearer', '').trim();
        const decoded = jwt.decode(bearerToken, { complete: true });
        if (decoded) {
            const verifyOptions = {
                algorithms: ['RS256'],
                header: decoded.header,
                client_id: azureAdConfig.clientId,
            };
            const key = await azureJwksClient.getSigningKey(verifyOptions.header.kid);
            const signingKey = key.getPublicKey();
            jwt.verify(bearerToken, signingKey, verifyOptions, (error, decoded) => {
                if (!error) {
                    next();
                } else {
                    res.redirect('/login');
                }
            });
        } else {
            res.redirect('/login');
        }
    } else {
        res.redirect('/login');
    }
};

const setup = (authClient, tokenEndpoint, azureJwksClient) => {
    // Unprotected
    router.get('/isAlive', (req, res) => res.send('Alive'));
    router.get('/isReady', (req, res) => res.send('Ready'));

    router.get('/login', (req, res) => res.redirect('/oauth2/login'));
    router.get('/logout', (req, res) => res.redirect('oauth2/logout'));

    const azureAdConfig = config.azureAd();

    router.use(ensureAuthenticated(azureAdConfig, azureJwksClient));

    apiProxy.setup(router, authClient, tokenEndpoint);
    decoratorProxy.setup(router, authClient, tokenEndpoint);

    // serve static files
    router.use(express.static(path.join(__dirname, '../build')));

    router.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
    });

    return router;
};

export default { setup };
