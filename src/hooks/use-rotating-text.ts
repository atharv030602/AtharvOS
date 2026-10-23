import { useEffect, useState } from "react";

/** Cycles through an array of strings on an interval. Returns the current index. */
export function useRotatingText(length: number, intervalMs = 3500): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [length, intervalMs]);

  return index;
}
