/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-assets.clashofclans.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
