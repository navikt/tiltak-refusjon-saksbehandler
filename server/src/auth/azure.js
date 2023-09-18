import { custom, Issuer } from 'openid-client';
import config from '../config';
import httpProxy from '../proxy/http-proxy';
import logger from '../logger';
import jwksClient from 'jwks-rsa';

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

const azureJwksClient = () => {
    const azureAdConfig = config.azureAd();
    const azureJwksClient = jwksClient({
        jwksUri: azureAdConfig.openIdJwksUri,
    });
    return azureJwksClient;
};

const azureTokenEndpoint = async () => {
    const azureConfig = {
        discoveryUrl: process.env.AZURE_APP_WELL_KNOWN_URL,
        clientID: process.env.AZURE_APP_CLIENT_ID,
        privateJwk: process.env.AZURE_APP_JWKS,
        tokenEndpointAuthMethod: 'private_key_jwt',
    };
    const issuer = await Issuer.discover(azureConfig.discoveryUrl);

    return issuer.token_endpoint;
};

export default { client, azureTokenEndpoint, azureJwksClient };
