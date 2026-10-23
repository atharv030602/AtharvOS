import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Command } from "lucide-react";
import { navItems } from "@/data/nav";
import { siteConfig } from "@/config/site";
import { useScrollShrink } from "@/hooks/use-scroll-shrink";
import { GithubIcon } from "@/components/primitives/icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrollShrink();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 transition-all duration-300 sm:px-6",
          scrolled ? "glass py-2 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.8)]" : "py-2",
        )}
      >
        <Link
          to="/"
          className="group flex items-center gap-2"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="flex size-8 items-center justify-center border border-accent/40 bg-accent/10 font-mono text-sm font-bold text-accent">
            A
          </span>
          <span className="font-display text-sm font-semibold tracking-tight text-foreground">
            {siteConfig.name}
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub profile"
            className="hidden size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:flex"
          >
            <GithubIcon className="size-4" />
          </a>
          <button
            type="button"
            onClick={() =>
              document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))
            }
            aria-label="Open command palette"
            className="hidden items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand lg:flex"
          >
            <Command className="size-3" /> K
          </button>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl px-4 md:hidden">
          <ul className="glass flex flex-col gap-1 rounded-2xl p-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-surface-elevated" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
