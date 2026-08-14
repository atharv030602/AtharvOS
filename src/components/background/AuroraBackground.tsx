/**
 * Ambient background: a static 24px blueprint grid. Pure CSS, no motion,
 * non-interactive.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
    </div>
  );
}
