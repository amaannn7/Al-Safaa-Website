import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Staging/preview deployments set NEXT_PUBLIC_ALLOW_INDEXING=false (or leave
 * it unset on Vercel previews) so the new site can't compete with the live
 * WordPress site in search results before launch.
 */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  if (!allow) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
