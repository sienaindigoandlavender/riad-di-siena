import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // AI Search Crawlers - full access
      {
        userAgent: 'GPTBot',
        allow: ['/', '/api/knowledge/'],
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: ['/', '/api/knowledge/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/api/knowledge/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: ['/', '/api/knowledge/'],
      },
      {
        userAgent: 'Claude-Web',
        allow: ['/', '/api/knowledge/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/api/knowledge/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/api/knowledge/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/api/knowledge/'],
      },
      // Default
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: 'https://www.riaddisiena.com/sitemap.xml',
  }
}
