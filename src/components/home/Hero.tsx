import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { siteConfig, heroRoles } from "@/config/site";
import { useRotatingText } from "@/hooks/use-rotating-text";
import { rotateText, fadeUp, staggerContainer } from "@/lib/motion";
import { ButtonLink, ButtonAnchor } from "@/components/primitives/ActionButton";
import { ViewportFrame } from "@/components/primitives/ViewportFrame";
import { GithubIcon, LinkedinIcon } from "@/components/primitives/icons";

export function Hero() {
  const roleIndex = useRotatingText(heroRoles.length, 3500);

  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className="-rotate-2 inline-flex items-center gap-1.5 border border-accent/50 bg-accent/5 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-accent"
          >
            <span className="size-1.5 shrink-0 bg-current" />
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
                className="text-accent"
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
              className="border-line bg-surface-elevated/60 p-2.5 text-foreground hover:border-accent/50 hover:bg-surface-elevated hover:text-accent"
              aria-label="GitHub profile"
            >
              <GithubIcon className="size-5" />
            </ButtonAnchor>
            <ButtonAnchor
              href={siteConfig.social.linkedin}
              variant="ghost"
              className="border-line bg-surface-elevated/60 p-2.5 text-foreground hover:border-accent/50 hover:bg-surface-elevated hover:text-accent"
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
          className="relative mx-auto w-full max-w-xs lg:max-w-sm"
        >
          <ViewportFrame
            src={siteConfig.portraitUrl}
            alt={`Portrait of ${siteConfig.owner}`}
            figure="01"
            label="Portrait"
            aspect="portrait"
            imgClassName="object-top"
            loading="eager"
            fetchPriority="high"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
            }}
          />
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
