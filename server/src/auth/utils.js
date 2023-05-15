import config from '../config';
import logger from '../logger';

const tokenSetSelfId = 'self';

const getOnBehalfOfAccessToken = (authClient, tokenEndpoint, req) => {
    logger.info(`getONB AzureENDPOINT ${tokenEndpoint}`);
    return new Promise((resolve, reject) => {
        const apiConfig = config.api();
        authClient
            .grant(
                {
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                    requested_token_use: 'on_behalf_of',
                    scope: createOnBehalfOfScope(apiConfig),
                    assertion: req.headers['authorization'],
                },
                {
                    clientAssertionPayload: {
                        aud: [tokenEndpoint],
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

export default {
    getOnBehalfOfAccessToken,
    appendDefaultScope,
    tokenSetSelfId,
};
