"use client";

import { RefreshCw } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function WelcomeBanner() {
  const { t } = useLang();

  return (
    <div className="space-y-4">
      {/* Main Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-800/40 rounded-full flex items-center justify-center text-2xl font-bold shrink-0">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">{t.welcome.greeting}</h1>
                <span className="text-green-300 text-lg">🟢</span>
              </div>
              <p className="text-blue-100 text-sm mt-0.5">📅 {t.welcome.date}</p>
              <p className="text-blue-100 text-sm mt-1">
                {t.welcome.quote} 🌟
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <div className="text-center">
              <p className="text-4xl font-bold">0</p>
              <div className="flex gap-3 text-sm text-blue-100 mt-1">
                <span className="hover:underline cursor-pointer">{t.welcome.myTickets}</span>
                <span className="hover:underline cursor-pointer">{t.welcome.openTickets}</span>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-50 transition-colors">
              <RefreshCw size={14} />
              {t.welcome.refresh}
            </button>
          </div>
        </div>
      </div>

      {/* AI Assistant Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">👋</span>
          <div>
            <p className="font-semibold text-gray-800">
              {t.welcome.greeting} 👋
            </p>
            <p className="text-sm text-gray-500">{t.welcome.aiMessage}</p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          🤖 {t.welcome.aiAssistant}
        </button>
      </div>
    </div>
  );
}
