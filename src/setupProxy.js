const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

module.exports = function (app, apiHostname, decoratorHostName) {
    app.use('/api', createProxyMiddleware({ target: 'http://localhost:8081', changeOrigin: true }));
    app.use('/modiacontextholder/api/decorator', async (req, res) => {
        try {
            const response = await axios.get('http://localhost:8081/api/saksbehandler/innlogget-bruker', {
                headers: req.headers,
            });
            res.json({ ...response.data, ident: response.data.identifikator || '' });
        } catch (error) {
            res.json({ authenticated: false });
        }
    });
    app.use('/internarbeidsflatedecorator', (req, res) => {
        res.redirect('https://navikt.github.io' + req.originalUrl);
    });
};
