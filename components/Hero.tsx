"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect, useRef, type ReactNode } from "react";

interface TerminalLine {
  content: ReactNode;
  delay: number;
}

function colorizeJson(raw: string): ReactNode[] {
  const lines = raw.split("\n");
  return lines.map((line, i) => {
    // Opening/closing braces
    if (line.trim() === "{" || line.trim() === "}") {
      return <span key={i} style={{ color: "#6b7280" }}>{line}</span>;
    }

    // Key-value lines
    const parts: ReactNode[] = [];
    let rest = line;
    let partKey = 0;

    // Leading whitespace
    const leadingMatch = rest.match(/^(\s+)/);
    if (leadingMatch) {
      parts.push(leadingMatch[1]);
      rest = rest.slice(leadingMatch[1].length);
    }

    // Key in quotes
    const keyMatch = rest.match(/^("[\w_]+")(:\s*)/);
    if (keyMatch) {
      parts.push(<span key={partKey++} style={{ color: "#7dd3fc" }}>{keyMatch[1]}</span>);
      parts.push(keyMatch[2]);
      rest = rest.slice(keyMatch[0].length);

      // Check for "status" key to color value purple
      const isStatus = keyMatch[1] === '"status"';

      // Array value
      if (rest.startsWith("[")) {
        const segments: ReactNode[] = [];
        // Match all parts of the array across this line
        let arrayRest = rest;
        while (arrayRest.length > 0) {
          // String in quotes
          const strMatch = arrayRest.match(/^("(?:[^"\\]|\\.)*")/);
          if (strMatch) {
            segments.push(<span key={partKey++} style={{ color: "#86efac" }}>{strMatch[1]}</span>);
            arrayRest = arrayRest.slice(strMatch[1].length);
            continue;
          }
          // Brackets and punctuation
          const punctMatch = arrayRest.match(/^([\[\],\s]+)/);
          if (punctMatch) {
            segments.push(<span key={partKey++} style={{ color: "#6b7280" }}>{punctMatch[1]}</span>);
            arrayRest = arrayRest.slice(punctMatch[1].length);
            continue;
          }
          // Anything else
          segments.push(arrayRest[0]);
          arrayRest = arrayRest.slice(1);
        }
        parts.push(...segments);
      } else {
        // Single string value
        const valMatch = rest.match(/^("(?:[^"\\]|\\.)*")(,?)$/);
        if (valMatch) {
          parts.push(
            <span key={partKey++} style={{ color: isStatus ? "#a78bfa" : "#86efac" }}>
              {valMatch[1]}
            </span>
          );
          if (valMatch[2]) parts.push(valMatch[2]);
        } else {
          parts.push(rest);
        }
      }
    } else {
      // Continuation lines (array items indented)
      const segments: ReactNode[] = [];
      let contRest = rest;
      while (contRest.length > 0) {
        const strMatch = contRest.match(/^("(?:[^"\\]|\\.)*")/);
        if (strMatch) {
          segments.push(<span key={partKey++} style={{ color: "#86efac" }}>{strMatch[1]}</span>);
          contRest = contRest.slice(strMatch[1].length);
          continue;
        }
        const punctMatch = contRest.match(/^([\[\],\s]+)/);
        if (punctMatch) {
          segments.push(<span key={partKey++} style={{ color: "#6b7280" }}>{punctMatch[1]}</span>);
          contRest = contRest.slice(punctMatch[1].length);
          continue;
        }
        segments.push(contRest[0]);
        contRest = contRest.slice(1);
      }
      parts.push(...segments);
    }

    return <span key={i}>{parts}</span>;
  });
}

