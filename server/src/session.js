import config from './config';
import redis from 'redis';
import session from 'express-session';
import logger from './logger';

const SESSION_MAX_AGE_MILLISECONDS = 60 * 60 * 1000;

const setup = (app) => {
    app.set('trust proxy', 1);
    const serverConfig = config.server();
    const options = {
        cookie: {
            maxAge: SESSION_MAX_AGE_MILLISECONDS,
            sameSite: 'lax',
            httpOnly: true,
        },
        secret: serverConfig.sessionKey,
        name: serverConfig.cookieName,
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

    const redisConfig = config.redis();
    const client = redis.createClient({
        host: redisConfig.host,
        password: redisConfig.password,
        port: redisConfig.port,
    });
    client.unref();
    client.on('error', logger.error);

    return new RedisStore({
        client: client,
        disableTouch: true,
    });
};

export default { setup };
