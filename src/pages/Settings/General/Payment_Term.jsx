// // Prefix.jsx
// import React, { useState } from "react";
// import {
//   PencilSquareIcon,
//   TrashIcon,
//   MagnifyingGlassIcon,
//   XMarkIcon,
// } from "@heroicons/react/24/outline";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "../../components/ui/pagination";
// import { Button } from "@/components/ui/button";

// // Import from separate files
// import { usePagination } from "../../hooks/usePagination.jsx";
// import { useTableLogic } from "../../hooks/useTableLogic.jsx";
// import { rowColors } from "../../constants/tableData.jsx";
// import { cx, handleDelete } from "../../utils/helpers.jsx";

// // Updated Payment Term data
// const seed = [
//   { id: 1, name: "5 DAYS", days: 5, createdBy: "KIRTIRAJ" },
//   { id: 2, name: "90 Days", days: 90, createdBy: "KIRTIRAJ" },
//   { id: 3, name: "60 Days", days: 60, createdBy: "KIRTIRAJ" },
//   { id: 4, name: "30 Days", days: 30, createdBy: "KIRTIRAJ" },
//   { id: 5, name: "15 Days", days: 15, createdBy: "KIRTIRAJ" },
//   { id: 6, name: "7 Days", days: 7, createdBy: "KIRTIRAJ" },
// ];

// // Modal Components - Updated for Payment Terms
// const CreatePaymentTermModal = ({ isOpen, onClose, onSave }) => {
//   const [termName, setTermName] = useState("");
//   const [termDays, setTermDays] = useState("");

//   const handleSave = () => {
//     if (termName && termDays) {
//       onSave({ name: termName, days: parseInt(termDays) });
//       setTermName("");
//       setTermDays("");
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-xl border border-gray-200">
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">New Payment Term</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
//           >
//             <XMarkIcon className="h-5 w-5" />
//           </button>
//         </div>

