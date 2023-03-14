/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["tecdn.b-cdn.net", "assets.pokemon.com"],
  },
};

module.exports = nextConfig;
