/**
 * Ambient background: aurora blobs + subtle engineering grid.
 * Pure CSS animation, reduced-motion aware, non-interactive.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -left-32 -top-32 size-[38rem] rounded-full bg-brand/20 blur-[120px] animate-aurora" />
      <div className="absolute -right-40 top-1/4 size-[34rem] rounded-full bg-brand-secondary/15 blur-[130px] animate-aurora [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-1/3 size-[30rem] rounded-full bg-brand-accent/10 blur-[120px] animate-aurora [animation-delay:-12s]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />
    </div>
  );
}