"use client";
import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/components/HomeScreen";
import CreateLotScreen from "@/components/CreateLotScreen";
import PriceBoardScreen from "@/components/PriceBoardScreen";
import RecyclerMatchScreen from "@/components/RecyclerMatchScreen";
import HandoverScreen from "@/components/HandoverScreen";
import EarningsScreen from "@/components/EarningsScreen";
import SafetyScreen from "@/components/SafetyScreen";
import RecyclerPortal from "@/components/RecyclerPortal";

type Tab =
  | "home"
  | "create"
  | "prices"
  | "recyclers"
  | "handover"
  | "earnings"
  | "safety"
  | "recyclerportal";

export default function App() {
  const [tab, setTab] = useState<Tab>("home");
  const [mode, setMode] = useState<"collector" | "recycler">("collector");
  const { t, lang } = useLang();

  const renderScreen = () => {
    if (mode === "recycler") return <RecyclerPortal />;
    switch (tab) {
      case "home":
        return <HomeScreen onTabChange={(t) => setTab(t as Tab)} />;
      case "create":
        return <CreateLotScreen onTabChange={(t) => setTab(t as Tab)} />;
      case "prices":
        return <PriceBoardScreen />;
      case "recyclers":
        return <RecyclerMatchScreen />;
      case "handover":
        return <HandoverScreen />;
      case "earnings":
        return <EarningsScreen />;
      case "safety":
        return <SafetyScreen />;
      default:
        return <HomeScreen onTabChange={(t) => setTab(t as Tab)} />;
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #f5f5f0 0%, #ede8e0 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "0",
      }}
    >
      {/* Desktop: show phone-like container + side panel */}
      <div className="w-full flex flex-col lg:flex-row lg:items-start lg:justify-center lg:gap-6 lg:py-8 lg:px-8">
        {/* Left panel — Mode switcher (desktop only) */}
        <div className="hidden lg:flex flex-col gap-4 w-64 sticky top-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="font-bold text-gray-700 text-sm mb-3">Switch View</p>
            <div className="space-y-2">
              <button
                onClick={() => { setMode("collector"); setTab("home"); }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  mode === "collector"
                    ? "bg-orange-500 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                🧑‍🦯 Collector View
              </button>
              <button
                onClick={() => setMode("recycler")}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  mode === "recycler"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
              >
                🏭 Recycler Portal
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="font-bold text-gray-700 text-sm mb-3">Quick Nav</p>
            <div className="space-y-1">
              {[
                { id: "home", emoji: "🏠", label: "Home" },
                { id: "create", emoji: "📦", label: "Create Lot" },
                { id: "prices", emoji: "💰", label: "Price Board" },
                { id: "recyclers", emoji: "♻️", label: "Find Recycler" },
                { id: "handover", emoji: "🤝", label: "Handover Record" },
                { id: "earnings", emoji: "📊", label: "Earnings" },
                { id: "safety", emoji: "⚠️", label: "Safety Guide" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setMode("collector"); setTab(item.id as Tab); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 transition-all ${
                    mode === "collector" && tab === item.id
                      ? "bg-orange-50 text-orange-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4">
            <p className="font-bold text-orange-700 text-sm mb-1">SIH 2025</p>
            <p className="text-xs text-orange-600">KabadiMitra Prototype</p>
            <p className="text-[11px] text-orange-500 mt-1">PS: Kabadiwala Connect</p>
            <p className="text-[11px] text-orange-500">Informal E-Waste → Formal Chain</p>
          </div>
        </div>

        {/* Phone Frame */}
        <div
          className="phone-frame w-full lg:w-[430px] lg:rounded-3xl lg:overflow-hidden lg:shadow-2xl lg:border lg:border-gray-200 relative"
          style={{ minHeight: "100svh" }}
        >
          {/* Mobile mode switcher at the top */}
          <div className="flex lg:hidden bg-gray-100 border-b border-gray-200">
            <button
              onClick={() => { setMode("collector"); setTab("home"); }}
              className={`flex-1 py-2 text-xs font-bold transition-all ${
                mode === "collector" ? "bg-orange-500 text-white" : "text-gray-500"
              }`}
            >
              🧑‍🦯 {lang === "en" ? "Collector" : lang === "hi" ? "संग्रहकर्ता" : "संग्राहक"}
            </button>
            <button
              onClick={() => setMode("recycler")}
              className={`flex-1 py-2 text-xs font-bold transition-all ${
                mode === "recycler" ? "bg-gray-800 text-white" : "text-gray-500"
              }`}
            >
              🏭 {lang === "en" ? "Recycler" : lang === "hi" ? "रीसायकलर" : "रिसायकलर"}
            </button>
          </div>

          <TopBar showLangSwitch={true} />
          {renderScreen()}
          {mode === "collector" && (
            <BottomNav
              activeTab={tab}
              onTabChange={(t) => setTab(t as Tab)}
            />
          )}
        </div>

        {/* Right panel — About (desktop only) */}
        <div className="hidden lg:flex flex-col gap-4 w-64 sticky top-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="font-bold text-gray-700 text-sm mb-2">About This Prototype</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              KabadiMitra connects informal scrap collectors to CPCB-authorized recyclers
              through a vernacular, offline-first mobile platform.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="font-bold text-gray-700 text-sm mb-3">PS Requirements ✓</p>
            <div className="space-y-1.5">
              {[
                "Photo + AI category classification",
                "Instant value estimate",
                "Live price board with trends",
                "Recycler matching by location",
                "Verifiable QR handover record",
                "GPS + timestamp traceability",
                "Earnings ledger",
                "Audio price announcements",
                "Safety guidance (audio+visual)",
                "Hindi + Marathi + English",
                "Recycler confirmation portal",
                "All 6 PS datasets covered",
              ].map((item) => (
                <div key={item} className="flex gap-2 items-start">
                  <span className="text-green-500 text-xs flex-shrink-0">✅</span>
                  <p className="text-[11px] text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <p className="font-bold text-gray-700 text-sm mb-2">Tech Stack</p>
            <div className="space-y-1">
              {[
                "Next.js 14 (App Router)",
                "TypeScript + Tailwind CSS",
                "QRCode.react",
                "Web Speech API (TTS)",
                "Vercel Deployment",
              ].map((item) => (
                <p key={item} className="text-[11px] text-gray-500">
                  · {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
