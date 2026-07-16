"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/sobre", label: "Sobre" },
  { href: "/creditos", label: "Créditos" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="w-full h-[88px] flex items-center justify-between px-6 lg:px-8 bg-white border-b border-gray-light">
        <Link href="/" className="text-xl font-bold uppercase tracking-tight leading-none">
          NOVO<br />CICLO
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-wider transition-colors ${
                  isActive
                    ? "text-green-primary font-semibold"
                    : "text-gray-medium hover:text-text"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-12 h-12 rounded-full bg-green-primary flex items-center justify-center"
          aria-label={menuOpen ? "Fechar menu" : "Menu"}
        >
          <span className="text-white text-lg font-bold leading-none">
            {menuOpen ? "×" : "+"}
          </span>
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeMenu}
          />
          <nav className="absolute top-0 right-0 w-72 h-full bg-white shadow-lg flex flex-col pt-24 px-8">
            <button
              onClick={closeMenu}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-green-primary flex items-center justify-center"
              aria-label="Fechar menu"
            >
              <span className="text-white text-lg font-bold leading-none">×</span>
            </button>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`text-base uppercase tracking-wider py-4 border-b border-gray-light transition-colors ${
                    isActive
                      ? "text-green-primary font-semibold"
                      : "text-text hover:text-green-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
