"use client";

import { useTranslations } from "next-intl";

export default function Projects() {
  const t = useTranslations("Projects");

  const projects = [
    {
      number: "001",
      name: t("items.p1.name"),
      description: t("items.p1.description"),
      stack: ["React Native", "Node.js", "PostgreSQL"],
      href: "#",
      placeholder: false,
    },
    {
      number: "002",
      name: t("items.p2.name"),
      description: t("items.p2.description"),
      stack: [],
      href: null,
      placeholder: true,
    },
    {
      number: "003",
      name: t("items.p3.name"),
      description: t("items.p3.description"),
      stack: [],
      href: null,
      placeholder: true,
    },
  ];

  return (
    <section id="proyectos" className="border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        {/* Eyebrow + Title */}
        <p className="text-sm font-medium text-gray-400 tracking-wide uppercase">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">
          {t("title")}
        </h2>

        {/* Project rows */}
        <div className="mt-12 rounded-xl border border-gray-200 divide-y divide-gray-200 overflow-hidden">
          {projects.map((project) => (
            <div
              key={project.number}
              className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-5 py-5 transition-colors ${
                project.placeholder
                  ? "opacity-50"
                  : "hover:bg-blue-50/50"
              }`}
            >
              {/* Number */}
              <span className="text-sm font-mono text-gray-400 shrink-0">
                {project.number}
              </span>

              {/* Name + Description */}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-semibold ${
                    project.placeholder ? "text-gray-400" : "text-[#0a0a0a]"
                  }`}
                >
                  {project.name}
                </p>
                <p className="mt-0.5 text-sm text-gray-500 truncate">
                  {project.description}
                </p>
              </div>

              {/* Stack tags */}
              <div className="flex items-center gap-2 shrink-0">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link */}
              <div className="shrink-0">
                {project.href ? (
                  <a
                    href={project.href}
                    className="text-sm font-medium text-[#0a0a0a] hover:text-[#0066ff] transition-colors"
                  >
                    {t("view_link")}
                  </a>
                ) : (
                  <span className="text-sm text-gray-300">
                    {t("coming_soon")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
