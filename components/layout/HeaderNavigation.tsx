"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { getCategoryName } from "@/lib/site";

type HeaderNavigationProps = {
  categories: string[];
};

export default function HeaderNavigation({
  categories,
}: HeaderNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="flex items-center gap-2">
      {/* 데스크톱 메뉴 */}
      <nav className="hidden items-center gap-6 md:flex">
        <Link
          href="/finder"
          className="font-semibold text-[#2563EB] transition-colors hover:opacity-70"
        >
          사료 찾기
        </Link>

        {categories.map((category) => (
          <Link
            key={category}
            href={`/category/${encodeURIComponent(category)}`}
            className="text-base text-[var(--foreground)] transition-colors hover:text-[#2563EB]"
          >
            {getCategoryName(category)}
          </Link>
        ))}
      </nav>

      {/* 모바일 메뉴 버튼 */}
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-md text-xl md:hidden"
        onClick={() => setIsMenuOpen((previous) => !previous)}
        aria-label="메뉴 열기"
        aria-expanded={isMenuOpen}
      >
        ☰
      </button>

      <ThemeToggle />

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="absolute right-0 top-full w-full border-b border-[var(--border)] bg-white dark:bg-[#1a1a1a] md:hidden">
          <nav className="flex flex-col px-4 py-3">
            <Link
              href="/finder"
              className="py-2 font-semibold text-[#2563EB]"
              onClick={closeMenu}
            >
              사료 찾기
            </Link>

            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${encodeURIComponent(category)}`}
                className="py-2 text-base text-[var(--foreground)] transition-colors hover:text-[#2563EB]"
                onClick={closeMenu}
              >
                {getCategoryName(category)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}