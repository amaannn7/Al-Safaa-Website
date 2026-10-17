import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { telHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/cn";

type Variant = "gold" | "light" | "outline-light" | "outline-dark" | "ink" | "text";
type Size = "md" | "lg" | "sm";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-semibold tracking-[0.01em] transition-[background-color,color,border-color,box-shadow] duration-300 ease-(--ease-premium) disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  gold: "bg-gold-500 text-ink-950 hover:bg-gold-400 shadow-[0_1px_0_rgba(255,255,255,.35)_inset,0_10px_30px_-12px_rgba(200,150,62,.65)]",
  light: "bg-sand-50 text-ink-900 hover:bg-white",
  ink: "bg-ink-900 text-sand-50 hover:bg-ink-800",
  "outline-light": "border border-white/35 text-white hover:border-white/80 hover:bg-white/5",
  "outline-dark": "border border-ink-900/25 text-ink-900 hover:border-ink-900/70 hover:bg-ink-900/[0.03]",
  text: "text-current px-0! h-auto! rounded-none",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-12 px-6 text-[0.9rem]",
  lg: "h-14 px-7 text-[0.95rem]",
};

export function buttonClass(variant: Variant = "gold", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

function Arrow() {
  return (
    <ArrowRight
      size={17}
      strokeWidth={1.8}
      aria-hidden
      className="transition-transform duration-300 ease-(--ease-premium) group-hover/btn:translate-x-1"
    />
  );
}

type LinkButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function LinkButton({ variant, size, arrow, className, children, ...props }: LinkButtonProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

type ExternalProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children?: ReactNode;
};

/** Opens WhatsApp with an optional prefilled, correctly encoded message. */
export function WhatsAppButton({
  message,
  variant = "gold",
  size,
  className,
  children = "WhatsApp us",
  label,
}: ExternalProps & { message?: string; label?: string }) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={buttonClass(variant, size, className)}
      data-cta="whatsapp"
    >
      <WhatsAppIcon size={17} />
      {children}
    </a>
  );
}

export function CallButton({
  e164,
  variant = "outline-dark",
  size,
  className,
  children,
}: ExternalProps & { e164: string }) {
  return (
    <a href={telHref(e164)} className={buttonClass(variant, size, className)} data-cta="call">
      <Phone size={16} strokeWidth={1.8} aria-hidden />
      {children ?? "Call us"}
    </a>
  );
}

/** Small uppercase text link with an arrow, for "View details" style actions. */
export function ArrowLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = cn(
    "group/btn inline-flex items-center gap-2 action transition-colors",
    className,
  );
  if (external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <span className="link-draw">{children}</span>
        <Arrow />
      </a>
    );
  return (
    <Link href={href} className={cls}>
      <span className="link-draw">{children}</span>
      <Arrow />
    </Link>
  );
}
