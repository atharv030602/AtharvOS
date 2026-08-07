# Portfolio — possible improvements (noted 2026-08-08)

## High priority — inconsistencies

1. **Flagship project conflict.** Three different sources disagree on which project is "the flagship":
   - `AGENTS.md` and `timeline.ts` both call **Garage ERP** the flagship project.
   - `mem_/index.md` says **Sunny Game Cafe** is "the current flagship project."
   - The actual code (`projects.ts`) has `featured: true` on **ResumeFit AI**, and `false`/unset on the other two.

   Decide which one is actually the flagship today and make all three agree (probably ResumeFit AI, since it's the newest, fully completed *and deployed* project with a strong story — but that's your call).

2. **Timeline is missing ResumeFit AI entirely.** `timeline.ts` jumps from Garage ERP (2024–Present) → MCA → "Now: exploring Agentic AI," with no milestone for shipping and deploying ResumeFit AI in 2026. Given it's a completed, live, deployed project with a genuinely good engineering story (pivoted off three AI providers to a free local engine), it's a strong addition to the story timeline.

3. **Current Mission dashboard (`mission.ts`) doesn't mention ResumeFit AI** — worth adding a `status: "Completed"` entry alongside "Java Foundations" / "SQL & MySQL."

## Medium priority — content gaps

4. **Every certification is missing its PDF.** All 8 entries in `certifications.ts` have `certificatePdf` commented out, so the View/Download buttons are hidden site-wide. If you have the actual PDFs, drop them in `public/certificates/` and uncomment the line — two-step process per the file's own instructions.

5. **Every project has `screenshots: []`** — no visuals in any case-study page, even though `AGENTS.md` calls out Screenshots as a required case-study section. You already have real screenshots of ResumeFit AI from testing it (the fit-gauge, matched/gap skill chips) — worth adding those as the first populated `screenshots` entry.

6. **Skills list doesn't reflect the Python work.** `skills.ts` still lists Python under "Currently Learning," but you just shipped and deployed a real FastAPI + Streamlit backend/frontend in Python. Arguably Python (and FastAPI) should move to "Core Technologies" now that there's a deployed project behind it.

## Low priority — housekeeping

7. **`AGENTS.md`'s content-architecture section is stale** — it only lists "Garage ERP, GeeksforGeeks Clone, ToDo App, Future AI Projects" under `projects.ts`, missing Sunny Game Cafe and ResumeFit AI entirely. Not user-facing, but Lovable reads this file for context, so it's worth updating if you keep using Lovable's editor.

8. **Resume version check** — `resumeMeta` is at `v1.0` / "July 2026." Worth confirming the actual resume PDF mentions ResumeFit AI, given it's now your most recent shipped-and-deployed project.
