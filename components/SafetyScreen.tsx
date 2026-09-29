"use client";
import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { safetyGuidance } from "@/lib/mockData";

export default function SafetyScreen() {
  const { t, lang } = useLang();
  const [expanded, setExpanded] = useState<string | null>(safetyGuidance[0].id);

  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "en" ? "en-IN" : lang === "hi" ? "hi-IN" : "mr-IN";
      u.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  const speakGuidance = (guide: (typeof safetyGuidance)[0]) => {
    const title = guide.title[lang];
    const donts = guide.dont.map((d) => d[lang]).join(". ");
    const dos = guide.do.map((d) => d[lang]).join(". ");
    const text =
      lang === "en"
        ? `${title} safety guide. Do: ${dos}. Avoid: ${donts}`
        : `${title} सुरक्षा मार्गदर्शक. करा: ${dos}. टाळा: ${donts}`;
    speak(text);
  };

  const hazardColors: Record<string, string> = {
    high: "bg-red-100 border-red-200 text-red-700",
    medium: "bg-yellow-100 border-yellow-200 text-yellow-700",
    low: "bg-green-100 border-green-200 text-green-700",
  };

  const hazardLabels: Record<string, Record<string, string>> = {
    high: { en: "HIGH RISK", hi: "उच्च जोखिम", mr: "उच्च धोका" },
    medium: { en: "MEDIUM RISK", hi: "मध्यम जोखिम", mr: "मध्यम धोका" },
    low: { en: "LOW RISK", hi: "कम जोखिम", mr: "कमी धोका" },
  };

  return (
    <div className="screen-content">
      <div className="bg-gradient-to-br from-red-500 to-orange-500 px-4 py-4">
        <p className="text-white font-bold text-lg">{t("safetyGuide")}</p>
        <p className="text-red-100 text-xs mt-0.5">
          {lang === "en"
            ? "Protect yourself and your family"
            : lang === "hi"
            ? "अपनी और परिवार की रक्षा करें"
            : "स्वतःचे आणि कुटुंबाचे रक्षण करा"}
        </p>
      </div>

      {/* Warning Banner */}
      <div className="mx-4 mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex gap-2">
        <span className="text-xl flex-shrink-0">⚠️</span>
        <p className="text-xs text-red-700 font-medium">
          {lang === "en"
            ? "Unsafe practices like cable burning and acid leaching cause serious health damage. Use KabadiMitra to hand over safely."
            : lang === "hi"
            ? "केबल जलाना और एसिड लीचिंग जैसी असुरक्षित प्रथाएं गंभीर स्वास्थ्य क्षति पहुंचाती हैं। सुरक्षित हैंडओवर के लिए KabadiMitra का उपयोग करें।"
            : "केबल जाळणे आणि आम्ल लीचिंग यांसारख्या असुरक्षित पद्धती गंभीर आरोग्य नुकसान करतात. सुरक्षित हस्तांतरणासाठी KabadiMitra वापरा."}
        </p>
      </div>

      <div className="px-4 mt-3 space-y-3">
        {safetyGuidance.map((guide) => {
          const isOpen = expanded === guide.id;
          return (
            <div
              key={guide.id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3 cursor-pointer"
                onClick={() => setExpanded(isOpen ? null : guide.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{guide.icon}</div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">
                      {guide.title[lang]}
                    </p>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${hazardColors[guide.hazardLevel]}`}
                    >
                      {hazardLabels[guide.hazardLevel][lang]}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakGuidance(guide);
                    }}
                    className="w-9 h-9 bg-orange-50 border border-orange-200 rounded-full flex items-center justify-center text-lg"
                    aria-label="Hear safety guidance"
                  >
                    🔊
                  </button>
                  <span className="text-gray-400 text-lg">{isOpen ? "▲" : "▼"}</span>
                </div>
              </div>

              {/* Expanded Content */}
              {isOpen && (
                <div className="px-4 pb-4 space-y-3 border-t border-gray-50">
                  {/* DO THIS */}
                  <div className="bg-green-50 border border-green-100 rounded-xl p-3">
                    <p className="font-bold text-green-700 text-sm mb-2">
                      {t("doThis")}
                    </p>
                    <div className="space-y-2">
                      {guide.do.map((item, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <span className="text-green-500 font-bold text-sm flex-shrink-0 mt-0.5">✓</span>
                          <p className="text-xs text-green-800">{item[lang]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AVOID THIS */}
                  <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                    <p className="font-bold text-red-700 text-sm mb-2">
                      {t("avoidThis")}
                    </p>
                    <div className="space-y-2">
                      {guide.dont.map((item, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <span className="text-red-500 font-bold text-sm flex-shrink-0 mt-0.5">✗</span>
                          <p className="text-xs text-red-800">{item[lang]}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Related materials */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-gray-500">
                      {lang === "en" ? "Applies to:" : lang === "hi" ? "लागू होता है:" : "लागू होते:"}
                    </span>
                    {guide.relatedMaterials.map((mat) => (
                      <span
                        key={mat}
                        className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full"
                      >
                        {t(mat)}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Emergency Footer */}
      <div className="mx-4 mt-4 mb-4 bg-red-600 rounded-xl p-4 text-center">
        <p className="text-white font-bold text-sm">
          {lang === "en"
            ? "Emergency? Call Poison Control"
            : lang === "hi"
            ? "आपातकाल? जहर नियंत्रण को कॉल करें"
            : "आणीबाणी? विष नियंत्रण कक्षाला कॉल करा"}
        </p>
        <p className="text-red-100 text-2xl font-bold mt-1">📞 1800-11-4000</p>
        <p className="text-red-200 text-xs mt-1">
          {lang === "en" ? "Free · 24×7 · All languages" : "मुफ्त · 24×7 · सभी भाषाएं" }
        </p>
      </div>
    </div>
  );
}
