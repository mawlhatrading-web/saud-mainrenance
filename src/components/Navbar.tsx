"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bell, ChevronDown, Globe } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Navbar() {
  const { t, toggleLang, lang } = useLang();
  const pathname = usePathname();

  const navItems = [
    { label: t.nav.dashboard, href: "/" },
    { label: t.nav.itSupport, href: "#" },
    { label: t.nav.humanResources, href: "#" },
    { label: t.nav.customerService, href: "#" },
    { label: t.nav.maintenance, href: "/maintenance" },
    { label: t.nav.users, href: "#" },
    { label: t.nav.auditLogs, href: "#" },
    { label: t.nav.customerPortal, href: "#" },
  ];

  return (
    <nav className="bg-blue-700 text-white sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="bg-blue-500 text-white text-xs font-bold px-2.5 py-1 rounded">
              support
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-1 overflow-x-auto mx-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 rounded text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-blue-100 hover:bg-blue-600/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button className="flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium text-blue-100 hover:bg-blue-600/50 whitespace-nowrap">
              {t.nav.analytics} <ChevronDown size={14} />
            </button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 px-2.5 py-1.5 rounded transition-colors"
            >
              <Globe size={14} />
              {t.common.switchLang}
            </button>
            <button className="p-1.5 hover:bg-blue-600 rounded transition-colors">
              <Search size={18} />
            </button>
            <button className="p-1.5 hover:bg-blue-600 rounded relative transition-colors">
              <Bell size={18} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-[10px] font-bold rounded-full flex items-center justify-center">
                1
              </span>
            </button>

            {/* User Info */}
            <div className="flex items-center gap-2 ms-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-semibold">
                S
              </div>
              <div className="hidden lg:block text-end">
                <p className="text-sm font-medium leading-tight">{t.user.name}</p>
                <p className="text-[11px] text-blue-200">{t.user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
