"use client";

import { useMemo, useState } from "react";
import { Eye, Pencil, Search, Trash2 } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useWorkOrders } from "@/context/WorkOrdersContext";
import WorkOrderModal from "@/components/WorkOrderModal";
import type { WorkOrder } from "@/types/work-orders";

const stageClasses: Record<string, string> = {
  received: "bg-slate-100 text-slate-700",
  in_progress: "bg-amber-100 text-amber-700",
  pending: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
};

interface TicketsTableProps {
  title?: string;
  limit?: number;
}

export default function TicketsTable({
  title,
  limit,
}: TicketsTableProps) {
  const { t } = useLang();
  const { orders, updateOrder, deleteOrder } = useWorkOrders();
  const [selectedOrder, setSelectedOrder] = useState<WorkOrder | null>(null);

  const rows = useMemo(
    () => (typeof limit === "number" ? orders.slice(0, limit) : orders),
    [limit, orders],
  );

  const stageLabels: Record<WorkOrder["stage"], string> = {
    received: t.workOrdersPage.stages.received,
    in_progress: t.workOrdersPage.stages.inProgress,
    pending: t.workOrdersPage.stages.pending,
    completed: t.workOrdersPage.stages.completed,
  };

  const priorityLabels: Record<WorkOrder["priority"], string> = {
    low: t.workOrderForm.priorities.low,
    normal: t.workOrderForm.priorities.normal,
    high: t.workOrderForm.priorities.high,
    urgent: t.workOrderForm.priorities.urgent,
  };

  const handleSave = (order: WorkOrder) => {
    updateOrder(order.id, {
      customerCode: order.customerCode,
      customerName: order.customerName,
      phone: order.phone,
      idNumber: order.idNumber,
      address: order.address,
      make: order.make,
      model: order.model,
      year: order.year,
      vin: order.vin,
      vccNumber: order.vccNumber,
      plateNumber: order.plateNumber,
      color: order.color,
      mileage: order.mileage,
      fuelType: order.fuelType,
      transmission: order.transmission,
      issueDescription: order.issueDescription,
      priority: order.priority,
      category: order.category,
      estimatedHours: order.estimatedHours,
      stage: order.stage,
    });
    setSelectedOrder(null);
  };

  const handleDelete = (order: WorkOrder) => {
    const confirmed = window.confirm(
      t.workOrdersPage.deleteConfirm.replace("{orderNumber}", order.orderNumber),
    );

    if (!confirmed) {
      return;
    }

    if (selectedOrder?.id === order.id) {
      setSelectedOrder(null);
    }

    deleteOrder(order.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between gap-4">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          📋 {title ?? t.tickets.myTicketsTitle}
        </h3>
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-400">
          <Search size={14} />
          <span>{t.workOrdersPage.liveTicketsCount.replace("{count}", String(rows.length))}</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="text-start px-5 py-3 font-medium">{t.workOrdersPage.orderNumber}</th>
              <th className="text-start px-5 py-3 font-medium">{t.workOrdersPage.customer}</th>
              <th className="text-start px-5 py-3 font-medium">{t.workOrdersPage.vehicle}</th>
              <th className="text-start px-5 py-3 font-medium">{t.workOrdersPage.issue}</th>
              <th className="text-start px-5 py-3 font-medium">{t.workOrdersPage.stage}</th>
              <th className="text-start px-5 py-3 font-medium">{t.tickets.date}</th>
              <th className="text-start px-5 py-3 font-medium">{t.tickets.actions}</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">
                  {t.workOrdersPage.empty}
                </td>
              </tr>
            ) : (
              rows.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-4 text-gray-700 font-semibold">{ticket.orderNumber}</td>
                  <td className="px-5 py-4 text-gray-700">
                    <p className="font-medium">{ticket.customerName}</p>
                    <p className="text-xs text-gray-400">{ticket.idNumber}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-700">
                    <p className="font-semibold">{ticket.model}</p>
                    <p className="text-xs text-gray-400">{ticket.vccNumber || ticket.vin}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">
                    <p className="max-w-[260px] truncate">{ticket.issueDescription}</p>
                    <p className="text-xs text-gray-400">{priorityLabels[ticket.priority]}</p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`${stageClasses[ticket.stage]} inline-flex rounded-full px-2.5 py-1 text-xs font-semibold`}
                    >
                      {stageLabels[ticket.stage]}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{ticket.createdAt}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 text-gray-400">
                      <button
                        onClick={() => setSelectedOrder(ticket)}
                        className="transition-colors hover:text-blue-600"
                        aria-label={t.workOrdersPage.viewOrder}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => setSelectedOrder(ticket)}
                        className="transition-colors hover:text-blue-600"
                        aria-label={t.workOrdersPage.editOrder}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(ticket)}
                        className="transition-colors hover:text-red-600"
                        aria-label={t.workOrdersPage.deleteOrder}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <WorkOrderModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onSave={handleSave}
      />
    </div>
  );
}
