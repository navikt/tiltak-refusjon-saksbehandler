import azure from './auth/azure';
import routes from './routes';
import cors from './cors';
import express from 'express';
import passport from 'passport';
import session from './session';
import logger from './logger';
import { startLabs } from './labs';

const server = express();

async function startApp() {
    try {
        session.setup(server);

        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // setup sane defaults for CORS and HTTP headers
        // server.use(helmet());
        server.use(cors());

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

if (process.env.MILJO === 'dev-gcp-labs') {
    startLabs(express()).catch((err) => logger.info(err));
} else {
    startApp().catch((err) => logger.error(err));
}
