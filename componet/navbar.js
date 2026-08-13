"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "products", href: "/products" },
  { label: "about", href: "/about" },
  { label: "contact us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-2xl  border-b border-black/5">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10"
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMenu}
          className="font-display text-2xl font-bold tracking-tight text-black"
        >
          SahyesNatural
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 text-sm font-medium text-black/90 md:flex">
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

        {/* Right Action Icons (Cart + Hamburger Button) */}
        <div className="flex items-center gap-3">
          {/* Cart Icon Link */}
          <Link href="/cart" onClick={closeMenu} aria-label="View cart">
            <button
              type="button"
              aria-label="View cart"
              className="relative rounded-full p-2 text-black transition-colors hover:text-[var(--lime)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)]"
            >
              <ShoppingCart size={22} strokeWidth={2} />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 text-black transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)] md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        className={`grid transition-all backdrop-blur-2xl duration-300 ease-in-out md:hidden ${isOpen
          ? "grid-rows-[1fr] opacity-100 backdrop-blur-2xl border-b border-black/10"
          : "grid-rows-[0fr] backdrop-blur-2xl opacity-0"
          }`}
      >
        <div className="overflow-hidden   backdrop-blur-3xl px-6">
          <ul className="flex flex-col backdrop-blur-2xl gap-4 py-4 text-base font-medium text-black">
            {NAV_LINKS.map((link) => (
              <li key={link.label} className="backdrop-blur-2xl">
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-2 backdrop-blur-2xl capitalize transition-colors hover:text-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lime)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}