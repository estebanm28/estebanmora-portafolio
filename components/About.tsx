"use client";

import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("About");

  const infoRows = [
    { label: t("info.degree_label"), value: t("info.degree_value") },
    { label: t("info.location_label"), value: t("info.location_value") },
    { label: t("info.availability_label"), value: t("info.availability_value") },
    { label: t("info.languages_label"), value: t("info.languages_value") },
  ];

  const stats = [
    { count: t("stats.projects_count"), label: t("stats.projects_label") },
    { count: t("stats.years_count"), label: t("stats.years_label") },
    { count: t("stats.tech_count"), label: t("stats.tech_label") },
  ];

  return (
    <section id="sobre-mi" className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        {/* Eyebrow + Title */}
        <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">
          {t("title")}
        </h2>

        {/* Two-column layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — Text */}
          <div className="flex flex-col gap-5">
            <p className="text-base text-gray-600 leading-relaxed text-justify">
              {t("paragraphs.p1")}
            </p>
            <p className="text-base text-gray-600 leading-relaxed text-justify">
              {t("paragraphs.p2")}
            </p>
            <p className="text-base text-gray-600 leading-relaxed text-justify">
              {t("paragraphs.p3")}
            </p>
            <p className="text-base text-gray-600 leading-relaxed text-justify">
              {t("paragraphs.p4")}
            </p>

            <div className="flex items-center gap-3 pt-4">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#1a1a1a] transition-colors"
              >
                {t("cta_projects")} <span aria-hidden>→</span>
              </a>
              <a
                href="/cv.pdf"
                className="inline-flex items-center gap-2 border border-gray-300 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-gray-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                {t("cta_cv")}
              </a>
            </div>
          </div>

          {/* Right — Info table + Stats */}
          <div className="flex flex-col gap-8">
            {/* Info table */}
            <div className="rounded-xl border border-gray-200 divide-y divide-gray-200 overflow-hidden">
              {infoRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between px-5 py-4">
                  <span className="text-sm text-gray-500">{label}</span>
                  <span className="text-sm font-medium text-[#0a0a0a]">{value}</span>
                </div>
              ))}
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map(({ count, label }) => (
                <div
                  key={label}
                  className="rounded-xl border border-gray-200 px-4 py-5 text-center"
                >
                  <p className="text-2xl font-bold text-[#0a0a0a]">{count}</p>
                  <p className="mt-1 text-sm text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
