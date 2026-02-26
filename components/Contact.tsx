"use client";

import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Contact");

  const links = [
    {
      label: t("links.email_label"),
      value: t("links.email_value"),
      href: "mailto:esteban@email.com",
    },
    {
      label: t("links.github_label"),
      value: t("links.github_value"),
      href: "https://github.com/estebanmora",
    },
    {
      label: t("links.linkedin_label"),
      value: t("links.linkedin_value"),
      href: "https://linkedin.com/in/estebanmora",
    },
    {
      label: t("links.resume_label"),
      value: t("links.resume_value"),
      href: "/cv.pdf",
    },
  ];

  return (
    <>
      <section id="contacto" className="border-t border-gray-200 bg-[#f9f9f9]">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="flex flex-col gap-5">
              <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">
                {t("eyebrow")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">
                {t("title")}
              </h2>
              <p className="text-base text-gray-500 leading-relaxed max-w-md">
                {t("description")}
              </p>
              <div className="pt-2">
                <a
                  href="mailto:esteban@email.com"
                  className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#1a1a1a] transition-colors"
                >
                  {t("cta")}
                </a>
              </div>
            </div>

            {/* Right — Links card */}
            <div className="rounded-xl border border-gray-200 bg-white divide-y divide-gray-200 overflow-hidden">
              {links.map(({ label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-blue-50/50 group"
                >
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-[#0a0a0a]">
                      {value}
                    </p>
                  </div>
                  <span className="text-gray-300 group-hover:text-[#0066ff] transition-colors">
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <span className="font-semibold text-[#0a0a0a]">
            Esteban Mora<span className="text-[#0066ff]">.</span>
          </span>
          <span>{t("footer")}</span>
          <span>estebanmora.dev</span>
        </div>
      </footer>
    </>
  );
}
