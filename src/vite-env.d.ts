/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: 'dev' | 'prod';
    // more env variables...
}
