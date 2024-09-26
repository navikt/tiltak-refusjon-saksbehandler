/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ENV: 'q2' | 'prod';
    readonly VITE_MILJO: 'prod' | 'dev';
    // more env variables...
}
