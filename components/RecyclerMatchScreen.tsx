"use client";
import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { recyclers, categoryMeta, MaterialCategory, priceRecords } from "@/lib/mockData";

export default function RecyclerMatchScreen() {
  const { t, lang } = useLang();
  const [filterCategory, setFilterCategory] = useState<MaterialCategory | "all">("all");
  const [selectedRecycler, setSelectedRecycler] = useState<string | null>(null);

  const categories: { id: MaterialCategory | "all"; label: Record<string, string>; emoji: string }[] = [
    { id: "all", label: { en: "All", hi: "सभी", mr: "सर्व" }, emoji: "🔍" },
    { id: "pcb", label: { en: "PCB", hi: "PCB", mr: "PCB" }, emoji: "🖥️" },
    { id: "battery", label: { en: "Battery", hi: "बैटरी", mr: "बॅटरी" }, emoji: "🔋" },
    { id: "cable", label: { en: "Cable", hi: "केबल", mr: "केबल" }, emoji: "🔌" },
    { id: "crt", label: { en: "CRT", hi: "CRT", mr: "CRT" }, emoji: "📺" },
  ];

  const filtered = recyclers
    .filter(
      (r) =>
        filterCategory === "all" ||
        r.materialsAccepted.includes(filterCategory as MaterialCategory)
    )
    .sort((a, b) => a.distanceKm - b.distanceKm);

  const getOfferedRate = (r: typeof recyclers[0]) => {
    if (filterCategory !== "all" && r.offeredRates[filterCategory as MaterialCategory]) {
      return r.offeredRates[filterCategory as MaterialCategory];
    }
    const vals = Object.values(r.offeredRates);
    return vals.length ? Math.max(...vals.map(Number)) : 0;
  };

  const getMarketRate = (category: MaterialCategory) => {
    return priceRecords.find((p) => p.materialCategory === category)?.buyingPrice ?? 0;
  };

  const selected = recyclers.find((r) => r.id === selectedRecycler);

  return (
    <div className="screen-content">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-4">
        <p className="text-white font-bold text-lg">{t("nearbyRecyclers")}</p>
        <p className="text-blue-100 text-xs mt-0.5">
          📍 {lang === "en" ? "Near Kothrud, Pune" : "कोथरूड, पुणे जवळ"}
        </p>
      </div>

      {/* Category Filter */}
      <div className="px-4 py-3">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                filterCategory === cat.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label[lang]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recycler Cards */}
      <div className="px-4 space-y-3">
        {filtered.map((recycler, idx) => {
          const offeredRate = getOfferedRate(recycler);
          const isSelected = selectedRecycler === recycler.id;

          return (
            <div
              key={recycler.id}
              className={`bg-white rounded-xl border transition-all cursor-pointer ${
                isSelected ? "border-blue-400 shadow-lg" : "border-gray-100 shadow-sm"
              }`}
              onClick={() => setSelectedRecycler(isSelected ? null : recycler.id)}
            >
              {/* Rank badge */}
              <div className="flex items-start gap-3 px-4 pt-3 pb-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                    idx === 0
                      ? "bg-yellow-100 text-yellow-700"
                      : idx === 1
                      ? "bg-gray-100 text-gray-600"
                      : "bg-orange-50 text-orange-500"
                  }`}
                >
                  #{idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-gray-800 text-sm leading-tight">
                        {recycler.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        📍 {recycler.facilityLocation}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-green-700 text-base">₹{offeredRate}</p>
                      <p className="text-[10px] text-gray-400">{t("perKg")}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {recycler.authorizationStatus === "active" && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        ✅ {t("authorized")}
                      </span>
                    )}
                    {recycler.pickupAvailable && (
                      <span className="bg-blue-100 text-blue-700 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        🚚 {t("pickupAvailable")}
                      </span>
                    )}
                    <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full">
                      📏 {recycler.distanceKm} km
                    </span>
                    <span className="bg-yellow-50 text-yellow-700 text-[10px] px-2 py-0.5 rounded-full">
                      ⭐ {recycler.rating}
                    </span>
                  </div>

                  {/* Materials accepted chips */}
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {recycler.materialsAccepted.map((mat) => (
                      <span
                        key={mat}
                        className={`${categoryMeta[mat].bgColor} ${categoryMeta[mat].color} text-[10px] px-1.5 py-0.5 rounded`}
                      >
                        {categoryMeta[mat].emoji}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Expanded Detail */}
              {isSelected && selected && (
                <div className="border-t border-gray-50 px-4 py-3 space-y-3">
                  {/* Authorization details */}
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                    <p className="text-xs font-bold text-green-700 mb-1">
                      🏛️ {lang === "en" ? "Authorization" : lang === "hi" ? "अधिकरण" : "अधिकृतता"}
                    </p>
                    <p className="text-[11px] text-green-600">{selected.authorizationNumber}</p>
                    <p className="text-[11px] text-green-600">
                      {lang === "en" ? "Authorized by" : lang === "hi" ? "अधिकृत द्वारा" : "अधिकृत करणारे"}: {selected.authorizingBody}
                    </p>
                  </div>

                  {/* Rate comparison */}
                  {filterCategory !== "all" && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-bold text-gray-600 mb-2">
                        {lang === "en" ? "Rate vs Market" : lang === "hi" ? "दर बनाम बाजार" : "दर विरुद्ध बाजार"}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-[11px] mb-0.5">
                            <span className="text-gray-500">
                              {lang === "en" ? "This recycler" : lang === "hi" ? "यह रीसायकलर" : "हा रिसायकलर"}
                            </span>
                            <span className="font-bold text-blue-700">
                              ₹{selected.offeredRates[filterCategory as MaterialCategory] ?? "—"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-500 rounded-full h-1.5"
                              style={{
                                width: `${Math.min(
                                  ((selected.offeredRates[filterCategory as MaterialCategory] ?? 0) /
                                    getMarketRate(filterCategory as MaterialCategory)) *
                                    100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {lang === "en" ? "Market" : "बाजार"}: ₹{getMarketRate(filterCategory as MaterialCategory)}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact + Service area */}
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-500">
                        {lang === "en" ? "Contact" : lang === "hi" ? "संपर्क" : "संपर्क"}
                      </p>
                      <p className="text-xs font-semibold text-gray-700">{selected.contact}</p>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg p-2.5">
                      <p className="text-[10px] text-gray-500">
                        {lang === "en" ? "Service Area" : lang === "hi" ? "सेवा क्षेत्र" : "सेवा क्षेत्र"}
                      </p>
                      <p className="text-xs font-semibold text-gray-700">{selected.serviceAreaKm} km radius</p>
                    </div>
                  </div>

                  <button
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl active:scale-95 transition-all text-sm"
                    onClick={() => alert(`Handover request sent to ${selected.name}!`)}
                  >
                    {lang === "en" ? "Request Pickup / Handover" : lang === "hi" ? "पिकअप / हैंडओवर अनुरोध" : "पिकअप / हस्तांतरण विनंती"} →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
