"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Globe } from "lucide-react";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sync with Google Translate cookie on mount
    const getLangFromCookie = () => {
      const cookies = document.cookie.split("; ");
      const configCookie = cookies.find((c) => c.startsWith("googtrans="));
      if (configCookie) {
        const parts = configCookie.split("=");
        if (parts.length > 1) {
          const val = parts[1]; // e.g. /en/de
          const lang = val.split("/").pop();
          if (lang && ["en", "de", "fr", "it"].includes(lang)) {
            return lang;
          }
        }
      }
      return "en";
    };

    setCurrentLang(getLangFromCookie());

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    if (window.__applyTranslate) {
      window.__applyTranslate(langCode);
      setCurrentLang(langCode);
    }
    setIsOpen(false);
  };

  const selectedLang =
    languages.find((l) => l.code === currentLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none"
      >
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
          <Globe className="w-3.5 h-3.5 text-primary" />
        </div>
        <span
          className="text-sm font-medium text-gray-700 uppercase"
          translate="no"
        >
          {selectedLang.code}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 md:left-auto md:right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl z-60 py-2 overflow-hidden"
          >
            <div className="px-3 py-2 border-b border-gray-100 mb-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Select Language
              </span>
            </div>
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm transition-colors duration-200 ${
                    currentLang === lang.code
                      ? "bg-primary/5 text-primary font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                  {currentLang === lang.code && (
                    <motion.div
                      layoutId="active-lang"
                      className="w-1.5 h-1.5 rounded-full bg-primary"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
