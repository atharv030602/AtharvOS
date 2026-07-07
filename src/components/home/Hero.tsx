import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
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
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl"
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
              aria-label="GitHub profile"
            >
              <GithubIcon className="size-5" />
            </ButtonAnchor>
            <ButtonAnchor
              href={siteConfig.social.linkedin}
              variant="ghost"
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
          className="relative mx-auto flex w-full max-w-xs items-end justify-center lg:max-w-sm"
        >
          {/* Subtle blue glow behind the subject */}
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 -z-10 h-4/5 w-4/5 -translate-x-1/2 rounded-full bg-brand/25 blur-[80px]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 -z-10 h-3/5 w-3/5 -translate-x-1/2 rounded-full bg-brand-secondary/15 blur-[90px]"
          />
          <img
            src={siteConfig.portraitUrl}
            alt={`Portrait of ${siteConfig.owner}`}
            width={516}
            height={1042}
            loading="eager"
            fetchPriority="high"
            className="animate-float relative w-full max-w-[22rem] object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}