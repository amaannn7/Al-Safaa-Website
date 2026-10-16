import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Eyebrow, serif title, optional lede and a drawn gold rule. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  as: Tag = "h2",
  size = "md",
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "lg" | "md" | "sm";
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto max-w-3xl text-center", className)}>
      <div className={cn("flex flex-col gap-6", !!action && "md:flex-row md:items-end md:justify-between")}>
        <div className={cn(align === "left" && "max-w-3xl")} data-reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <Tag className={cn("display mt-4", size === "lg" ? "display-lg" : size === "md" ? "display-md" : "display-sm")}>{title}</Tag>
        </div>
        {action && <div className="shrink-0" data-reveal>{action}</div>}
      </div>
      {lede && (
        <div className={cn("lede mt-6 text-muted on-dark:text-mist", align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl")} data-reveal>
          {lede}
        </div>
      )}
    </div>
  );
}
