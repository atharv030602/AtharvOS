import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { contactSchema, sendContactMessage, type ContactInput } from "@/lib/contact";
import { ButtonAction } from "@/components/primitives/ActionButton";

type Errors = Partial<Record<keyof ContactInput, string>>;

export function ContactForm() {
  const [values, setValues] = useState<ContactInput>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const update = (key: keyof ContactInput, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        next[issue.path[0] as keyof ContactInput] = issue.message;
      }
      setErrors(next);
      return;
    }
    await sendContactMessage(parsed.data);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-emerald-400" />
        <h3 className="mt-4 text-lg font-semibold text-foreground">Your mail client is open</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for reaching out — I'll get back to you as soon as I can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="name"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className="w-full rounded-lg border border-border bg-surface/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          placeholder="Your name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-destructive">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full rounded-lg border border-border bg-surface/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          placeholder="you@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-xs text-destructive">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full resize-y rounded-lg border border-border bg-surface/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
          placeholder="Tell me about the opportunity…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-destructive">
            {errors.message}
          </p>
        )}
      </div>

      <ButtonAction type="submit" className="w-full sm:w-auto">
        Send message <Send className="size-4" />
      </ButtonAction>
    </form>
  );
}