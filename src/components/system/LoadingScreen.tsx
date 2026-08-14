import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const steps = ["Initializing…", "Loading components…", "Ready"];

/** One-time boot screen. Skips instantly under reduced motion via short timers. */
export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = window.setTimeout(() => setStep(1), 350);
    const t2 = window.setTimeout(() => setStep(2), 700);
    const t3 = window.setTimeout(() => setVisible(false), 1050);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-center">
            <p className="font-display text-2xl font-semibold tracking-tight text-foreground">
              {siteConfig.name}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="size-2 animate-pulse bg-accent" />
              {steps[step]}
            </div>
            <div className="mx-auto mt-4 h-px w-40 overflow-hidden bg-border">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}