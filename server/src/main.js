import azure from './auth/azure';
import routes from './routes';
import cors from './cors';
import express from 'express';
import passport from 'passport';
import session from './session';
import logger from './logger';

// for debugging during development
// import morganBody from 'morgan-body';
// import morgan from 'morgan';

const server = express();

async function startApp() {
    try {
        // morganBody(server);
        // morgan('dev');

        session.setup(server);

        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // setup sane defaults for CORS and HTTP headers
        // server.use(helmet());
        server.use(cors);

        // initialize passport and restore authentication state, if any, from the session
        server.use(passport.initialize());
        server.use(passport.session());

        const azureAuthClient = await azure.client();
        const azureOidcStrategy = azure.strategy(azureAuthClient);

        passport.use('azureOidc', azureOidcStrategy);
        passport.serializeUser((user, done) => done(null, user));
        passport.deserializeUser((user, done) => done(null, user));

        // setup routes
        server.use('/', routes.setup(azureAuthClient));

        const port = 3000;
        server.listen(port, () => logger.info(`Listening on port ${port}`));
    } catch (error) {
        logger.error('Error during start-up', error);
    }
}

startApp().catch((err) => logger.error(err));
