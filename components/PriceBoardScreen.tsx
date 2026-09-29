"use client";
import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { priceRecords, historicalPrices, categoryMeta, MaterialCategory } from "@/lib/mockData";

export default function PriceBoardScreen() {
  const { t, lang } = useLang();
  const [selected, setSelected] = useState<MaterialCategory | null>(null);

  const speak = (price: typeof priceRecords[0]) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const catName = t(price.materialCategory);
      const text =
        lang === "en"
          ? `${catName}: rupees ${price.buyingPrice} per kilogram. Market range: ${price.marketRangeLow} to ${price.marketRangeHigh} rupees.`
          : lang === "hi"
          ? `${catName}: ${price.buyingPrice} रुपये प्रति किलोग्राम। बाजार सीमा: ${price.marketRangeLow} से ${price.marketRangeHigh} रुपये।`
          : `${catName}: ${price.buyingPrice} रुपये प्रति किलोग्राम. बाजार श्रेणी: ${price.marketRangeLow} ते ${price.marketRangeHigh} रुपये.`;
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "en" ? "en-IN" : lang === "hi" ? "hi-IN" : "mr-IN";
      u.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  const selectedPrice = priceRecords.find((p) => p.materialCategory === selected);
  const months =
    lang === "en"
      ? ["Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      : lang === "hi"
      ? ["अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर"]
      : ["एप्रिल", "मे", "जून", "जुलै", "ऑगस्ट", "सप्टें"];

  const renderMiniChart = (category: MaterialCategory) => {
    const data = historicalPrices[category];
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const points = data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((v - min) / range) * 80 - 10;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg viewBox="0 0 100 40" className="w-16 h-8" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke={
            data[data.length - 1] >= data[0] ? "#16a34a" : "#dc2626"
          }
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  const renderDetailChart = (category: MaterialCategory) => {
    const data = historicalPrices[category];
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return (
      <div className="bg-gray-50 rounded-xl p-4 mt-3">
        <p className="text-xs text-gray-500 mb-3 font-medium">
          {lang === "en" ? "6-Month Price Trend" : lang === "hi" ? "6 महीने का मूल्य ट्रेंड" : "6 महिन्यांचा भाव ट्रेंड"}
        </p>
        <div className="flex items-end gap-2 h-20">
          {data.map((val, i) => {
            const height = Math.max(((val - min) / range) * 60 + 16, 8);
            const isLast = i === data.length - 1;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] text-gray-600 font-medium">
                  ₹{val}
                </span>
                <div
                  className={`w-full rounded-t-sm transition-all ${
                    isLast ? "bg-orange-500" : "bg-orange-200"
                  }`}
                  style={{ height: `${height}px` }}
                />
                <span className="text-[9px] text-gray-400">{months[i]}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="screen-content">
      <div className="bg-gradient-to-br from-green-600 to-green-700 px-4 py-4">
        <p className="text-white font-bold text-lg">{t("priceBoard")}</p>
        <p className="text-green-100 text-xs mt-0.5">
          📍 {lang === "en" ? "Pune" : "पुणे"} ·{" "}
          {lang === "en" ? "Updated today" : lang === "hi" ? "आज अपडेट हुआ" : "आज अपडेट"}
        </p>
      </div>

      {/* Info banner */}
      <div className="mx-4 mt-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
        <span>💡</span>
        <p className="text-xs text-blue-700">
          {lang === "en"
            ? "Tap 🔊 to hear the price aloud. Tap any row to see trends."
            : lang === "hi"
            ? "🔊 दबाएं भाव सुनने के लिए। ट्रेंड देखने के लिए कोई भी पंक्ति दबाएं।"
            : "🔊 दाबा भाव ऐकण्यासाठी. ट्रेंड पाहण्यासाठी कोणतीही ओळ दाबा."}
        </p>
      </div>

      <div className="px-4 mt-3 space-y-2">
        {priceRecords.map((price) => {
          const meta = categoryMeta[price.materialCategory];
          const isSelected = selected === price.materialCategory;
          const trendColor =
            price.trend === "up"
              ? "text-green-600 bg-green-50"
              : price.trend === "down"
              ? "text-red-500 bg-red-50"
              : "text-gray-500 bg-gray-50";
          const trendText =
            price.trend === "up"
              ? t("trendUp")
              : price.trend === "down"
              ? t("trendDown")
              : t("trendStable");

          return (
            <div
              key={price.id}
              className={`bg-white rounded-xl border transition-all ${
                isSelected ? "border-orange-400 shadow-md" : "border-gray-100 shadow-sm"
              }`}
            >
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                onClick={() =>
                  setSelected(isSelected ? null : price.materialCategory)
                }
              >
                <div className={`${meta.bgColor} w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
                  {meta.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm ${meta.color}`}>
                    {t(price.materialCategory)}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {t("marketRange")}: ₹{price.marketRangeLow}–₹{price.marketRangeHigh}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {renderMiniChart(price.materialCategory)}
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-base">₹{price.buyingPrice}</p>
                    <p className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${trendColor}`}>
                      {trendText}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(price);
                    }}
                    className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center text-lg border border-gray-200 flex-shrink-0"
                    aria-label={t("tapToSpeak")}
                  >
                    🔊
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {isSelected && selectedPrice && (
                <div className="px-4 pb-4 border-t border-gray-50">
                  {renderDetailChart(price.materialCategory)}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <div className="bg-green-50 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-gray-500">
                        {lang === "en" ? "Best Offer" : lang === "hi" ? "सबसे अच्छा ऑफर" : "सर्वोत्तम ऑफर"}
                      </p>
                      <p className="font-bold text-green-700">₹{selectedPrice.sellingPrice}</p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2.5 text-center">
                      <p className="text-xs text-gray-500">
                        {lang === "en" ? "Market Avg" : lang === "hi" ? "बाजार औसत" : "बाजार सरासरी"}
                      </p>
                      <p className="font-bold text-blue-700">
                        ₹{Math.round((selectedPrice.marketRangeLow + selectedPrice.marketRangeHigh) / 2)}
                      </p>
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2 text-center">
                    {lang === "en"
                      ? `Source: ${selectedPrice.recyclerName}`
                      : `स्रोत: ${selectedPrice.recyclerName}`}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
