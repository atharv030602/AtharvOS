import { useRef } from "react";
import type { Project } from "../data";
import { BookIcon, CloseIcon, ExternalIcon, GitHubIcon } from "./Icons";

export function ProjectCard({ project }: { project: Project }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `${project.id}-title`;
  const live = project.status === "Live";

  return (
    <article className="card" aria-labelledby={titleId}>
      <div className="card-top">
        <span className="kind">{project.kind}</span>
        <span className={`status ${live ? "status-live" : "status-wip"}`}>
          {live && <span className="dot" aria-hidden="true" />}
          {project.status}
        </span>
      </div>

      <h3 id={titleId}>{project.name}</h3>
      <p className="summary">{project.summary}</p>

      <ul className="highlights">
        {project.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      {project.statusNote && <p className="note">{project.statusNote}</p>}

      <ul className="tags" aria-label="Tech stack">
        {project.stack.map((s) => (
          <li key={s} className="tag">
            {s}
          </li>
        ))}
      </ul>

      <div className="card-actions">
        {project.demo && (
          <a className="btn btn-primary btn-sm" href={project.demo} target="_blank" rel="noreferrer">
            <ExternalIcon /> Live demo
          </a>
        )}
        {project.github && (
          <a className="btn btn-ghost btn-sm" href={project.github} target="_blank" rel="noreferrer">
            <GitHubIcon /> Code
          </a>
        )}
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => dialogRef.current?.showModal()}
        >
          <BookIcon /> Case study
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="case"
        aria-labelledby={`${project.id}-case-title`}
        onClick={(e) => {
          // Close when clicking the backdrop (outside the dialog box).
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="case-head">
          <div>
            <span className="kind">{project.kind}</span>
            <h3 id={`${project.id}-case-title`}>{project.name}</h3>
          </div>
          <button
            type="button"
            className="close"
            aria-label="Close case study"
            onClick={() => dialogRef.current?.close()}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="case-body">
          <h4>The problem</h4>
          <p>{project.caseStudy.problem}</p>

          <h4>How it works</h4>
          <ul>
            {project.caseStudy.how.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>

          <h4>Challenges I solved</h4>
          <ul>
            {project.caseStudy.challenges.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>

          <h4>What I learned</h4>
          <ul>
            {project.caseStudy.learned.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>

          <ul className="tags" aria-label="Tech stack" style={{ marginTop: 24, paddingLeft: 0 }}>
            {project.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </article>
  );
}
