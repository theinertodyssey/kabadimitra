"use client";
import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { traceabilityRecords, transactions, categoryMeta } from "@/lib/mockData";
import { QRCodeSVG } from "qrcode.react";

export default function HandoverScreen() {
  const { t, lang } = useLang();
  const [selectedLot, setSelectedLot] = useState<string | null>(
    traceabilityRecords[0].lotId
  );

  const record = traceabilityRecords.find((r) => r.lotId === selectedLot);
  const transaction = transactions.find((tx) => tx.lotId === selectedLot);

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="screen-content">
      <div className="bg-gradient-to-br from-purple-600 to-purple-700 px-4 py-4">
        <p className="text-white font-bold text-lg">{t("handoverRecord")}</p>
        <p className="text-purple-100 text-xs mt-0.5">
          {lang === "en"
            ? "Verifiable digital chain-of-custody"
            : lang === "hi"
            ? "सत्यापन योग्य डिजिटल हस्तांतरण रिकॉर्ड"
            : "सत्यापनीय डिजिटल हस्तांतरण नोंद"}
        </p>
      </div>

      {/* Lot selector */}
      <div className="px-4 py-3">
        <p className="text-xs text-gray-500 mb-2 font-medium">
          {lang === "en" ? "Select Lot" : lang === "hi" ? "लॉट चुनें" : "लॉट निवडा"}
        </p>
        <div className="flex gap-2">
          {traceabilityRecords.map((r) => {
            const tx = transactions.find((t) => t.lotId === r.lotId);
            const meta = tx ? categoryMeta[tx.materialCategory] : null;
            return (
              <button
                key={r.lotId}
                onClick={() => setSelectedLot(r.lotId)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
                  selectedLot === r.lotId
                    ? "border-purple-500 bg-purple-50 text-purple-700"
                    : "border-gray-200 bg-white text-gray-600"
                }`}
              >
                <span>{meta?.emoji}</span>
                <span>{r.lotId}</span>
              </button>
            );
          })}
        </div>
      </div>

      {record && transaction && (
        <div className="px-4 space-y-3">
          {/* Status Banner */}
          <div
            className={`rounded-xl px-4 py-3 flex items-center gap-3 ${
              record.recyclerConfirmed
                ? "bg-green-50 border border-green-200"
                : "bg-yellow-50 border border-yellow-200"
            }`}
          >
            <span className="text-2xl">
              {record.recyclerConfirmed ? "✅" : "⏳"}
            </span>
            <div>
              <p
                className={`font-bold text-sm ${
                  record.recyclerConfirmed ? "text-green-700" : "text-yellow-700"
                }`}
              >
                {record.recyclerConfirmed
                  ? lang === "en"
                    ? "Recycler Confirmed"
                    : lang === "hi"
                    ? "रीसायकलर ने पुष्टि की"
                    : "रिसायकलरने निश्चित केले"
                  : lang === "en"
                  ? "Awaiting Recycler Confirmation"
                  : lang === "hi"
                  ? "रीसायकलर की पुष्टि का इंतजार"
                  : "रिसायकलरच्या निश्चिततेची प्रतीक्षा"}
              </p>
              {record.recyclerConfirmTime && (
                <p className="text-xs text-green-600 mt-0.5">
                  {formatDate(record.recyclerConfirmTime)}
                </p>
              )}
            </div>
          </div>

          {/* QR Code Card */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-purple-600 px-4 py-2">
              <p className="text-white font-bold text-sm">{t("handoverRecord")}</p>
              <p className="text-purple-200 text-[11px]">{record.handoverRef}</p>
            </div>
            <div className="p-4 flex flex-col items-center">
              <div className="bg-white p-3 rounded-xl border-2 border-purple-100 shadow-inner">
                <QRCodeSVG
                  value={record.qrData}
                  size={160}
                  level="H"
                  fgColor="#6d28d9"
                  bgColor="#ffffff"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">{t("scanQR")}</p>
              <p className="text-[11px] text-purple-600 font-mono mt-1 font-bold">
                {record.handoverRef}
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm">
            <div className="px-4 py-2.5 border-b border-gray-50">
              <p className="font-bold text-gray-700 text-sm">
                {lang === "en" ? "Lot Details" : lang === "hi" ? "लॉट विवरण" : "लॉट तपशील"}
              </p>
            </div>
            <div className="px-4 py-3 space-y-3">
              {[
                { label: t("lotId"), value: record.lotId, icon: "🔖" },
                {
                  label: t("materialCategory") || t("selectCategory"),
                  value: `${categoryMeta[transaction.materialCategory].emoji} ${t(transaction.materialCategory)}`,
                  icon: "📦",
                },
                {
                  label: t("weight"),
                  value: `${record.weightKg} kg`,
                  icon: "⚖️",
                },
                {
                  label: t("timestamp"),
                  value: formatDate(record.timestamp),
                  icon: "🕐",
                },
                {
                  label: t("location"),
                  value: record.gpsAddress,
                  icon: "📍",
                },
                {
                  label: `GPS`,
                  value: `${record.gpsLat}°N, ${record.gpsLng}°E`,
                  icon: "🛰️",
                },
                {
                  label: t("recyclerName"),
                  value: transaction.recyclerName,
                  icon: "♻️",
                },
                {
                  label: lang === "en" ? "Quoted Price" : lang === "hi" ? "उद्धृत मूल्य" : "उद्धृत किंमत",
                  value: `₹${transaction.quotedPrice}/${t("perKg")}`,
                  icon: "💰",
                },
              ].map(({ label, value, icon }) => (
                <div key={label} className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-sm flex-shrink-0">{icon}</span>
                    <span className="text-xs text-gray-500 truncate">{label}</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-800 text-right max-w-[55%]">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Photo ref */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
              {categoryMeta[transaction.materialCategory].emoji}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-700">
                {lang === "en" ? "Photo Reference" : lang === "hi" ? "फोटो संदर्भ" : "फोटो संदर्भ"}
              </p>
              <p className="text-[11px] text-gray-500 mt-0.5">{record.photoRef}</p>
              <p className="text-[11px] text-gray-400 mt-1">
                {lang === "en"
                  ? "Stored securely with lot record"
                  : lang === "hi"
                  ? "लॉट रिकॉर्ड के साथ सुरक्षित"
                  : "लॉट नोंदीसह सुरक्षित साठवले"}
              </p>
            </div>
          </div>

          {/* Traceability chain */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4">
            <p className="font-bold text-gray-700 text-sm mb-3">
              {lang === "en" ? "Traceability Chain" : lang === "hi" ? "ट्रेसेबिलिटी चेन" : "ट्रेसेबिलिटी साखळी"}
            </p>
            <div className="space-y-3">
              {[
                {
                  step:
                    lang === "en"
                      ? "Collection"
                      : lang === "hi"
                      ? "संग्रह"
                      : "संकलन",
                  detail: record.gpsAddress,
                  time: formatDate(record.timestamp),
                  done: true,
                  icon: "📦",
                },
                {
                  step:
                    lang === "en"
                      ? "Lot Created"
                      : lang === "hi"
                      ? "लॉट बनाया"
                      : "लॉट तयार",
                  detail: `${record.lotId} · ${record.weightKg} kg`,
                  time: formatDate(record.timestamp),
                  done: true,
                  icon: "✅",
                },
                {
                  step:
                    lang === "en"
                      ? "Recycler Matched"
                      : lang === "hi"
                      ? "रीसायकलर मिला"
                      : "रिसायकलर जुळला",
                  detail: transaction.recyclerName,
                  time: "—",
                  done: true,
                  icon: "🔗",
                },
                {
                  step:
                    lang === "en"
                      ? "Handover Confirmed"
                      : lang === "hi"
                      ? "हैंडओवर पुष्टि"
                      : "हस्तांतरण निश्चित",
                  detail: record.recyclerConfirmed
                    ? `By ${transaction.recyclerName}`
                    : lang === "en"
                    ? "Pending"
                    : lang === "hi"
                    ? "लंबित"
                    : "प्रलंबित",
                  time: record.recyclerConfirmTime
                    ? formatDate(record.recyclerConfirmTime)
                    : "—",
                  done: record.recyclerConfirmed,
                  icon: record.recyclerConfirmed ? "✅" : "⏳",
                },
              ].map(({ step, detail, time, done, icon }, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm ${
                        done ? "bg-green-100" : "bg-gray-100"
                      }`}
                    >
                      {icon}
                    </div>
                    {i < 3 && (
                      <div
                        className={`w-0.5 h-6 mt-1 ${done ? "bg-green-300" : "bg-gray-200"}`}
                      />
                    )}
                  </div>
                  <div className="pb-2">
                    <p className={`text-xs font-bold ${done ? "text-gray-800" : "text-gray-400"}`}>
                      {step}
                    </p>
                    <p className="text-[11px] text-gray-500">{detail}</p>
                    <p className="text-[10px] text-gray-400">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
