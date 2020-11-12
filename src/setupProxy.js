const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('/api', createProxyMiddleware({ target: 'http://localhost:8080', changeOrigin: true }));
    app.use(
        '/modiacontextholder/api/decorator',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            pathRewrite: () => '/api/innlogget-bruker',
            changeOrigin: true,
        })
    );
};
