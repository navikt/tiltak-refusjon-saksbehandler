import config from './config';
import redis from 'redis';
import session from 'express-session';
import logger from './logger';

const SESSION_MAX_AGE_MILLISECONDS = 60 * 60 * 1000;

const setup = (app) => {
    app.set('trust proxy', 1);
    const options = {
        cookie: {
            maxAge: SESSION_MAX_AGE_MILLISECONDS,
            sameSite: 'lax',
            httpOnly: true,
        },
        secret: config.server.sessionKey,
        name: config.server.cookieName,
        resave: false,
        saveUninitialized: false,
        unset: 'destroy',
    };
    if (process.env.NODE_ENV !== 'development') {
        options.cookie.secure = true;
        options.store = setupRedis();
    }
    app.use(session(options));
};

const setupRedis = () => {
    const RedisStore = require('connect-redis')(session);

    const client = redis.createClient({
        host: config.redis.host,
        password: config.redis.password,
        port: config.redis.port,
    });
    client.unref();
    client.on('error', logger.error);

    return new RedisStore({
        client: client,
        disableTouch: true,
    });
};

export default { setup };
