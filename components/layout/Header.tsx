import Link from "next/link";
import HeaderNavigation from "@/components/layout/HeaderNavigation";
import { getCategories } from "@/lib/posts";

export default function Header() {
  const categories = getCategories();

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-[var(--border)] bg-[var(--background)]">
      <div className="relative flex h-full items-center justify-between">
        <Link
          href="/"
          className="text-[20px] font-bold !text-[#2563EB]"
        >
          캣라이프 인사이트
        </Link>

        <HeaderNavigation categories={categories} />
      </div>
    </header>
  );
}