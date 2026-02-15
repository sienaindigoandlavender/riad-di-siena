/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      // ============================================
      // WordPress legacy ?page_id= and ?p= URLs
      // Handled by middleware.ts (self-redirects don't work in next.config)
      // ============================================

      // ============================================
      // Old Squarespace individual room pages
      // ============================================
      { source: "/room-2-tresor-cache", destination: "/rooms", permanent: true },
      { source: "/room-1-jardin-secret", destination: "/rooms", permanent: true },
      { source: "/room-3-ciel-ouvert", destination: "/rooms", permanent: true },
      { source: "/room-4-:slug", destination: "/rooms", permanent: true },

      // ============================================
      // Old Squarespace content pages
      // ============================================
      { source: "/marrakesh-1", destination: "/", permanent: true },
      { source: "/stay-at-riad-di-siena", destination: "/rooms", permanent: true },
      { source: "/riad-life", destination: "/the-riad", permanent: true },
      { source: "/about-us", destination: "/philosophy", permanent: true },
      { source: "/our-philosophy", destination: "/philosophy", permanent: true },
      { source: "/our-philosophy/", destination: "/philosophy", permanent: true },
      { source: "/book-a-room", destination: "/rooms", permanent: true },
      { source: "/booking-conditions-1", destination: "/booking-conditions", permanent: true },

      // ============================================
      // Old Squarespace paths found in Google index
      // ============================================
      { source: "/marrakesh", destination: "/", permanent: true },
      { source: "/what-to-do-in-marrakesh", destination: "/", permanent: true },
      { source: "/rooms-and-suites", destination: "/rooms", permanent: true },
      { source: "/the-house", destination: "/the-riad", permanent: true },
      { source: "/riad", destination: "/the-riad", permanent: true },
      { source: "/philosophy-1", destination: "/philosophy", permanent: true },
      { source: "/our-story", destination: "/about", permanent: true },
      { source: "/contact-2", destination: "/contact", permanent: true },
      { source: "/disclaimer-1", destination: "/disclaimer", permanent: true },
      { source: "/house-rules-1", destination: "/house-rules", permanent: true },
      { source: "/privacy-1", destination: "/privacy", permanent: true },
      { source: "/terms-1", destination: "/terms", permanent: true },

      // ============================================
      // Additional old URL patterns
      // ============================================
      { source: "/home", destination: "/", permanent: true },
      { source: "/gallery", destination: "/the-riad", permanent: true },
      { source: "/location", destination: "/directions", permanent: true },
      { source: "/reviews", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug", destination: "/", permanent: true },
      { source: "/amenities-1", destination: "/amenities", permanent: true },

      // ============================================
      // Legacy amenities sub-pages → proper routes
      // ============================================
      { source: "/amenities/rooms", destination: "/rooms", permanent: true },
      { source: "/amenities/the-riad", destination: "/the-riad", permanent: true },
      { source: "/amenities/philosophy", destination: "/philosophy", permanent: true },
      { source: "/amenities/amenities", destination: "/amenities", permanent: true },

      // ============================================
      // Test pages → homepage
      // ============================================
      { source: "/rooms-test", destination: "/rooms", permanent: true },
      { source: "/test-booking", destination: "/rooms", permanent: true },
      { source: "/contact-1", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/rooms-1", destination: "/rooms", permanent: true },
      { source: "/rates", destination: "/rooms", permanent: true },
      { source: "/availability", destination: "/rooms", permanent: true },
      { source: "/reservations", destination: "/rooms", permanent: true },

      // ============================================
      // Common URL patterns that may generate 404s
      // ============================================
      { source: "/the-riad-1", destination: "/the-riad", permanent: true },
      { source: "/our-rooms", destination: "/rooms", permanent: true },
      { source: "/the-rooms", destination: "/rooms", permanent: true },
      { source: "/room/:slug", destination: "/rooms", permanent: true },
      { source: "/about-riad-di-siena", destination: "/about", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-and-conditions", destination: "/terms", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/faq-1", destination: "/faq", permanent: true },
      { source: "/directions-1", destination: "/directions", permanent: true },
      { source: "/the-douaria-1", destination: "/the-douaria", permanent: true },
      { source: "/experiences", destination: "/journeys", permanent: true },
      { source: "/kasbah", destination: "/the-kasbah", permanent: true },
      { source: "/desert", destination: "/the-desert-camp", permanent: true },
      { source: "/desert-camp", destination: "/the-desert-camp", permanent: true },
      { source: "/farm", destination: "/the-farm", permanent: true },
      { source: "/douaria", destination: "/the-douaria", permanent: true },
    ];
  },
};

export default nextConfig;
