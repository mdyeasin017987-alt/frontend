"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "products", href: "/products" },
  { label: "about", href: "/about" },
  { label: "contact us", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="bg-[var(--forest-mid)] sticky top-0 z-50 w-full backdrop-blur-2xl">
      <nav
        className="mx-auto flex max-w-7xl position-sticky items-center justify-between px-6 py-4 backdrop-blur-2xl md:px-10"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-white"
        >
          Cocobazar
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-medium text-white/90 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="capitalize transition-colors hover:text-[var(--lime)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)] rounded-sm"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/cart">
         
        <button
          type="button"
          aria-label="View cart"
          className="rounded-full p-2 text-white  transition-colors hover:text-[var(--lime)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)]"
        >
          <ShoppingCart size={22} strokeWidth={2} />
        </button>
        </Link>
      </nav>
    </header>
  );
}