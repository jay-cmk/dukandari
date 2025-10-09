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
import { handleEditEmployee } from "@/utils/helpers";
import FileFormatSelector from "@/components/pdf/FileFormatSelector";
import IconHome from "@/components/HomeIcon/IconHome";

// Updated data structure based on the image
const seed = [
    { id: 1, name: "Temp cast", mobile: "+91-4567897235", whatsapp: "+91-4567897235", email: "test@wsywp.com", ostin: "", mobileStatus: "Un-werfied", status: "Active" },
    { id: 2, name: "Cast", mobile: "+91-6238757951", whatsapp: "+91-4567897235", email: "test@wsywp.com", ostin: "", mobileStatus: "Un-werfied", status: "Active" },
    { id: 3, name: "nashk -- nashk", mobile: "+91-774487507", whatsapp: "+91-774487507", email: "test@wsywp.com", ostin: "2AAAACH2K9R22A", mobileStatus: "Un-werfied", status: "Active" },
    { id: 4, name: "pune -- pune", mobile: "+91-8632554522", whatsapp: "+91-8632554522", email: "test@wsywp.com", ostin: "2AAAACH2K9R22A", mobileStatus: "Un-werfied", status: "Active" },
    { id: 5, name: "Rahul Franchise -- Rahul Franchise", mobile: "+91-8275433403", whatsapp: "+91-8275433403", email: "test@wsywp.com", ostin: "", mobileStatus: "Un-werfied", status: "Active" },
    { id: 6, name: "virtual", mobile: "+91-878010540", whatsapp: "+91-878010540", email: "test@wsywp.com", ostin: "", mobileStatus: "Un-werfied", status: "Active" },
    { id: 7, name: "Nitin", mobile: "+91-665422347", whatsapp: "+91-665422347", email: "test@wsywp.com", ostin: "", mobileStatus: "Un-werfied", status: "Active" },
    { id: 8, name: "shari", mobile: "+91-6352055381", whatsapp: "+91-6352055381", email: "test@wsywp.com", ostin: "", mobileStatus: "Un-werfied", status: "Active" },
    { id: 9, name: "nhul", mobile: "+91-899992758", whatsapp: "+91-899992758", email: "test@wsywp.com", ostin: "", mobileStatus: "Un-werfied", status: "Active" },
    { id: 10, name: "amper", mobile: "+91-895354414", whatsapp: "+91-895354414", email: "test@wsywp.com", ostin: "", mobileStatus: "Werfied", status: "Active" },
    { id: 11, name: "shobht", mobile: "", whatsapp: "", email: "test@wsywp.com", ostin: "", mobileStatus: "Un-werfied", status: "Active" },
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

export default function Contact() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [selectAll, setSelectAll] = useState(false);
    const [selectedType, setSelectedType] = useState("customer"); // "customer" or "supplier"

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return seed;
        return seed.filter((e) =>
            [e.name, e.mobile, e.email || "", e.whatsapp || "", e.ostin || ""].join(" ").toLowerCase().includes(q)
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

    const handleCreateNew = () => {
        navigate("/contactForm", { state: { mode: "create" } });
    };

    const handleEdit = (employee) => {
        navigate(`/employee/edit/${employee.id}`, { state: { mode: "edit" } });
    };

    // Checkbox handlers
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedRows(new Set());
        } else {
            const allIds = new Set(rows.map(row => row.id));
            setSelectedRows(allIds);
        }
        setSelectAll(!selectAll);
    };

    const handleRowSelect = (id) => {
        const newSelected = new Set(selectedRows);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedRows(newSelected);
        
        // Update select all state
        if (newSelected.size === rows.length) {
            setSelectAll(true);
        } else {
            setSelectAll(false);
        }
    };

    const getPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(i);
            }
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
            <div className="pb-3 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    {/* Customer/Supplier Selector */}
                    <div className="flex items-center bg-white rounded-lg border border-gray-300 p-1 shadow-sm">
                        <button
                            onClick={() => setSelectedType("customer")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                selectedType === "customer" 
                                ? "bg-indigo-600 text-white shadow-sm" 
                                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                            Customer
                        </button>
                        <button
                            onClick={() => setSelectedType("supplier")}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                selectedType === "supplier" 
                                ? "bg-indigo-600 text-white shadow-sm" 
                                : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                            Supplier/Vendor
                        </button>
                    </div>
                    
                    <div className="h-6 w-px bg-gray-400"></div>
                    <div className="flex items-center gap-4">
                        <IconHome className="text-gray-500 w-8 h-8" />
                        <div className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
                            - Dashboard
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
                    <div className="">
                        <FileFormatSelector data={seed} />
                    </div>
                    <div className="flex items-center gap-3 ">
                        <select
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
                            value={pageSize}
                            onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
                        >
                            {[10, 15, 20, 25, 50].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div className="">
                        <EmployeeSearch query={query} onQueryChange={handleSearchChange} />
                    </div>
                    <div className="py-1 ">
                        <Button onClick={handleCreateNew} className="bg-neutral-600 hover:bg-black py-4 text-white rounded-sm text-sm">Create New</Button>
                    </div>
                </div>
            </div>

            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                </th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Sr. No.</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Contact No.</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Whatsapp No.</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">OSTIN</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Created By</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Mobile No status</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {rows.map((e, idx) => {
                                const colorIndex = (start + idx) % rowColors.length;
                                const rowColorClass = rowColors[colorIndex];
                                return (
                                    <tr key={e.id} className={`${rowColorClass} transition-colors`}>
                                        <td className="px-4 py-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.has(e.id)}
                                                onChange={() => handleRowSelect(e.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-gray-600 font-medium">{start + idx + 1}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => navigate(`/employee/${e.id}`, { state: { employee: e } })}
                                                className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors text-left"
                                            >
                                                {e.name}
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 text-gray-700">{e.mobile || <span className="text-gray-400">—</span>}</td>
                                        <td className="px-4 py-2 text-gray-700">{e.whatsapp || <span className="text-gray-400">—</span>}</td>
                                        <td className="px-4 py-2 text-gray-700">{e.ostin || <span className="text-gray-400">—</span>}</td>
                                        <td className="px-4 py-2 text-gray-700">{e.email || <span className="text-gray-400">—</span>}</td>
                                        <td className="px-4 py-2">
                                            {e.mobileStatus === "Werfied" ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-200">
                                                    <CheckCircleIcon className="h-3 w-3" /> Verified
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
                                                    Unverified
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            {e.status === "Active" ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-200">
                                                    <CheckCircleIcon className="h-3 w-3" /> Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">Inactive</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => handleEditEmployee(e, navigate)} className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" title="Edit">
                                                    <PencilSquareIcon className="h-3.5 w-3.5" />
                                                </button>
                                                <button onClick={() => alert(`Disable ${e.name}`)} className="p-1 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors" title="Disable">
                                                    <NoSymbolIcon className="h-3.5 w-3.5" />
                                                </button>
                                                <button onClick={() => { if (window.confirm(`Delete ${e.name}?`)) { alert("Implement delete logic"); } }} className="p-1 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors" title="Delete">
                                                    <TrashIcon className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {rows.length === 0 && (
                                <tr>
                                    <td className="px-3 py-8 text-center text-gray-500" colSpan={10}>
                                        <div className="flex flex-col items-center gap-1">
                                            <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
                                            <p className="text-sm font-medium">No {selectedType === "customer" ? "customers" : "suppliers"} found</p>
                                            <p className="text-xs text-gray-400">Try adjusting your search query</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="border-t border-gray-200 bg-white px-6 py-2">
                    <div className="flex flex-row items-center justify-between gap-4 sm:flex-row">
                        <div className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-900">{total === 0 ? 0 : start + 1}-{Math.min(total, start + pageSize)}</span> of <span className="font-semibold text-gray-900">{total}</span> {total === 1 ? 'entry' : 'entries'}
                            {selectedRows.size > 0 && (
                                <span className="ml-2 text-indigo-600 font-medium">
                                    ({selectedRows.size} selected)
                                </span>
                            )}
                        </div>

                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious onClick={() => changePage(currentPage - 1)} className={cx("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")} />
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
                                                <PaginationLink onClick={() => changePage(item)} isActive={currentPage === item} className="cursor-pointer">{item}</PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}

                                    <PaginationItem>
                                        <PaginationNext onClick={() => changePage(currentPage + 1)} className={cx("cursor-pointer", currentPage === totalPages && "pointer-events-none opacity-50")} />
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