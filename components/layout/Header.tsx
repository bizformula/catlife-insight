import Image from "next/image";
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
          className="flex items-center gap-2 !text-[var(--foreground)] transition-colors hover:!text-[var(--point)]"
        >
          <Image
            src="/images/catlife-favicon-charcoal-v1.png"
            alt="Catlife Insight"
            width={32}
            height={32}
            priority
            className="h-[30px] w-[30px] rounded-md"
          />
          <span className="font-bold !text-[var(--point)] transition-colors duration-200 hover:!text-[var(--foreground)]">
  Catlife Insight
</span>
        </Link>

        <HeaderNavigation categories={categories} />
      </div>
    </header>
  );
}
