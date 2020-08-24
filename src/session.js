import config from './config';
import redis from 'redis';
import session from 'express-session';

const SESSION_MAX_AGE_MILLISECONDS = 60 * 60 * 1000;

const setup = (app) => {
    app.set('trust proxy', 1);
    if (process.env.NODE_ENV === 'development') {
        app.use(session({
            cookie: {
                maxAge: SESSION_MAX_AGE_MILLISECONDS,
                sameSite: 'lax',
                httpOnly: true,
            },
            secret: config.server.sessionKey,
            name: config.server.cookieName,
            resave: false,
            saveUninitialized: true,
        }));
    } else {
        const RedisStore = require('connect-redis')(session);

        const client = redis.createClient({
            host: config.redis.host,
            password: config.redis.password,
            port: config.redis.port,
        });
        client.unref();
        client.on('error', console.log);

        const store = new RedisStore({
            client: client,
            disableTouch: true,
        });

        app.use(
            session({
                cookie: {
                    maxAge: SESSION_MAX_AGE_MILLISECONDS,
                    secure: true,
                    httpOnly: true,
                    sameSite: 'lax'
                },
                name: config.server.cookieName,
                saveUninitialized: true,
                secret: config.server.sessionKey,
                store: store,
                resave: false,
            })
        );
    }
};

export default { setup };
