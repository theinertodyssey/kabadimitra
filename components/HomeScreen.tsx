"use client";
import { useLang } from "@/lib/LanguageContext";
import { collector, priceRecords, activeLots, categoryMeta } from "@/lib/mockData";

interface HomeScreenProps {
  onTabChange: (tab: string) => void;
}

export default function HomeScreen({ onTabChange }: HomeScreenProps) {
  const { t, lang } = useLang();

  const topPrices = priceRecords.slice(0, 4);

  const speakPrice = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "en" ? "en-IN" : lang === "hi" ? "hi-IN" : "mr-IN";
      utterance.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return lang === "en" ? "Good Morning" : lang === "hi" ? "सुप्रभात" : "शुभ सकाळ";
    if (hour < 17) return lang === "en" ? "Good Afternoon" : lang === "hi" ? "नमस्ते" : "नमस्कार";
    return lang === "en" ? "Good Evening" : lang === "hi" ? "शुभ संध्या" : "शुभ संध्याकाळ";
  };

  return (
    <div className="screen-content">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-4 pt-4 pb-6">
        <p className="text-orange-100 text-sm">{getGreeting()} 👋</p>
        <p className="text-white font-bold text-xl mt-0.5">{t("collectorsName")}</p>
        <p className="text-orange-100 text-xs mt-0.5">📍 {collector.operatingArea}</p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <p className="text-white font-bold text-lg">₹{collector.thisMonthEarned.toLocaleString()}</p>
            <p className="text-orange-100 text-[10px] mt-0.5 leading-tight">{t("thisMonth")}</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <p className="text-white font-bold text-lg">{collector.totalTransactions}</p>
            <p className="text-orange-100 text-[10px] mt-0.5 leading-tight">{t("totalTransactions")}</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <p className="text-white font-bold text-lg">₹{collector.pendingAmount}</p>
            <p className="text-orange-100 text-[10px] mt-0.5 leading-tight">{t("pendingPayments")}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 -mt-3">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onTabChange("create")}
              className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4 text-center active:scale-95 transition-transform"
            >
              <div className="text-3xl mb-1">📦</div>
              <p className="font-bold text-orange-700 text-sm">{t("createNewLot")}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {lang === "en" ? "Photo + Weigh + Value" : lang === "hi" ? "फोटो + वजन + मूल्य" : "फोटो + वजन + मूल्य"}
              </p>
            </button>
            <button
              onClick={() => onTabChange("prices")}
              className="bg-green-50 border-2 border-green-200 rounded-xl p-4 text-center active:scale-95 transition-transform"
            >
              <div className="text-3xl mb-1">💰</div>
              <p className="font-bold text-green-700 text-sm">{t("viewPrices")}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                {lang === "en" ? "Today's rates" : lang === "hi" ? "आज के भाव" : "आजचे भाव"}
              </p>
            </button>
          </div>
        </div>
      </div>

      {/* Live Price Board */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-gray-800 text-sm">{t("currentRates")}</p>
          <button
            onClick={() => onTabChange("prices")}
            className="text-orange-500 text-xs font-medium"
          >
            {lang === "en" ? "See all →" : lang === "hi" ? "सभी देखें →" : "सर्व पहा →"}
          </button>
        </div>

        <div className="space-y-2">
          {topPrices.map((price) => {
            const meta = categoryMeta[price.materialCategory];
            const trendColor =
              price.trend === "up"
                ? "text-green-600"
                : price.trend === "down"
                ? "text-red-500"
                : "text-gray-500";
            const trendArrow =
              price.trend === "up" ? "↑" : price.trend === "down" ? "↓" : "→";

            return (
              <div
                key={price.id}
                className={`${meta.bgColor} rounded-xl px-4 py-3 flex items-center justify-between`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{meta.emoji}</span>
                  <div>
                    <p className={`font-semibold text-sm ${meta.color}`}>
                      {t(price.materialCategory)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t("marketRange")}: ₹{price.marketRangeLow}–{price.marketRangeHigh}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-base">
                      ₹{price.buyingPrice}
                    </p>
                    <p className="text-[10px] text-gray-500">{t("perKg")}</p>
                  </div>
                  <div className={`text-sm font-bold ${trendColor}`}>
                    {trendArrow} {price.trendPercent}%
                  </div>
                  <button
                    onClick={() =>
                      speakPrice(
                        `${t(price.materialCategory)}: rupees ${price.buyingPrice} per kilogram`
                      )
                    }
                    className="bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm text-base"
                    aria-label={t("tapToSpeak")}
                  >
                    🔊
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Lots */}
      <div className="px-4 mt-4">
        <p className="font-bold text-gray-800 text-sm mb-2">
          {lang === "en" ? "Active Lots" : lang === "hi" ? "सक्रिय लॉट" : "सक्रिय लॉट"}
        </p>
        <div className="space-y-2">
          {activeLots.map((lot) => {
            const statusColors: Record<string, string> = {
              draft: "bg-gray-100 text-gray-600",
              priced: "bg-blue-100 text-blue-600",
              matched: "bg-yellow-100 text-yellow-700",
              handed_over: "bg-green-100 text-green-700",
            };
            const statusLabels: Record<string, Record<string, string>> = {
              draft: { en: "Draft", hi: "मसौदा", mr: "मसुदा" },
              priced: { en: "Priced", hi: "मूल्यांकित", mr: "मूल्यांकित" },
              matched: { en: "Recycler Matched", hi: "रीसायकलर मिला", mr: "रिसायकलर जुळला" },
              handed_over: { en: "Handed Over", hi: "हैंडओवर हुआ", mr: "हस्तांतरित" },
            };
            return (
              <div
                key={lot.id}
                className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lot.imageEmoji}</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      {lot.id}
                    </p>
                    <p className="text-xs text-gray-500">
                      {lot.weightKg} kg · ₹{lot.estimatedValue}/{t("perKg")}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-semibold px-2 py-1 rounded-full ${statusColors[lot.status]}`}
                >
                  {statusLabels[lot.status]?.[lang] ?? lot.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
