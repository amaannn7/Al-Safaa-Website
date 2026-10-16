import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The WordPress site used trailing slashes (/about/, /hajj-2027/). Keeping
  // them means every indexed URL stays exactly the same.
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 85],
    remotePatterns: [
      // Google review author photos (Places API), only used when the key is set.
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
  async redirects() {
    return [
      // Legacy WordPress URLs → new homes (301).
      { source: "/maintenance-page/privacy-policy/", destination: "/privacy-policy/", statusCode: 301 },
      { source: "/maintenance-page/:path*", destination: "/", statusCode: 301 },
      { source: "/hello-world/", destination: "/", statusCode: 301 },
      { source: "/sample-page/", destination: "/", statusCode: 301 },
      { source: "/category/:path*", destination: "/", statusCode: 301 },
      { source: "/feed/", destination: "/", statusCode: 301 },
      { source: "/comments/feed/", destination: "/", statusCode: 301 },
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", statusCode: 301 },
      // Friendly aliases.
      { source: "/hajj-packages/", destination: "/hajj/", statusCode: 301 },
      { source: "/umrah-packages/", destination: "/umrah/", statusCode: 301 },
      { source: "/visit-sri-lanka/", destination: "/services/", statusCode: 301 },
      { source: "/about-us/", destination: "/about/", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
