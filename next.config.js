/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  // output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  experimental: {
    // turbo: {
    //     resolveAlias: {
    //         underscore: "lodash",
    //         mocha: { browser: "mocha/browser-entry.js" },
    //     },
    // },
  },
};

module.exports = nextConfig;
