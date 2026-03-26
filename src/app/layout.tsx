import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
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
          <Navbar />
          <main className="min-h-screen bg-slate-100">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
