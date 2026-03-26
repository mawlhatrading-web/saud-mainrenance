"use client";

import { FolderOpen, AlertTriangle, CheckCircle2, AlertOctagon, SlidersHorizontal } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function TicketsOverview() {
  const { t } = useLang();

  const ticketStats = [
    {
      icon: FolderOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      label: t.tickets.myTickets,
      value: "0",
      subtitle: t.tickets.assignedTo,
    },
    {
      icon: AlertTriangle,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      label: t.tickets.openTickets,
      value: "1",
      subtitle: t.tickets.inProgress,
    },
    {
      icon: CheckCircle2,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      label: t.tickets.closedToday,
      value: "0",
      subtitle: t.tickets.itClosed,
    },
    {
      icon: AlertOctagon,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      label: t.tickets.slaBreach,
      value: "0",
      subtitle: t.tickets.linked,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🎫 {t.tickets.title}
        </h2>
        <button className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <SlidersHorizontal size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ticketStats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.iconBg} p-2.5 rounded-lg`}>
                <stat.icon size={20} className={stat.iconColor} />
              </div>
            </div>
            <p className="text-xs text-gray-400">{stat.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
