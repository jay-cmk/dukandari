import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReusableTable } from "@/components/ReusableTable";
import IconHome from "@/components/HomeIcon/IconHome";
import {
    PencilSquareIcon,
    TrashIcon,
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
} from '@/components/ui/pagination';
import { Button } from "@/components/ui/button";
import FileFormatSelector from "@/components/pdf/FileFormatSelector";

const seedData = [
    { 
        id: 1, 
        bankName: "Ydgdgczfxfx", 
        location: "Fzgxgx", 
        accountHolderName: "Fzgxg", 
        accountNo: "55585858", 
        createdBy: "HUMMING VEDA",
        ifscCode: "YDGX0001234",
        swiftCode: "YDGXINBB",
        creditBalance: "50,000",
        debitBalance: "10,000",
        accountGroup: "Current Account",
        branches: ["HUMMING VEDA"],
        addressLine1: "address",
        addressLine2: "Address Line 2",
        country: "India",
        state: "Andaman and Nicobar Islands",
        city: "Bomboorlist",
        postalCode: "456789",
        isUpiAvailable: true,
        createdOn: "10 - 09 - 2025 15:20:08"
    },
    { 
        id: 2, 
        bankName: "HDFC Bank", 
        location: "Kharadi Branch", 
        accountHolderName: "Rahul Singh", 
        accountNo: "2345678904589", 
        createdBy: "HUMMING VEDA",
        ifscCode: "HDFC0001234",
        swiftCode: "HDFCINBB",
        creditBalance: "1,00,000",
        debitBalance: "25,000",
        accountGroup: "Savings Account",
        branches: ["HUMMING VEDA", "pune"],
        addressLine1: "Kharadi Main Road",
        addressLine2: "Near EON IT Park",
        country: "India",
        state: "Maharashtra",
        city: "Pune",
        postalCode: "411014",
        isUpiAvailable: true,
        createdOn: "15 - 08 - 2025 10:30:45"
    },
    { 
        id: 3, 
        bankName: "SBI", 
        location: "Ahmedabad", 
        accountHolderName: "Keyur", 
        accountNo: "770402010001281", 
        createdBy: "HUMMING VEDA",
        ifscCode: "SBIN0001234",
        swiftCode: "SBININBB",
        creditBalance: "75,000",
        debitBalance: "15,000",
        accountGroup: "Business Account",
        branches: ["HUMMING VEDA", "nashik"],
        addressLine1: "Ashram Road",
        addressLine2: "Near Gujarat High Court",
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        postalCode: "380009",
        isUpiAvailable: false,
        createdOn: "20 - 07 - 2025 14:15:30"
    },
];

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

function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function BankMaster() {
    const [data, setData] = useState(seedData);
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return data;
        return data.filter((bank) =>
            [bank.bankName, bank.location, bank.accountHolderName, bank.accountNo, bank.createdBy]
                .join(" ")
                .toLowerCase()
                .includes(q)
        );
    }, [query, data]);

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

    const handleCreate = () => {
        navigate("/createNewBank");
    };

    const handleEdit = (item) => {
        
        navigate("/createNewBank", {
            state: {
                isEdit: true,
                bankData: item,
                bankId: item.id
            }
        });
    };

    const handleDelete = (item) => {
        if (window.confirm(`Are you sure you want to delete "${item.bankName}" - "${item.accountHolderName}"?`)) {
            setData(prev => prev.filter(d => d.id !== item.id));
        }
    };

const handleViewDetails = (item) => {
    navigate("/viewDetails", {
        state: {
            bankData: item,
            bankName: item.bankName
        }
    });
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
                    <h1 className="text-2xl text-gray-500">Bank</h1>
                    <div className="h-6 w-px bg-gray-400"></div>
                    <div className="flex items-center gap-4">
                        <IconHome className="text-gray-500 w-8 h-8" />
                        {/* <div className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
                            - Dashboard
                        </div> */}
                    </div>
                </div>
            </div>

            <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
                    <div className="">
                        <FileFormatSelector data={data} />
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
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search banks..."
                                value={query}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                className="w-full md:w-64 rounded-lg border border-gray-300 bg-white px-3 py-1.5 pl-9 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
                            />
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    <div className="py-1 ">
                        <Button onClick={handleCreate} className="bg-neutral-600 hover:bg-black py-4 text-white rounded-sm text-sm">
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
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">#</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Bank Name</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Account Holder Name</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Account No.</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Created By</th>
                                <th className="px-4 py-2 text-left font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {rows.map((bank, idx) => {
                                const colorIndex = (start + idx) % rowColors.length;
                                const rowColorClass = rowColors[colorIndex];
                                return (
                                    <tr key={bank.id} className={`${rowColorClass} transition-colors`}>
                                        <td className="px-3 py-1 text-gray-600 font-medium">{start + idx + 1}</td>
                                        <td className="px-3 py-1">
                                            <button
                                                onClick={() => handleViewDetails(bank)}
                                                className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors text-left"
                                            >
                                                {bank.bankName}
                                            </button>
                                        </td>
                                        <td className="px-3 text-gray-700">{bank.location}</td>
                                        <td className="px-3 text-gray-700">{bank.accountHolderName}</td>
                                        <td className="px-3 text-gray-700">{bank.accountNo}</td>
                                        <td className="px-3 text-gray-700">{bank.createdBy}</td>
                                        <td className="px-3">
                                            <div className="flex items-center gap-1">
                                                <button 
                                                    onClick={() => handleEdit(bank)} 
                                                    className="p-1 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors" 
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="h-3.5 w-3.5" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDelete(bank)} 
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
                                    <td className="px-3 py-8 text-center text-gray-500" colSpan={7}>
                                        <div className="flex flex-col items-center gap-1">
                                            <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
                                            <p className="text-sm font-medium">No banks found</p>
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
                        </div>

                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious 
                                            onClick={() => changePage(currentPage - 1)} 
                                            className={cx("cursor-pointer", currentPage === 1 && "pointer-events-none opacity-50")} 
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
                                            className={cx("cursor-pointer", currentPage === totalPages && "pointer-events-none opacity-50")} 
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