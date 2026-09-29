"use client";
import { useLang } from "@/lib/LanguageContext";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "home", emoji: "🏠", key: "home" },
  { id: "create", emoji: "📦", key: "createLot" },
  { id: "prices", emoji: "💰", key: "priceBoard" },
  { id: "recyclers", emoji: "♻️", key: "findRecycler" },
  { id: "earnings", emoji: "📊", key: "earnings" },
  { id: "safety", emoji: "⚠️", key: "safety" },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const { t } = useLang();
  return (
    <nav className="bottom-nav">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-0.5 px-1 py-1 rounded-lg transition-all ${
              activeTab === item.id
                ? "text-orange-600"
                : "text-gray-400"
            }`}
          >
            <span className="text-xl">{item.emoji}</span>
            <span
              className={`text-[10px] font-medium leading-tight text-center ${
                activeTab === item.id ? "text-orange-600" : "text-gray-400"
              }`}
            >
              {t(item.key)}
            </span>
            {activeTab === item.id && (
              <div className="w-1 h-1 bg-orange-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
