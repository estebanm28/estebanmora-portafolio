"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import ContactModal from "./ContactModal";

export default function Contact() {
  const t = useTranslations("Contact");
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [modalOpen, setModalOpen] = useState(false);

  const pills = [
    { label: t("pill_github"), href: "https://github.com/estebanm28" },
    { label: t("pill_linkedin"), href: "https://linkedin.com/in/johan-esteban-mora-15ba55158" },
    { label: t("pill_cv"), href: "/resume.pdf" },
  ];

  return (
    <>
      <section id="contacto" className="border-t border-gray-200 bg-white">
        <div ref={revealRef} className="max-w-6xl mx-auto px-6 md:px-12 py-24">
          <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">
            {t("title_start")}{t("title_highlight")}
          </h2>
          <p className="mt-4 text-base text-gray-500 leading-relaxed">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setModalOpen(true)}
              className="bg-[#0a0a0a] text-white text-[.82rem] font-semibold px-[22px] py-[10px] rounded-full hover:bg-[#1a1a1a] transition-colors cursor-pointer"
            >
              {t("cta")}
            </button>

            <span className="text-gray-200 text-lg select-none">|</span>

            {pills.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-[1.5px] border-gray-200 rounded-full px-[22px] py-[10px] text-[.82rem] font-semibold text-gray-500 bg-transparent hover:border-[#0a0a0a] hover:text-[#0a0a0a] transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white" style={{ borderTop: "0.5px solid #e5e7eb" }}>
        <div className="flex items-center justify-between px-12 py-5">
          <span className="text-[.7rem] text-gray-400">© 2026</span>
          <div className="flex items-center gap-2">
            <span className="text-[.7rem] text-gray-400">{t("footer")}</span>
            {["Next.js", "Tailwind", "TypeScript"].map((tech) => (
              <span
                key={tech}
                className="text-[.65rem] font-medium text-gray-700 bg-gray-100 px-[7px] py-[2px] rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          <div />
        </div>
      </footer>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
