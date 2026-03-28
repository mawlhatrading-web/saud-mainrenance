"use client";

import Link from "next/link";
import { Plus, Filter } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useWorkOrders } from "@/context/WorkOrdersContext";
import type { WorkOrder } from "@/types/work-orders";

const statusColors: Record<WorkOrder["stage"], string> = {
  received: "bg-slate-100 text-slate-700",
  in_progress: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  completed: "bg-green-100 text-green-700",
};

const dotColors: Record<WorkOrder["stage"], string> = {
  received: "bg-slate-500",
  in_progress: "bg-blue-500",
  pending: "bg-amber-500",
  completed: "bg-green-500",
};

export default function RecentOrders() {
  const { t } = useLang();
  const { orders } = useWorkOrders();

  const stageLabels: Record<WorkOrder["stage"], string> = {
    received: t.workOrdersPage.stages.received,
    in_progress: t.workOrdersPage.stages.inProgress,
    pending: t.workOrdersPage.stages.pending,
    completed: t.workOrdersPage.stages.completed,
  };

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          | {t.maintenance.recentOrders}
        </h2>
        <div className="flex items-center gap-2">
          <Link
            href="/maintenance/new-work-order"
            className="p-2 text-gray-400 hover:text-blue-600 bg-white border border-gray-200 rounded-lg hover:border-blue-200 transition-colors"
          >
            <Plus size={16} />
          </Link>
          <Link
            href="/maintenance/work-orders"
            className="p-2 text-gray-400 hover:text-blue-600 bg-white border border-gray-200 rounded-lg hover:border-blue-200 transition-colors"
          >
            <Filter size={16} />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-400">
            {t.workOrdersPage.empty}
          </div>
        ) : (
          recentOrders.map((order) => (
            <Link
              key={order.id}
              href="/maintenance/work-orders"
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-3 h-3 rounded-full shrink-0 ${dotColors[order.stage]}`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">
                      {order.orderNumber}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[order.stage]}`}
                    >
                      {stageLabels[order.stage]}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5 truncate">
                    {order.customerName} - {order.make} {order.model}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {order.issueDescription}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-400 shrink-0 ms-4">
                {order.createdAt}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
