"use client";

import MaintenanceBanner from "@/components/MaintenanceBanner";
import MaintenanceTabs from "@/components/MaintenanceTabs";
import MaintenanceStats from "@/components/MaintenanceStats";
import QuickActions from "@/components/QuickActions";
import RecentOrders from "@/components/RecentOrders";

export default function MaintenancePage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">
      <MaintenanceBanner />
      <MaintenanceTabs />
      <MaintenanceStats />
      <QuickActions />
      <RecentOrders />
    </div>
  );
}
