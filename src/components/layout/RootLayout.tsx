import { Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AuroraBackground } from "@/components/background/AuroraBackground";
import { LoadingScreen } from "@/components/system/LoadingScreen";
import { CustomCursor } from "@/components/system/CustomCursor";
import { CommandPalette } from "@/components/command/CommandPalette";

export function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isTerminal = pathname === "/terminal";

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-dvh flex-col">
        <AuroraBackground />
        <CustomCursor />
        <LoadingScreen />
        <CommandPalette />
        {!isTerminal && <Navbar />}
        <main className="flex-1">
          <Outlet />
        </main>
        {!isTerminal && <Footer />}
      </div>
    </MotionConfig>
  );
}