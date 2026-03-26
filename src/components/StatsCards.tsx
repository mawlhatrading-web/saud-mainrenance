"use client";

import { Users, CircleDot, Briefcase, CheckCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function StatsCards() {
  const { t } = useLang();

  const cards = [
    {
      icon: Users,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      label: t.stats.activeUsers,
      value: "24",
      badge: t.stats.live,
      badgeBg: "bg-green-100 text-green-700",
      badgeDot: "bg-green-500",
    },
    {
      icon: CircleDot,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      label: t.stats.openTickets,
      value: "0",
      badge: t.stats.critical,
      badgeBg: "bg-red-100 text-red-700",
      badgeDot: "bg-red-500",
    },
    {
      icon: Briefcase,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      label: t.stats.hiringRequests,
      value: "0",
      badge: t.stats.active,
      badgeBg: "bg-blue-100 text-blue-700",
      badgeDot: "bg-blue-500",
    },
    {
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      label: t.stats.resolved,
      value: "0",
      badge: t.stats.completed,
      badgeBg: "bg-green-100 text-green-700",
      badgeDot: "bg-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`${card.iconBg} p-2.5 rounded-lg`}>
              <card.icon size={20} className={card.iconColor} />
            </div>
            <span
              className={`${card.badgeBg} text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${card.badgeDot}`} />
              {card.badge}
            </span>
          </div>
          <p className="text-sm text-gray-500">{card.label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
