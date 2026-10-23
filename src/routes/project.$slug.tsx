import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getProject } from "@/data/projects";
import { CaseStudy } from "@/components/projects/CaseStudy";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/project/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      description: project.summaryLine,
      author: { "@type": "Person", name: siteConfig.owner },
      keywords: project.tags.join(", "),
    };
    return {
      meta: [
        { title: `${project.name} — Case Study | ${siteConfig.owner}` },
        { name: "description", content: project.summaryLine },
        { property: "og:title", content: `${project.name} — Case Study` },
        { property: "og:description", content: project.summaryLine },
        { property: "og:type", content: "article" },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
    };
  },
  component: ProjectDetail,
  notFoundComponent: ProjectNotFound,
  errorComponent: ProjectError,
});

function ProjectDetail() {
  const { project } = Route.useLoaderData();
  return <CaseStudy project={project} />;
}

function ProjectNotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold text-foreground">Project not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This case study doesn't exist or has moved.
      </p>
      <Link
        to="/projects"
        className="mt-6 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand/90"
      >
        Browse projects
      </Link>
    </div>
  );
}

function ProjectError() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-semibold text-foreground">Something went wrong</h1>
      <Link
        to="/projects"
        className="mt-6 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand/90"
      >
        Browse projects
      </Link>
    </div>
  );
}
