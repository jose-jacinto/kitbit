module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    sizes: [320, 480, 820, 1200, 1600],
    domains: ['whitebrim2.imgix.net'],
    loader: 'imgix'
  },
  i18n: {
    locales: ['en-US', 'pt'],
    defaultLocale: 'en-US',
  },
  async rewrites() {
    return [
      {
        "source": "/checkout",
        "destination": "https://d3v0kwj6fsyaja.cloudfront.net/index.html"
      },
      {
        "source": "/checkout/:match*",
        "destination": "https://d3v0kwj6fsyaja.cloudfront.net/:match*"
      }
    ];
  }
}
