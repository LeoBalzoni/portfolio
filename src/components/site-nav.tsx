"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/blog/", label: "Writing", match: (p: string) => p.startsWith("/blog") },
  { href: "/work/", label: "Work", match: (p: string) => p.startsWith("/work") },
  { href: "/#games", label: "Games", match: () => false },
  { href: "/#legend", label: "About", match: () => false },
];

export function SiteNav() {
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/";
  return (
    <header className="margin margin--top">
      {isHome ? (
        // On the sheet itself the name is the title, so the margin carries the sheet line.
        <p className="margin__sheet">
          Sheet 1243<span> · Lausanne · 1:25 000</span>
        </p>
      ) : (
        <Link href="/" className="margin__name" aria-label="Leonardo Balzoni, home">
          <span aria-hidden="true">L<i>eonardo</i>
            <b>.</b> Balzoni
          </span>
        </Link>
      )}
      <nav aria-label="Main">
        <ul className="margin__links">
          {links.map(({ href, label, match }) => (
            <li key={href}>
              <Link href={href} aria-current={match(pathname) ? "page" : undefined}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
