import config from '../config';
import authUtils from '../auth/utils';
import axios from 'axios';
const asyncHandler = require('express-async-handler');

const setup = (router, authClient, tokenEndpoint) => {
    router.use(
        '/modiacontextholder/api/decorator',
        asyncHandler(async (req, res) => {
            const accessToken = await authUtils.getOnBehalfOfAccessToken(authClient, tokenEndpoint, req);
            const response = await axios.get(`${config.api().url}/api/saksbehandler/innlogget-bruker`, {
                headers: { ...req.headers, Authorization: `Bearer ${accessToken}` },
            });
            res.json({ ...response.data, ident: response.data.identifikator || '' });
        })
    );

    router.use('/internarbeidsflatedecorator', (req, res) => {
        res.redirect(config.decorator().host + req.originalUrl);
    });
};

export default { setup };