function buildTerminalLines(content: string): TerminalLine[] {
  const jsonNodes = colorizeJson(content);
  const lines: TerminalLine[] = [];
  let t = 0;

  // ~ whoami
  lines.push({
    content: <><span style={{ color: "#6b7280" }}>~ </span><span style={{ color: "#ffffff" }}>whoami</span></>,
    delay: t,
  });
  t += 500;

  // esteban_mora
  lines.push({
    content: <span style={{ color: "#a78bfa" }}>esteban_mora</span>,
    delay: t,
  });
  t += 300;

  // empty line
  lines.push({ content: <>&nbsp;</>, delay: t });
  t += 300;

  // ~ cat profile.json
  lines.push({
    content: <><span style={{ color: "#6b7280" }}>~ </span><span style={{ color: "#ffffff" }}>cat profile.json</span></>,
    delay: t,
  });
  t += 600;

  // JSON lines
  for (const node of jsonNodes) {
    lines.push({ content: node, delay: t });
    t += 300;
  }

  // empty line
  lines.push({ content: <>&nbsp;</>, delay: t });
  t += 300;

  // ~ ./run_portfolio.sh
  lines.push({
    content: <><span style={{ color: "#6b7280" }}>~ </span><span style={{ color: "#ffffff" }}>./run_portfolio.sh</span></>,
    delay: t,
  });
  t += 600;

  // success message
  lines.push({
    content: <span style={{ color: "#28c840" }}>▶ Portfolio loaded successfully!</span>,
    delay: t,
  });

  return lines;
}

export default function Hero() {
  const t = useTranslations("Hero");
  const fullTitle = t("title");

  // Typewriter state
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const hasTyped = useRef(false);

  // Terminal state
  const [visibleLines, setVisibleLines] = useState(0);
  const terminalLines = useRef<TerminalLine[]>([]);
  const hasAnimatedTerminal = useRef(false);

  // Build terminal lines once
  if (terminalLines.current.length === 0) {
    terminalLines.current = buildTerminalLines(t.raw("terminal.content") as string);
  }

  // Typewriter effect
  useEffect(() => {
    if (hasTyped.current) return;
    hasTyped.current = true;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayedTitle(fullTitle.slice(0, i));
      if (i >= fullTitle.length) {
        clearInterval(interval);
        setTypingDone(true);
        setTimeout(() => setShowDescription(true), 200);
        setTimeout(() => setShowButtons(true), 500);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [fullTitle]);

  // Terminal animation
  useEffect(() => {
    if (hasAnimatedTerminal.current) return;
    hasAnimatedTerminal.current = true;

    const allLines = terminalLines.current;
    const timers: ReturnType<typeof setTimeout>[] = [];

    allLines.forEach((line, idx) => {
      const timer = setTimeout(() => {
        setVisibleLines(idx + 1);
      }, line.delay);
      timers.push(timer);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const lines = terminalLines.current;

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

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a0a0a] min-h-[1em]">
              {displayedTitle}
              {!typingDone && (
                <span className="inline-block w-[3px] h-[0.85em] bg-[#0066ff] align-middle ml-1 animate-pulse" />
              )}
            </h1>

            <p
              className={`text-base md:text-lg text-gray-500 leading-relaxed max-w-lg text-justify transition-all duration-500 ${
                showDescription ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              {t("description")}
            </p>

            <div
              className={`flex items-center gap-3 pt-2 transition-all duration-500 ${
                showButtons ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
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

          {/* Right — Animated Terminal */}
          <div className="flex flex-col rounded-xl bg-[#1a1a1a] p-6 md:p-8 font-mono shadow-2xl min-h-[380px]">
            <div className="flex items-center gap-1.5 mb-5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-xs text-gray-500">terminal</span>
            </div>
            <div className="flex-1 text-sm md:text-base leading-relaxed">
              {lines.slice(0, visibleLines).map((line, idx) => (
                <div key={idx} className="animate-terminal-line">
                  <pre className="whitespace-pre">{line.content}</pre>
                </div>
              ))}
              <span className="inline-block w-2 h-4 animate-pulse mt-1" style={{ backgroundColor: "#a78bfa" }} />
            </div>
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
              href="/resume.pdf"
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
