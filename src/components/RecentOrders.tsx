"use client";

import { Plus, Filter } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const statusColors: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-700",
  "قيد التنفيذ": "bg-blue-100 text-blue-700",
  "Pending": "bg-amber-100 text-amber-700",
  "معلق": "bg-amber-100 text-amber-700",
  "Completed": "bg-green-100 text-green-700",
  "مكتمل": "bg-green-100 text-green-700",
  "Open": "bg-purple-100 text-purple-700",
  "مفتوح": "bg-purple-100 text-purple-700",
};

const dotColors: Record<string, string> = {
  "In Progress": "bg-blue-500",
  "قيد التنفيذ": "bg-blue-500",
  "Pending": "bg-amber-500",
  "معلق": "bg-amber-500",
  "Completed": "bg-green-500",
  "مكتمل": "bg-green-500",
  "Open": "bg-purple-500",
  "مفتوح": "bg-purple-500",
};

export default function RecentOrders() {
  const { t } = useLang();

  const orders = [
    t.maintenance.orders.order1,
    t.maintenance.orders.order2,
    t.maintenance.orders.order3,
    t.maintenance.orders.order4,
    t.maintenance.orders.order5,
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          | {t.maintenance.recentOrders}
        </h2>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 bg-white border border-gray-200 rounded-lg hover:border-blue-200 transition-colors">
            <Plus size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-blue-600 bg-white border border-gray-200 rounded-lg hover:border-blue-200 transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-50">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full shrink-0 ${dotColors[order.status] || "bg-gray-400"}`} />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">
                    {order.id}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      statusColors[order.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  {order.description}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-400 shrink-0 ms-4">
              {order.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
