"use client";

import Link from "next/link";
import { Wrench, ArrowLeft, Target } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function MaintenanceBanner() {
  const { t } = useLang();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-800/30 rounded-xl flex items-center justify-center shrink-0">
            <Wrench size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{t.maintenance.title}</h1>
            <p className="text-blue-100 text-sm mt-1">{t.maintenance.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 bg-blue-800/30 px-3 py-1.5 rounded-lg text-sm">
            <Target size={14} />
            {t.maintenance.goal}
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            {t.maintenance.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
