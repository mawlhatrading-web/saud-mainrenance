export type WorkOrderPriority = "low" | "normal" | "high" | "urgent";
export type WorkOrderCategory =
  | "engine"
  | "transmission"
  | "brakes"
  | "suspension"
  | "electrical"
  | "bodywork"
  | "general";
export type WorkOrderStage = "received" | "in_progress" | "completed" | "pending";

export interface WorkOrder {
  id: string;
  orderNumber: string;
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
  priority: WorkOrderPriority;
  category: WorkOrderCategory;
  estimatedHours: string;
  stage: WorkOrderStage;
  createdAt: string;
}

export type WorkOrderInput = Omit<
  WorkOrder,
  "id" | "orderNumber" | "stage" | "createdAt"
>;
