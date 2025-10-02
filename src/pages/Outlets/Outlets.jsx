import React, { useMemo, useState } from "react";
import EmployeeSearch from "../../components/Search";
import {
    PencilSquareIcon,
    TrashIcon,
    NoSymbolIcon,
    ArrowTopRightOnSquareIcon,
    CheckCircleIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../../components/ui/pagination';
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";

const seed = [
    { id: 1, type: "Franchise", name: "KIRTIRAJ SNACKS PRIVATE LIMITED", contactName: "KIRTIRAJ", contactNo: "+91-6355388556", year: "2025–2026", month: "April - March" },
    { id: 2, type: "Branch", name: "MJ", contactName: "Vasy testing", contactNo: "+91-9408413655", year: "2025–2026", month: "April - March" },
    { id: 3, type: "Franchise", name: "Kiran", contactName: "", contactNo: "+91-9493083566", year: "2025–2026", month: "April - March" },
    { id: 4, type: "Branch", name: "Irfan", contactName: "", contactNo: "+91-9010687624", year: "2025–2026", month: "April - March" },
    { id: 5, type: "Branch", name: "Shekhar Shopping mall", contactName: "shekhar singh", contactNo: "+91-7857854862", year: "2025–2026", month: "April - March" },
    { id: 6, type: "Branch", name: "test", contactName: "", contactNo: "+91-9873234071", year: "2025–2026", month: "April - March" },
    { id: 7, type: "Branch", name: "SWAGRUHA FOODS", contactName: "ARJUN", contactNo: "+91-6354210247", year: "2025–2026", month: "April - March" },
    { id: 8, type: "Branch", name: "NEXUS BRANCH", contactName: "KIRTIRAJ", contactNo: "+91-9988556622", year: "2025–2026", month: "April - March" },
    { id: 9, type: "Franchise", name: "Demo Franchise 1", contactName: "Vasy", contactNo: "+91-9988776655", year: "2024–2025", month: "April - March" },
];

function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}

const rowColors = [
    "bg-blue-50 hover:bg-blue-100",
    "bg-green-50 hover:bg-green-100",
    "bg-purple-50 hover:bg-purple-100",
    "bg-amber-50 hover:bg-amber-100",
    "bg-cyan-50 hover:bg-cyan-100",
    "bg-rose-50 hover:bg-rose-100",
    "bg-emerald-50 hover:bg-emerald-100",
    "bg-violet-50 hover:bg-violet-100",
    "bg-orange-50 hover:bg-orange-100",
    "bg-sky-50 hover:bg-sky-100",
    "bg-fuchsia-50 hover:bg-fuchsia-100",
    "bg-teal-50 hover:bg-teal-100",
    "bg-pink-50 hover:bg-pink-100",
    "bg-indigo-50 hover:bg-indigo-100",
    "bg-lime-50 hover:bg-lime-100"
];

