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
    <>
      <style jsx>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background-color: #0a0a0a;
          transition: width 0.2s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6 md:px-12 border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-gray-200"
          : "bg-white border-transparent"
      }`}
    >
      <a href="#" className="text-lg tracking-tight flex items-center">
        <span className="font-bold text-[#0a0a0a]">EstebanMora</span>
        <span className="font-bold text-[#7c3aed]">.dev</span>
        <span className="ml-2 text-base">🎮</span>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="nav-link relative text-sm text-gray-600 transition-colors duration-200 hover:text-[#0a0a0a]"
          >
            {label}
          </a>
        ))}
        <a
          href="#contacto"
          className="text-sm bg-[#0a0a0a] text-white px-4 py-2 rounded-md transition-all duration-200 hover:bg-[#7c3aed] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(124,58,237,0.3)]"
        >
          {t("cta")}
        </a>
      </div>
    </nav>
    </>
  );
}
