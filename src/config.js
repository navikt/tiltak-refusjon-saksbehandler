import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const envVar = ({name, required = true}) => {
    if (!process.env[name] && required) {
        console.error(`Missing required environment variable '${name}'`);
        process.exit(1);
    }
    return process.env[name]
};

const server = {
    host: envVar({name: "HOST", required: false}) || 'localhost', // should be equivalent to the URL this application is hosted on for correct CORS origin header
    port: envVar({name: "PORT", required: false}) || 3000,
    proxy: envVar({name: "HTTP_PROXY", required: false}), // optional, only set if requests to Azure AD must be performed through a corporate proxy (i.e. traffic to login.microsoftonline.com is blocked by the firewall)
    sessionKey: envVar({name: "SESSION_KEY"}), // should be set to a random key of significant length for signing session ID cookies
    cookieName: 'security-blueprints-login'
};

const azureAd = {
    discoveryUrl: envVar({name: "AZURE_APP_WELL_KNOWN_URL"}),
    clientId: envVar({name: "AZURE_APP_CLIENT_ID"}),
    clientJwks: JSON.parse(envVar({name: "AZURE_APP_JWKS"})),
    redirectUri: envVar({name: "AAD_REDIRECT_URL"}),
    logoutRedirectUri: envVar({name: "AAD_LOGOUT_REDIRECT_URL"}),
    tokenEndpointAuthMethod: 'private_key_jwt',
    responseTypes: ['code'],
    responseMode: 'query',
    tokenEndpointAuthSigningAlg: 'RS256',
};

const redis = {
    host: envVar({name: "REDIS_HOST", required: false}),
    port: envVar({name: "REDIS_PORT", required: false}) || 6379,
    password: envVar({name: "REDIS_PASSWORD", required: false})
};

const reverseProxyConfig = () => {
    const config = loadReverseProxyConfig();
    config.apis.forEach((entry, index) => {
        if (!entry.path) {
            console.error(`API entry ${index} is missing 'path'`);
            process.exit(1);
        }
        if (!entry.url) {
            console.error(`API entry ${index} is missing 'url'`);
            process.exit(1);
        }
        if (!entry.clientId) {
            console.error(`API entry ${index} is missing 'clientId'`);
            process.exit(1);
        }
    });
    return config;
};

const loadReverseProxyConfig = () => {
    const configPath = envVar({name: "DOWNSTREAM_APIS_CONFIG_PATH", required: false});
    let config = null;
    if (configPath) {
        try {
            console.log(`Loading reverse proxy config from '${configPath}' (defined by DOWNSTREAM_APIS_CONFIG_PATH)`);
            config = JSON.parse(fs.readFileSync(path.resolve(configPath), 'utf-8'));
        } catch (err) {
            console.log(`Could not read config: '${err}'`);
        }
    }
    if (!config) {
        const jsonConfig = envVar({name: "DOWNSTREAM_APIS_CONFIG", required: false});
        if (jsonConfig) {
            console.log(`Loading reverse proxy config from DOWNSTREAM_APIS_CONFIG`);
            config = JSON.parse(jsonConfig)
        } else {
            console.log(`Loading reverse proxy config from DOWNSTREAM_API_* [CLIENT_ID, PATH, URL]`);
            const scopes = envVar({name: "DOWNSTREAM_API_SCOPES", required: false});
            config = {
                'apis': [{
                    clientId: envVar({name: "DOWNSTREAM_API_CLIENT_ID"}),
                    path: envVar({name: "DOWNSTREAM_API_PATH", required: false}) || 'downstream',
                    url: envVar({name: "DOWNSTREAM_API_URL"}),
                    scopes: scopes ? scopes.split(',') : []
                }]
            };
        }
    }
    return config
};

export default {
    server,
    azureAd,
    // reverseProxy: reverseProxyConfig(),
    redis
};
