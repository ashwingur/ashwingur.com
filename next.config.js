/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-assets.clashofclans.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "api.ashwingur.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "imgproxy.ashwingur.com",
        pathname: "**",
      },
      // { protocol: "https", hostname: "**" },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(vert|frag)$/,
      use: "raw-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
