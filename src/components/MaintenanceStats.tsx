"use client";

import { ClipboardList, Calendar, Clock, Settings, CheckSquare } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function MaintenanceStats() {
  const { t } = useLang();

  const stats = [
    {
      icon: ClipboardList,
      value: 2,
      label: t.maintenance.statsLabels.totalOrders,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: Calendar,
      value: 7,
      label: t.maintenance.statsLabels.weeklyOrders,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      icon: Clock,
      value: 6,
      label: t.maintenance.statsLabels.monthlyOrders,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Settings,
      value: 1,
      label: t.maintenance.statsLabels.inProgress,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      icon: CheckSquare,
      value: 0,
      label: t.maintenance.statsLabels.completed,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3 hover:shadow-md transition-shadow"
        >
          <div className={`${stat.iconBg} p-2.5 rounded-lg shrink-0`}>
            <stat.icon size={20} className={stat.iconColor} />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
