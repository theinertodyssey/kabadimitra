"use client";
import { useState } from "react";
import { useLang } from "@/lib/LanguageContext";
import { transactions, traceabilityRecords, categoryMeta } from "@/lib/mockData";
import { QRCodeSVG } from "qrcode.react";

export default function RecyclerPortal() {
  const { t, lang } = useLang();
  const [confirmedLots, setConfirmedLots] = useState<string[]>(["LOT-2409-001"]);
  const [scanInput, setScanInput] = useState("");
  const [scanResult, setScanResult] = useState<string | null>(null);

  const pending = transactions.filter(
    (tx) =>
      tx.transactionStatus === "matched" || tx.transactionStatus === "confirmed"
  );

  const confirmLot = (lotId: string) => {
    setConfirmedLots((prev) => [...prev, lotId]);
  };

  const handleScan = () => {
    const found = traceabilityRecords.find(
      (r) => r.handoverRef === scanInput || r.lotId === scanInput
    );
    if (found) {
      setScanResult(found.lotId);
      setConfirmedLots((prev) =>
        prev.includes(found.lotId) ? prev : [...prev, found.lotId]
      );
    } else {
      setScanResult("NOT_FOUND");
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="screen-content pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">
            🏭
          </div>
          <div>
            <p className="text-white font-bold text-base">
              {lang === "en" ? "Recycler Portal" : lang === "hi" ? "रीसायकलर पोर्टल" : "रिसायकलर पोर्टल"}
            </p>
            <p className="text-gray-300 text-xs">GreenTech Recyclers Pvt Ltd</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-white font-bold text-base">{pending.length}</p>
            <p className="text-gray-300 text-[10px]">
              {lang === "en" ? "Pending" : "लंबित"}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-green-400 font-bold text-base">{confirmedLots.length}</p>
            <p className="text-gray-300 text-[10px]">
              {lang === "en" ? "Confirmed" : "पुष्टि हुई"}
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <p className="text-blue-400 font-bold text-base">CPCB ✓</p>
            <p className="text-gray-300 text-[10px]">
              {lang === "en" ? "Auth Status" : "प्राधिकरण"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-4">
        {/* QR Scanner Simulation */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4">
          <p className="font-bold text-gray-800 text-sm mb-3">
            📷 {lang === "en" ? "Verify Handover by QR/Reference" : lang === "hi" ? "QR/संदर्भ द्वारा हैंडओवर सत्यापित करें" : "QR/संदर्भाद्वारे हस्तांतरण सत्यापित करा"}
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder={
                lang === "en"
                  ? "Enter Handover Ref or Lot ID"
                  : lang === "hi"
                  ? "हैंडओवर रेफ या लॉट आईडी दर्ज करें"
                  : "हस्तांतरण संदर्भ किंवा लॉट ID टाका"
              }
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400"
            />
            <button
              onClick={handleScan}
              className="bg-gray-800 text-white font-semibold px-4 py-2.5 rounded-xl text-sm"
            >
              {lang === "en" ? "Verify" : lang === "hi" ? "सत्यापित" : "सत्यापित"}
            </button>
          </div>

          {/* Quick fill hints */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {traceabilityRecords.map((r) => (
              <button
                key={r.lotId}
                onClick={() => setScanInput(r.handoverRef)}
                className="text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded-full"
              >
                {r.handoverRef}
              </button>
            ))}
          </div>

          {scanResult && (
            <div
              className={`mt-3 rounded-xl px-4 py-3 ${
                scanResult === "NOT_FOUND"
                  ? "bg-red-50 border border-red-200"
                  : "bg-green-50 border border-green-200"
              }`}
            >
              {scanResult === "NOT_FOUND" ? (
                <div className="flex gap-2 items-center">
                  <span>❌</span>
                  <p className="text-sm text-red-700 font-semibold">
                    {lang === "en" ? "Record not found" : "रिकॉर्ड नहीं मिला"}
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <span>✅</span>
                  <div>
                    <p className="text-sm text-green-700 font-bold">
                      {lang === "en" ? "Handover Verified!" : lang === "hi" ? "हैंडओवर सत्यापित!" : "हस्तांतरण सत्यापित!"}
                    </p>
                    <p className="text-[11px] text-green-600">{scanResult} confirmed</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pending Lots */}
        <div>
          <p className="font-bold text-gray-800 text-sm mb-2">
            ⏳ {lang === "en" ? "Incoming Lots" : lang === "hi" ? "आने वाले लॉट" : "येणारे लॉट"}
          </p>
          <div className="space-y-3">
            {pending.map((tx) => {
              const trace = traceabilityRecords.find((r) => r.lotId === tx.lotId);
              const isConfirmed = confirmedLots.includes(tx.lotId);
              const meta = categoryMeta[tx.materialCategory];

              return (
                <div
                  key={tx.id}
                  className={`bg-white border rounded-xl shadow-sm overflow-hidden ${
                    isConfirmed ? "border-green-200" : "border-gray-100"
                  }`}
                >
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${meta.bgColor} rounded-xl flex items-center justify-center text-xl`}>
                          {meta.emoji}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-gray-800">{tx.lotId}</p>
                          <p className="text-[11px] text-gray-500">
                            {tx.collectionLocation} · {formatDate(tx.dateTime)}
                          </p>
                        </div>
                      </div>
                      {isConfirmed ? (
                        <span className="bg-green-100 text-green-700 text-[11px] font-bold px-3 py-1 rounded-full">
                          ✅ {lang === "en" ? "Confirmed" : "पुष्टि"}
                        </span>
                      ) : (
                        <button
                          onClick={() => confirmLot(tx.lotId)}
                          className="bg-gray-800 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full"
                        >
                          {t("confirmHandover")}
                        </button>
                      )}
                    </div>

                    <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-[10px] text-gray-500">{t("weight")}</p>
                        <p className="font-bold text-xs text-gray-700">{tx.quantityKg} kg</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-[10px] text-gray-500">{lang === "en" ? "Rate" : "दर"}</p>
                        <p className="font-bold text-xs text-gray-700">₹{tx.quotedPrice}/kg</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <p className="text-[10px] text-gray-500">{lang === "en" ? "Value" : "मूल्य"}</p>
                        <p className="font-bold text-xs text-green-700">
                          ₹{(tx.quantityKg * tx.quotedPrice).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR for this lot */}
                  {trace && (
                    <div className="border-t border-gray-50 px-4 py-3 flex items-center gap-4">
                      <div className="bg-white border border-gray-100 rounded-lg p-1.5">
                        <QRCodeSVG
                          value={trace.qrData}
                          size={60}
                          level="M"
                          fgColor="#1f2937"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500">{t("handoverRecord")}</p>
                        <p className="text-xs font-mono font-bold text-gray-700">{trace.handoverRef}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {lang === "en"
                            ? "Scan to verify on any device"
                            : lang === "hi"
                            ? "किसी भी डिवाइस पर स्कैन करें"
                            : "कोणत्याही डिव्हाइसवर स्कॅन करा"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* EPR compliance note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-bold text-blue-800 text-sm">
            📋 {lang === "en" ? "EPR Compliance" : "EPR अनुपालन"}
          </p>
          <p className="text-xs text-blue-700 mt-1">
            {lang === "en"
              ? "Every confirmed handover auto-generates a traceable transaction record for your CPCB EPR compliance report."
              : lang === "hi"
              ? "हर पुष्टि किया गया हैंडओवर आपकी CPCB EPR अनुपालन रिपोर्ट के लिए एक ट्रेसेबल रिकॉर्ड बनाता है।"
              : "प्रत्येक निश्चित केलेले हस्तांतरण तुमच्या CPCB EPR अनुपालन अहवालासाठी एक ट्रेसेबल नोंद तयार करते."}
          </p>
        </div>
      </div>
    </div>
  );
}
