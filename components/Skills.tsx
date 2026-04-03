"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type SkillLevel = "building" | "learning";

const levelConfig: Record<SkillLevel, { width: string; color: string }> = {
  building: { width: "45%", color: "#7c3aed" },
  learning: { width: "25%", color: "#f59e0b" },
};

const categories: { key: string; skills: { name: string; level: SkillLevel }[] }[] = [
  {
    key: "frontend",
    skills: [
      { name: "HTML & CSS", level: "building" },
      { name: "JavaScript", level: "building" },
      { name: "React", level: "building" },
      { name: "TypeScript", level: "learning" },
    ],
  },
  {
    key: "backend",
    skills: [
      { name: "Python", level: "learning" },
      { name: "Node.js", level: "learning" },
      { name: "Java", level: "learning" },
      { name: "SQL/NoSQL", level: "learning" },
    ],
  },
  {
    key: "devops",
    skills: [
      { name: "Git & GitHub", level: "building" },
      { name: "Docker", level: "learning" },
      { name: "Linux", level: "learning" },
      { name: "CI/CD", level: "learning" },
    ],
  },
  {
    key: "design",
    skills: [
      { name: "Figma", level: "learning" },
      { name: "Responsive", level: "building" },
      { name: "UX/UI", level: "building" },
      { name: "Accessibility", level: "building" },
    ],
  },
];

export default function Skills() {
  const t = useTranslations("Skills");
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <section id="skills" className="border-t border-gray-200 bg-[#f9f9f9]">
      <div ref={revealRef} className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">
          {t("title")}
        </h2>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-1 rounded-full bg-[#7c3aed]" />
            <span className="text-xs text-gray-500">{t("legend.building")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-5 h-1 rounded-full bg-[#f59e0b]" />
            <span className="text-xs text-gray-500">{t("legend.learning")}</span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map(({ key, skills }) => (
            <div
              key={key}
              className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-sm font-semibold text-[#0a0a0a] mb-4">
                {t(`categories.${key}`)}
              </h3>
              <ul className="flex flex-col gap-4">
                {skills.map(({ name, level }) => {
                  const { width, color } = levelConfig[level];
                  return (
                    <li key={name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-gray-600">{name}</span>
                        <span className="text-[11px] font-medium text-gray-400">
                          {t(`levels.${level}`)}
                        </span>
                      </div>
                      <div className="w-full h-1 rounded-full bg-gray-100">
                        <div
                          className="h-1 rounded-full transition-all duration-500"
                          style={{ width, backgroundColor: color }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
