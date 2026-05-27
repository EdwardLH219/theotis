"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { lawyers } from "@/content/lawyers";
import { practices } from "@/content/practices";
import { insights } from "@/content/insights";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-[60] flex items-start justify-center bg-[color:var(--color-ink)]/40 px-4 pt-24"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden border border-[color:var(--color-ink)]/15 bg-[color:var(--color-paper)] shadow-2xl"
      >
        <Command label="Search the site">
          <div className="border-b border-[color:var(--color-ink)]/10">
            <Command.Input
              placeholder="Search lawyers, practice areas, insights…"
              className="w-full bg-transparent px-5 py-4 text-base outline-none placeholder:text-[color:var(--color-mute)]"
            />
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-6 text-sm text-[color:var(--color-mute)]">
              No matches.
            </Command.Empty>

            <Command.Group
              heading="People"
              className="px-2 py-2 [&_[cmdk-group-heading]]:label-mono [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[color:var(--color-mute)]"
            >
              {lawyers.map((l) => (
                <Command.Item
                  key={l.slug}
                  value={`${l.name} ${l.role} ${l.department}`}
                  onSelect={() => go(`/people/${l.slug}`)}
                  className="flex cursor-pointer items-center justify-between px-3 py-2 aria-selected:bg-[color:var(--color-bone)]"
                >
                  <span>{l.name}</span>
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-mute)]">
                    {l.role}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading="Expertise"
              className="px-2 py-2 [&_[cmdk-group-heading]]:label-mono [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[color:var(--color-mute)]"
            >
              {practices.flatMap((p) => [
                <Command.Item
                  key={p.slug}
                  value={`${p.title} ${p.shortTitle}`}
                  onSelect={() => go(`/expertise/${p.slug}`)}
                  className="cursor-pointer px-3 py-2 aria-selected:bg-[color:var(--color-bone)]"
                >
                  {p.title}
                </Command.Item>,
                ...p.subAreas.map((s) => (
                  <Command.Item
                    key={`${p.slug}-${s.numeral}`}
                    value={`${s.title} ${p.title}`}
                    onSelect={() =>
                      go(`/expertise/${p.slug}#${s.numeral.toLowerCase()}`)
                    }
                    className="cursor-pointer px-3 py-2 text-sm text-[color:var(--color-mute)] aria-selected:bg-[color:var(--color-bone)]"
                  >
                    <span className="font-mono text-xs text-[color:var(--color-gold)] mr-2">
                      {s.numeral}
                    </span>
                    {s.title}
                  </Command.Item>
                )),
              ])}
            </Command.Group>

            <Command.Group
              heading="Insights"
              className="px-2 py-2 [&_[cmdk-group-heading]]:label-mono [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[color:var(--color-mute)]"
            >
              {insights.map((i) => (
                <Command.Item
                  key={i.slug}
                  value={`${i.title} ${i.excerpt}`}
                  onSelect={() => go(`/insights/${i.slug}`)}
                  className="cursor-pointer px-3 py-2 aria-selected:bg-[color:var(--color-bone)]"
                >
                  {i.title}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
