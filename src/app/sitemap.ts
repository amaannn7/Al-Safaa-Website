import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { packages } from "@/data/packages";
import { isPublic } from "@/lib/packages";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/hajj-2027/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/umrah/", priority: 0.9, changeFrequency: "weekly" },
    { path: "/services/", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about/", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact/", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy-policy/", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...pages.map((p) => ({ url: url(p.path), changeFrequency: p.changeFrequency, priority: p.priority })),
    ...packages.filter(isPublic).map((p) => ({
      url: url(`/${p.type}/${p.slug}/`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [url(p.image.src)],
    })),
  ];
}
