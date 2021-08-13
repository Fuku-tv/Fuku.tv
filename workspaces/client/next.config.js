/* eslint-disable no-param-reassign */
module.exports = {
  experimental: {
    externalDir: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // resolve 'fs' not found module
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
