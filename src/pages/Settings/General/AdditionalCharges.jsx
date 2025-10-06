// // AdditionalCharge.jsx
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
// import { cx } from "../../utils/helpers.jsx";

// // Additional Charge data
// const seed = [
//   { id: 1, chargeName: "test", defaultValue: 10, tax: "Gst 15", accountGroup: "Indirect Expenses", hsnCode: "", createdBy: "KIRTIRAJ" },
//   { id: 2, chargeName: "cov", defaultValue: 10, tax: "GST 0", accountGroup: "Indirect Incomes", hsnCode: "19053100", createdBy: "SWAGRUHA FOODS" },
//   { id: 3, chargeName: "cover", defaultValue: 10, tax: "GST 0", accountGroup: "Indirect Incomes", hsnCode: "", createdBy: "SWAGRUHA FOODS" },
//   { id: 4, chargeName: "delivery charge", defaultValue: 0, tax: "GST 0", accountGroup: "Indirect Incomes", hsnCode: "", createdBy: "KIRTIRAJ" },
//   { id: 5, chargeName: "POST", defaultValue: 0, tax: "GST 0", accountGroup: "Indirect Incomes", hsnCode: "", createdBy: "SWAGRUHA FOODS" },
//   { id: 6, chargeName: "Delivery", defaultValue: 0, tax: "GST 0", accountGroup: "Indirect Incomes", hsnCode: "", createdBy: "SWAGRUHA FOODS" },
//   { id: 7, chargeName: "TAX", defaultValue: 0, tax: "GST 0", accountGroup: "Indirect Incomes", hsnCode: "", createdBy: "KIRTIRAJ" },
//   { id: 8, chargeName: "GST", defaultValue: 0, tax: "GST 0", accountGroup: "Indirect Incomes", hsnCode: "", createdBy: "KIRTIRAJ" },
//   { id: 9, chargeName: "IML BOX", defaultValue: 0, tax: "GST 0", accountGroup: "Indirect Incomes", hsnCode: "", createdBy: "KIRTIRAJ" },
//   { id: 10, chargeName: "bag charge", defaultValue: 0, tax: "GST 0", accountGroup: "Indirect Incomes", hsnCode: "", createdBy: "KIRTIRAJ" },
// ];

// // Modal Components
// const CreateAdditionalChargeModal = ({ isOpen, onClose, onSave }) => {
//   const [chargeData, setChargeData] = useState({
//     chargeName: "",
//     defaultValue: "",
//     tax: "",
//     accountGroup: "",
//     hsnCode: ""
//   });

