import { useEffect, useRef, useState } from "react";

/**
 * Custom desktop cursor: a dot, a live "X:___ Y:___" readout, and two faint
 * guide-lines spanning the viewport. Desktop (fine pointer) only — never
 * mounts its listeners on touch devices — and fully skipped under
 * prefers-reduced-motion. Position updates bypass React state (direct DOM
 * style writes) to stay cheap on every mousemove.
 */
export function CustomCursor() {
  const [active, setActive] = useState(false);
  const dotWrapRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const lineXRef = useRef<HTMLDivElement>(null);
  const lineYRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("custom-cursor-active");
    setActive(true);

    let raf = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { clientX: x, clientY: y } = e;
        if (dotWrapRef.current) dotWrapRef.current.style.transform = `translate(${x}px, ${y}px)`;
        if (lineYRef.current) lineYRef.current.style.transform = `translateX(${x}px)`;
        if (lineXRef.current) lineXRef.current.style.transform = `translateY(${y}px)`;
        if (readoutRef.current) {
          readoutRef.current.style.transform = `translate(${x + 14}px, ${y + 14}px)`;
          readoutRef.current.textContent = `X:${String(Math.round(x)).padStart(4, "0")} Y:${String(Math.round(y)).padStart(4, "0")}`;
        }
      });
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest("a, button, img, [role='button'], input, textarea, select");
      dotInnerRef.current?.classList.toggle("scale-[2.5]", isInteractive);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!active) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[200]">
      {/* Guide lines: vertical line moves horizontally, horizontal line moves vertically */}
      <div ref={lineYRef} className="absolute inset-y-0 left-0 w-px bg-accent/15" />
      <div ref={lineXRef} className="absolute inset-x-0 top-0 h-px bg-accent/15" />
      <div ref={dotWrapRef} className="absolute left-0 top-0" style={{ transform: "translate(-9999px, -9999px)" }}>
        <div
          ref={dotInnerRef}
          className="size-2.5 -translate-x-1/2 -translate-y-1/2 bg-accent transition-transform duration-150 ease-out"
        />
      </div>
      <div
        ref={readoutRef}
        className="absolute left-0 top-0 whitespace-nowrap font-mono text-[10px] tracking-wide text-accent/70"
        style={{ transform: "translate(-9999px, -9999px)" }}
      />
    </div>
  );
}
