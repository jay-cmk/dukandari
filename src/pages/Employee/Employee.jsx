// import React, { useMemo, useState } from "react";
// import {
//     PencilSquareIcon,
//     TrashIcon,
//     NoSymbolIcon,
//     ArrowTopRightOnSquareIcon,
//     CheckCircleIcon,
//     MagnifyingGlassIcon,
// } from "@heroicons/react/24/outline";
// import {
//     Pagination,
//     PaginationContent,
//     PaginationEllipsis,
//     PaginationItem,
//     PaginationLink,
//     PaginationNext,
//     PaginationPrevious,
// } from '../../components/ui/pagination';
// import { Button } from "@/components/ui/button";

// const seed = [
//     { id: 1, name: "user30065b3", mobile: "+91-8954678888", email: "", outlet: "Prashant Corner", active: true, href: "#" },
//     { id: 2, name: "user30065b1", mobile: "+91-8777868688", email: "Sanjeevsani740@gmail.com", outlet: "Prashant Corner", active: true, href: "#" },
//     { id: 3, name: "ho1", mobile: "+91-6886073686", email: "", outlet: "Prashant Corner", active: true, href: "#" },
//     { id: 4, name: "emp01", mobile: "+91-6886073687", email: "", outlet: "PCMH1", active: true, href: "#" },
//     { id: 5, name: "newemp0409", mobile: "+91-7444411111", email: "", outlet: "iuc1b0906", active: true, href: "#" },
//     { id: 6, name: "iucnew", mobile: "+91-7859612366", email: "", outlet: "Prashant Corner", active: true, href: "#" },
//     { id: 7, name: "ayushijayswal", mobile: "+91-7485968866", email: "", outlet: "iuc2b0906", active: true, href: "#" },
//     { id: 8, name: "aaa", mobile: "+91-9981231121", email: "", outlet: "Prashant Corner", active: true, href: "#" },
//     { id: 9, name: "asdasdad", mobile: "+91-9785424112", email: "", outlet: "Prashant Corner", active: true, href: "#" },
//     { id: 10, name: "Yash", mobile: "+91-9658852224", email: "", outlet: "Prashant Corner", active: true, href: "#" },
//     { id: 11, name: "test", mobile: "+91-9000006031", email: "dlp19@gmail.com", outlet: "Prashant Corner", active: true, href: "#" },
//     { id: 12, name: "sdfghgjghgfdsdfg", mobile: "+91-7474747888", email: "", outlet: "Prashant Corner", active: true, href: "#" },
//     { id: 13, name: "newemp2407", mobile: "+91-7485555666", email: "", outlet: "Prashant Corner", active: true, href: "#" },
//     { id: 14, name: "dsfghjhgfgdsf", mobile: "+91-7441111111", email: "", outlet: "iuc1b0906", active: true, href: "#" },
//     { id: 15, name: "kiyfykhjk", mobile: "+91-7485958555", email: "", outlet: "Prashant Corner", active: true, href: "#" },
// ];

// function cx(...classes) {
//     return classes.filter(Boolean).join(" ");
// }

// export default function EmployeePage() {
//     const [query, setQuery] = useState("");
//     const [pageSize, setPageSize] = useState(10);
//     const [page, setPage] = useState(1);

//     const filtered = useMemo(() => {
//         const q = query.trim().toLowerCase();
//         if (!q) return seed;
//         return seed.filter((e) =>
//             [e.name, e.mobile, e.email || "", e.outlet].join(" ").toLowerCase().includes(q)
//         );
//     }, [query]);

//     const total = filtered.length;
//     const totalPages = Math.max(1, Math.ceil(total / pageSize));
//     const currentPage = Math.min(page, totalPages);
//     const start = (currentPage - 1) * pageSize;
//     const rows = filtered.slice(start, start + pageSize);

//     const changePage = (p) => setPage(Math.min(Math.max(1, p), totalPages));

//     // Generate pagination items with smart ellipsis
//     const getPaginationItems = () => {
//         const items = [];
//         const maxVisiblePages = 5;

//         if (totalPages <= maxVisiblePages) {
//             // Show all pages if total pages is small
//             for (let i = 1; i <= totalPages; i++) {
//                 items.push(i);
//             }
//         } else {
//             // Always show first page
//             items.push(1);

//             // Calculate start and end of visible pages
//             let startPage = Math.max(2, currentPage - 1);
//             let endPage = Math.min(totalPages - 1, currentPage + 1);

//             // Adjust if we're at the beginning
//             if (currentPage <= 3) {
//                 endPage = 4;
//             }