//   const handleChange = (field, value) => {
//     setChargeData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSave = () => {
//     if (chargeData.chargeName && chargeData.defaultValue !== "" && chargeData.tax && chargeData.accountGroup) {
//       onSave(chargeData);
//       setChargeData({
//         chargeName: "",
//         defaultValue: "",
//         tax: "",
//         accountGroup: "",
//         hsnCode: ""
//       });
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-xl border border-gray-200">
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">New Additional Charge</h2>
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
//               Additional Charge Name<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={chargeData.chargeName}
//               onChange={(e) => handleChange("chargeName", e.target.value)}
//               placeholder="Enter Charge Name"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Default Value<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               value={chargeData.defaultValue}
//               onChange={(e) => handleChange("defaultValue", e.target.value)}
//               placeholder="Enter Default Value"
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Tax<span className="text-red-500">*</span>
//             </label>
//             <select
//               value={chargeData.tax}
//               onChange={(e) => handleChange("tax", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             >
//               <option value="">Select Tax</option>
//               <option value="GST 0">GST 0</option>
//               <option value="Gst 15">Gst 15</option>
//               <option value="GST 18">GST 18</option>
//               <option value="GST 28">GST 28</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Account Group<span className="text-red-500">*</span>
//             </label>
//             <select
//               value={chargeData.accountGroup}
//               onChange={(e) => handleChange("accountGroup", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             >
//               <option value="">Select Account Group</option>
//               <option value="Indirect Expenses">Indirect Expenses</option>
//               <option value="Indirect Incomes">Indirect Incomes</option>
//               <option value="Direct Expenses">Direct Expenses</option>
//               <option value="Direct Incomes">Direct Incomes</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               HSN Code
//             </label>
//             <input
//               type="text"
//               value={chargeData.hsnCode}
//               onChange={(e) => handleChange("hsnCode", e.target.value)}
//               placeholder="Enter HSN Code"
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
//             <Button 
//               onClick={handleSave} 
//               className="py-1 text-sm"
//               disabled={!chargeData.chargeName || chargeData.defaultValue === "" || !chargeData.tax || !chargeData.accountGroup}
//             >
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const EditAdditionalChargeModal = ({ isOpen, onClose, onSave, chargeData }) => {
//   const [formData, setFormData] = useState({
//     chargeName: "",
//     defaultValue: "",
//     tax: "",
//     accountGroup: "",
//     hsnCode: ""
//   });

//   React.useEffect(() => {
//     if (chargeData) {
//       setFormData({
//         chargeName: chargeData.chargeName || "",
//         defaultValue: chargeData.defaultValue?.toString() || "",
//         tax: chargeData.tax || "",
//         accountGroup: chargeData.accountGroup || "",
//         hsnCode: chargeData.hsnCode || ""
//       });
//     }
//   }, [chargeData]);

//   const handleChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSave = () => {
//     if (formData.chargeName && formData.defaultValue !== "" && formData.tax && formData.accountGroup) {
//       onSave({
//         ...chargeData,
//         chargeName: formData.chargeName,
//         defaultValue: parseFloat(formData.defaultValue),
//         tax: formData.tax,
//         accountGroup: formData.accountGroup,
//         hsnCode: formData.hsnCode
//       });
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-xl border border-gray-200">
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-lg font-semibold text-gray-800">Edit Additional Charge</h2>
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
//               Additional Charge Name<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               value={formData.chargeName}
//               onChange={(e) => handleChange("chargeName", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Default Value<span className="text-red-500">*</span>
//             </label>
//             <input
//               type="number"
//               value={formData.defaultValue}
//               onChange={(e) => handleChange("defaultValue", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Tax<span className="text-red-500">*</span>
//             </label>
//             <select
//               value={formData.tax}
//               onChange={(e) => handleChange("tax", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             >
//               <option value="">Select Tax</option>
//               <option value="GST 0">GST 0</option>
//               <option value="Gst 15">Gst 15</option>
//               <option value="GST 18">GST 18</option>
//               <option value="GST 28">GST 28</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               Account Group<span className="text-red-500">*</span>
//             </label>
//             <select
//               value={formData.accountGroup}
//               onChange={(e) => handleChange("accountGroup", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
//             >
//               <option value="">Select Account Group</option>
//               <option value="Indirect Expenses">Indirect Expenses</option>
//               <option value="Indirect Incomes">Indirect Incomes</option>
//               <option value="Direct Expenses">Direct Expenses</option>
//               <option value="Direct Incomes">Direct Incomes</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-900 mb-2">
//               HSN Code
//             </label>
//             <input
//               type="text"
//               value={formData.hsnCode}
//               onChange={(e) => handleChange("hsnCode", e.target.value)}
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
//             <Button 
//               onClick={handleSave} 
//               className="py-1 text-sm"
//               disabled={!formData.chargeName || formData.defaultValue === "" || !formData.tax || !formData.accountGroup}
//             >
//               Save
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function AdditionalCharge() {
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
//   } = useTableLogic(seed);

//   const [additionalCharges, setAdditionalCharges] = useState(seed);
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [selectedCharge, setSelectedCharge] = useState(null);

//   // Use the custom hook for pagination
//   const { getPaginationItems } = usePagination(currentPage, totalPages);
//   const paginationItems = getPaginationItems();

//   // Create new charge handler
//   const handleCreateNew = () => {
//     setIsCreateModalOpen(true);
//   };

//   // Edit charge handler
//   const handleEdit = (charge) => {
//     setSelectedCharge(charge);
//     setIsEditModalOpen(true);
//   };

//   // Delete charge handler
//   const handleDeleteCharge = (charge) => {
//     if (window.confirm(`Are you sure you want to delete "${charge.chargeName}"?`)) {
//       const updatedCharges = additionalCharges.filter(c => c.id !== charge.id);
//       setAdditionalCharges(updatedCharges);
//     }
//   };

//   // Save new charge
//   const handleSaveNewCharge = (newCharge) => {
//     const newChargeWithId = {
//       ...newCharge,
//       id: Math.max(...additionalCharges.map(c => c.id), 0) + 1,
//       defaultValue: parseFloat(newCharge.defaultValue),
//       createdBy: "KIRTIRAJ", // Default created by
//     };
//     const updatedCharges = [...additionalCharges, newChargeWithId];
//     setAdditionalCharges(updatedCharges);
//   };

//   // Save edited charge
//   const handleSaveEditCharge = (updatedCharge) => {
//     const updatedCharges = additionalCharges.map((charge) =>
//       charge.id === updatedCharge.id ? updatedCharge : charge
//     );
//     setAdditionalCharges(updatedCharges);
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
//           <h1 className="text-xl text-gray-500">Additional Charge Master</h1>
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
//                     onClick={() => handleSort("chargeName")}
//                     aria-label={getAriaLabel("chargeName")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("chargeName")}
//                       Additional Charge
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                     onClick={() => handleSort("defaultValue")}
//                     aria-label={getAriaLabel("defaultValue")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("defaultValue")}
//                       Default Value
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                     onClick={() => handleSort("tax")}
//                     aria-label={getAriaLabel("tax")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("tax")}
//                       Tax
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                     onClick={() => handleSort("accountGroup")}
//                     aria-label={getAriaLabel("accountGroup")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("accountGroup")}
//                       Account Group
//                     </div>
//                   </th>
//                   <th
//                     className="px-3 text-left font-semibold text-gray-900 uppercase tracking-wider cursor-pointer bg-gray-400"
//                     onClick={() => handleSort("hsnCode")}
//                     aria-label={getAriaLabel("hsnCode")}
//                   >
//                     <div className="flex items-center gap-1">
//                       {getSortIcon("hsnCode")}
//                       HSN Code
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
//                 {rows.map((charge, idx) => {
//                   const colorIndex = (start + idx) % rowColors.length;
//                   const rowColorClass = rowColors[colorIndex];
//                   return (
//                     <tr
//                       key={charge.id}
//                       className={`${rowColorClass} transition-colors`}
//                     >
//                       <td className="px-3 py-1 text-gray-600 font-medium">
//                         {start + idx + 1}
//                       </td>
//                       <td className="px-3 py-1 font-medium text-gray-900">
//                         {charge.chargeName}
//                       </td>
//                       <td className="px-3 py-1 text-gray-900">
//                         {charge.defaultValue}
//                       </td>
//                       <td className="px-3 py-1 text-gray-900">
//                         {charge.tax}
//                       </td>
//                       <td className="px-3 py-1 text-gray-900">
//                         {charge.accountGroup}
//                       </td>
//                       <td className="px-3 py-1 text-gray-900">
//                         {charge.hsnCode || "-"}
//                       </td>
//                       <td className="px-3 py-1 text-gray-600">
//                         {charge.createdBy}
//                       </td>
//                       <td className="px-3">
//                         <div className="flex items-center gap-1">
//                           <button
//                             onClick={() => handleEdit(charge)}
//                             className="p-1 text-gray-900 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
//                             title="Edit"
//                           >
//                             <PencilSquareIcon className="h-3.5 w-3.5" />
//                           </button>
//                           <button
//                             onClick={() => handleDeleteCharge(charge)}
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
//                       colSpan={8}
//                     >
//                       <div className="flex flex-col items-center gap-1">
//                         <MagnifyingGlassIcon className="h-6 w-6 text-gray-300" />
//                         <p className="text-sm font-medium">No additional charges found</p>
//                         <p className="text-xs text-gray-400">
//                           {query
//                             ? "Try adjusting your search query"
//                             : "No additional charges available"}
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
//       <CreateAdditionalChargeModal
//         isOpen={isCreateModalOpen}
//         onClose={() => setIsCreateModalOpen(false)}
//         onSave={handleSaveNewCharge}
//       />

//       <EditAdditionalChargeModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSave={handleSaveEditCharge}
//         chargeData={selectedCharge}
//       />
//     </div>
//   );
// }


// pages/AdditionalCharge.jsx
import React, { useState } from "react";
import { ReusableTable } from "@/components/ReusableTable";
import { ReusableModal } from "@/components/ReusableModal";

// Configuration for Additional Charge
const additionalChargeConfig = {
  title: "Additional Charge Master",
  data: [
    { id: 1, chargeName: "test", defaultValue: 10, tax: "Gst 15", accountGroup: "Indirect Expenses", hsnCode: "", createdBy: "KIRTIRAJ" },
    { id: 2, chargeName: "cov", defaultValue: 10, tax: "GST 0", accountGroup: "Indirect Incomes", hsnCode: "19053100", createdBy: "SWAGRUHA FOODS" },
  ],
  columns: [
    { key: "chargeName", label: "Additional Charge", sortable: true },
    { key: "defaultValue", label: "Default Value", sortable: true },
    { key: "tax", label: "Tax", sortable: true },
    { key: "accountGroup", label: "Account Group", sortable: true },
    { key: "hsnCode", label: "HSN Code", sortable: true },
    { key: "createdBy", label: "Created By", sortable: true },
  ],
  modalFields: [
    {
      name: "chargeName",
      label: "Additional Charge Name",
      type: "text",
      required: true,
      placeholder: "Enter Charge Name"
    },
    {
      name: "defaultValue",
      label: "Default Value",
      type: "number",
      required: true,
      placeholder: "Enter Default Value"
    },
    {
      name: "tax",
      label: "Tax",
      type: "select",
      required: true,
      options: [
        { value: "GST 0", label: "GST 0" },
        { value: "Gst 15", label: "Gst 15" },
        { value: "GST 18", label: "GST 18" }
      ]
    },
    {
      name: "accountGroup",
      label: "Account Group",
      type: "select",
      required: true,
      options: [
        { value: "Indirect Expenses", label: "Indirect Expenses" },
        { value: "Indirect Incomes", label: "Indirect Incomes" }
      ]
    },
    {
      name: "hsnCode",
      label: "HSN Code",
      type: "text",
      required: false,
      placeholder: "Enter HSN Code"
    }
  ]
};

export default function AdditionalCharge() {
  const [data, setData] = useState(additionalChargeConfig.data);
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
    if (window.confirm(`Are you sure you want to delete "${item.chargeName}"?`)) {
      setData(prev => prev.filter(d => d.id !== item.id));
    }
  };

  const handleSave = (formData) => {
    if (isEdit && selectedItem) {
      setData(prev => prev.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              ...formData, 
              defaultValue: parseFloat(formData.defaultValue) 
            }
          : item
      ));
    } else {
      const newItem = {
        ...formData,
        defaultValue: parseFloat(formData.defaultValue),
        id: Math.max(...data.map(d => d.id), 0) + 1,
        createdBy: "KIRTIRAJ",
      };
      setData(prev => [...prev, newItem]);
    }
  };

  return (
    <>
      <ReusableTable
        title={additionalChargeConfig.title}
        data={data}
        columns={additionalChargeConfig.columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        createButtonText="Create New Charge"
      />

      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        title={isEdit ? "Edit Additional Charge" : "New Additional Charge"}
        fields={additionalChargeConfig.modalFields}
        initialData={selectedItem || {}}
        isEdit={isEdit}
      />
    </>
  );
}