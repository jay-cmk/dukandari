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
// } from "@components/ui/pagination";
// import { Button } from "@/components/ui/button";

// // Import from separate files
// import { usePagination } from "@hooks/usePagination.jsx";
// import { useTableLogic } from "@hooks/useTableLogic.jsx"; // ADD THIS IMPORT
// import { rowColors } from "@constants/tableData.jsx";
// import { cx, handleDelete } from "@utils/helpers.jsx";

// // Updated Prefix data matching the new structure
// const seed = [
//   { id: 1, name: "TAX 30", rate: 30, createdBy: "KIRTIRAJ" },
//   { id: 2, name: "Gst 15", rate: 15, createdBy: "KIRTIRAJ" },
//   { id: 3, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
//   { id: 4, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
//   { id: 5, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
//   { id: 6, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
//   { id: 7, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
//   { id: 8, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
//   { id: 9, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
//   { id: 10, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
// ];

// // Modal Components
// const CreateTaxModal = ({ isOpen, onClose, onSave }) => {
//   const [taxName, setTaxName] = useState("");
//   const [taxRate, setTaxRate] = useState("");

//   const handleSave = () => {
//     if (taxName && taxRate) {
//       onSave({ name: taxName, rate: parseFloat(taxRate) });
//       setTaxName("");
//       setTaxRate("");
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-xl border border-gray-200">
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">New Tax</h2>
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
//               Tax Name<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={taxName}
//               onChange={(e) => setTaxName(e.target.value)}
//               placeholder="Enter Tax Name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Tax Rate
//             </label>
//             <input
//               type="number"
//               value={taxRate}
//               onChange={(e) => setTaxRate(e.target.value)}
//               placeholder="Enter Tax Rate"
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
//           {/* <Button
//             onClick={handleSave}
//             className="px-4 py-2 text-sm  text-white transition-colors"
//             disabled={!taxName || !taxRate}
//           >
//             Save
//           </Button> */}
//           <div className="py-1">
//               <Button onClick={handleSave} className="py-1 text-sm">
//                 Save
//               </Button>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EditTaxModal = ({ isOpen, onClose, onSave, taxData }) => {
//   const [taxName, setTaxName] = useState(taxData?.name || "");
//   const [taxRate, setTaxRate] = useState(taxData?.rate?.toString() || "");

//   React.useEffect(() => {
//     if (taxData) {
//       setTaxName(taxData.name);
//       setTaxRate(taxData.rate?.toString() || "");
//     }
//   }, [taxData]);

//   const handleSave = () => {
//     if (taxName && taxRate) {
//       onSave({
//         ...taxData,
//         name: taxName,
//         rate: parseFloat(taxRate),
//       });
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-xl border border-gray-200">
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Edit Tax</h2>
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
//               Tax Name<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={taxName}
//               onChange={(e) => setTaxName(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Tax Rate<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               value={taxRate}
//               onChange={(e) => setTaxRate(e.target.value)}
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
//           {/* <Button
//             onClick={handleSave}
//             className="px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
//             disabled={!taxName || !taxRate}
//           >
//             Save
//           </Button> */}
//           <div className="py-1">
//               <Button onClick={handleSave} className="py-1 text-sm">
//                 Save
//               </Button>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Taxes() {
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

//   const [taxes, setTaxes] = useState(seed);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedTax, setSelectedTax] = useState(null);

//   // Use the custom hook for pagination
//   const { getPaginationItems } = usePagination(currentPage, totalPages);
//   const paginationItems = getPaginationItems();

//   // Create new tax handler
//   const handleCreateNew = () => {
//     setIsCreateModalOpen(true);
//   };

//   // Edit tax handler
//   const handleEdit = (tax) => {
//     setSelectedTax(tax);
//     setIsEditModalOpen(true);
//   };

//   // Save new tax
//   const handleSaveNewTax = (newTax) => {
//     const newTaxWithId = {
//       ...newTax,
//       id: Math.max(...taxes.map((t) => t.id)) + 1,
//       createdBy: "KIRTIRAJ",
//     };
//     const updatedTaxes = [...taxes, newTaxWithId];
//     setTaxes(updatedTaxes);
//   };