//             // Adjust if we're at the end
//             if (currentPage >= totalPages - 2) {
//                 startPage = totalPages - 3;
//             }

//             // Add ellipsis after first page if needed
//             if (startPage > 2) {
//                 items.push('ellipsis-start');
//             }

//             // Add middle pages
//             for (let i = startPage; i <= endPage; i++) {
//                 items.push(i);
//             }

//             // Add ellipsis before last page if needed
//             if (endPage < totalPages - 1) {
//                 items.push('ellipsis-end');
//             }

//             // Always show last page
//             items.push(totalPages);
//         }

//         return items;
//     };

//     const paginationItems = getPaginationItems();

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//             {/* Header */}
//             <div className="mb-3">
//                 <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
//             </div>

//             {/* <div className="mb-6 rounded-lg bg-white p-4 shadow-sm border border-gray-200">
//                 <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//                     <div className="flex items-center gap-3">
//                         <select
//                             className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
//                             value={pageSize}
//                             onChange={(e) => {
//                                 setPageSize(Number(e.target.value));
//                                 setPage(1);
//                             }}
//                         >
//                             {[10, 15, 20, 25, 50].map((n) => (
//                                 <option key={n} value={n}>{n}</option>
//                             ))}
//                         </select>
//                         <span className="text-sm text-gray-600">entries</span>
//                     </div>

//                     <div className="relative w-full md:w-40">
//                         <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                         <input
//                             value={query}
//                             onChange={(e) => { setQuery(e.target.value); setPage(1); }}
//                             placeholder="Search employees..."
//                             className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
//                         />
//                     </div>
//                     <div>
//                         <Button>create New</Button>
//                     </div>
//                 </div>
//             </div> */}

//             {/* Table Card */}
//             <div className="rounded-lg  bg-white shadow-sm overflow-hidden">
//                 <div className="mb-6 rounded-lg bg-white p-4 shadow-sm border border-gray-200">
//                 <div className="flex flex-col gap-4 md:flex-row md:items-center md:">
//                     <div className="flex items-center gap-3">
//                         <select
//                             className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
//                             value={pageSize}
//                             onChange={(e) => {
//                                 setPageSize(Number(e.target.value));
//                                 setPage(1);
//                             }}
//                         >
//                             {[10, 15, 20, 25, 50].map((n) => (
//                                 <option key={n} value={n}>{n}</option>
//                             ))}
//                         </select>
//                         <span className="text-sm text-gray-600">entries</span>
//                     </div>

