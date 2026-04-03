"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ProjectModal from "./ProjectModal";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Projects() {
  const t = useTranslations("Projects");
  const [modalOpen, setModalOpen] = useState(false);
  const revealRef = useScrollReveal<HTMLDivElement>();

  const projects = [
    {
      number: "001",
      name: t("items.p1.name"),
      description: t("items.p1.description"),
      stack: ["React Native", "Node.js", "TypeScript"],
      hasModal: true,
      placeholder: false,
    },
    {
      number: "002",
      name: t("items.p2.name"),
      description: t("items.p2.description"),
      stack: [],
      hasModal: false,
      placeholder: true,
    },
    {
      number: "003",
      name: t("items.p3.name"),
      description: t("items.p3.description"),
      stack: [],
      hasModal: false,
      placeholder: true,
    },
  ];

  return (
    <section id="proyectos" className="border-t border-gray-200 bg-white">
      <div ref={revealRef} className="max-w-6xl mx-auto px-6 md:px-12 py-24">
        {/* Eyebrow + Title */}
        <p className="text-sm font-semibold text-[#0a0a0a] tracking-wide uppercase">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">
          {t("title_start")}{t("title_highlight")}
        </h2>

        {/* Project cards */}
        <div className="mt-12 flex flex-col gap-2">
          {projects.map((project) => (
            <div
              key={project.number}
              className={`relative rounded-[10px] border border-gray-200 p-7 transition-all duration-200 ${
                project.placeholder
                  ? "opacity-45"
                  : "hover:bg-[#f9f9f9] hover:border-gray-300"
              }`}
            >
              {/* Left accent bar */}
              {!project.placeholder && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0a0a0a] rounded-l-[10px]" />
              )}

              <div className="grid grid-cols-[52px_1fr_auto] gap-6 items-center">
                {/* Number */}
                <span className="text-lg font-bold text-gray-300 font-mono">
                  {project.number}
                </span>

                {/* Middle — Name + Description */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <p
                      className={`text-base font-semibold ${
                        project.placeholder ? "text-gray-400" : "text-[#0a0a0a]"
                      }`}
                    >
                      {project.name}
                    </p>
                    {project.hasModal && (
                      <span className="text-[11px] font-medium text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                        {t("modal.badge_live")}
                      </span>
                    )}
                  </div>
                  <p className={`mt-1 text-[15px] text-gray-500 ${project.placeholder ? "" : "text-justify"}`}>
                    {project.description}
                  </p>
                  {project.hasModal && (
                    <p className="mt-1.5 text-sm font-medium text-gray-400">
                      {t("items.p1.stat")}
                    </p>
                  )}
                </div>

                {/* Right — Stack + Link */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {project.stack.length > 0 && (
                    <div className="flex flex-col items-end gap-1.5">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.hasModal ? (
                    <button
                      onClick={() => setModalOpen(true)}
                      className="mt-1 text-sm font-bold text-[#0a0a0a] hover:underline transition-colors cursor-pointer"
                    >
                      {t("view_link")}
                    </button>
                  ) : (
                    <span className="text-sm text-gray-300">
                      {t("coming_soon")}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
