const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('./logger');

async function startLabs(server) {
    const page = path.resolve(__dirname, '../build', 'index.html');

    try {
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));

        // setup routes
        server.get('/isAlive', (req, res) => res.send('Alive'));
        server.get('/isReady', (req, res) => res.send('Ready'));

        server.use(express.static(path.join(__dirname, '../build')));

        server.use('/api', createProxyMiddleware({ target: 'http://tiltak-refusjon-api-labs', changeOrigin: true }));

        server.use('/logout', (req, res) => {
            res.clearCookie('tokenx-token');
            res.clearCookie('aad-token');
            res.redirect('/');
        });

        server.get('/*', (req, res) => {
            res.status(200);
            res.sendFile(page);
        });

        const port = 3000;
        server.listen(port, () => logger.info(`Listening on port ${port}`));
    } catch (error) {
        logger.error('Error during start-up', error);
    }
}

module.exports = { startLabs };
