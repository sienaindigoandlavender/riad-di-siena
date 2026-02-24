/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },

  // 301 Redirects for old WordPress URLs → new Next.js URLs
  async redirects() {
    return [
      // Old WordPress page paths
      { source: '/jewel-box', destination: '/rooms', permanent: true },
      { source: '/joy', destination: '/rooms', permanent: true },
      { source: '/tresor-cache', destination: '/rooms', permanent: true },
      { source: '/our-philosophy', destination: '/philosophy', permanent: true },
      { source: '/about-the-riad', destination: '/the-riad', permanent: true },
      { source: '/spanish-the-annex', destination: '/the-douaria', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      { source: '/it/guide', destination: '/', permanent: true },
      { source: '/it/:path*', destination: '/', permanent: true },
    ];
  },
}

module.exports = nextConfig
