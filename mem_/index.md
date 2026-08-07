# Project Memory

## Core
All resume-derived content (summary, skills, internships, projects, education, certifications) is factual from the user's resume — never invent projects, roles, or credentials.
Sunny Game Cafe is the current flagship project (Spring Boot + React + MySQL, full-stack station booking & game library platform for a game cafe); development completed, testing and deployment in progress. Payments, memberships and in-cafe menu orders are out of scope. Garage ERP is a React.js/JavaScript/CSS ERP frontend, architected for a future Spring Boot + MySQL backend.
Positioning: Software Engineer / Java Backend Developer, honestly exploring Agentic AI (not an AI expert).
Certifications module is fully data-driven: add a cert = drop PDF in public/certificates/ + one object in src/data/certifications.ts. Never edit components to add certs.
Resume metadata lives in resumeMeta in src/config/site.ts; replace public/resume.pdf + bump version is the only update needed.

## Memories
- [Atharv facts](mem://features/atharv-facts) — resume-sourced identity, projects, education, certs
