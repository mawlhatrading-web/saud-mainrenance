"use client";

import WelcomeBanner from "@/components/WelcomeBanner";
import StatsCards from "@/components/StatsCards";
import TicketsOverview from "@/components/TicketsOverview";
import TicketsTable from "@/components/TicketsTable";
import DashboardCards from "@/components/DashboardCards";

export default function DashboardPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">
      <WelcomeBanner />
      <StatsCards />
      <TicketsOverview />
      <TicketsTable />
      <DashboardCards />
    </div>
  );
}
