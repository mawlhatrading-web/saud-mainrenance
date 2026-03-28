"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { WorkOrder, WorkOrderInput } from "@/types/work-orders";

const STORAGE_KEY = "luxury-maintenance-work-orders";

const seededOrders: WorkOrder[] = [
  {
    id: "seed-1",
    orderNumber: "KHR-MNT-0025",
    customerCode: "C9",
    customerName: "Thaqeb Saeed Alshammari",
    phone: "+965 5555 2001",
    idNumber: "287041001234",
    address: "Kuwait City",
    make: "Cadillac",
    model: "C9",
    year: "2025",
    vin: "DM5202612350006",
    vccNumber: "VCC-2025-2291",
    plateNumber: "KWT 22051",
    color: "Black",
    mileage: "14200",
    fuelType: "gasoline",
    transmission: "automatic",
    issueDescription: "Peace division inspection and general maintenance request.",
    priority: "normal",
    category: "general",
    estimatedHours: "4",
    stage: "received",
    createdAt: "2025-10-12",
  },
];

interface WorkOrdersContextValue {
  orders: WorkOrder[];
  addOrder: (input: WorkOrderInput) => WorkOrder;
  updateOrder: (id: string, input: WorkOrderInput & { stage: WorkOrder["stage"] }) => void;
  deleteOrder: (id: string) => void;
}

const WorkOrdersContext = createContext<WorkOrdersContextValue | null>(null);

function getNextOrderNumber(orders: WorkOrder[]) {
  const maxNumber = orders.reduce((max, order) => {
    const match = order.orderNumber.match(/(\d+)$/);
    const value = match ? Number(match[1]) : 0;
    return Math.max(max, value);
  }, 24);

  return `KHR-MNT-${String(maxNumber + 1).padStart(4, "0")}`;
}

export function WorkOrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<WorkOrder[]>(seededOrders);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seededOrders));
      return;
    }

    try {
      const parsed = JSON.parse(stored) as WorkOrder[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setOrders(parsed);
      }
    } catch {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seededOrders));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = useCallback((input: WorkOrderInput) => {
    const newOrder: WorkOrder = {
      ...input,
      id: crypto.randomUUID(),
      orderNumber: getNextOrderNumber(orders),
      stage: "received",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, [orders]);

  const updateOrder = useCallback(
    (id: string, input: WorkOrderInput & { stage: WorkOrder["stage"] }) => {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? {
                ...order,
                ...input,
              }
            : order,
        ),
      );
    },
    [],
  );

  const deleteOrder = useCallback((id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      orders,
      addOrder,
      updateOrder,
      deleteOrder,
    }),
    [orders, addOrder, updateOrder, deleteOrder],
  );

  return (
    <WorkOrdersContext.Provider value={value}>
      {children}
    </WorkOrdersContext.Provider>
  );
}

export function useWorkOrders() {
  const context = useContext(WorkOrdersContext);

  if (!context) {
    throw new Error("useWorkOrders must be used within WorkOrdersProvider");
  }

  return context;
}
