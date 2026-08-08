import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { siteConfig, heroRoles } from "@/config/site";
import { useRotatingText } from "@/hooks/use-rotating-text";
import { rotateText, fadeUp, staggerContainer } from "@/lib/motion";
import { ButtonLink, ButtonAnchor } from "@/components/primitives/ActionButton";
import { GithubIcon, LinkedinIcon } from "@/components/primitives/icons";

export function Hero() {
  const roleIndex = useRotatingText(heroRoles.length, 3500);

  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/60 px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Open to Software Engineering roles
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-gradient mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            {siteConfig.owner}
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-4 flex h-8 items-center overflow-hidden text-xl font-medium sm:text-2xl"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                variants={rotateText}
                initial="enter"
                animate="center"
                exit="exit"
                className="text-gradient"
              >
                {heroRoles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {siteConfig.heroHeadline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink to="/projects">
              View Projects <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonAnchor href={siteConfig.resumeUrl} variant="secondary" download>
              <Download className="size-4" /> Resume
            </ButtonAnchor>
            <ButtonAnchor
              href={siteConfig.social.github}
              variant="ghost"
              className="rounded-full border border-border bg-surface-elevated/60 p-2.5 text-foreground hover:border-brand/50 hover:bg-surface-elevated hover:text-brand"
              aria-label="GitHub profile"
            >
              <GithubIcon className="size-5" />
            </ButtonAnchor>
            <ButtonAnchor
              href={siteConfig.social.linkedin}
              variant="ghost"
              className="rounded-full border border-border bg-surface-elevated/60 p-2.5 text-foreground hover:border-brand/50 hover:bg-surface-elevated hover:text-brand"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="size-5" />
            </ButtonAnchor>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="animate-float relative mx-auto flex w-full max-w-xs items-center justify-center lg:max-w-sm"
        >
          {/* Glow ring behind the portrait */}
          <div
            aria-hidden="true"
            className="absolute -z-10 size-64 rounded-full bg-[radial-gradient(circle,var(--brand)_0%,var(--brand-secondary)_55%,transparent_75%)] opacity-40 blur-[60px] sm:size-72"
          />
          <div className="relative size-64 overflow-hidden rounded-full ring-4 ring-brand/50 shadow-[0_0_70px_-10px_var(--brand)] sm:size-72">
            <img
              src={siteConfig.portraitUrl}
              alt={`Portrait of ${siteConfig.owner}`}
              width={516}
              height={1042}
              loading="eager"
              fetchPriority="high"
              className="size-full object-cover object-top"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
              }}
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-10 flex justify-center sm:mt-14"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted-foreground"
          aria-hidden="true"
        >
          <ChevronDown className="size-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}