import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/primitives/icons";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${siteConfig.owner}` },
      {
        name: "description",
        content:
          "Have an opportunity? Get in touch with Atharv Mitkari — a Java backend developer open to software engineering roles.",
      },
      { property: "og:title", content: `Contact — ${siteConfig.owner}` },
      { property: "og:description", content: "Have an opportunity? Let's build something meaningful together." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <Section className="pt-32">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Contact"
            title="Have an opportunity?"
            description="Let's build something meaningful together."
          />
          <div className="mt-8 space-y-3">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-4 text-sm text-foreground transition-colors hover:border-brand/40"
            >
              <Mail className="size-4 text-brand" /> {siteConfig.email}
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/50 p-4 text-sm text-foreground">
              <MapPin className="size-4 text-brand" /> {siteConfig.location}
            </div>
            <div className="flex gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface/50 p-4 text-sm text-foreground transition-colors hover:border-brand/40"
              >
                <GithubIcon className="size-4" /> GitHub
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn profile"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface/50 p-4 text-sm text-foreground transition-colors hover:border-brand/40"
              >
                <LinkedinIcon className="size-4" /> LinkedIn
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm sm:p-8">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}