import Image from "next/image";
import logo from "../../public/images/brand/alsafaa-logo.png";
import logoReversed from "../../public/images/brand/alsafaa-logo-reversed.png";
import { cn } from "@/lib/cn";

/**
 * The official Al-Safaa wordmark (1600×340, proportions preserved).
 * `reversed` swaps the blue wordmark for white, as on the agency's own
 * 2026 flyers, for use on dark backgrounds. The orange swoosh never changes.
 */
export function Logo({
  reversed = false,
  className,
  priority = false,
}: {
  reversed?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={reversed ? logoReversed : logo}
      alt="Al-Safaa Travels & Tours"
      priority={priority}
      sizes="200px"
      className={cn("h-auto w-[124px] min-[380px]:w-[148px] sm:w-[168px]", className)}
    />
  );
}
