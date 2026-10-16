import { NextResponse, type NextRequest } from "next/server";
import { packages } from "@/data/packages";

/**
 * Package pages are prerendered for every published slug. Any other slug
 * would otherwise stream a "soft 404" (status 200 + noindex), so answer those
 * with a real 404 before rendering starts.
 */
const known = new Set(packages.filter((p) => p.status === "published").map((p) => `/${p.type}/${p.slug}/`));

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.endsWith("/") ? request.nextUrl.pathname : `${request.nextUrl.pathname}/`;
  if (!known.has(path)) {
    return NextResponse.rewrite(new URL("/not-found/", request.url), { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/hajj/:slug/", "/umrah/:slug/"],
};
