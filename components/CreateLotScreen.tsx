"use client";
import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { materials, categoryMeta, priceRecords, MaterialCategory } from "@/lib/mockData";

interface CreateLotScreenProps {
  onTabChange: (tab: string) => void;
}

type Step = "photo" | "category" | "weight" | "estimate" | "done";

export default function CreateLotScreen({ onTabChange }: CreateLotScreenProps) {
  const { t, lang } = useLang();
  const [step, setStep] = useState<Step>("photo");
  const [photoTaken, setPhotoTaken] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MaterialCategory | null>(null);
  const [weight, setWeight] = useState("");
  const [aiCategory, setAiCategory] = useState<MaterialCategory | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const categories: { id: MaterialCategory; emoji: string }[] = [
    { id: "pcb", emoji: "🖥️" },
    { id: "crt", emoji: "📺" },
    { id: "lcd", emoji: "💻" },
    { id: "battery", emoji: "🔋" },
    { id: "cable", emoji: "🔌" },
    { id: "motor", emoji: "⚙️" },
    { id: "plastic", emoji: "🧱" },
    { id: "mixed", emoji: "♻️" },
  ];

  const simulateAI = () => {
    setAnalyzing(true);
    setTimeout(() => {
      // Simulate AI classification
      const detected: MaterialCategory = "pcb";
      setAiCategory(detected);
      setSelectedCategory(detected);
      setAnalyzing(false);
      setStep("category");
    }, 1800);
  };

  const handlePhotoTake = () => {
    setPhotoTaken(true);
    simulateAI();
  };

  const getEstimate = () => {
    if (!selectedCategory || !weight) return 0;
    const price = priceRecords.find((p) => p.materialCategory === selectedCategory);
    return price ? Math.round(parseFloat(weight) * price.buyingPrice) : 0;
  };

  const lotId = `LOT-2409-${String(Math.floor(Math.random() * 900) + 100)}`;

  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === "en" ? "en-IN" : lang === "hi" ? "hi-IN" : "mr-IN";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    }
  };

  const stepIndicator = (
    <div className="flex items-center justify-center gap-2 py-3">
      {(["photo", "category", "weight", "estimate"] as Step[]).map((s, i) => (
        <div key={s} className="flex items-center gap-1">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              step === s
                ? "bg-orange-500 text-white"
                : ["photo", "category", "weight", "estimate"].indexOf(step) > i
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {["photo", "category", "weight", "estimate"].indexOf(step) > i ? "✓" : i + 1}
          </div>
          {i < 3 && <div className="w-6 h-0.5 bg-gray-200" />}
        </div>
      ))}
    </div>
  );

  return (
    <div className="screen-content">
      <div className="bg-orange-500 px-4 py-4">
        <p className="text-white font-bold text-lg">{t("createLot")}</p>
        <p className="text-orange-100 text-xs mt-0.5">
          {lang === "en"
            ? "Create a digital lot for your scrap"
            : lang === "hi"
            ? "अपने कबाड़ के लिए डिजिटल लॉट बनाएं"
            : "तुमच्या भंगारासाठी डिजिटल लॉट तयार करा"}
        </p>
      </div>

      {stepIndicator}

      <div className="px-4">
        {/* STEP 1: PHOTO */}
        {step === "photo" && (
          <div className="space-y-4">
            <p className="font-semibold text-gray-700 text-center text-base">
              {t("photoMaterial")}
            </p>
            <div
              className="border-2 border-dashed border-orange-300 rounded-2xl bg-orange-50 flex flex-col items-center justify-center py-12 cursor-pointer active:bg-orange-100 transition-colors"
              onClick={handlePhotoTake}
            >
              {analyzing ? (
                <div className="text-center">
                  <div className="text-4xl mb-3 animate-bounce">🔍</div>
                  <p className="font-semibold text-orange-600">
                    {lang === "en" ? "AI Analyzing..." : lang === "hi" ? "AI विश्लेषण..." : "AI विश्लेषण..."}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === "en" ? "Identifying material type" : lang === "hi" ? "सामग्री पहचान रहा है" : "साहित्य ओळखत आहे"}
                  </p>
                </div>
              ) : photoTaken ? (
                <div className="text-center">
                  <div className="text-5xl mb-2">📸</div>
                  <p className="text-green-600 font-semibold">
                    {lang === "en" ? "Photo Captured!" : lang === "hi" ? "फोटो लिया!" : "फोटो घेतला!"}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-5xl mb-3">📷</div>
                  <p className="font-bold text-orange-600 text-lg">
                    {lang === "en" ? "Tap to Photo" : lang === "hi" ? "फोटो लेने के लिए दबाएं" : "फोटो घेण्यासाठी दाबा"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {lang === "en" ? "AI will auto-identify the material" : lang === "hi" ? "AI अपने आप पहचान करेगा" : "AI आपोआप ओळखेल"}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex gap-2">
              <span className="text-lg">💡</span>
              <p className="text-xs text-blue-700">
                {lang === "en"
                  ? "Tip: Photo in good light. Keep all items in frame."
                  : lang === "hi"
                  ? "सुझाव: अच्छी रोशनी में फोटो लें। सभी चीजें फ्रेम में रखें।"
                  : "टिप: चांगल्या प्रकाशात फोटो काढा. सर्व वस्तू फ्रेममध्ये ठेवा."}
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: CATEGORY */}
        {step === "category" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-700 text-base">{t("selectCategory")}</p>
              {aiCategory && (
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-semibold">
                  🤖 AI: {t(aiCategory)}
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {categories.map((cat) => {
                const meta = categoryMeta[cat.id];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-col items-center justify-center rounded-xl p-3 gap-1 border-2 transition-all active:scale-95 ${
                      selectedCategory === cat.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-100 bg-gray-50"
                    } ${cat.id === aiCategory ? "ring-2 ring-green-400" : ""}`}
                  >
                    <span className="text-2xl">{cat.emoji}</span>
                    <span className={`text-[10px] font-medium text-center leading-tight ${meta.color}`}>
                      {t(cat.id)}
                    </span>
                    {cat.id === aiCategory && (
                      <span className="text-[9px] text-green-600">AI ✓</span>
                    )}
                  </button>
                );
              })}
            </div>
            <button
              disabled={!selectedCategory}
              onClick={() => setStep("weight")}
              className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl disabled:opacity-40 active:scale-95 transition-all text-base"
            >
              {lang === "en" ? "Continue →" : lang === "hi" ? "आगे बढ़ें →" : "पुढे जा →"}
            </button>
          </div>
        )}

        {/* STEP 3: WEIGHT */}
        {step === "weight" && selectedCategory && (
          <div className="space-y-4">
            <p className="font-semibold text-gray-700 text-base">{t("enterWeight")}</p>

            {/* Selected category badge */}
            <div className={`${categoryMeta[selectedCategory].bgColor} rounded-xl px-4 py-3 flex items-center gap-3`}>
              <span className="text-3xl">{categoryMeta[selectedCategory].emoji}</span>
              <div>
                <p className={`font-bold ${categoryMeta[selectedCategory].color}`}>
                  {t(selectedCategory)}
                </p>
                <p className="text-xs text-gray-500">
                  {lang === "en" ? "Selected category" : lang === "hi" ? "चुनी गई श्रेणी" : "निवडलेली श्रेणी"}
                </p>
              </div>
            </div>

            {/* Weight input */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚖️</span>
                <div className="flex-1">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="0.0"
                    className="w-full text-3xl font-bold text-gray-800 bg-transparent outline-none"
                    step="0.1"
                    min="0"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {lang === "en" ? "kilograms (kg)" : lang === "hi" ? "किलोग्राम (किग्रा)" : "किलोग्राम (किग्रा)"}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick weight buttons */}
            <div>
              <p className="text-xs text-gray-500 mb-2">
                {lang === "en" ? "Quick select:" : lang === "hi" ? "जल्दी चुनें:" : "झटपट निवडा:"}
              </p>
              <div className="flex gap-2 flex-wrap">
                {[1, 2, 5, 10, 20, 50].map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(String(w))}
                    className="bg-gray-100 text-gray-700 font-medium text-sm px-3 py-2 rounded-lg active:bg-gray-200"
                  >
                    {w} kg
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={!weight || parseFloat(weight) <= 0}
              onClick={() => {
                setStep("estimate");
                const est = getEstimate();
                speak(
                  lang === "en"
                    ? `Estimated value: rupees ${est}`
                    : lang === "hi"
                    ? `अनुमानित मूल्य: ${est} रुपये`
                    : `अंदाजित मूल्य: ${est} रुपये`
                );
              }}
              className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl disabled:opacity-40 active:scale-95 transition-all text-base"
            >
              {t("getEstimate")} →
            </button>
          </div>
        )}

        {/* STEP 4: ESTIMATE */}
        {step === "estimate" && selectedCategory && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-center">
              <p className="text-green-100 text-sm">{t("aiEstimate")}</p>
              <p className="text-white font-bold text-4xl mt-2">
                ₹{getEstimate().toLocaleString()}
              </p>
              <p className="text-green-100 text-sm mt-1">
                {weight} kg × ₹{priceRecords.find((p) => p.materialCategory === selectedCategory)?.buyingPrice || 0}/kg
              </p>
              <button
                onClick={() =>
                  speak(
                    lang === "en"
                      ? `Estimated value: rupees ${getEstimate()}`
                      : lang === "hi"
                      ? `अनुमानित मूल्य: ${getEstimate()} रुपये`
                      : `अंदाजित मूल्य: ${getEstimate()} रुपये`
                  )
                }
                className="mt-3 bg-white/20 text-white text-sm px-4 py-1.5 rounded-full"
              >
                🔊 {t("tapToSpeak")}
              </button>
            </div>

            {/* Lot Summary */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="font-bold text-gray-700 text-sm">
                  {lang === "en" ? "Lot Summary" : lang === "hi" ? "लॉट सारांश" : "लॉट सारांश"}
                </p>
              </div>
              <div className="px-4 py-3 space-y-2.5">
                {[
                  {
                    label: t("lotId"),
                    value: lotId,
                  },
                  {
                    label: t("selectCategory"),
                    value: `${categoryMeta[selectedCategory].emoji} ${t(selectedCategory)}`,
                  },
                  { label: t("weight"), value: `${weight} kg` },
                  {
                    label: lang === "en" ? "Rate" : lang === "hi" ? "दर" : "दर",
                    value: `₹${priceRecords.find((p) => p.materialCategory === selectedCategory)?.buyingPrice || 0}/kg`,
                  },
                  {
                    label: t("location"),
                    value: "📍 Kothrud, Pune",
                  },
                  {
                    label: t("timestamp"),
                    value: new Date().toLocaleString("en-IN"),
                  },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{label}</span>
                    <span className="text-xs font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onTabChange("recyclers")}
              className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl active:scale-95 transition-all text-base"
            >
              ♻️ {t("matchRecycler")} →
            </button>
            <button
              onClick={() => {
                setStep("photo");
                setPhotoTaken(false);
                setSelectedCategory(null);
                setWeight("");
                setAiCategory(null);
              }}
              className="w-full bg-gray-100 text-gray-600 font-semibold py-3 rounded-xl active:scale-95 transition-all text-sm"
            >
              {lang === "en" ? "Create Another Lot" : lang === "hi" ? "और लॉट बनाएं" : "आणखी लॉट तयार करा"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
