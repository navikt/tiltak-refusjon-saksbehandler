const config = require('./config');

module.exports = () => (req, res, next) => {
    res.setHeader(
        'Access-Control-Allow-Origin',
        config.server().host + ', ' + config.envVar({ name: 'DECORATOR_CORS', required: true })
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, X-Requested-With');
    return next();
};
