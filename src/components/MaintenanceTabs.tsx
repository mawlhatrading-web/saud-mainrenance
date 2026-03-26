"use client";

import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function MaintenanceTabs() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: t.maintenance.tabs.overview },
    { key: "open", label: t.maintenance.tabs.open, dot: true },
    { key: "closed", label: t.maintenance.tabs.closed },
    { key: "pending", label: t.maintenance.tabs.pending },
  ];

  return (
    <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
            activeTab === tab.key
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
          {tab.dot && (
            <span className="w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
