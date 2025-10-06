// import React, { useState } from "react";
// import {
//   PencilSquareIcon,
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
// } from "@components/ui/pagination"; // Fixed: using @components alias
// import { Button } from "@components/ui/button"; // Fixed: using @components alias

// // Import from separate files
// import { usePagination } from "@hooks/usePagination"; // Fixed: using @hooks alias
// import { useTableLogic } from "@hooks/useTableLogic"; // Fixed: using @hooks alias
// import { rowColors } from "@constants/tableData"; // Fixed: using @constants alias
// import { cx } from "@utils/helpers"; // Fixed: using @utils alias

// // Prefix specific data matching the image
// const seed = [
//   { id: 1, prefixType: "CDT", prefixValue: "1", sequenceLength: 0, createdBy: "KIRTIRAJ" },
//   { id: 2, prefixType: "inventory/facking", prefixValue: "low", sequenceLength: 0, createdBy: "KIRTIRAJ" },
//   { id: 3, prefixType: "DBT", prefixValue: "1", sequenceLength: 0, createdBy: "KIRTIRAJ" },
//   { id: 4, prefixType: "material/mward", prefixValue: "M", sequenceLength: 0, createdBy: "KIRTIRAJ" },
//   { id: 5, prefixType: "estimate", prefixValue: "EST", sequenceLength: 0, createdBy: "KIRTIRAJ" },
//   { id: 6, prefixType: "JRNL", prefixValue: "JRNL", sequenceLength: 0, createdBy: "KIRTIRAJ" },
//   { id: 7, prefixType: "credimote", prefixValue: "CRD", sequenceLength: 0, createdBy: "KIRTIRAJ" },
//   { id: 8, prefixType: "debimote", prefixValue: "BIL", sequenceLength: 0, createdBy: "KIRTIRAJ" },
//   { id: 9, prefixType: "bank_transaction", prefixValue: "TRNS", sequenceLength: 0, createdBy: "KIRTIRAJ" },
//   { id: 10, prefixType: "materials/consumption", prefixValue: "Con", sequenceLength: 0, createdBy: "KIRTIRAJ" },
// ];

// const EditPrefixModal = ({ isOpen, onClose, onSave, prefixData }) => {
//   const [prefixType, setPrefixType] = useState(prefixData?.prefixType || "");
//   const [prefixValue, setPrefixValue] = useState(prefixData?.prefixValue || "");
//   const [sequenceLength, setSequenceLength] = useState(prefixData?.sequenceLength?.toString() || "");

//   React.useEffect(() => {
//     if (prefixData) {
//       setPrefixType(prefixData.prefixType);
//       setPrefixValue(prefixData.prefixValue);
//       setSequenceLength(prefixData.sequenceLength?.toString() || "");
//     }
//   }, [prefixData]);

//   const handleSave = () => {
//     if (prefixType && prefixValue) {
//       onSave({ 
//         ...prefixData, 
//         prefixType, 
//         prefixValue, 
//         sequenceLength: parseInt(sequenceLength) || 0 
//       });
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-xl border border-gray-200">
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Edit Prefix</h2>
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
//               Prefix Type<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={prefixType}
//               onChange={(e) => setPrefixType(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Sequence No.<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={prefixValue}
//               onChange={(e) => setPrefixValue(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Length
//             </label>
//             <input
//               type="number"
//               value={sequenceLength}
//               onChange={(e) => setSequenceLength(e.target.value)}
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
//             <Button onClick={handleSave} className="py-1 text-sm">
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function Prefix() {
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

//   const [prefixes, setPrefixes] = useState(seed);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedPrefix, setSelectedPrefix] = useState(null);

//   // Use the custom hook for pagination
//   const { getPaginationItems } = usePagination(currentPage, totalPages);
//   const paginationItems = getPaginationItems();

//   // Edit prefix handler
//   const handleEdit = (prefix) => {
//     setSelectedPrefix(prefix);
//     setIsEditModalOpen(true);
//   };

//   // Save edited prefix
//   const handleSaveEditPrefix = (updatedPrefix) => {
//     const updatedPrefixes = prefixes.map(prefix => 
//       prefix.id === updatedPrefix.id ? updatedPrefix : prefix
//     );
//     setPrefixes(updatedPrefixes);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-2 md:p-3">
//       {/* Main Content with conditional blur */}
//       <div className={`transition-all duration-300 ${isEditModalOpen ? 'filter blur-[1px]' : ''}`}>
//         <div className="mb-3">
//           <h1 className="text-xl text-gray-500">Prefix</h1>
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
//                     onClick={() => handleSort("prefixType")}
//                     aria-label={getAriaLabel("prefixType")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("prefixType")}
//                       Prefix Type
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                     onClick={() => handleSort("prefixValue")}
//                     aria-label={getAriaLabel("prefixValue")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("prefixValue")}
//                       Sequence No.
//                     </div>
//                   </th>
//                   <th className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                    onClick={() => handleSort("sequenceLength")}
//                     aria-label={getAriaLabel("sequenceLength")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("sequenceLength")}
//                      Length
//                     </div>
                    
//                   </th>
//                   <th className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                    onClick={() => handleSort("createdBy")}
//                     aria-label={getAriaLabel("createdBy")}
//                   >
//                      <div className="flex items-center gap-1">
//                       {getSortIcon("createdBy")}
//                      Created By
//                     </div>
                    
//                   </th>
//                   <th className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {rows.map((prefix, idx) => {
//                   const colorIndex = (start + idx) % rowColors.length;
//                   const rowColorClass = rowColors[colorIndex];
//                   return (
//                     <tr
//                       key={prefix.id}
//                       className={`${rowColorClass} transition-colors`}
//                     >
//                       <td className="px-3 py-1 text-gray-600 font-medium">
//                         {start + idx + 1}
//                       </td>
//                       <td className="px-3 py-1 font-medium text-gray-900">
//                         {prefix.prefixType}
//                       </td>
//                       <td className="px-3 py-1 font-mono text-gray-900">
//                         {prefix.prefixValue}
//                       </td>
//                       <td className="px-3 py-1 text-gray-600">
//                         {prefix.sequenceLength}
//                       </td>
//                       <td className="px-3 py-1 text-gray-600">
//                         {prefix.createdBy}
//                       </td>
//                       <td className="px-3">
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => handleEdit(prefix)}
//                             className="p-1 text-gray-900 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
//                             title="Edit"
//                           >
//                             <PencilSquareIcon className="h-3.5 w-3.5" />
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
//                       colSpan={6}
//                     >
//                       <div className="flex flex-col items-center gap-1">
//                         <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
//                         <p className="text-sm font-medium">No prefixes found</p>
//                         <p className="text-xs text-gray-400">
//                           {query ? "Try adjusting your search query" : "No prefixes available"}
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
//                       if (item === "ellipsis-start" || item === "ellipsis-end") {
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

