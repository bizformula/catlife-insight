"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";

type HeaderNavigationProps = {
  categories: string[];
};

export default function HeaderNavigation({
  categories,
}: HeaderNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const ingredientsCategory =
    categories.find((category) => category === "ingredients") ??
    "ingredients";

  const menuItems = [
    {
      name: "사료 찾기",
      href: "/finder",
      highlighted: false,
    },
    {
      name: "제품 비교",
      href: "/compare",
      highlighted: false,
    },
    {
      name: "원료 사전",
      href: `/category/${ingredientsCategory}`,
      highlighted: false,
    },
    {
      name: "블로그",
      href: "/",
      highlighted: false,
    },
  ];

  return (
    <div className="flex items-center gap-2">
      {/* 데스크톱 메뉴 */}
      <nav className="hidden items-center gap-6 md:flex">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={
              item.highlighted
                ? "font-semibold text-[#2563EB] transition-colors hover:opacity-70"
                : "text-base text-[var(--foreground)] transition-colors hover:text-[#2563EB]"
            }
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* 모바일 메뉴 버튼 */}
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-md text-xl md:hidden"
        onClick={() =>
          setIsMenuOpen((previous) => !previous)
        }
        aria-label="메뉴 열기"
        aria-expanded={isMenuOpen}
      >
        ☰
      </button>

      <ThemeToggle />

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="absolute right-0 top-full w-full border-b border-[var(--border)] bg-[var(--background)] md:hidden">
          <nav className="flex flex-col px-4 py-3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.highlighted
                    ? "py-2 font-semibold text-[#2563EB]"
                    : "py-2 text-base text-[var(--foreground)] transition-colors hover:text-[#2563EB]"
                }
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}