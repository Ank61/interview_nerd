/** @type {import('next-sitemap').IConfig} */
const siteUrl = 'https://interview-nerd-git-master-ank61s-projects.vercel.app';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ['/api/*', '/test/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/test/'] },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
    ],
  },
};