//       {/* Edit Modal Only */}
//       <EditPrefixModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={handleSaveEditPrefix}
//         prefixData={selectedPrefix}
//       />
//     </div>
//   );
// }

import React, { useState } from "react";
import { ReusableTable } from "@/components/ReusableTable";
import { ReusableModal } from "@/components/ReusableModal";

// Prefix specific data matching the image
const seed = [
  { id: 1, prefixType: "CDT", prefixValue: "1", sequenceLength: 0, createdBy: "KIRTIRAJ" },
  { id: 2, prefixType: "inventory/facking", prefixValue: "low", sequenceLength: 0, createdBy: "KIRTIRAJ" },
  { id: 3, prefixType: "DBT", prefixValue: "1", sequenceLength: 0, createdBy: "KIRTIRAJ" },
  { id: 4, prefixType: "material/mward", prefixValue: "M", sequenceLength: 0, createdBy: "KIRTIRAJ" },
  { id: 5, prefixType: "estimate", prefixValue: "EST", sequenceLength: 0, createdBy: "KIRTIRAJ" },
  { id: 6, prefixType: "JRNL", prefixValue: "JRNL", sequenceLength: 0, createdBy: "KIRTIRAJ" },
  { id: 7, prefixType: "credimote", prefixValue: "CRD", sequenceLength: 0, createdBy: "KIRTIRAJ" },
  { id: 8, prefixType: "debimote", prefixValue: "BIL", sequenceLength: 0, createdBy: "KIRTIRAJ" },
  { id: 9, prefixType: "bank_transaction", prefixValue: "TRNS", sequenceLength: 0, createdBy: "KIRTIRAJ" },
  { id: 10, prefixType: "materials/consumption", prefixValue: "Con", sequenceLength: 0, createdBy: "KIRTIRAJ" },
];

// Define table columns
const columns = [
  {
    key: "prefixType",
    label: "Prefix Type",
  },
  {
    key: "prefixValue",
    label: "Sequence No.",
  },
  {
    key: "sequenceLength",
    label: "Length",
  },
  {
    key: "createdBy",
    label: "Created By",
  }
];

// Define modal fields for edit
const prefixFields = [
  {
    name: "prefixType",
    label: "Prefix Type",
    type: "text",
    placeholder: "Enter Prefix Type",
    required: true
  },
  {
    name: "prefixValue",
    label: "Sequence No.",
    type: "text",
    placeholder: "Enter Sequence Number",
    required: true
  },
  {
    name: "sequenceLength",
    label: "Length",
    type: "number",
    placeholder: "Enter Length",
    required: false
  }
];

export default function Prefix() {
  const [prefixes, setPrefixes] = useState(seed);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPrefix, setSelectedPrefix] = useState(null);

  // Edit prefix handler
  const handleEdit = (prefix) => {
    setSelectedPrefix(prefix);
    setIsEditModalOpen(true);
  };

  // Save edited prefix
  const handleSaveEditPrefix = (formData) => {
    const updatedPrefix = {
      ...selectedPrefix,
      prefixType: formData.prefixType,
      prefixValue: formData.prefixValue,
      sequenceLength: parseInt(formData.sequenceLength) || 0
    };
    
    const updatedPrefixes = prefixes.map(prefix => 
      prefix.id === selectedPrefix.id ? updatedPrefix : prefix
    );
    setPrefixes(updatedPrefixes);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-3">
      {/* Main Content with conditional blur */}
      <div className={`transition-all duration-300 ${isEditModalOpen ? 'filter blur-[1px]' : ''}`}>
        <ReusableTable
          title="Prefix"
          data={prefixes}
          columns={columns}
          onEdit={handleEdit}
          searchPlaceholder="Search List..."
          emptyMessage="No prefixes found"
          showCreateButton={false}
          showEdit={true}
          showDelete={false}
        />
      </div>

      {/* Edit Modal Only */}
      <ReusableModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditPrefix}
        title="Edit Prefix"
        fields={prefixFields}
        initialData={selectedPrefix || {}}
        isEdit={true}
      />
    </div>
  );
}

