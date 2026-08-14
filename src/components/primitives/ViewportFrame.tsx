import type { ReactEventHandler } from "react";
import { cn } from "@/lib/utils";

const CORNERS = ["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"] as const;

const MARK = 18;
const THICK = 2;

/** One L-shaped crosshair mark, positioned at a single corner of the frame. */
function CrosshairMark({ position }: { position: (typeof CORNERS)[number] }) {
  const isTop = position.includes("top-0");
  const isLeft = position.includes("left-0");
  return (
    <span
      aria-hidden="true"
      className={cn("pointer-events-none absolute", position)}
      style={{ width: MARK, height: MARK }}
    >
      <span
        className="absolute bg-accent"
        style={{
          width: MARK,
          height: THICK,
          top: isTop ? 0 : undefined,
          bottom: isTop ? undefined : 0,
          left: 0,
        }}
      />
      <span
        className="absolute bg-accent"
        style={{
          width: THICK,
          height: MARK,
          top: isTop ? 0 : undefined,
          bottom: isTop ? undefined : 0,
          left: isLeft ? 0 : undefined,
          right: isLeft ? undefined : 0,
        }}
      />
    </span>
  );
}

interface ViewportFrameProps {
  src: string;
  alt: string;
  /** e.g. "01" — rendered as "Fig. 01 — {label}" */
  figure: string;
  label: string;
  className?: string;
  imgClassName?: string;
  aspect?: "square" | "portrait" | "video";
  onError?: ReactEventHandler<HTMLImageElement>;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
}

const aspectClass = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  video: "aspect-video",
};

/**
 * Signature "viewport" image frame: bordered box, accent crosshair marks at
 * each corner, and a Space Mono caption row below. Used for the portrait and
 * every project screenshot so imagery reads as one system.
 */
export function ViewportFrame({
  src,
  alt,
  figure,
  label,
  className,
  imgClassName,
  aspect = "square",
  onError,
  loading = "lazy",
  fetchPriority,
}: ViewportFrameProps) {
  return (
    <figure className={cn("w-full", className)}>
      <div className="relative border border-line bg-surface p-2">
        {CORNERS.map((position) => (
          <CrosshairMark key={position} position={position} />
        ))}
        <div className={cn("overflow-hidden", aspectClass[aspect])}>
          <img
            src={src}
            alt={alt}
            loading={loading}
            fetchPriority={fetchPriority}
            onError={onError}
            className={cn("size-full object-cover", imgClassName)}
          />
        </div>
      </div>
      <figcaption className="caption-label mt-2 text-muted-foreground">
        Fig. {figure} — {label}
      </figcaption>
    </figure>
  );
}
