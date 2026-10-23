import { useEffect, useState } from "react";
import { ProjectCard } from "./components/ProjectCard";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "./components/Icons";
import {
  certifications,
  education,
  experience,
  profile,
  projects,
  skills,
  type TimelineItem,
} from "./data";

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="container header-inner">
        <a className="brand" href="#top">
          Atharv<span>.</span>
        </a>
        <nav className="nav" aria-label="Main">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#journey">Experience</a>
          <a href="#contact">Contact</a>
          <a className="btn btn-primary btn-sm" href={profile.resume} target="_blank" rel="noreferrer">
            <DownloadIcon /> Resume
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <p className="eyebrow">Hi, I'm</p>
          <h1>{profile.name}</h1>
          <p className="role">{profile.role}</p>
          <p className="pitch">{profile.pitch}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              See my projects
            </a>
            <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
              <GitHubIcon /> GitHub
            </a>
            <a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <span className="dot" aria-hidden="true" /> {profile.availability}
            </span>
            <span>
              <PinIcon /> {profile.location}
            </span>
          </div>
        </div>
        <div className="portrait">
          <img src={profile.portrait} alt={`Portrait of ${profile.name}`} width={360} height={727} />
        </div>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline">
      {items.map((t) => (
        <li key={t.title}>
          <span className="period">{t.period}</span>
          <h4>{t.title}</h4>
          <span className="org">{t.org}</span>
          <p>{t.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />

        <section className="section" id="projects" aria-labelledby="projects-h">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Projects</p>
              <h2 id="projects-h">Things I've built and shipped</h2>
              <p>
                Two GenAI apps and two full-stack products. Open a case study to see the problem,
                how it works and the bugs I had to fix.
              </p>
            </div>
            <div className="projects">
              {projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="skills" aria-label="Skills">
          <div className="container">
            <SectionHead
              eyebrow="Skills"
              title="What I work with"
              intro="Everything listed here is used in at least one of the projects above."
            />
            <div className="skills">
              {skills.map((g) => (
                <div className="skill-group" key={g.group}>
                  <h3>{g.group}</h3>
                  <ul className="tags">
                    {g.items.map((s) => (
                      <li key={s} className="tag">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="journey" aria-label="Experience and education">
          <div className="container">
            <SectionHead eyebrow="Background" title="Experience & education" />
            <div className="journey">
              <div>
                <h3>Experience</h3>
                <Timeline items={experience} />
              </div>
              <div>
                <h3>Education</h3>
                <Timeline items={education} />
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="certifications" aria-label="Certifications">
          <div className="container">
            <SectionHead eyebrow="Certifications" title="Courses & certificates" />
            <ul className="certs">
              {certifications.map((c) => (
                <li className="cert" key={c.title}>
                  <div>
                    <strong>{c.title}</strong>
                    <span>{c.issuer}</span>
                  </div>
                  {(c.url || c.file) && (
                    <a href={c.url ?? c.file} target="_blank" rel="noreferrer">
                      {c.url ? "Verify" : "View"}
                      <span className="sr-only"> {c.title} certificate</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="contact" aria-label="Contact">
          <div className="container">
            <div className="contact">
              <div>
                <p className="eyebrow">Contact</p>
                <h2>Let's talk</h2>
                <p>
                  I'm looking for backend, software or GenAI engineering roles. The fastest way to
                  reach me is email.
                </p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href={`mailto:${profile.email}`}>
                    <MailIcon /> Email me
                  </a>
                  <a className="btn btn-ghost" href={profile.resume} target="_blank" rel="noreferrer">
                    <DownloadIcon /> Resume (PDF)
                  </a>
                </div>
              </div>
              <ul className="contact-links">
                <li>
                  <a href={`mailto:${profile.email}`}>
                    <MailIcon /> {profile.email}
                  </a>
                </li>
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    <LinkedInIcon /> linkedin.com/in/atharvmitkari
                  </a>
                </li>
                <li>
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    <GitHubIcon /> github.com/atharv030602
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Built with React + Vite</span>
        </div>
      </footer>
    </>
  );
}
