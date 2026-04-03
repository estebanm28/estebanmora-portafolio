"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const BOLD_KEYWORDS = [
  "Esteban Mora", "bilingual", "bilingüe", "Toronto, Canada", "Toronto, Canadá",
  "Teleperformance", "Legacy Barber Co.",
  "backend API", "clean interface", "interfaz limpia",
  "solid engineering meets intentional design",
  "la ingeniería sólida se encuentra con el diseño intencional",
  "Zendesk, Slack and Excel", "Zendesk, Slack y Excel",
  "how real users interact with software",
  "cómo los usuarios reales interactúan con el software",
  "Remote and hybrid", "remotos e híbridos",
  "Technical Support Engineer", "Customer Success", "Junior Developer",
  "Toronto and beyond", "Toronto y más allá",
];

function BoldText({ text }: { text: string }) {
  const escaped = BOLD_KEYWORDS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  escaped.sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        BOLD_KEYWORDS.includes(part) ? (
          <strong key={i} className="font-semibold text-[#0a0a0a]">{part}</strong>
        ) : (
          part
        )
      )}
    </>
  );
}

export default function About() {
  const t = useTranslations("About");
  const revealRef = useScrollReveal<HTMLDivElement>();
  const infoRows = [
    { label: t("info.degree_label"), value: null, multiline: [t("info.degree_value_1"), t("info.degree_value_2")] },
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
    <section id="sobre-mi" className="border-t border-gray-200 bg-[#f9f9f9]">
      <div ref={revealRef} className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 items-start">
          {/* Left — Title + Text */}
          <div className="flex flex-col gap-5">
            {/* Eyebrow + Title */}
            <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">
              {t("eyebrow")}
            </p>
            <h2 className="-mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">
              {t("title")}
            </h2>

            <p className="mt-4 text-base text-gray-600 leading-relaxed text-justify">
              <BoldText text={t("paragraphs.p1")} />
            </p>
            <p className="text-base text-gray-600 leading-relaxed text-justify">
              <BoldText text={t("paragraphs.p2")} />
            </p>
            <p className="text-base text-gray-600 leading-relaxed text-justify">
              <BoldText text={t("paragraphs.p3")} />
            </p>
            <p className="text-base text-gray-600 leading-relaxed text-justify">
              <BoldText text={t("paragraphs.p4")} />
            </p>

            <div className="flex items-center gap-3 pt-4">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#1a1a1a] transition-colors"
              >
                {t("cta_projects")} <span aria-hidden>→</span>
              </a>
              <a
                href="/resume.pdf"
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

          {/* Right — Photo + Info table + Stats */}
          <div className="flex flex-col gap-3">
            {/* Photo */}
            <div className="w-full h-[380px] rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profilePicture.jpg"
                alt="Esteban Mora"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            {/* Info table */}
            <div className="rounded-xl border border-gray-200 divide-y divide-gray-200 overflow-hidden">
              {infoRows.map(({ label, value, multiline }) => (
                <div key={label} className="flex items-center justify-between px-5 py-4">
                  <span className="text-sm text-gray-500">{label}</span>
                  {multiline ? (
                    <span className="text-sm font-medium text-[#0a0a0a] text-center flex flex-col">
                      {multiline.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-[#0a0a0a]">{value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3">
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