//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Term Name<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={termName}
//               onChange={(e) => setTermName(e.target.value)}
//               placeholder="Enter Term Name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Days<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               value={termDays}
//               onChange={(e) => setTermDays(e.target.value)}
//               placeholder="Enter Number of Days"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
//           <Button
//             onClick={onClose}
//             variant="outline"
//             className="px-4 py-2 text-sm border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors"
//           >
//             Close
//           </Button>
//           <div className="py-1">
//             <Button onClick={handleSave} className="py-1 text-sm" disabled={!termName || !termDays}>
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EditPaymentTermModal = ({ isOpen, onClose, onSave, termData }) => {
//   const [termName, setTermName] = useState(termData?.name || "");
//   const [termDays, setTermDays] = useState(termData?.days?.toString() || "");

//   React.useEffect(() => {
//     if (termData) {
//       setTermName(termData.name);
//       setTermDays(termData.days?.toString() || "");
//     }
//   }, [termData]);

//   const handleSave = () => {
//     if (termName && termDays) {
//       onSave({
//         ...termData,
//         name: termName,
//         days: parseInt(termDays),
//       });
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-xl border border-gray-200">
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Edit Payment Term</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
//           >
//             <XMarkIcon className="h-5 w-5" />
//           </button>
//         </div>

//         <div className="p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Term Name<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={termName}
//               onChange={(e) => setTermName(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Days<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               value={termDays}
//               onChange={(e) => setTermDays(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
//           <Button
//             onClick={onClose}
//             variant="outline"
//             className="px-4 py-2 text-sm border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors"
//           >
//             Close
//           </Button>
//           <div className="py-1">
//             <Button onClick={handleSave} className="py-1 text-sm" disabled={!termName || !termDays}>
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Payment_Term() {
//   // Use the table logic hook
//   const {
//     query,
//     pageSize,
//     rows,
//     total,
//     totalPages,
//     currentPage,
//     start,
//     handleSearchChange,
//     handlePageSizeChange,
//     changePage,
//     handleSort,
//     getSortIcon,
//     getAriaLabel,
//     sortConfig,
//   } = useTableLogic(seed);

//   const [paymentTerms, setPaymentTerms] = useState(seed);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedTerm, setSelectedTerm] = useState(null);

//   // Use the custom hook for pagination
//   const { getPaginationItems } = usePagination(currentPage, totalPages);
//   const paginationItems = getPaginationItems();

//   // Create new payment term handler
//   const handleCreateNew = () => {
//     setIsCreateModalOpen(true);
//   };

//   // Edit payment term handler
//   const handleEdit = (term) => {
//     setSelectedTerm(term);
//     setIsEditModalOpen(true);
//   };

//   // Delete payment term handler
//   const handleDeleteTerm = (term) => {
//     if (window.confirm(`Are you sure you want to delete "${term.name}"?`)) {
//       const updatedTerms = paymentTerms.filter(t => t.id !== term.id);
//       setPaymentTerms(updatedTerms);
//     }
//   };

//   // Save new payment term
//   const handleSaveNewTerm = (newTerm) => {
//     const newTermWithId = {
//       ...newTerm,
//       id: Math.max(...paymentTerms.map(t => t.id), 0) + 1,
//       createdBy: "KIRTIRAJ",
//     };
//     const updatedTerms = [...paymentTerms, newTermWithId];
//     setPaymentTerms(updatedTerms);
//   };

//   // Save edited payment term
//   const handleSaveEditTerm = (updatedTerm) => {
//     const updatedTerms = paymentTerms.map((term) =>
//       term.id === updatedTerm.id ? updatedTerm : term
//     );
//     setPaymentTerms(updatedTerms);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-2 md:p-3">
//       {/* Main Content with conditional blur */}
//       <div
//         className={`transition-all duration-300 ${
//           isCreateModalOpen || isEditModalOpen ? "filter blur-[1px]" : ""
//         }`}
//       >
//         <div className="mb-3">
//           <h1 className="text-xl text-gray-500">Payment Term Master</h1>
//         </div>

//         <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
//           <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-end">
//             <div className="flex items-center gap-3">
//               <select
//                 className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
//                 value={pageSize}
//                 onChange={(e) => handlePageSizeChange(Number(e.target.value))}
//               >
//                 {[10, 15, 20, 25, 50].map((n) => (
//                   <option key={n} value={n}>
//                     {n}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Search Component */}
//             <div className="flex-1 md:flex-none">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search List..."
//                   value={query}
//                   onChange={(e) => handleSearchChange(e.target.value)}
//                   className="w-full md:w-64 rounded-lg border border-gray-300 bg-white px-3 py-1 pl-9 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
//                 />
//                 <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
//               </div>
//             </div>

//             <div className="py-1">
//               <Button onClick={handleCreateNew} className="py-1 text-sm">
//                 Create New
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="rounded-lg bg-white shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead className="bg-gray-400 border-b p-4 border-gray-200">
//                 <tr>
//                   <th className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider">
//                     #
//                   </th>
//                   <th
//                     className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                     onClick={() => handleSort("name")}
//                     aria-label={getAriaLabel("name")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("name")}
//                       Term Name
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                     onClick={() => handleSort("days")}
//                     aria-label={getAriaLabel("days")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("days")}
//                       Days
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                     onClick={() => handleSort("createdBy")}
//                     aria-label={getAriaLabel("createdBy")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("createdBy")}
//                       Created By
//                     </div>
//                   </th>
//                   <th className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {rows.map((term, idx) => {
//                   const colorIndex = (start + idx) % rowColors.length;
//                   const rowColorClass = rowColors[colorIndex];
//                   return (
//                     <tr
//                       key={term.id}
//                       className={`${rowColorClass} transition-colors`}
//                     >
//                       <td className="px-3 py-1 text-gray-600 font-medium">
//                         {start + idx + 1}
//                       </td>
//                       <td className="px-3 py-1 font-medium text-gray-900">
//                         {term.name}
//                       </td>
//                       <td className="px-3 py-1 text-gray-900">{term.days}</td>
//                       <td className="px-3 py-1 text-gray-600">
//                         {term.createdBy}
//                       </td>
//                       <td className="px-3">
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => handleEdit(term)}
//                             className="p-1 text-gray-900 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
//                             title="Edit"
//                           >
//                             <PencilSquareIcon className="h-3.5 w-3.5" />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteTerm(term)}
//                             className="p-1 text-gray-900 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
//                             title="Delete"
//                           >
//                             <TrashIcon className="h-3.5 w-3.5" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//                 {rows.length === 0 && (
//                   <tr>
//                     <td
//                       className="px-3 py-8 text-center text-gray-500"
//                       colSpan={5}
//                     >
//                       <div className="flex flex-col items-center gap-1">
//                         <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
//                         <p className="text-sm font-medium">No payment terms found</p>
//                         <p className="text-xs text-gray-400">
//                           {query
//                             ? "Try adjusting your search query"
//                             : "No payment terms available"}
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="border-t border-gray-200 bg-white px-6 py-4">
//             <div className="flex flex-col sm:flex-row justify-between gap-4">
//               <div className="text-sm text-gray-600">
//                 Showing{" "}
//                 <span className="font-semibold text-gray-900">
//                   {total === 0 ? 0 : start + 1}-
//                   {Math.min(total, start + pageSize)}
//                 </span>{" "}
//                 of <span className="font-semibold text-gray-900">{total}</span>{" "}
//                 {total === 1 ? "entry" : "entries"}
//               </div>

//               <div>
//                 <Pagination>
//                   <PaginationContent>
//                     <PaginationItem>
//                       <PaginationPrevious
//                         onClick={() => changePage(currentPage - 1)}
//                         className={cx(
//                           "cursor-pointer",
//                           currentPage === 1 && "pointer-events-none opacity-50"
//                         )}
//                       />
//                     </PaginationItem>

//                     {paginationItems.map((item, index) => {
//                       if (
//                         item === "ellipsis-start" ||
//                         item === "ellipsis-end"
//                       ) {
//                         return (
//                           <PaginationItem key={`ellipsis-${index}`}>
//                             <PaginationEllipsis />
//                           </PaginationItem>
//                         );
//                       }

//                       return (
//                         <PaginationItem key={item}>
//                           <PaginationLink
//                             onClick={() => changePage(item)}
//                             isActive={currentPage === item}
//                             className="cursor-pointer"
//                           >
//                             {item}
//                           </PaginationLink>
//                         </PaginationItem>
//                       );
//                     })}

//                     <PaginationItem>
//                       <PaginationNext
//                         onClick={() => changePage(currentPage + 1)}
//                         className={cx(
//                           "cursor-pointer",
//                           currentPage === totalPages &&
//                             "pointer-events-none opacity-50"
//                         )}
//                       />
//                     </PaginationItem>
//                   </PaginationContent>
//                 </Pagination>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <CreatePaymentTermModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onSave={handleSaveNewTerm}
//       />

//       <EditPaymentTermModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={handleSaveEditTerm}
//         termData={selectedTerm}
//       />
//     </div>
//   );
// }


// pages/PaymentTerm.jsx
import React, { useState } from "react";
import { ReusableTable } from "@/components/ReusableTable";
import { ReusableModal } from "@/components/ReusableModal";

// Configuration for Payment Term
const paymentTermConfig = {
  title: "Payment Term Master",
  data: [
    { id: 1, name: "5 DAYS", days: 5, createdBy: "KIRTIRAJ" },
    { id: 2, name: "90 Days", days: 90, createdBy: "KIRTIRAJ" },
    { id: 3, name: "60 Days", days: 60, createdBy: "KIRTIRAJ" },
    { id: 4, name: "30 Days", days: 30, createdBy: "KIRTIRAJ" },
  ],
  columns: [
    { key: "name", label: "Term Name", sortable: true },
    { key: "days", label: "Days", sortable: true },
    { key: "createdBy", label: "Created By", sortable: true },
  ],
  modalFields: [
    {
      name: "name",
      label: "Term Name",
      type: "text",
      required: true,
      placeholder: "Enter Term Name"
    },
    {
      name: "days",
      label: "Days",
      type: "number",
      required: true,
      placeholder: "Enter Number of Days"
    }
  ]
};

export default function PaymentTerm() {
  const [data, setData] = useState(paymentTermConfig.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleCreate = () => {
    setSelectedItem(null);
    setIsEdit(false);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      setData(prev => prev.filter(d => d.id !== item.id));
    }
  };

  const handleSave = (formData) => {
    if (isEdit && selectedItem) {
      // Update existing item
      setData(prev => prev.map(item => 
        item.id === selectedItem.id 
          ? { ...item, ...formData, days: parseInt(formData.days) }
          : item
      ));
    } else {
      // Create new item
      const newItem = {
        ...formData,
        days: parseInt(formData.days),
        id: Math.max(...data.map(d => d.id), 0) + 1,
        createdBy: "KIRTIRAJ",
      };
      setData(prev => [...prev, newItem]);
    }
  };

  return (
    <>
      <ReusableTable
        title={paymentTermConfig.title}
        data={data}
        columns={paymentTermConfig.columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        createButtonText="Create New Term"
      />

      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={isEdit ? "Edit Payment Term" : "New Payment Term"}
        fields={paymentTermConfig.modalFields}
        initialData={selectedItem || {}}
        isEdit={isEdit}
      />
    </>
  );
}