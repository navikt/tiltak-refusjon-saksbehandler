import config from '../config';
import logger from '../logger';

const getOnBehalfOfAccessToken = (authClient, tokenEndpoint, req) => {
    return new Promise((resolve, reject) => {
        const apiConfig = config.api();
        const token = req.headers.authorization.replace('Bearer', '').trim();
        authClient
            .grant(
                {
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                    requested_token_use: 'on_behalf_of',
                    scope: createOnBehalfOfScope(apiConfig),
                    assertion: token,
                },
                {
                    clientAssertionPayload: {
                        aud: [tokenEndpoint],
                    },
                }
            )
            .then((tokenSet) => {
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
};
