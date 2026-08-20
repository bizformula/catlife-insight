"use client";

// Sticky TOC that highlights active H2/H3 heading on scroll.
import { useEffect, useState } from "react";
import type { TocItem } from "@/types/post";

type TOCProps = {
  items: TocItem[];
};

export default function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-90px 0px -70% 0px", threshold: [0, 1] },
    );

    items.forEach((item) => {
      const heading = document.getElementById(item.id);
      if (heading) observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className="sticky top-24 rounded-md border border-[var(--border)] p-4">
      <h3 className="mb-3 text-base font-semibold">목차</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
            <a
              href={`#${item.id}`}
              className={activeId === item.id ? "font-semibold text-[var(--point)]" : ""}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
