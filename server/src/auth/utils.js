import { TokenSet } from 'openid-client';
import config from '../config';
import logger from '../logger';

const tokenSetSelfId = 'self';

const getOnBehalfOfAccessToken = (authClient, azureEndpointToken, req) => {
    logger.info(`getONB AzureENDPOINT ${tokenEndpoint}`);
    return new Promise((resolve, reject) => {
        const apiConfig = config.api();
        if (hasValidAccessToken(req, apiConfig.clientId)) {
            const tokenSets = getTokenSetsFromSession(req);
            resolve(tokenSets[apiConfig.clientId].access_token);
        } else {
            logger.info('AzureENDPOINT ', azureEndpointToken);
            authClient
                .grant(
                    {
                        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                        client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                        requested_token_use: 'on_behalf_of',
                        scope: createOnBehalfOfScope(apiConfig),
                        assertion: req.user.tokenSets[tokenSetSelfId].access_token,
                    },
                    {
                        clientAssertionPayload: {
                            aud: [azureEndpointToken],
                        },
                    }
                )
                .then((tokenSet) => {
                    req.user.tokenSets[apiConfig.clientId] = tokenSet;
                    resolve(tokenSet.access_token);
                })
                .catch((err) => {
                    logger.error(err);
                    reject(err);
                });
        }
    });
};

const appendDefaultScope = (scope) => `${scope}/.default`;

const formatClientIdScopeForV2Clients = (clientId) => appendDefaultScope(`api://${clientId}`);

const createOnBehalfOfScope = (api) => {
    if (api.scopes && api.scopes.length > 0) {
        return `${api.scopes.join(' ')}`;
    } else {
        return `${formatClientIdScopeForV2Clients(api.clientId)}`;
    }
};

const getTokenSetsFromSession = (req) => {
    if (req && req.user) {
        return req.user.tokenSets;
    }
    return null;
};

const hasValidAccessToken = (req, key = tokenSetSelfId) => {
    const tokenSets = getTokenSetsFromSession(req);
    if (!tokenSets) {
        return false;
    }
    const tokenSet = tokenSets[key];
    if (!tokenSet) {
        return false;
    }
    return new TokenSet(tokenSet).expired() === false;
};

export default {
    getOnBehalfOfAccessToken,
    appendDefaultScope,
    hasValidAccessToken,
    tokenSetSelfId,
};
