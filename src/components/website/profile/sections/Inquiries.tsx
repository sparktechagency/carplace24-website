"use client";

import { useMemo, useState } from "react";
import { Eye, Search, X } from "lucide-react";

type Inquiry = {
  id: string; // Serial No
  name: string;
  email: string;
  contact: string;
  issue: string;
};

const mockInquiries: Inquiry[] = [
  {
    id: "#1001",
    name: "Daraz Karim",
    email: "Email123@gmail.com",
    contact: "+61 1234 5678 22",
    issue:
      "I found that one of your private settings exposes my contact details. Please review and update the privacy settings.",
  },
  {
    id: "#1002",
    name: "Ayesha Khan",
    email: "ayesha.khan@example.com",
    contact: "+61 1234 5678 22",
    issue:
      "On the profile page, the email field shows as read-only unexpectedly.",
  },
  {
    id: "#1003",
    name: "Rafi Ahmed",
    email: "rafi.ahmed@example.com",
    contact: "+61 1234 5678 22",
    issue: "Received duplicate notifications for a single inquiry submission.",
  },
  {
    id: "#1004",
    name: "Nadia Islam",
    email: "nadia.islam@example.com",
    contact: "+61 1234 5678 22",
    issue: "There is a typo on the settings page header.",
  },
  {
    id: "#1005",
    name: "Zahirul Haque",
    email: "zahirul.haque@example.com",
    contact: "+61 1234 5678 22",
    issue: "Password reset email not received even after multiple attempts.",
  },
  {
    id: "#1006",
    name: "Farhana Noor",
    email: "farhana.noor@example.com",
    contact: "+61 1234 5678 22",
    issue: "Search results are slow when filtering by brand and year.",
  },
  {
    id: "#1007",
    name: "Imran Hasan",
    email: "imran.hasan@example.com",
    contact: "+61 1234 5678 22",
    issue: "Modal close button overlaps content on small screens.",
  },
  {
    id: "#1008",
    name: "Sadia Rahman",
    email: "sadia.rahman@example.com",
    contact: "+61 1234 5678 22",
    issue: "Action icons on inquiries table need better hover states.",
  },
  {
    id: "#1009",
    name: "Kamal Uddin",
    email: "kamal.uddin@example.com",
    contact: "+61 1234 5678 22",
    issue: "Contact number format validation is not enforced.",
  },
  {
    id: "#1010",
    name: "Aminul Hoque",
    email: "aminul.hoque@example.com",
    contact: "+61 1234 5678 22",
    issue: "Pagination for inquiries would improve usability when data grows.",
  },
];

const Inquiries = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return mockInquiries;
    return mockInquiries.filter((i) =>
      [i.id, i.name, i.email, i.contact, i.issue]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginated = filtered.slice(startIndex, endIndex);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header with search */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">Inquiries</h2>
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search here"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="text-left px-4 py-3 font-medium">Serial No</th>
              <th className="text-left px-4 py-3 font-medium">User Name</th>
              <th className="text-left px-4 py-3 font-medium">Email</th>
              <th className="text-left px-4 py-3 font-medium">Contact</th>
              <th className="text-left px-4 py-3 font-medium">Issue</th>
              <th className="text-right px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((i, idx) => (
              <tr
                key={`${i.id}-${idx}`}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-700">{i.id}</td>
                <td className="px-4 py-3 text-gray-700">{i.name}</td>
                <td className="px-4 py-3 text-gray-700">{i.email}</td>
                <td className="px-4 py-3 text-gray-700">{i.contact}</td>
                <td className="px-4 py-3 text-gray-700">
                  <span className="inline-block max-w-[28rem] truncate">
                    {i.issue}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button
                      aria-label="View inquiry"
                      className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-100"
                      onClick={() => setSelected(i)}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4">
        <div className="text-sm text-gray-600">
          {filtered.length === 0 ? (
            <span>No results</span>
          ) : (
            <span>
              Showing {startIndex + 1}–{Math.min(endIndex, filtered.length)} of{" "}
              {filtered.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            const isActive = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                className={`px-3 py-1.5 text-sm rounded-md border ${
                  isActive
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-gray-200 text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(page)}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            );
          })}
          <button
            className="px-3 py-1.5 text-sm rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-base font-semibold">Inquiry Details</h3>
              <button
                aria-label="Close"
                className="text-gray-600 hover:text-gray-800"
                onClick={() => setSelected(null)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex gap-2">
                <span className="text-gray-500 w-32">Serial No</span>
                <span className="text-gray-800">{selected.id}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-32">User Name</span>
                <span className="text-gray-800">{selected.name}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-32">Email</span>
                <span className="text-gray-800">{selected.email}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-32">Contact</span>
                <span className="text-gray-800">{selected.contact}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-32">Issue</span>
                <span className="text-gray-800 leading-relaxed">
                  {selected.issue}
                </span>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t">
              <button
                className="px-4 py-2 text-sm rounded-md border border-gray-200 text-gray-700 hover:bg-gray-100"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;