//                     <div className="relative w-full md:w-40">
//                         <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                         <input
//                             value={query}
//                             onChange={(e) => { setQuery(e.target.value); setPage(1); }}
//                             placeholder="Search employees..."
//                             className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
//                         />
//                     </div>
//                     <div>
//                         <Button>create New</Button>
//                     </div>
//                 </div>
//             </div>
//             {/* table start from here */}
//                 <div className="overflow-x-auto">
//                     <table className="w-full">
//                         <thead className="bg-gray-50 border-b border-gray-200">
//                             <tr>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">#</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Mobile No.</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Assign Outlet/HO</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
//                                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-100">
//                             {rows.map((e, idx) => (
//                                 <tr key={e.id} className="hover:bg-gray-50 transition-colors">
//                                     <td className="px-6 py-4 text-sm text-gray-600 font-medium">{start + idx + 1}</td>
//                                     <td className="px-6 py-4">
//                                         <a
//                                             href={e.href || "#"}
//                                             className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline transition-colors"
//                                         >
//                                             {e.name}
//                                         </a>
//                                     </td>
//                                     <td className="px-6 py-4 text-sm text-gray-700">{e.mobile}</td>
//                                     <td className="px-6 py-4 text-sm text-gray-700">
//                                         {e.email ? (
//                                             <span className="break-all">{e.email}</span>
//                                         ) : (
//                                             <span className="text-gray-400">—</span>
//                                         )}
//                                     </td>
//                                     <td className="px-6 py-4 text-sm text-gray-700">{e.outlet}</td>
//                                     <td className="px-6 py-4">
//                                         {e.active ? (
//                                             <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-200">
//                                                 <CheckCircleIcon className="h-3.5 w-3.5" />
//                                                 Active
//                                             </span>
//                                         ) : (
//                                             <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
//                                                 Inactive
//                                             </span>
//                                         )}
//                                     </td>
//                                     <td className="px-6 py-4">
//                                         <div className="flex items-center gap-2">
//                                             <button
//                                                 onClick={() => window.open(e.href || "#", "_blank")}
//                                                 className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//                                                 title="Open"
//                                             >
//                                                 <ArrowTopRightOnSquareIcon className="h-4 w-4" />
//                                             </button>
//                                             <button
//                                                 onClick={() => alert(`Edit ${e.name}`)}
//                                                 className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
//                                                 title="Edit"
//                                             >
//                                                 <PencilSquareIcon className="h-4 w-4" />
//                                             </button>
//                                             <button
//                                                 onClick={() => alert(`Disable ${e.name}`)}
//                                                 className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
//                                                 title="Disable"
//                                             >
//                                                 <NoSymbolIcon className="h-4 w-4" />
//                                             </button>
//                                             <button
//                                                 onClick={() => {
//                                                     if (window.confirm(`Delete ${e.name}?`)) {
//                                                         alert("Implement delete logic");
//                                                     }
//                                                 }}
//                                                 className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
//                                                 title="Delete"
//                                             >
//                                                 <TrashIcon className="h-4 w-4" />
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                             {rows.length === 0 && (
//                                 <tr>
//                                     <td className="px-6 py-12 text-center text-gray-500" colSpan={7}>
//                                         <div className="flex flex-col items-center gap-2">
//                                             <MagnifyingGlassIcon className="h-8 w-8 text-gray-300" />
//                                             <p className="text-sm font-medium">No employees found</p>
//                                             <p className="text-xs text-gray-400">Try adjusting your search query</p>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Enhanced Pagination */}
//                 <div className="border-t border-gray-200 bg-white px-6 py-4">
//                     <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
//                         {/* Showing entries info */}
//                         <div className="text-sm text-gray-600">
//                             Showing{" "}
//                             <span className="font-semibold text-gray-900">
//                                 {total === 0 ? 0 : start + 1}-{Math.min(total, start + pageSize)}
//                             </span>{" "}
//                             of <span className="font-semibold text-gray-900">{total}</span>{" "}
//                             {total === 1 ? 'entry' : 'entries'}
//                         </div>

//                         {/* Attractive Pagination */}
//                         <Pagination>
//                             <PaginationContent>
//                                 <PaginationItem>
//                                     <PaginationPrevious
//                                         onClick={() => changePage(currentPage - 1)}
//                                         className={cx(
//                                             "cursor-pointer",
//                                             currentPage === 1 && "pointer-events-none opacity-50"
//                                         )}
//                                     />
//                                 </PaginationItem>

//                                 {paginationItems.map((item, index) => {
//                                     if (item === 'ellipsis-start' || item === 'ellipsis-end') {
//                                         return (
//                                             <PaginationItem key={`ellipsis-${index}`}>
//                                                 <PaginationEllipsis />
//                                             </PaginationItem>
//                                         );
//                                     }

//                                     return (
//                                         <PaginationItem key={item}>
//                                             <PaginationLink
//                                                 onClick={() => changePage(item)}
//                                                 isActive={currentPage === item}
//                                                 className="cursor-pointer"
//                                             >
//                                                 {item}
//                                             </PaginationLink>
//                                         </PaginationItem>
//                                     );
//                                 })}

//                                 <PaginationItem>
//                                     <PaginationNext
//                                         onClick={() => changePage(currentPage + 1)}
//                                         className={cx(
//                                             "cursor-pointer",
//                                             currentPage === totalPages && "pointer-events-none opacity-50"
//                                         )}
//                                     />
//                                 </PaginationItem>
//                             </PaginationContent>
//                         </Pagination>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



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
    { id: 1, name: "user30065b3", mobile: "+91-8954678888", email: "", outlet: "Prashant Corner", active: true, href: "#" },
    { id: 2, name: "user30065b1", mobile: "+91-8777868688", email: "Sanjeevsani740@gmail.com", outlet: "Prashant Corner", active: true, href: "#" },
    { id: 3, name: "ho1", mobile: "+91-6886073686", email: "", outlet: "Prashant Corner", active: true, href: "#" },
    { id: 4, name: "emp01", mobile: "+91-6886073687", email: "", outlet: "PCMH1", active: true, href: "#" },
    { id: 5, name: "newemp0409", mobile: "+91-7444411111", email: "", outlet: "iuc1b0906", active: true, href: "#" },
    { id: 6, name: "iucnew", mobile: "+91-7859612366", email: "", outlet: "Prashant Corner", active: true, href: "#" },
    { id: 7, name: "ayushijayswal", mobile: "+91-7485968866", email: "", outlet: "iuc2b0906", active: true, href: "#" },
    { id: 8, name: "aaa", mobile: "+91-9981231121", email: "", outlet: "Prashant Corner", active: true, href: "#" },
    { id: 9, name: "asdasdad", mobile: "+91-9785424112", email: "", outlet: "Prashant Corner", active: true, href: "#" },
    { id: 10, name: "Yash", mobile: "+91-9658852224", email: "", outlet: "Prashant Corner", active: true, href: "#" },
    { id: 11, name: "test", mobile: "+91-9000006031", email: "dlp19@gmail.com", outlet: "Prashant Corner", active: true, href: "#" },
    { id: 12, name: "sdfghgjghgfdsdfg", mobile: "+91-7474747888", email: "", outlet: "Prashant Corner", active: true, href: "#" },
    { id: 13, name: "newemp2407", mobile: "+91-7485555666", email: "", outlet: "Prashant Corner", active: true, href: "#" },
    { id: 14, name: "dsfghjhgfgdsf", mobile: "+91-7441111111", email: "", outlet: "iuc1b0906", active: true, href: "#" },
    { id: 15, name: "kiyfykhjk", mobile: "+91-7485958555", email: "", outlet: "Prashant Corner", active: true, href: "#" },
];

function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}

