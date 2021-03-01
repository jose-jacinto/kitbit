module.exports = {
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
      // Rewrites for /search
      {
        source: '/:locale/search',
        destination: '/search',
      },
      {
        source: '/:locale/search/:path*',
        destination: '/search',
      },
      {
        source: '/search/designers/:name',
        destination: '/search',
      },
      {
        source: '/search/designers/:name/:category',
        destination: '/search',
      },
      {
        // This rewrite will also handle `/search/designers`
        source: '/search/:category',
        destination: '/search',
      },
      {
        source: '/checkout',
        destination: 'https://d1hhebv6hmhzhi.cloudfront.net'
      },
    ]
  },
}
