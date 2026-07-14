"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@/types";

const navLinks: NavLink[] = [
  { label: "Manifesto", href: "/manifesto" },
  { label: "Sobre", href: "/sobre" },
  { label: "Créditos", href: "/creditos" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full h-[88px] flex items-center justify-between px-6 lg:px-8 bg-white border-b border-gray-light">
      <a href="/" className="text-xl font-bold uppercase tracking-tight leading-none">
        NOVO<br />CICLO
      </a>

      <nav className="hidden lg:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs uppercase tracking-wider text-text hover:text-green-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
        <button
          className="w-12 h-12 rounded-full bg-green-primary flex items-center justify-center"
          aria-label="Abrir menu"
        >
          <Menu className="text-white" size={20} />
        </button>
      </nav>

      <button
        className="lg:hidden w-12 h-12 rounded-full bg-green-primary flex items-center justify-center"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menu"
      >
        {menuOpen ? (
          <X className="text-white" size={20} />
        ) : (
          <Menu className="text-white" size={20} />
        )}
      </button>

      {menuOpen && (
        <div className="fixed inset-0 top-0 left-0 z-50 bg-cream flex flex-col items-center justify-center gap-8">
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-green-primary flex items-center justify-center"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <X className="text-white" size={20} />
          </button>
          <a
            href="/"
            className="text-2xl font-bold uppercase tracking-tight"
            onClick={() => setMenuOpen(false)}
          >
            NOVO<br />CICLO
          </a>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg uppercase tracking-wider text-text hover:text-green-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
