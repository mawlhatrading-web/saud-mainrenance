"use client";

import { Eye } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const mockTickets = [
  {
    id: "150817",
    subject: "e.spade",
    customer: "riyadh7",
    priority: "Normal",
    priorityColor: "bg-purple-100 text-purple-700",
    status: "Open",
    statusColor: "bg-green-100 text-green-700",
    department: "Customer Service",
    date: "11/23/2023",
  },
];

export default function TicketsTable() {
  const { t } = useLang();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          📋 {t.tickets.myTicketsTitle}
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
              <th className="text-start px-5 py-3 font-medium">{t.tickets.ticketNumber}</th>
              <th className="text-start px-5 py-3 font-medium">{t.tickets.subject}</th>
              <th className="text-start px-5 py-3 font-medium">{t.tickets.customerName}</th>
              <th className="text-start px-5 py-3 font-medium">{t.tickets.priority}</th>
              <th className="text-start px-5 py-3 font-medium">{t.tickets.status}</th>
              <th className="text-start px-5 py-3 font-medium">{t.tickets.department}</th>
              <th className="text-start px-5 py-3 font-medium">{t.tickets.date}</th>
              <th className="text-start px-5 py-3 font-medium">{t.tickets.actions}</th>
            </tr>
          </thead>
          <tbody>
            {mockTickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="px-5 py-4 text-gray-700 font-medium">{ticket.id}</td>
                <td className="px-5 py-4 text-gray-600">{ticket.subject}</td>
                <td className="px-5 py-4 text-gray-600">{ticket.customer}</td>
                <td className="px-5 py-4">
                  <span className={`${ticket.priorityColor} text-xs font-medium px-2.5 py-1 rounded-full`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`${ticket.statusColor} text-xs font-medium px-2.5 py-1 rounded-full`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-600">{ticket.department}</td>
                <td className="px-5 py-4 text-gray-500">{ticket.date}</td>
                <td className="px-5 py-4">
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
