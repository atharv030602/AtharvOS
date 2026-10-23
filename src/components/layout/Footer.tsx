import { Link } from "@tanstack/react-router";
import { TerminalSquare } from "lucide-react";
import { navItems } from "@/data/nav";
import { siteConfig } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/primitives/icons";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold text-foreground">{siteConfig.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.owner} — {siteConfig.specialty}. Building real systems, documenting the
              journey, continuously improving.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub profile"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn profile"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <LinkedinIcon className="size-4" />
              </a>
              <Link
                to="/terminal"
                aria-label="Open terminal"
                className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
              >
                <TerminalSquare className="size-4" />
              </Link>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.owner}. All rights reserved.
          </p>
          <p className="font-mono">Built with React + TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
