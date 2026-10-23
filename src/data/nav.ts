export interface NavItem {
  label: string;
  to: string;
}

/** Primary navigation — internal routes only. */
export const navItems: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Projects", to: "/projects" },
  { label: "Certifications", to: "/certifications" },
  { label: "Learning", to: "/learning" },
  { label: "AI Lab", to: "/ai-lab" },
  { label: "Resume", to: "/resume" },
  { label: "Contact", to: "/contact" },
];
