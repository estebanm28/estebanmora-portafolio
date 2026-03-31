"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="min-h-[calc(100vh-56px)] mt-14 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 max-w-6xl mx-auto w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-center gap-2 w-fit rounded-full border border-green-200 bg-green-50 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-medium text-green-700">
                {t("badge")}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a0a0a]">
              {t("title")}
            </h1>

            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-lg text-justify">
              {t("description")}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 bg-[#0a0a0a] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#1a1a1a] transition-colors"
              >
                {t("cta_primary")} <span aria-hidden>→</span>
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 border border-gray-300 text-sm font-medium px-5 py-2.5 rounded-md hover:bg-gray-50 transition-colors"
              >
                {t("cta_secondary")}
              </a>
            </div>
          </div>

          {/* Right — Terminal */}
          <div className="flex flex-col rounded-xl bg-[#1a1a1a] p-6 md:p-8 font-mono shadow-2xl">
            <div className="flex items-center gap-1.5 mb-5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-gray-500">{t("terminal.filename")}</span>
            </div>
            <pre className="flex-1 text-sm md:text-base text-gray-300 leading-relaxed whitespace-pre">
              {t.raw("terminal.content")}
              <span className="inline-block w-2 h-4 bg-gray-400 align-middle animate-pulse ml-0.5" />
            </pre>
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
          <div className="px-6 md:px-12 py-5">
            <p className="text-2xl font-bold text-[#0a0a0a]">{t("stats.projects_count")}</p>
            <p className="text-sm text-gray-500">{t("stats.projects_label")}</p>
          </div>
          <div className="px-6 md:px-12 py-5">
            <p className="text-2xl font-bold text-[#0a0a0a]">{t("stats.years_count")}</p>
            <p className="text-sm text-gray-500">{t("stats.years_label")}</p>
          </div>
          <div className="px-6 md:px-12 py-5">
            <p className="text-2xl font-bold text-[#0a0a0a]">{t("stats.tech_count")}</p>
            <p className="text-sm text-gray-500">{t("stats.tech_label")}</p>
          </div>
          <div className="flex items-center px-6 md:px-12 py-5">
            <a
              href="/cv.pdf"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a] hover:text-[#0066ff] transition-colors"
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
              {t("stats.download_cv")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
