"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const screenshots = [
  { key: "screenshot_home", src: "/runthe1s-home.webp" },
  { key: "screenshot_competitions", src: "/runthe1s-competitions.webp" },
  { key: "screenshot_rankings", src: "/runthe1s-rankings.webp" },
  { key: "screenshot_courts", src: "/runthe1s-courts.webp" },
  { key: "screenshot_games", src: "/runthe1s-games.webp" },
  { key: "screenshot_profile", src: "/runthe1s-profile.webp" },
] as const;

const stack = [
  "React Native",
  "TypeScript",
  "Supabase",
  "Stripe",
  "Google Places API",
];

export default function ProjectModal({ open, onClose }: ProjectModalProps) {
  const t = useTranslations("Projects.modal");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [open, onClose]);

  if (!open) return null;

  const features = [
    { title: t("feature_elo_title"), desc: t("feature_elo_desc") },
    { title: t("feature_league_title"), desc: t("feature_league_desc") },
    { title: t("feature_court_title"), desc: t("feature_court_desc") },
    { title: t("feature_profile_title"), desc: t("feature_profile_desc") },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[800px] mx-4 my-8 bg-white rounded-2xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 py-5 border-b border-gray-200 bg-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-[#0a0a0a]">Runthe1s</h2>
            <span className="text-xs font-medium text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full">
              {t("badge_live")}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label={t("close")}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-[#0a0a0a] hover:bg-gray-100 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 md:px-8 py-6 space-y-8">
          {/* Overview */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              {t("overview_title")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              {t("overview_text")}
            </p>
          </div>

          {/* My Role */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              {t("role_title")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              {t("role_text")}
            </p>
          </div>

          {/* Key Contribution */}
          <div className="bg-blue-50/60 border border-blue-100 rounded-xl px-5 py-4">
            <h3 className="text-sm font-semibold text-[#0066ff] uppercase tracking-wide">
              {t("contribution_title")}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              {t("contribution_text")}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              {t("features_title")}
            </h3>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="border border-gray-200 rounded-xl px-4 py-3"
                >
                  <p className="text-sm font-semibold text-[#0a0a0a]">
                    {f.title}
                  </p>
                  <p className="mt-0.5 text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              {t("stack_title")}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
              {t("screenshots_title")}
            </h3>
            <div className="mt-3 flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
              {screenshots.map(({ key, src }) => (
                <div key={key} className="shrink-0">
                  <div className="w-[140px] h-[280px] rounded-2xl border border-gray-200 overflow-hidden relative">
                    <Image
                      src={src}
                      alt={t(key)}
                      fill
                      className="object-cover"
                      sizes="140px"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-center text-gray-400 font-medium">
                    {t(key)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
