"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Save } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import type { WorkOrder } from "@/types/work-orders";

interface WorkOrderModalProps {
  order: WorkOrder | null;
  onClose: () => void;
  onSave: (order: WorkOrder) => void;
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
      />
    </label>
  );
}

export default function WorkOrderModal({
  order,
  onClose,
  onSave,
}: WorkOrderModalProps) {
  const { t } = useLang();
  const [draft, setDraft] = useState<WorkOrder | null>(order);

  useEffect(() => {
    setDraft(order);
  }, [order]);

  const labels = t.workOrdersPage;
  const form = t.workOrderForm;

  const stageOptions = useMemo(
    () => [
      { value: "received", label: labels.stages.received },
      { value: "in_progress", label: labels.stages.inProgress },
      { value: "pending", label: labels.stages.pending },
      { value: "completed", label: labels.stages.completed },
    ],
    [labels],
  );

  if (!order || !draft) {
    return null;
  }

  const updateField = <K extends keyof WorkOrder>(key: K, value: WorkOrder[K]) => {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 p-4">
      <div className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">
              {labels.viewOrder}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900">
              {draft.orderNumber}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-gray-200 p-2 text-gray-500 transition hover:bg-gray-50 hover:text-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[calc(90vh-88px)] overflow-y-auto px-6 py-6">
          <div className="grid gap-6">
            <div className="rounded-2xl border border-gray-100 p-5">
              <h3 className="mb-4 text-base font-semibold text-gray-900">
                {form.customerInfo}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label={form.customerCode}
                  value={draft.customerCode}
                  onChange={(value) => updateField("customerCode", value)}
                />
                <Input
                  label={form.customerName}
                  value={draft.customerName}
                  onChange={(value) => updateField("customerName", value)}
                />
                <Input
                  label={form.phone}
                  value={draft.phone}
                  onChange={(value) => updateField("phone", value)}
                />
                <Input
                  label={form.idNumber}
                  value={draft.idNumber}
                  onChange={(value) => updateField("idNumber", value)}
                />
                <div className="md:col-span-2">
                  <Input
                    label={form.address}
                    value={draft.address}
                    onChange={(value) => updateField("address", value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 p-5">
              <h3 className="mb-4 text-base font-semibold text-gray-900">
                {form.vehicleInfo}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Input label={form.make} value={draft.make} onChange={(value) => updateField("make", value)} />
                <Input label={form.model} value={draft.model} onChange={(value) => updateField("model", value)} />
                <Input label={form.year} value={draft.year} onChange={(value) => updateField("year", value)} />
                <Input label={form.vin} value={draft.vin} onChange={(value) => updateField("vin", value)} />
                <Input
                  label={form.vccNumber}
                  value={draft.vccNumber}
                  onChange={(value) => updateField("vccNumber", value)}
                />
                <Input
                  label={form.plateNumber}
                  value={draft.plateNumber}
                  onChange={(value) => updateField("plateNumber", value)}
                />
                <Input label={form.color} value={draft.color} onChange={(value) => updateField("color", value)} />
                <Input
                  label={form.mileage}
                  value={draft.mileage}
                  onChange={(value) => updateField("mileage", value)}
                />
                <Input
                  label={form.transmission}
                  value={draft.transmission}
                  onChange={(value) => updateField("transmission", value)}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 p-5">
              <h3 className="mb-4 text-base font-semibold text-gray-900">
                {form.issueDetails}
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {form.priority}
                  </span>
                  <select
                    value={draft.priority}
                    onChange={(event) => updateField("priority", event.target.value as WorkOrder["priority"])}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
                  >
                    <option value="low">{form.priorities.low}</option>
                    <option value="normal">{form.priorities.normal}</option>
                    <option value="high">{form.priorities.high}</option>
                    <option value="urgent">{form.priorities.urgent}</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {form.category}
                  </span>
                  <select
                    value={draft.category}
                    onChange={(event) => updateField("category", event.target.value as WorkOrder["category"])}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
                  >
                    <option value="engine">{form.categories.engine}</option>
                    <option value="transmission">{form.categories.transmission}</option>
                    <option value="brakes">{form.categories.brakes}</option>
                    <option value="suspension">{form.categories.suspension}</option>
                    <option value="electrical">{form.categories.electrical}</option>
                    <option value="bodywork">{form.categories.bodywork}</option>
                    <option value="general">{form.categories.general}</option>
                  </select>
                </label>
                <Input
                  label={form.estimatedHours}
                  value={draft.estimatedHours}
                  onChange={(value) => updateField("estimatedHours", value)}
                />
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {labels.stage}
                  </span>
                  <select
                    value={draft.stage}
                    onChange={(event) => updateField("stage", event.target.value as WorkOrder["stage"])}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
                  >
                    {stageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {form.issueDescription}
                </span>
                <textarea
                  rows={4}
                  value={draft.issueDescription}
                  onChange={(event) => updateField("issueDescription", event.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <p className="text-sm text-gray-400">{labels.editHint}</p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              {form.cancel}
            </button>
            <button
              onClick={() => onSave(draft)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Save size={16} />
              {labels.saveChanges}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