// Array of attractive background colors for table rows
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
    const navigation=useNavigate()
    const [query, setQuery] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return seed;
        return seed.filter((e) =>
            [e.name, e.mobile, e.email || "", e.outlet].join(" ").toLowerCase().includes(q)
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

    // Generate pagination items with smart ellipsis
    const getPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is small
            for (let i = 1; i <= totalPages; i++) {
                items.push(i);
            }
        } else {
            // Always show first page
            items.push(1);

            // Calculate start and end of visible pages
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Adjust if we're at the beginning
            if (currentPage <= 3) {
                endPage = 4;
            }

            // Adjust if we're at the end
            if (currentPage >= totalPages - 2) {
                startPage = totalPages - 3;
            }

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                items.push('ellipsis-start');
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                items.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                items.push('ellipsis-end');
            }

            // Always show last page
            items.push(totalPages);
        }

        return items;

        
    };
    const handleCreateNew = () => {
    navigation("/employee-form"); // replace with your actual route path
  };
    const paginationItems = getPaginationItems();

    return (
        <div className="min-h-screen bg-gray-50 p-2 md:p-3">
            {/* Header */}
            <div className="mb-3">
                <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
            </div>

            {/* Controls Card */}
            <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
                <div className="flex flex-col  gap-4 md:flex-row md:items-center md:justify-end">

                   
                    <div className="flex items-center gap-3 ">
                        <select
                            className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPage(1);
                            }}
                        >
                            {[10, 15, 20, 25, 50].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                     {/* Search Component - Full width */}
                    <div className="">
                        <EmployeeSearch
                            query={query}
                            onQueryChange={handleSearchChange}
                        />
                    </div>
                    <div className="py-1">
                        <Button onClick={handleCreateNew} className=" py-1 text-sm ">Create New</Button>
                    </div>
                </div>
            </div>

            {/* Table Card */}
            <div className="rounded-lg bg-white shadow-sm overflow-hidden">
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-3  text-left font-semibold text-gray-700 uppercase tracking-wider">#</th>
                                <th className="px-3  text-left font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                                <th className="px-3  text-left font-semibold text-gray-700 uppercase tracking-wider">Mobile No.</th>
                                <th className="px-3  text-left font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                                <th className="px-3  text-left font-semibold text-gray-700 uppercase tracking-wider">Assign Outlet/HO</th>
                                <th className="px-3  text-left font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                <th className="px-3  text-left font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
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
                                                {e.name}
                                            </a>
                                        </td>
                                        <td className="px-3  text-gray-700">{e.mobile}</td>
                                        <td className="px-3  text-gray-700">
                                            {e.email ? (
                                                <span className="break-all">{e.email}</span>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-3  text-gray-700">{e.outlet}</td>
                                        <td className="px-3 ">
                                            {e.active ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-200">
                                                    <CheckCircleIcon className="h-3 w-3" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200">
                                                    Inactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-3 ">
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
                                    <td className="px-3 py-8 text-center text-gray-500" colSpan={7}>
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
                {/* Enhanced Pagination */}
                <div className="border-t border-gray-200 bg-white px-6 py-4">
                    <div className="flex flex-row justify-between  gap-4 sm:flex-row">
                        {/* Showing entries info */}
                        <div className="text-sm text-gray-600">
                            Showing{" "}
                            <span className="font-semibold text-gray-900">
                                {total === 0 ? 0 : start + 1}-{Math.min(total, start + pageSize)}
                            </span>{" "}
                            of <span className="font-semibold text-gray-900">{total}</span>{" "}
                            {total === 1 ? 'entry' : 'entries'}
                        </div>

                        <div className="">
                            {/* Attractive Pagination */}
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