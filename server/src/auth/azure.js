import { custom, Issuer, Strategy } from 'openid-client';
import authUtils from './utils';
import config from '../config';
import httpProxy from '../proxy/http-proxy';
import logger from '../logger';

const metadata = () => {
    const azureAdConfig = config.azureAd();
    return {
        client_id: azureAdConfig.clientId,
        redirect_uris: [azureAdConfig.redirectUri],
        token_endpoint_auth_method: azureAdConfig.tokenEndpointAuthMethod,
        token_endpoint_auth_signing_alg: azureAdConfig.tokenEndpointAuthSigningAlg,
    };
};

const client = async () => {
    const azureAdConfig = config.azureAd();
    const httpProxyAgent = httpProxy.agent();
    if (httpProxyAgent) {
        custom.setHttpOptionsDefaults({
            agent: httpProxyAgent,
        });
    }
    const issuer = await Issuer.discover(azureAdConfig.discoveryUrl);
    logger.info(`Discovered issuer ${issuer.issuer}`);
    const jwks = azureAdConfig.clientJwks;
    return new issuer.Client(metadata(), jwks);
};

const azureTokenEndpoint = async () => {
    logger.info(`azureTokenEndpoint`);
    const azureConfig = {
        discoveryUrl: process.env.AZURE_APP_WELL_KNOWN_URL,
        clientID: process.env.AZURE_APP_CLIENT_ID,
        privateJwk: process.env.AZURE_APP_JWKS,
        tokenEndpointAuthMethod: 'private_key_jwt',
    };
    const issuer = await Issuer.discover(azureConfig.discoveryUrl);

    logger.info(`Discovered issuer ${issuer.issuer}`);

    return issuer.token_endpoint;
};

const strategy = (client) => {
    const azureAdConfig = config.azureAd();

    const verify = (tokenSet, done) => {
        if (tokenSet.expired()) {
            return done(null, false);
        }
        const user = {
            tokenSets: {
                [authUtils.tokenSetSelfId]: tokenSet,
            },
            claims: tokenSet.claims(),
        };
        return done(null, user);
    };
    const options = {
        client: client,
        params: {
            response_types: azureAdConfig.responseTypes,
            response_mode: azureAdConfig.responseMode,
            scope: `openid ${authUtils.appendDefaultScope(azureAdConfig.clientId)}`,
        },
        audience: azureAdConfig.clientId,
        allowMultiAudiencesInToken: false,
        passReqToCallback: false,
        usePKCE: 'S256',
    };
    return new Strategy(options, verify);
};

export default { client, azureTokenEndpoint, strategy };
