import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  FolderGit2,
  GraduationCap,
  Home,
  Mail,
  FileText,
  TerminalSquare,
  FlaskConical,
  User,
  Award,
  Download,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/primitives/icons";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { siteConfig, resumeMeta } from "@/config/site";

/** ⌘K / Ctrl+K command palette. Radix dialog handles focus trap + a11y. */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    navigate({ to });
  };

  const openExternal = (href: string) => {
    setOpen(false);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/")}>
            <Home className="mr-2 size-4" /> Home
          </CommandItem>
          <CommandItem onSelect={() => go("/about")}>
            <User className="mr-2 size-4" /> About
          </CommandItem>
          <CommandItem onSelect={() => go("/projects")}>
            <FolderGit2 className="mr-2 size-4" /> Projects
          </CommandItem>
          <CommandItem onSelect={() => go("/certifications")}>
            <Award className="mr-2 size-4" /> Certifications
          </CommandItem>
          <CommandItem onSelect={() => go("/learning")}>
            <GraduationCap className="mr-2 size-4" /> Learning
          </CommandItem>
          <CommandItem onSelect={() => go("/ai-lab")}>
            <FlaskConical className="mr-2 size-4" /> AI Lab
          </CommandItem>
          <CommandItem onSelect={() => go("/resume")}>
            <FileText className="mr-2 size-4" /> Resume
          </CommandItem>
          <CommandItem onSelect={() => go("/contact")}>
            <Mail className="mr-2 size-4" /> Contact
          </CommandItem>
          <CommandItem onSelect={() => go("/terminal")}>
            <TerminalSquare className="mr-2 size-4" /> Terminal
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          <CommandItem onSelect={() => openExternal(resumeMeta.file)}>
            <Download className="mr-2 size-4" /> Download Resume
          </CommandItem>
          <CommandItem onSelect={() => openExternal(siteConfig.social.github)}>
            <GithubIcon className="mr-2 size-4" /> GitHub
          </CommandItem>
          <CommandItem onSelect={() => openExternal(siteConfig.social.linkedin)}>
            <LinkedinIcon className="mr-2 size-4" /> LinkedIn
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
