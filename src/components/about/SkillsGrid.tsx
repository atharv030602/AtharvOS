import { skillGroups } from "@/data/skills";
import { Reveal } from "@/components/primitives/Reveal";
import { Tag } from "@/components/primitives/Tag";

export function SkillsGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {skillGroups.map((group, i) => (
        <Reveal
          key={group.title}
          delay={i * 0.06}
          className="rounded-2xl border border-border bg-surface/50 p-6 backdrop-blur-sm"
        >
          <h3 className="font-medium text-foreground">{group.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{group.description}</p>
          <div className="mt-4 space-y-4">
            {group.categories.map((cat) => (
              <div key={cat.label}>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {cat.label}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <Tag key={item}>{item}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
