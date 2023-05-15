import express from 'express';
import path from 'path';
import apiProxy from './proxy/api-proxy';
import decoratorProxy from './proxy/decorator-proxy';

const router = express.Router();

const ensureAuthenticated = async (req, res, next) => {
    if (req.headers['authorization']) {
        next();
    } else {
        res.redirect('/login');
    }
};

const setup = (authClient, tokenEndpoint) => {
    // Unprotected
    router.get('/isAlive', (req, res) => res.send('Alive'));
    router.get('/isReady', (req, res) => res.send('Ready'));

    router.get('/login', (req, res) => res.redirect('/oauth2/login'));
    router.get('/logout', (req, res) => res.redirect('oauth2/logout'));

    router.use(ensureAuthenticated);

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
