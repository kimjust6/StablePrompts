/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/prompt",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
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
