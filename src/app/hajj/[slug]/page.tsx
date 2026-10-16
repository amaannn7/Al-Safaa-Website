import { notFound } from "next/navigation";
import { packages } from "@/data/packages";
import { PackageDetail, packageMetadata, packageParams } from "@/components/packages/package-detail";
import { findPackage } from "@/lib/packages";
import { getTodayInColombo } from "@/lib/today";

const TYPE = "hajj" as const;

export function generateStaticParams() {
  const params = packageParams(TYPE);
  // Cache Components requires at least one param; the sentinel renders a 404.
  return params.length ? params : [{ slug: "none" }];
}

function load(slug: string) {
  const pkg = findPackage(packages, slug);
  return pkg && pkg.type === TYPE ? pkg : undefined;
}

export async function generateMetadata({ params }: PageProps<"/hajj/[slug]">) {
  const pkg = load((await params).slug);
  return pkg ? packageMetadata(pkg) : {};
}

export default async function Page({ params }: PageProps<"/hajj/[slug]">) {
  const pkg = load((await params).slug);
  if (!pkg) notFound();
  const today = await getTodayInColombo();
  return <PackageDetail pkg={pkg} today={today} />;
}
