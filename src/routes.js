import authUtils from './auth/utils';
import config from './config';
import express from 'express';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
// import reverseProxy from "./proxy/reverse-proxy";

const router = express.Router();

const ensureAuthenticated = async (req, res, next) => {
    if (req.isAuthenticated() && authUtils.hasValidAccessToken(req)) {
        next();
    } else {
        session.redirectTo = req.url;
        res.redirect('/login');
    }
};

const setup = authClient => {
    // Unprotected
    router.get('/isAlive', (req, res) => res.send('Alive'));
    router.get('/isReady', (req, res) => res.send('Ready'));

    router.get('/login', passport.authenticate('azureOidc', { failureRedirect: '/login'}));
    router.use('/oauth2/callback', passport.authenticate('azureOidc', { failureRedirect: '/login'}), (req, res) => {
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
        authUtils.getUserInfoFromGraphApi(authClient, req)
            .then(userinfo => res.json(userinfo))
            .catch(err => res.status(500).json(err))
    });

    router.get('/logout', (req, res) => {
        req.logOut();
        res.redirect(authClient.endSessionUrl({ 'post_logout_redirect_uri': config.azureAd.logoutRedirectUri }));
    });

    // reverseProxy.setup(router, authClient);

    // serve static files
    router.use(express.static(path.join(__dirname, "../build")));

    router.use('*', (req, res) => {
        res.render('index.html', {
            NAV_SCRIPTS: `<script src="${process.env.DECORATOR_SCRIPT}"></script>`,
            NAV_STYLING: `<link rel="stylesheet" href="${process.env.DECORATOR_STYLING}"/>`,
            NAV_HEADING: "<script>setTimeout(function() {NAVSPA.internarbeidsflatefs(document.getElementById('root'), { appname: 'Tiltaksgjennomføring - refusjon', toggles: { visEnhet: false, visEnhetVelger: false, visSokefelt: false, visVeilder: false }}); }, 1000);</script>",
        });
    });

    return router
};

export default { setup };
