import config from './config';

export default (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', config.server.host);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With');
    return next();
};
