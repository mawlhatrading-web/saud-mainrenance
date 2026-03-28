import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { WorkOrdersProvider } from "@/context/WorkOrdersContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Luxury Vehicles - Maintenance Dashboard",
  description: "Maintenance management dashboard for luxury vehicles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <WorkOrdersProvider>
            <Navbar />
            <main className="min-h-screen bg-slate-100">{children}</main>
          </WorkOrdersProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
