import type { ComponentType } from "react";
import { featuredTech } from "@/data/featuredTech";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { Reveal } from "@/components/primitives/Reveal";
import {
  JavaIcon,
  SpringIcon,
  MysqlIcon,
  ReactIcon,
  GitIcon,
  PythonIcon,
} from "@/components/primitives/icons";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Java: JavaIcon,
  "Spring Boot": SpringIcon,
  MySQL: MysqlIcon,
  React: ReactIcon,
  Git: GitIcon,
  Python: PythonIcon,
};

export function FeaturedTech() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Featured Technologies"
        title="My primary stack"
        description="The core tools I reach for. The full list lives in Skills."
      />
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {featuredTech.map((tech, i) => {
          const Icon = iconMap[tech.name];
          return (
            <Reveal key={tech.name} delay={i * 0.06}>
              <div className="flex flex-col items-center gap-3 border border-border bg-surface/50 p-5 text-center backdrop-blur-sm transition-colors hover:border-line-bright">
                {Icon && <Icon className="size-8 text-foreground" />}
                <div>
                  <p className="text-sm font-medium text-foreground">{tech.name}</p>
                  <p className="text-[11px] text-muted-foreground">{tech.note}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
