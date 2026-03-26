"use client";

import Link from "next/link";
import { Building2, Monitor, Wrench, ArrowRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function DashboardCards() {
  const { t } = useLang();

  const cards = [
    {
      icon: Building2,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: t.dashboard.humanResources,
      subtitle: t.dashboard.hrDashboard,
      href: "#",
    },
    {
      icon: Monitor,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: t.dashboard.itSupport,
      subtitle: t.dashboard.itDashboard,
      href: "#",
    },
    {
      icon: Wrench,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      title: t.dashboard.maintenance,
      subtitle: t.dashboard.maintenanceDashboard,
      href: "/maintenance",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-900">
        {t.dashboard.mainDashboard}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className={`${card.iconBg} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
              <card.icon size={20} className={card.iconColor} />
            </div>
            <h3 className="font-semibold text-gray-900">{card.title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{card.subtitle}</p>
            <Link
              href={card.href}
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-medium mt-4 hover:text-blue-700 transition-colors"
            >
              {t.dashboard.view}
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
