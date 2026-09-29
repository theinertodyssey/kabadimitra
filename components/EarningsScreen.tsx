"use client";
import { useLang } from "@/lib/LanguageContext";
import { transactions, collector, categoryMeta } from "@/lib/mockData";

export default function EarningsScreen() {
  const { t, lang } = useLang();

  const completed = transactions.filter((tx) => tx.transactionStatus === "completed");
  const pending = transactions.filter((tx) => tx.paymentStatus === "pending");

  const totalEarned = completed.reduce(
    (sum, tx) => sum + (tx.finalPrice ?? 0) * tx.quantityKg,
    0
  );

  const pendingAmount = pending.reduce(
    (sum, tx) => sum + tx.quotedPrice * tx.quantityKg,
    0
  );

  const monthlyData = [1200, 1800, 2100, 1650, 2400, 3145];
  const months =
    lang === "en"
      ? ["Apr", "May", "Jun", "Jul", "Aug", "Sep"]
      : lang === "hi"
      ? ["अप्र", "मई", "जून", "जुल", "अग", "सित"]
      : ["एप्र", "मे", "जून", "जुल", "ऑग", "सप्टें"];

  const maxMonth = Math.max(...monthlyData);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="screen-content">
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 px-4 pt-4 pb-6">
        <p className="text-white font-bold text-lg">{t("myEarnings")}</p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <p className="text-white font-bold text-lg">
              ₹{collector.totalEarned.toLocaleString()}
            </p>
            <p className="text-emerald-100 text-[10px] leading-tight mt-0.5">{t("totalEarned")}</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <p className="text-white font-bold text-lg">
              ₹{collector.thisMonthEarned.toLocaleString()}
            </p>
            <p className="text-emerald-100 text-[10px] leading-tight mt-0.5">{t("thisMonth")}</p>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center">
            <p className="text-yellow-300 font-bold text-lg">
              ₹{pendingAmount.toLocaleString()}
            </p>
            <p className="text-emerald-100 text-[10px] leading-tight mt-0.5">{t("pendingPayments")}</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4 -mt-2">
        {/* Monthly Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <p className="font-bold text-gray-700 text-sm mb-3">
            {lang === "en"
              ? "Monthly Earnings (₹)"
              : lang === "hi"
              ? "मासिक कमाई (₹)"
              : "मासिक कमाई (₹)"}
          </p>
          <div className="flex items-end gap-2 h-24">
            {monthlyData.map((val, i) => {
              const height = (val / maxMonth) * 80 + 12;
              const isLast = i === monthlyData.length - 1;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-[9px] text-gray-600 font-medium">₹{val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}</span>
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      isLast ? "bg-emerald-500" : "bg-emerald-200"
                    }`}
                    style={{ height: `${height}px` }}
                  />
                  <span className="text-[9px] text-gray-400">{months[i]}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex items-center gap-1 justify-end">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
            <span className="text-[10px] text-emerald-600 font-semibold">
              {lang === "en" ? "+31% this month" : lang === "hi" ? "+31% इस महीने" : "+31% या महिन्यात"}
            </span>
          </div>
        </div>

        {/* Pending Payments */}
        {pending.length > 0 && (
          <div>
            <p className="font-bold text-gray-700 text-sm mb-2">
              {lang === "en" ? "⏳ Pending Payments" : lang === "hi" ? "⏳ बकाया भुगतान" : "⏳ थकबाकी"}
            </p>
            <div className="space-y-2">
              {pending.map((tx) => (
                <div
                  key={tx.id}
                  className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{categoryMeta[tx.materialCategory].emoji}</span>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{tx.lotId}</p>
                      <p className="text-[11px] text-gray-500">
                        {tx.quantityKg} kg · {tx.recyclerName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-700">
                      ₹{(tx.quotedPrice * tx.quantityKg).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-yellow-600">
                      {lang === "en" ? "Due" : lang === "hi" ? "बकाया" : "देय"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transaction History */}
        <div>
          <p className="font-bold text-gray-700 text-sm mb-2">
            {lang === "en" ? "Transaction History" : lang === "hi" ? "लेनदेन इतिहास" : "व्यवहार इतिहास"}
          </p>
          <div className="space-y-2">
            {transactions.map((tx) => {
              const amount =
                tx.finalPrice !== null
                  ? tx.finalPrice * tx.quantityKg
                  : tx.quotedPrice * tx.quantityKg;
              const isPaid = tx.paymentStatus === "paid";
              const isCompleted = tx.transactionStatus === "completed";

              return (
                <div
                  key={tx.id}
                  className="bg-white border border-gray-100 rounded-xl px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                          categoryMeta[tx.materialCategory].bgColor
                        }`}
                      >
                        {categoryMeta[tx.materialCategory].emoji}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{tx.lotId}</p>
                        <p className="text-[11px] text-gray-400">{formatDate(tx.dateTime)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold text-base ${
                          isPaid ? "text-green-600" : "text-yellow-600"
                        }`}
                      >
                        {isPaid ? "+" : ""}₹{amount.toLocaleString()}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-0.5">
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            isPaid
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {isPaid ? t("paid") : t("pending")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-gray-500">
                    <span>⚖️ {tx.quantityKg} kg</span>
                    <span>·</span>
                    <span>₹{tx.quotedPrice}/{t("perKg")}</span>
                    <span>·</span>
                    <span className="truncate">♻️ {tx.recyclerName.split(" ").slice(0, 2).join(" ")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unit Economics Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-bold text-blue-800 text-sm mb-2">
            📊 {lang === "en" ? "Your Earning Power" : lang === "hi" ? "आपकी कमाई की ताकत" : "तुमची कमाई शक्ती"}
          </p>
          <div className="space-y-1.5">
            {[
              {
                label:
                  lang === "en"
                    ? "Without KabadiMitra (middleman)"
                    : lang === "hi"
                    ? "बिना KabadiMitra (बिचौलिया)"
                    : "KabadiMitra शिवाय",
                value: "₹15–20/kg",
                color: "text-red-600",
              },
              {
                label:
                  lang === "en"
                    ? "With KabadiMitra (direct recycler)"
                    : lang === "hi"
                    ? "KabadiMitra के साथ (सीधे रीसायकलर)"
                    : "KabadiMitra सह",
                value: "₹25–35/kg",
                color: "text-green-600",
              },
              {
                label:
                  lang === "en"
                    ? "Improvement"
                    : lang === "hi"
                    ? "सुधार"
                    : "सुधारणा",
                value: "+60–75%",
                color: "text-blue-700 font-bold",
              },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex justify-between text-xs">
                <span className="text-gray-600">{label}</span>
                <span className={`font-semibold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
