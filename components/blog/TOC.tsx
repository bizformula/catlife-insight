"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/types/post";

type TOCProps = {
  items: TocItem[];
};

export default function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const updateFromHash = () => {
      const hashId = decodeURIComponent(
        window.location.hash.replace("#", "")
      );

      const exists = items.some(
        (item) => item.id === hashId
      );

      setActiveId(exists ? hashId : "");
    };

    updateFromHash();

    window.addEventListener(
      "hashchange",
      updateFromHash
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        updateFromHash
      );
    };
  }, [items]);

  return (
    <aside className="rounded-md border border-[var(--border)] p-4">
      <h3 className="mb-3 text-base font-semibold">
        목차
      </h3>

      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className={
              item.level === 3 ? "pl-4" : ""
            }
          >
            <a
              href={`#${item.id}`}
              className={
                activeId === item.id
                  ? "font-bold text-[var(--point)]"
                  : "font-normal"
              }
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}