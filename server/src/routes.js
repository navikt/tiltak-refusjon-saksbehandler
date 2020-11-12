import authUtils from './auth/utils';
import config from './config';
import express from 'express';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import apiProxy from './proxy/api-proxy';
import decoratorProxy from './proxy/decorator-proxy';

const router = express.Router();

const ensureAuthenticated = async (req, res, next) => {
    if (req.isAuthenticated() && authUtils.hasValidAccessToken(req)) {
        next();
    } else {
        session.redirectTo = req.originalUrl;
        res.redirect('/login');
    }
};

const setup = (authClient) => {
    // Unprotected
    router.get('/isAlive', (req, res) => res.send('Alive'));
    router.get('/isReady', (req, res) => res.send('Ready'));

    router.get('/login', passport.authenticate('azureOidc', { failureRedirect: '/login' }));
    router.use('/oauth2/callback', passport.authenticate('azureOidc', { failureRedirect: '/login' }), (req, res) => {
        if (session.redirectTo) {
            res.redirect(session.redirectTo);
        } else {
            res.redirect('/');
        }
    });

    router.use(ensureAuthenticated);

    // Protected
    router.get('/session', (req, res) => {
        res.json(req.user);
    });
    router.get('/me', (req, res) => {
        authUtils
            .getUserInfoFromGraphApi(authClient, req)
            .then((userinfo) => res.json(userinfo))
            .catch((err) => res.status(500).json(err));
    });

    router.get('/logout', (req, res) => {
        req.logOut();
        res.redirect(authClient.endSessionUrl({ post_logout_redirect_uri: config.azureAd.logoutRedirectUri }));
    });

    apiProxy.setup(router, authClient);
    decoratorProxy.setup(router);

    // serve static files
    router.use(express.static(path.join(__dirname, '../build'), { index: false }));

    router.use('*', express.static(path.join(__dirname, '../build/index.html')));

    return router;
};

export default { setup };
