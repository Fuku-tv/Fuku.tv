// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

import moduleList from 'module';
import rollupPluginNodePolyfills from 'rollup-plugin-node-polyfills';
// exclude node-only modules (like fs, utils, etc)
const exclude = ['stripe'];

/** @type {import("snowpack").SnowpackUserConfig } */
const snowpackConfig = {
  workspaceRoot: '../..',

  mount: {
    /* ... */
    static: { url: '/', static: true },
    src: '/dist',
  },
  plugins: [
    /* ... */
    ['@snowpack/plugin-sass', '@snowpack/plugin-webpack'],
  ],
  packageOptions: {
    /* ... */
    polyfillNode: false,
    rollup: {
      plugins: [rollupPluginNodePolyfills()],
    },
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {},
  alias: {
    src: './src',
  },
};

export default snowpackConfig;