export default function EmployeePage() {
    const [query, setQuery] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    
  const handleCreateNew = () => {
    navigate("/outletsForm"); // replace with your actual route path
  };

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return seed;
        return seed.filter((e) =>
            [e.name, e.contactName, e.contactNo, e.type, e.year, e.month].join(" ").toLowerCase().includes(q)
        );
    }, [query]);

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * pageSize;
    const rows = filtered.slice(start, start + pageSize);

    const changePage = (p) => setPage(Math.min(Math.max(1, p), totalPages));

    const handleSearchChange = (searchQuery) => {
        setQuery(searchQuery);
        setPage(1);
    };

    const handlePageSizeChange = (newPageSize) => {
        setPageSize(newPageSize);
        setPage(1);
    };

    const getPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) items.push(i);
        } else {
            items.push(1);
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if (currentPage <= 3) endPage = 4;
            if (currentPage >= totalPages - 2) startPage = totalPages - 3;
            if (startPage > 2) items.push('ellipsis-start');
            for (let i = startPage; i <= endPage; i++) items.push(i);
            if (endPage < totalPages - 1) items.push('ellipsis-end');
            items.push(totalPages);
        }
        return items;
    };

    const paginationItems = getPaginationItems();

    return (
        <div className="min-h-screen bg-gray-50 p-2 md:p-3">
            <div className="mb-3">
                <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
            </div>

            <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
                    <div className="flex-1 w-full">
                        <EmployeeSearch
                            query={query}
                            onQueryChange={handleSearchChange}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <select
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
                            value={pageSize}
                            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        >
                            {[10, 15, 20, 25, 50].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div className="">
                        <Button className="text-sm" onClick={handleCreateNew}>
        Create New
      </Button>
                    </div>
                </div>
            </div>

            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider">#</th>
                                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Outlet Type</th>
                                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Contact Name</th>
                                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Contact No</th>
                                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Year Interval</th>
                                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Month Interval</th>
                                <th className="px-3 text-left font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {rows.map((e, idx) => {
                                const colorIndex = (start + idx) % rowColors.length;
                                const rowColorClass = rowColors[colorIndex];
                                return (
                                    <tr key={e.id} className={`${rowColorClass} transition-colors`}>
                                        <td className="px-3 py-1 text-gray-600 font-medium">{start + idx + 1}</td>
                                        <td className="px-3 py-1">
                                            <a
                                                href={e.href || "#"}
                                                className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
                                            >
                                                {e.type}
                                            </a>
                                        </td>
                                        <td className="px-3 text-gray-700">{e.name}</td>
                                        <td className="px-3 text-gray-700">
                                            {e.contactName ? (
                                                <span className="break-all">{e.contactName}</span>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-3 text-gray-700">{e.contactNo}</td>
                                        <td className="px-3 text-gray-700">{e.year}</td>
                                        <td className="px-3 text-gray-700">{e.month}</td>
                                        <td className="px-3">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => window.open(e.href || "#", "_blank")}
                                                    className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                                                    title="Open"
                                                >
                                                    <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => alert(`Edit ${e.name}`)}
                                                    className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => alert(`Disable ${e.name}`)}
                                                    className="p-1 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                                                    title="Disable"
                                                >
                                                    <NoSymbolIcon className="h-3.5 w-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm(`Delete ${e.name}?`)) {
                                                            alert("Implement delete logic");
                                                        }
                                                    }}
                                                    className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                                                    title="Delete"
                                                >
                                                    <TrashIcon className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {rows.length === 0 && (
                                <tr>
                                    <td className="px-3 py-8 text-center text-gray-500" colSpan={8}>
                                        <div className="flex flex-col items-center gap-1">
                                            <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
                                            <p className="text-sm font-medium">No employees found</p>
                                            <p className="text-xs text-gray-400">Try adjusting your search query</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-gray-200 bg-white px-6 py-4">
                    <div className="flex flex-row justify-between gap-4 sm:flex-row">
                        <div className="text-sm text-gray-600">
                            Showing{" "}
                            <span className="font-semibold text-gray-900">
                                {total === 0 ? 0 : start + 1}-{Math.min(total, start + pageSize)}
                            </span>{" "}
                            of <span className="font-semibold text-gray-900">{total}</span>{" "}
                            {total === 1 ? 'entry' : 'entries'}
                        </div>

                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => changePage(currentPage - 1)}
                                            className={cx(
                                                "cursor-pointer",
                                                currentPage === 1 && "pointer-events-none opacity-50"
                                            )}
                                        />
                                    </PaginationItem>

                                    {paginationItems.map((item, index) => {
                                        if (item === 'ellipsis-start' || item === 'ellipsis-end') {
                                            return (
                                                <PaginationItem key={`ellipsis-${index}`}>
                                                    <PaginationEllipsis />
                                                </PaginationItem>
                                            );
                                        }

                                        return (
                                            <PaginationItem key={item}>
                                                <PaginationLink
                                                    onClick={() => changePage(item)}
                                                    isActive={currentPage === item}
                                                    className="cursor-pointer"
                                                >
                                                    {item}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => changePage(currentPage + 1)}
                                            className={cx(
                                                "cursor-pointer",
                                                currentPage === totalPages && "pointer-events-none opacity-50"
                                            )}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
