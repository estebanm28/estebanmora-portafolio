"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState, useRef } from "react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const t = useTranslations("Contact.form");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setStatus("idle");
      formRef.current?.reset();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mnjozoov", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[500px] bg-white rounded-2xl shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-bold text-[#0a0a0a]">{t("title")}</h3>
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
        <div className="px-6 py-6">
          {status === "success" ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-base font-medium text-green-700 text-center">
                {t("success")}
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                  {t("name_label")}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder={t("name_placeholder")}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                  {t("email_label")}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder={t("email_placeholder")}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-colors"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                  {t("subject_label")}
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  required
                  defaultValue=""
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-colors bg-white"
                >
                  <option value="" disabled>{t("subject_placeholder")}</option>
                  <option value="job">{t("subject_job")}</option>
                  <option value="freelance">{t("subject_freelance")}</option>
                  <option value="collaboration">{t("subject_collab")}</option>
                  <option value="other">{t("subject_other")}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                  {t("message_label")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder={t("message_placeholder")}
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-colors resize-none"
                />
              </div>

              {/* Error */}
              {status === "error" && (
                <p className="text-sm text-red-600">{t("error")}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-[#0a0a0a] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#1a1a1a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "..." : t("submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
