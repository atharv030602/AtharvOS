import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { runCommand } from "@/lib/terminal";
import { siteConfig } from "@/config/site";

interface Line {
  prompt?: string;
  text: string;
}

const banner: Line[] = [
  { text: `${siteConfig.name} — interactive terminal` },
  { text: `Type 'help' to get started. 'exit' or the back button to leave.` },
  { text: "" },
];

export function Terminal() {
  const [history, setHistory] = useState<Line[]>(banner);
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [pastIdx, setPastIdx] = useState(-1);
  const navigate = useNavigate();
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  const submit = (raw: string) => {
    const cmd = raw.trim();
    const next: Line[] = [...history, { prompt: "atharv@os:~$", text: raw }];

    if (cmd.toLowerCase() === "exit") {
      navigate({ to: "/" });
      return;
    }

    const result = runCommand(cmd);
    if (result.clear) {
      setHistory(banner);
      setInput("");
      return;
    }
    result.lines.forEach((l) => next.push({ text: l }));
    setHistory(next);
    setInput("");
    if (cmd) setPast((p) => [cmd, ...p]);
    setPastIdx(-1);
    if (result.navigate) navigate({ to: result.navigate });
    if (result.open) window.open(result.open, "_blank", "noopener,noreferrer");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit(input);
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(pastIdx + 1, past.length - 1);
      if (past[idx]) {
        setPastIdx(idx);
        setInput(past[idx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(pastIdx - 1, -1);
      setPastIdx(idx);
      setInput(idx === -1 ? "" : past[idx]);
    }
  };

  return (
    <div
      className="mx-auto min-h-dvh w-full max-w-4xl px-4 py-6"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex h-[calc(100dvh-3rem)] flex-col overflow-hidden rounded-xl border border-border bg-[#05070d]/90 font-mono text-sm shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-3 rounded-full bg-red-500/80" />
          <span className="size-3 rounded-full bg-amber-500/80" />
          <span className="size-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 text-xs text-muted-foreground">atharv@os: ~</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 leading-relaxed">
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap break-words">
              {line.prompt ? (
                <span>
                  <span className="text-emerald-400">{line.prompt}</span>{" "}
                  <span className="text-foreground">{line.text}</span>
                </span>
              ) : (
                <span className="text-muted-foreground">{line.text}</span>
              )}
            </div>
          ))}
          <div className="mt-1 flex items-center">
            <span className="text-emerald-400">atharv@os:~$</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="ml-2 flex-1 bg-transparent text-foreground caret-brand outline-none"
              aria-label="Terminal input"
              autoFocus
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}