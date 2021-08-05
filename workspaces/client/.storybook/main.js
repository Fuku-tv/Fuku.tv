const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-links', '@storybook/preset-scss', '@storybook/addon-essentials'],

  webpackFinal: async (
    /** @type {import("webpack").Configuration } */
    config,
    { configType }
  ) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // add path alias from typescript config
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    // Return the altered config
    return config;
  },
};
