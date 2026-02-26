"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: t("links.about"), href: "#sobre-mi" },
    { label: t("links.projects"), href: "#proyectos" },
    { label: t("links.skills"), href: "#skills" },
    { label: t("links.contact"), href: "#contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-12 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-gray-200"
          : "bg-white border-transparent"
      }`}
    >
      <a href="#" className="text-lg font-semibold tracking-tight">
        {t("brand")}<span className="text-[#0066ff]">.</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="text-sm text-gray-600 hover:text-foreground transition-colors"
          >
            {label}
          </a>
        ))}
        <a
          href="#contacto"
          className="text-sm bg-[#0a0a0a] text-white px-4 py-2 rounded-md hover:bg-[#1a1a1a] transition-colors"
        >
          {t("cta")}
        </a>
      </div>
    </nav>
  );
}
