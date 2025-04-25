/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.mentibus.xyz',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 50000,
  exclude: [
    '/api/*',
    '/admin/*',
    '/_*',
    '/404',
    '/500',
    '/sign-in',
    '/login',
    '/signup',
    '/verify-*',
    '/onboarding',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/*',
          '/admin/*',
          '/_*',
          '/404',
          '/500',
          '/sign-in',
          '/login',
          '/signup',
          '/verify-*',
          '/onboarding',
        ],
      },
    ],
    additionalSitemaps: [
      // Main sitemap index that lists all other sitemaps
      `${process.env.SITE_URL || 'https://mentibus.xyz'}/sitemap.xml`,
    ],
  },
  // Additional configuration for next-sitemap
  sourceDir: '.next',
  outDir: 'public',
  transform: async (config, path) => {
    // Customize URL priority based on path
    let priority = 0.7;
    if (path === '/') priority = 1.0;
    else if (path.startsWith('/companies/')) priority = 0.8;
    else if (path.startsWith('/investors/')) priority = 0.8;
    else if (path.startsWith('/people/')) priority = 0.8;
    else if (path.startsWith('/events/')) priority = 0.9;
    else if (path.startsWith('/news/')) priority = 0.9;
    else if (path.startsWith('/lists/')) priority = 0.8;
    else if (path.startsWith('/groups/')) priority = 0.8;

    // Customize change frequency based on content type
    let changefreq = 'weekly';
    if (path === '/') changefreq = 'daily';
    else if (path.startsWith('/events/')) changefreq = 'daily';
    else if (path.startsWith('/news/')) changefreq = 'daily';
    else if (path.startsWith('/companies/')) changefreq = 'weekly';
    else if (path.startsWith('/investors/')) changefreq = 'weekly';
    else if (path.startsWith('/people/')) changefreq = 'weekly';
    else if (path.startsWith('/lists/')) changefreq = 'weekly';
    else if (path.startsWith('/groups/')) changefreq = 'weekly';

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
}
