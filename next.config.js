const nextConfig = {
  httpAgentOptions: {
    keepAlive: false,
  },
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['pages', 'src'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'megafans.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
      },
    ],
  },
}

module.exports = nextConfig
