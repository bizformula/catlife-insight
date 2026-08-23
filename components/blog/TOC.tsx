"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/types/post";

type TOCProps = {
  items: TocItem[];
};

export default function TOC({ items }: TOCProps) {
  const [activeId, setActiveId] =
    useState<string>("");

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

  if (items.length === 0) {
    return null;
  }

  return (
    <details className="group rounded-md border border-[var(--border)]">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold">
        <span>목차</span>

        <span
          aria-hidden="true"
          className="text-lg leading-none text-[var(--muted-foreground)]"
        >
          <span className="group-open:hidden">
            +
          </span>

          <span className="hidden group-open:inline">
            −
          </span>
        </span>
      </summary>

      <div className="border-t border-[var(--border)] px-4 py-4">
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
      </div>
    </details>
  );
}