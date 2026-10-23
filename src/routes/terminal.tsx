import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "@/components/terminal/Terminal";

export const Route = createFileRoute("/terminal")({
  head: () => ({
    meta: [
      { title: "Terminal — AtharvOS" },
      { name: "description", content: "An interactive terminal for AtharvOS." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TerminalPage,
});

function TerminalPage() {
  return <Terminal />;
}
