"use client";
import { useLang } from "@/lib/LanguageContext";
import { Language } from "@/lib/mockData";

interface TopBarProps {
  title?: string;
  showLangSwitch?: boolean;
  showBack?: boolean;
  onBack?: () => void;
}

export default function TopBar({
  title,
  showLangSwitch = false,
  showBack = false,
  onBack,
}: TopBarProps) {
  const { lang, setLang, t } = useLang();

  const langs: { code: Language; label: string }[] = [
    { code: "mr", label: "मराठी" },
    { code: "hi", label: "हिंदी" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={onBack}
              className="text-gray-600 mr-1 p-1"
              aria-label="Go back"
            >
              ←
            </button>
          )}
          <span className="text-orange-500 text-xl">♻️</span>
          <div>
            <p className="font-bold text-gray-800 text-sm leading-tight">
              {title || t("appName")}
            </p>
            {!title && (
              <p className="text-xs text-gray-400 leading-tight">{t("tagline")}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Offline/Online indicator */}
          <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded-full px-2 py-0.5 mr-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full pulse-green" />
            <span className="text-[10px] text-green-700 font-medium">Live</span>
          </div>
          {showLangSwitch && (
            <div className="flex bg-gray-100 rounded-full p-0.5 gap-0.5">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full transition-all ${
                    lang === l.code
                      ? "bg-orange-500 text-white"
                      : "text-gray-500"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
