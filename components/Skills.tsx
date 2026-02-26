"use client";

import { useTranslations } from "next-intl";

const categories = [
  {
    key: "frontend",
    skills: [
      { name: "HTML & CSS", level: "senior" },
      { name: "JavaScript", level: "senior" },
      { name: "React", level: "mid" },
      { name: "TypeScript", level: "mid" },
    ],
  },
  {
    key: "backend",
    skills: [
      { name: "Python", level: "senior" },
      { name: "Node.js", level: "mid" },
      { name: "Java", level: "mid" },
      { name: "SQL/NoSQL", level: "senior" },
    ],
  },
  {
    key: "devops",
    skills: [
      { name: "Git & GitHub", level: "senior" },
      { name: "Docker", level: "mid" },
      { name: "Linux", level: "mid" },
      { name: "CI/CD", level: "junior" },
    ],
  },
  {
    key: "design",
    skills: [
      { name: "Figma", level: "mid" },
      { name: "Responsive", level: "senior" },
      { name: "UX/UI", level: "junior" },
      { name: "Accessibility", level: "junior" },
    ],
  },
];

const levelClasses: Record<string, string> = {
  senior: "bg-[#0a0a0a] text-white",
  mid: "bg-gray-100 text-gray-700",
  junior: "border border-gray-300 text-gray-500",
};

export default function Skills() {
  const t = useTranslations("Skills");

  return (
    <section id="skills" className="border-t border-gray-200 bg-[#f9f9f9]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">
          {t("title")}
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map(({ key, skills }) => (
            <div
              key={key}
              className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-sm font-semibold text-[#0a0a0a] mb-4">
                {t(`categories.${key}`)}
              </h3>
              <ul className="flex flex-col gap-3">
                {skills.map(({ name, level }) => (
                  <li key={name} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{name}</span>
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${levelClasses[level]}`}
                    >
                      {t(`levels.${level}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
