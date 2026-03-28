"use client";

import Link from "next/link";
import { ArrowLeft, ClipboardList, ChevronRight } from "lucide-react";
import TicketsTable from "@/components/TicketsTable";
import { useLang } from "@/context/LanguageContext";
import { useWorkOrders } from "@/context/WorkOrdersContext";

export default function WorkOrdersPage() {
  const { t } = useLang();
  const { orders } = useWorkOrders();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-6 space-y-6">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/maintenance"
              className="rounded-xl border border-gray-200 bg-white p-2 text-gray-600 transition hover:border-blue-200 hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="mb-1 flex items-center gap-2 text-sm text-gray-400">
                <Link href="/maintenance" className="transition hover:text-blue-600">
                  {t.maintenance.title}
                </Link>
                <ChevronRight size={12} />
                <span className="text-gray-600">{t.workOrdersPage.title}</span>
              </div>
              <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <ClipboardList size={24} className="text-blue-600" />
                {t.workOrdersPage.title}
              </h1>
            </div>
          </div>

          <Link
            href="/maintenance/new-work-order"
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {t.maintenance.actions.newWorkOrder}
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-gray-500">{t.workOrdersPage.totalOrders}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-4">
            <p className="text-sm text-blue-700">{t.workOrdersPage.receivedOrders}</p>
            <p className="mt-1 text-3xl font-bold text-blue-700">
              {orders.filter((order) => order.stage === "received").length}
            </p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-sm text-amber-700">{t.workOrdersPage.activeOrders}</p>
            <p className="mt-1 text-3xl font-bold text-amber-700">
              {
                orders.filter(
                  (order) => order.stage === "in_progress" || order.stage === "pending",
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      <TicketsTable title={t.workOrdersPage.title} />
    </div>
  );
}
