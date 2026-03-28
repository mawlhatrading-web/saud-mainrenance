"use client";

import { useMemo, useState, type ElementType } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Wrench,
  User,
  Car,
  AlertCircle,
  ChevronRight,
  Save,
  Upload,
  Gauge,
  Fuel,
  Palette,
  Calendar,
  Phone,
  MapPin,
  Hash,
  FileText,
  Flag,
  Tag,
  Clock,
  CreditCard,
} from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useWorkOrders } from "@/context/WorkOrdersContext";

type FormData = {
  customerCode: string;
  customerName: string;
  phone: string;
  idNumber: string;
  address: string;
  make: string;
  model: string;
  year: string;
  vin: string;
  vccNumber: string;
  plateNumber: string;
  color: string;
  mileage: string;
  fuelType: string;
  transmission: string;
  issueDescription: string;
  priority: string;
  category: string;
  estimatedHours: string;
  attachments: File[];
};

const INITIAL: FormData = {
  customerCode: "",
  customerName: "",
  phone: "",
  idNumber: "",
  address: "",
  make: "",
  model: "",
  year: "",
  vin: "",
  vccNumber: "",
  plateNumber: "",
  color: "",
  mileage: "",
  fuelType: "",
  transmission: "",
  issueDescription: "",
  priority: "normal",
  category: "",
  estimatedHours: "",
  attachments: [],
};

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  step,
  color,
}: {
  icon: ElementType;
  title: string;
  subtitle: string;
  step: number;
  color: string;
}) {
  const bgMap: Record<string, string> = {
    blue: "bg-blue-600",
    emerald: "bg-emerald-600",
    amber: "bg-amber-600",
  };
  const lightBgMap: Record<string, string> = {
    blue: "bg-blue-50",
    emerald: "bg-emerald-50",
    amber: "bg-amber-50",
  };
  const textMap: Record<string, string> = {
    blue: "text-blue-600",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`${lightBgMap[color]} p-3 rounded-xl relative`}>
        <Icon size={22} className={textMap[color]} />
        <span
          className={`absolute -top-1.5 -right-1.5 ${bgMap[color]} text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center`}
        >
          {step}
        </span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

function InputField({
  icon: Icon,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required,
}: {
  icon: ElementType;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon size={16} className="text-gray-400" />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full ps-10 pe-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>
    </div>
  );
}

function SelectField({
  icon: Icon,
  label,
  value,
  onChange,
  options,
  required,
}: {
  icon: ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon size={16} className="text-gray-400" />
        </div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full ps-10 pe-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
          <ChevronRight size={14} className="text-gray-400 rotate-90" />
        </div>
      </div>
    </div>
  );
}

export default function NewWorkOrderPage() {
  const { t } = useLang();
  const f = t.workOrderForm;
  const router = useRouter();
  const { orders, addOrder, updateOrder } = useWorkOrders();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [files, setFiles] = useState<string[]>([]);
  const [error, setError] = useState("");

  const set = (key: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const nextOrderNumber = useMemo(() => {
    const maxNumber = orders.reduce((max, order) => {
      const match = order.orderNumber.match(/(\d+)$/);
      const value = match ? Number(match[1]) : 0;
      return Math.max(max, value);
    }, 24);

    return `KHR-MNT-${String(maxNumber + 1).padStart(4, "0")}`;
  }, [orders]);

  const requiredFieldsFilled =
    form.customerName.trim() &&
    form.phone.trim() &&
    form.idNumber.trim() &&
    form.make.trim() &&
    form.model.trim() &&
    form.year.trim() &&
    form.plateNumber.trim() &&
    form.issueDescription.trim() &&
    form.category.trim();

  const persistOrder = (stage: "received" | "pending") => {
    if (!requiredFieldsFilled) {
      setError(f.validation);
      return;
    }

    setError("");

    const newOrder = addOrder({
      customerCode: form.customerCode,
      customerName: form.customerName,
      phone: form.phone,
      idNumber: form.idNumber,
      address: form.address,
      make: form.make,
      model: form.model,
      year: form.year,
      vin: form.vin,
      vccNumber: form.vccNumber,
      plateNumber: form.plateNumber,
      color: form.color,
      mileage: form.mileage,
      fuelType: form.fuelType,
      transmission: form.transmission,
      issueDescription: form.issueDescription,
      priority: form.priority as "low" | "normal" | "high" | "urgent",
      category: form.category as
        | "engine"
        | "transmission"
        | "brakes"
        | "suspension"
        | "electrical"
        | "bodywork"
        | "general",
      estimatedHours: form.estimatedHours,
    });

    if (stage === "pending") {
      updateOrder(newOrder.id, {
        customerCode: newOrder.customerCode,
        customerName: newOrder.customerName,
        phone: newOrder.phone,
        idNumber: newOrder.idNumber,
        address: newOrder.address,
        make: newOrder.make,
        model: newOrder.model,
        year: newOrder.year,
        vin: newOrder.vin,
        vccNumber: newOrder.vccNumber,
        plateNumber: newOrder.plateNumber,
        color: newOrder.color,
        mileage: newOrder.mileage,
        fuelType: newOrder.fuelType,
        transmission: newOrder.transmission,
        issueDescription: newOrder.issueDescription,
        priority: newOrder.priority,
        category: newOrder.category,
        estimatedHours: newOrder.estimatedHours,
        stage: "pending",
      });
    }

    router.push(stage === "pending" ? "/maintenance/work-orders" : "/");
  };

  return (
    <div className="max-w-[1100px] mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/maintenance"
            className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-blue-200 transition-colors"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </Link>
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-0.5">
              <Link href="/maintenance" className="hover:text-blue-600 transition-colors">
                {t.maintenance.title}
              </Link>
              <ChevronRight size={12} />
              <span className="text-gray-600">{f.title}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <Wrench size={24} className="text-blue-600" />
              {f.title}
            </h1>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400 bg-white border border-gray-200 px-4 py-2 rounded-xl">
          <Hash size={14} />
          {f.orderNumber}: <span className="text-gray-700 font-mono font-semibold">{nextOrderNumber}</span>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {[
            { n: 1, label: f.sections.customer, color: "bg-blue-600" },
            { n: 2, label: f.sections.vehicle, color: "bg-emerald-600" },
            { n: 3, label: f.sections.issue, color: "bg-amber-600" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`${s.color} text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center`}
                >
                  {s.n}
                </span>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div className="flex-1 h-px bg-gray-200 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 1 — Customer Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <SectionHeader
          icon={User}
          title={f.customerInfo}
          subtitle={f.customerInfoDesc}
          step={1}
          color="blue"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            icon={Hash}
            label={f.customerCode}
            placeholder={f.customerCodePh}
            value={form.customerCode}
            onChange={set("customerCode")}
          />
          <InputField
            icon={User}
            label={f.customerName}
            placeholder={f.customerNamePh}
            value={form.customerName}
            onChange={set("customerName")}
            required
          />
          <InputField
            icon={Phone}
            label={f.phone}
            placeholder={f.phonePh}
            value={form.phone}
            onChange={set("phone")}
            type="tel"
            required
          />
          <InputField
            icon={CreditCard}
            label={f.idNumber}
            placeholder={f.idNumberPh}
            value={form.idNumber}
            onChange={set("idNumber")}
            required
          />
          <div className="md:col-span-2">
            <InputField
              icon={MapPin}
              label={f.address}
              placeholder={f.addressPh}
              value={form.address}
              onChange={set("address")}
            />
          </div>
        </div>
      </div>

      {/* Section 2 — Vehicle Information */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <SectionHeader
          icon={Car}
          title={f.vehicleInfo}
          subtitle={f.vehicleInfoDesc}
          step={2}
          color="emerald"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <InputField
            icon={Car}
            label={f.make}
            placeholder={f.makePh}
            value={form.make}
            onChange={set("make")}
            required
          />
          <InputField
            icon={Car}
            label={f.model}
            placeholder={f.modelPh}
            value={form.model}
            onChange={set("model")}
            required
          />
          <InputField
            icon={Calendar}
            label={f.year}
            placeholder={f.yearPh}
            value={form.year}
            onChange={set("year")}
            type="number"
            required
          />
          <InputField
            icon={Hash}
            label={f.vin}
            placeholder={f.vinPh}
            value={form.vin}
            onChange={set("vin")}
          />
          <InputField
            icon={Hash}
            label={f.vccNumber}
            placeholder={f.vccNumberPh}
            value={form.vccNumber}
            onChange={set("vccNumber")}
          />
          <InputField
            icon={FileText}
            label={f.plateNumber}
            placeholder={f.plateNumberPh}
            value={form.plateNumber}
            onChange={set("plateNumber")}
            required
          />
          <InputField
            icon={Palette}
            label={f.color}
            placeholder={f.colorPh}
            value={form.color}
            onChange={set("color")}
          />
          <InputField
            icon={Gauge}
            label={f.mileage}
            placeholder={f.mileagePh}
            value={form.mileage}
            onChange={set("mileage")}
            type="number"
          />
          <SelectField
            icon={Fuel}
            label={f.fuelType}
            value={form.fuelType}
            onChange={set("fuelType")}
            options={[
              { value: "", label: f.selectFuel },
              { value: "gasoline", label: f.fuels.gasoline },
              { value: "diesel", label: f.fuels.diesel },
              { value: "electric", label: f.fuels.electric },
              { value: "hybrid", label: f.fuels.hybrid },
            ]}
          />
          <SelectField
            icon={Gauge}
            label={f.transmission}
            value={form.transmission}
            onChange={set("transmission")}
            options={[
              { value: "", label: f.selectTransmission },
              { value: "automatic", label: f.transmissions.automatic },
              { value: "manual", label: f.transmissions.manual },
            ]}
          />
        </div>
      </div>

      {/* Section 3 — Issue Details */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <SectionHeader
          icon={AlertCircle}
          title={f.issueDetails}
          subtitle={f.issueDetailsDesc}
          step={3}
          color="amber"
        />
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SelectField
              icon={Flag}
              label={f.priority}
              value={form.priority}
              onChange={set("priority")}
              required
              options={[
                { value: "low", label: f.priorities.low },
                { value: "normal", label: f.priorities.normal },
                { value: "high", label: f.priorities.high },
                { value: "urgent", label: f.priorities.urgent },
              ]}
            />
            <SelectField
              icon={Tag}
              label={f.category}
              value={form.category}
              onChange={set("category")}
              required
              options={[
                { value: "", label: f.selectCategory },
                { value: "engine", label: f.categories.engine },
                { value: "transmission", label: f.categories.transmission },
                { value: "brakes", label: f.categories.brakes },
                { value: "suspension", label: f.categories.suspension },
                { value: "electrical", label: f.categories.electrical },
                { value: "bodywork", label: f.categories.bodywork },
                { value: "general", label: f.categories.general },
              ]}
            />
            <InputField
              icon={Clock}
              label={f.estimatedHours}
              placeholder={f.estimatedHoursPh}
              value={form.estimatedHours}
              onChange={set("estimatedHours")}
              type="number"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
              {f.issueDescription}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.issueDescription}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  issueDescription: e.target.value,
                }))
              }
              rows={4}
              placeholder={f.issueDescriptionPh}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              {f.attachments}
            </label>
            <label className="block border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 hover:bg-blue-50/30 transition-all cursor-pointer">
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(event) =>
                  setFiles(
                    Array.from(event.target.files ?? []).map((file) => file.name),
                  )
                }
              />
              <Upload size={28} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">{f.attachmentsDrag}</p>
              <p className="text-xs text-gray-400 mt-1">{f.attachmentsFormats}</p>
              {files.length > 0 ? (
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {files.map((file) => (
                    <span
                      key={file}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {file}
                    </span>
                  ))}
                </div>
              ) : null}
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        {error ? (
          <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        ) : null}
        <div className="flex items-center justify-between gap-4">
        <Link
          href="/maintenance"
          className="px-5 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          {f.cancel}
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => persistOrder("pending")}
            className="px-5 py-2.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
          >
            <Save size={16} />
            {f.saveDraft}
          </button>
          <button
            onClick={() => persistOrder("received")}
            className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
          >
            <Wrench size={16} />
            {f.submit}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