//   // Save edited tax
//   const handleSaveEditTax = (updatedTax) => {
//     const updatedTaxes = taxes.map((tax) =>
//       tax.id === updatedTax.id ? updatedTax : tax
//     );
//     setTaxes(updatedTaxes);
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
//           <h1 className="text-xl text-gray-500">Tax Master</h1>
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
//                       Name
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                     onClick={() => handleSort("rate")}
//                     aria-label={getAriaLabel("rate")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("rate")}
//                       Rate
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                     onClick={() => handleSort("Created By")}
//                     aria-label={getAriaLabel("Created By")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("Created By")}
//                       Created By
//                     </div>
//                   </th>
//                   <th className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {rows.map((tax, idx) => {
//                   const colorIndex = (start + idx) % rowColors.length;
//                   const rowColorClass = rowColors[colorIndex];
//                   return (
//                     <tr
//                       key={tax.id}
//                       className={`${rowColorClass} transition-colors`}
//                     >
//                       <td className="px-3 py-1 text-gray-600 font-medium">
//                         {start + idx + 1}
//                       </td>
//                       <td className="px-3 py-1 font-medium text-gray-900">
//                         {tax.name}
//                       </td>
//                       <td className="px-3 py-1 text-gray-900">{tax.rate}</td>
//                       <td className="px-3 py-1 text-gray-600">
//                         {tax.createdBy}
//                       </td>
//                       <td className="px-3">
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => handleEdit(tax)}
//                             className="p-1 text-gray-900 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
//                             title="Edit"
//                           >
//                             <PencilSquareIcon className="h-3.5 w-3.5" />
//                           </button>
//                           <button
//                             onClick={() => handleDelete(tax)}
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
//                         <p className="text-sm font-medium">No taxes found</p>
//                         <p className="text-xs text-gray-400">
//                           {query
//                             ? "Try adjusting your search query"
//                             : "No taxes available"}
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
//       <CreateTaxModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onSave={handleSaveNewTax}
//       />

//       <EditTaxModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={handleSaveEditTax}
//         taxData={selectedTax}
//       />
//     </div>
//   );
// }


// Prefix.jsx (Refactored with Reusable Components)
import React, { useState } from "react";
import { ReusableTable } from "@/components/ReusableTable";
import { ReusableModal } from "@/components/ReusableModal";
import { Button } from "@/components/ui/button";

// Same data as before
const seed = [
  { id: 1, name: "TAX 30", rate: 30, createdBy: "KIRTIRAJ" },
  { id: 2, name: "Gst 15", rate: 15, createdBy: "KIRTIRAJ" },
  { id: 3, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
  { id: 4, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
  { id: 5, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
  { id: 6, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
  { id: 7, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
  { id: 8, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
  { id: 9, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
  { id: 10, name: "GST 0", rate: 0, createdBy: "KIRTIRAJ" },
];

// Define table columns
const columns = [
  {
    key: "name",
    label: "Name",
  },
  {
    key: "rate", 
    label: "Rate",
  },
  {
    key: "createdBy",
    label: "Created By",
  }
];

// Define modal fields for create/edit
const taxFields = [
  {
    name: "name",
    label: "Tax Name",
    type: "text",
    placeholder: "Enter Tax Name",
    required: true
  },
  {
    name: "rate",
    label: "Tax Rate", 
    type: "number",
    placeholder: "Enter Tax Rate",
    required: true
  }
];

export default function Taxes() {
  const [taxes, setTaxes] = useState(seed);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTax, setSelectedTax] = useState(null);

  // Create new tax handler
  const handleCreateNew = () => {
    setIsCreateModalOpen(true);
  };

  // Edit tax handler
  const handleEdit = (tax) => {
    setSelectedTax(tax);
    setIsEditModalOpen(true);
  };

  // Delete tax handler
  const handleDelete = (tax) => {
    if (window.confirm(`Are you sure you want to delete ${tax.name}?`)) {
      const updatedTaxes = taxes.filter(t => t.id !== tax.id);
      setTaxes(updatedTaxes);
    }
  };

  // Save new tax
  const handleSaveNewTax = (formData) => {
    const newTax = {
      id: Math.max(...taxes.map(t => t.id)) + 1,
      name: formData.name,
      rate: parseFloat(formData.rate),
      createdBy: "KIRTIRAJ"
    };
    setTaxes(prev => [...prev, newTax]);
  };

  // Save edited tax
  const handleSaveEditTax = (formData) => {
    const updatedTax = {
      ...selectedTax,
      name: formData.name,
      rate: parseFloat(formData.rate)
    };
    setTaxes(prev => prev.map(tax => 
      tax.id === selectedTax.id ? updatedTax : tax
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-3">
      {/* Main Content with conditional blur */}
      <div className={`transition-all duration-300 ${
        isCreateModalOpen || isEditModalOpen ? "filter blur-[1px]" : ""
      }`}>
        <ReusableTable
          title="Tax Master"
          data={taxes}
          columns={columns}
          onCreate={handleCreateNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          createButtonText="Create New"
          searchPlaceholder="Search List..."
          emptyMessage="No taxes found"
          showCreateButton={true}
          showEdit={true}
          showDelete={true}
        />
      </div>

      {/* Create Tax Modal */}
      <ReusableModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleSaveNewTax}
        title="New Tax"
        fields={taxFields}
      />

      {/* Edit Tax Modal */}
      <ReusableModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditTax}
        title="Edit Tax"
        fields={taxFields}
        initialData={selectedTax || {}}
        isEdit={true}
      />
    </div>
  );
}