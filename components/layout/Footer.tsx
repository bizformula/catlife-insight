// Global footer links required for policy/about/contact access.
import Link from "next/link";

const footerLinks = [
  { href: "/about", label: "소개" },
  { href: "/privacy", label: "개인정보처리방침" },
  { href: "/contact", label: "문의" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[#f9fafb] py-10 text-center text-sm dark:bg-[#111827]">
      <div className="flex flex-col items-center gap-3">
        <p className="font-bold text-[var(--point)]">bizformula</p>
        <p>반려동물을 위한 모든 것</p>
        <nav className="flex flex-wrap items-center justify-center gap-x-2">
          {footerLinks.map((link, index) => (
            <span key={link.href} className="inline-flex items-center gap-x-2">
              {index > 0 && <span aria-hidden="true">·</span>}
              <Link
                href={link.href}
                className="text-[var(--foreground)] no-underline hover:text-[var(--point)]"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </nav>
        <p>© 2026 bizformula. All rights reserved.</p>
      </div>
    </footer>
  );
}
