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
      {
        protocol: "https",
        hostname: "stable2.justinkim.win",
      },
    ],
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
