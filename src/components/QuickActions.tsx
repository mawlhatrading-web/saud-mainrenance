"use client";

import Link from "next/link";
import {
  PlusCircle,
  ClipboardList,
  Package,
  FileText,
  Settings,
  RotateCcw,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function QuickActions() {
  const { t } = useLang();

  const actions = [
    {
      icon: PlusCircle,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: t.maintenance.actions.newWorkOrder,
      desc: t.maintenance.actions.newWorkOrderDesc,
      href: "/maintenance/new-work-order",
    },
    {
      icon: ClipboardList,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      title: t.maintenance.actions.workOrders,
      desc: t.maintenance.actions.workOrdersDesc,
      href: "#",
    },
    {
      icon: Package,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: t.maintenance.actions.inventory,
      desc: t.maintenance.actions.inventoryDesc,
      href: "#",
    },
    {
      icon: FileText,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      title: t.maintenance.actions.purchaseRequests,
      desc: t.maintenance.actions.purchaseRequestsDesc,
      href: "#",
    },
    {
      icon: Settings,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      title: t.maintenance.actions.partsSetup,
      desc: t.maintenance.actions.partsSetupDesc,
      href: "#",
    },
    {
      icon: RotateCcw,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: t.maintenance.actions.subscriptions,
      desc: t.maintenance.actions.subscriptionsDesc,
      href: "#",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">
        | {t.maintenance.quickActions}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all text-start group block"
          >
            <div className={`${action.iconBg} w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon size={20} className={action.iconColor} />
            </div>
            <p className="font-medium text-gray-900 text-sm">{action.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
