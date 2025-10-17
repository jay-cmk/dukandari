// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import CustomDropdown from "@/components/Dropdown/CustomDropdown";
// import { validateField, validateForm } from "@/utils/validation";

// const CreateNewExpense = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isEdit, setIsEdit] = useState(false);
//   const [expenseId, setExpenseId] = useState(null);

//   const [formData, setFormData] = useState({
//     // First Row
//     expenseDate: "",
//     expenseNoPrefix: "EXP",
//     expenseNoNumber: "1",
//     selectParty: "",
//     invoiceNo: "",

//     // Second Row
//     reverseCharge: "No",
//     appliedTaxType: "CGST+SGST",
//     note: "",
//     isNonGst: false,
//   });

//   // Product/Service section state
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       account: "",
//       serviceProduct: "",
//       hsnSacCode: "",
//       description: "",
//       amount: "",
//       discount: "",
//       tax: "",
//       eligibleForITC: "", // Add ITC field
//       taxValue: "Rs.0.00",
//       total: "0.00",
//     },
//   ]);

//   // HSN/SAC Modal state
//   const [hsnSacModal, setHsnSacModal] = useState({
//     isOpen: false,
//     productId: null,
//     currentValue: "",
//   });

//   // ITC Modal state
//   const [itcModal, setItcModal] = useState({
//     isOpen: false,
//     productId: null,
//     currentValue: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   // Initialize form data based on mode (create/edit)
//   useEffect(() => {
//     if (location.state) {
//       const { expenseData, isEdit: editMode, expenseId: id } = location.state;

//       if (editMode && expenseData) {
//         setIsEdit(true);
//         setExpenseId(id);
//         setFormData((prev) => ({
//           ...prev,
//           ...expenseData,
//         }));
//       }
//     }
//   }, [location.state]);

//   // Add new product row
//   const addProductRow = () => {
//     const newId =
//       products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
//     setProducts((prev) => [
//       ...prev,
//       {
//         id: newId,
//         account: "",
//         serviceProduct: "",
//         hsnSacCode: "",
//         description: "",
//         amount: "",
//         discount: "",
//         tax: "",
//         eligibleForITC: "",
//         taxValue: "Rs.0.00",
//         total: "0.00",
//       },
//     ]);
//   };

//   // Remove product row
//   const removeProductRow = (id) => {
//     if (products.length > 1) {
//       setProducts((prev) => prev.filter((product) => product.id !== id));
//     }
//   };

//   // Handle product field changes
//   const handleProductChange = (id, field, value) => {
//     setProducts((prev) =>
//       prev.map((product) => {
//         if (product.id === id) {
//           const updatedProduct = { ...product, [field]: value };

//           // Calculate total if amount or discount changes
//           if (field === "amount" || field === "discount") {
//             const amount = parseFloat(updatedProduct.amount) || 0;
//             const discount = parseFloat(updatedProduct.discount) || 0;
//             const total = amount - discount;
//             updatedProduct.total = total.toFixed(2);

//             // Calculate tax value (18% of total for example)
//             const taxValue = total * 0.18;
//             updatedProduct.taxValue = `Rs.${taxValue.toFixed(2)}`;
//           }

//           return updatedProduct;
//         }
//         return product;
//       })
//     );
//   };

//   // Open HSN/SAC Modal
//   const openHsnSacModal = (productId) => {
//     const product = products.find((p) => p.id === productId);
//     setHsnSacModal({
//       isOpen: true,
//       productId,
//       currentValue: product?.hsnSacCode || "",
//     });
//   };

//   // Close HSN/SAC Modal
//   const closeHsnSacModal = () => {
//     setHsnSacModal({
//       isOpen: false,
//       productId: null,
//       currentValue: "",
//     });
//   };

//   // Handle HSN/SAC Code selection
//   const handleHsnSacSelect = (value) => {
//     if (hsnSacModal.productId) {
//       handleProductChange(hsnSacModal.productId, "hsnSacCode", value);
//     }
//     closeHsnSacModal();
//   };

//   // Open ITC Modal
//   const openItcModal = (productId) => {
//     const product = products.find((p) => p.id === productId);
//     setItcModal({
//       isOpen: true,
//       productId,
//       currentValue: product?.eligibleForITC || "",
//     });
//   };

//   // Close ITC Modal
//   const closeItcModal = () => {
//     setItcModal({
//       isOpen: false,
//       productId: null,
//       currentValue: "",
//     });
//   };

//   // Handle ITC selection
//   const handleItcSelect = (value) => {
//     if (itcModal.productId) {
//       handleProductChange(itcModal.productId, "eligibleForITC", value);
//     }
//     closeItcModal();
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (touched[name] || value.length > 0) {
//       const error = validateField(name, value, formData);
//       setErrors((prev) => ({ ...prev, [name]: error }));
//     }
//   };

//   // Handle dropdown changes for form data
//   const handleDropdownChange = (name, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (touched[name] || value.length > 0) {
//       const error = validateField(name, value, formData);
//       setErrors((prev) => ({ ...prev, [name]: error }));
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     const error = validateField(name, value, formData);
//     setErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   const handleCancel = () => {
//     navigate(-1);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const allTouched = {};
//     Object.keys(formData).forEach((key) => {
//       allTouched[key] = true;
//     });
//     setTouched(allTouched);

//     const newErrors = validateForm(formData);
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       if (isEdit) {
//         console.log("Updating Expense:", {
//           id: expenseId,
//           ...formData,
//           products,
//         });
//         alert("Expense updated successfully!");
//       } else {
//         console.log("Creating Expense:", { ...formData, products });
//         alert("Expense added successfully!");
//       }

//       navigate("/expenses");
//     }
//   };

//   const handleSaveAndCreateNew = () => {
//     const allTouched = {};
//     Object.keys(formData).forEach((key) => {
//       allTouched[key] = true;
//     });
//     setTouched(allTouched);

//     const newErrors = validateForm(formData);
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       console.log("Creating Expense:", { ...formData, products });
//       alert("Expense added successfully!");

//       // Reset form for new entry
//       setFormData({
//         expenseDate: "",
//         expenseNoPrefix: "EXP",
//         expenseNoNumber: "1",
//         selectParty: "",
//         invoiceNo: "",
//         reverseCharge: "No",
//         appliedTaxType: "CGST+SGST",
//         note: "",
//         isNonGst: false,
//       });
//       setProducts([
//         {
//           id: 1,
//           account: "",
//           serviceProduct: "",
//           hsnSacCode: "",
//           description: "",
//           amount: "",
//           discount: "",
//           tax: "",
//           eligibleForITC: "",
//           taxValue: "Rs.0.00",
//           total: "0.00",
//         },
//       ]);
//       setTouched({});
//       setErrors({});
//     }
//   };

//   // Dropdown options
//   const partyOptions = [
//     { value: "party1", label: "Party 1" },
//     { value: "party2", label: "Party 2" },
//     { value: "party3", label: "Party 3" },
//     { value: "party4", label: "Party 4" },
//     { value: "party5", label: "Party 5" },
//   ];

//   const expenseNoPrefixOptions = [
//     { value: "EXP", label: "EXP" },
//     { value: "INV", label: "INV" },
//     { value: "BIL", label: "BIL" },
//     { value: "PYT", label: "PYT" },
//   ];

//   const reverseChargeOptions = [
//     { value: "No", label: "No" },
//     { value: "Yes", label: "Yes" },
//   ];

//   const appliedTaxTypeOptions = [
//     { value: "CGST+SGST", label: "CGST+SGST" },
//     { value: "IGST", label: "IGST" },
//     { value: "CESS", label: "CESS" },
//   ];

//   // Product section dropdown options
//   const accountOptions = [
//     { value: "acc1", label: "Office Supplies" },
//     { value: "acc2", label: "Travel Expenses" },
//     { value: "acc3", label: "Utilities" },
//     { value: "acc4", label: "Marketing" },
//     { value: "acc5", label: "Professional Services" },
//   ];

//   const serviceProductOptions = [
//     { value: "prod1", label: "Laptop" },
//     { value: "prod2", label: "Software License" },
//     { value: "prod3", label: "Consulting Service" },
//     { value: "prod4", label: "Office Rent" },
//     { value: "prod5", label: "Internet Service" },
//   ];

//   const taxOptions = [
//     { value: "18", label: "GST 18%" },
//     { value: "12", label: "GST 12%" },
//     { value: "5", label: "GST 5%" },
//     { value: "0", label: "GST 0%" },
//     { value: "28", label: "GST 28%" },
//   ];

//   // ITC Options
//   const itcOptions = [
//     { value: "Eligible", label: "Eligible" },
//     { value: "InEligible", label: "InEligible" },
//   ];

//   return (
//     <div className="mx-auto p-4 bg-gray-300 min-h-screen">
//       <div className="bg-white border p-6 rounded-lg">
//         <h1 className="text-2xl font-bold mb-6 text-gray-700">
//           {isEdit ? "Edit Expense" : "New Expense"}
//         </h1>

//         <form onSubmit={handleSubmit}>
//           {/* First Row - Expense Date, Expense No., Select Party, Invoice No. */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block mb-1 text-sm font-semibold text-black">
//                 Expense Date<span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="date"
//                 name="expenseDate"
//                 value={formData.expenseDate}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
//               />
//               {errors.expenseDate && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.expenseDate}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block mb-1 text-sm font-semibold text-black">
//                 Expense No.
//               </label>
//               <div className="flex gap-2">
//                 <div className="flex-1">
//                   <CustomDropdown
//                     value={formData.expenseNoPrefix}
//                     onChange={(value) =>
//                       handleDropdownChange("expenseNoPrefix", value)
//                     }
//                     options={expenseNoPrefixOptions}
//                     placeholder="Prefix"
//                     searchable={false}
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <input
//                     type="text"
//                     name="expenseNoNumber"
//                     value={formData.expenseNoNumber}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
//                     placeholder="Number"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1 text-sm font-semibold text-black">
//                 Select Party<span className="text-red-500">*</span>
//               </label>
//               <CustomDropdown
//                 value={formData.selectParty}
//                 onChange={(value) => handleDropdownChange("selectParty", value)}
//                 options={partyOptions}
//                 placeholder="Select Party"
//                 searchable={true}
//               />
//               {errors.selectParty && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.selectParty}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="block mb-1 text-sm font-semibold text-black">
//                 Invoice No.
//               </label>
//               <input
//                 type="text"
//                 name="invoiceNo"
//                 value={formData.invoiceNo}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
//                 placeholder="Invoice No"
//               />
//             </div>
//           </div>

//           {/* Second Row - Reverse Charge, Applied Tax Type, Non-GST checkbox, Note */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div>
//               <label className="block mb-1 text-sm font-semibold text-black">
//                 Reverse Charge
//               </label>
//               <CustomDropdown
//                 value={formData.reverseCharge}
//                 onChange={(value) =>
//                   handleDropdownChange("reverseCharge", value)
//                 }
//                 options={reverseChargeOptions}
//                 placeholder="Select Reverse Charge"
//                 searchable={false}
//               />
//             </div>

//             <div>
//               <label className="block mb-1 text-sm font-semibold text-black">
//                 Applied Tax Type
//               </label>
//               <CustomDropdown
//                 value={formData.appliedTaxType}
//                 onChange={(value) =>
//                   handleDropdownChange("appliedTaxType", value)
//                 }
//                 options={appliedTaxTypeOptions}
//                 placeholder="Select Tax Type"
//                 searchable={false}
//               />
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 name="isNonGst"
//                 checked={formData.isNonGst}
//                 onChange={handleChange}
//                 className="mr-2 hover:border-blue-600 h-4 w-4"
//               />
//               <label className="text-sm font-semibold text-black">
//                 Non-GST
//               </label>
//             </div>

//             <div>
//               <label className="block mb-1 text-sm font-semibold text-black">
//                 Note
//               </label>
//               <input
//                 type="text"
//                 name="note"
//                 value={formData.note}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
//                 placeholder="Enter a Note"
//               />
//             </div>
//           </div>

//           {/* Product/Service Section */}
//           <div className="mb-6 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
//             <div className="px-3 py-2 border-b border-gray-200">
//               <h3 className="text-sm font-medium text-gray-700">@AddNew</h3>
//             </div>
//             <div className="p-2">
//               <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                   <thead>
//                     <tr className="bg-gray-500">
//                       <th className="w-8 p-1 text-left text-xs font-medium text-white uppercase border"></th>
//                       <th className="w-8 p-1 text-left text-xs font-medium text-white uppercase border">
//                         #
//                       </th>
//                       <th className="w-32 p-1 text-left text-xs font-medium text-white uppercase border">
//                         Account<span className="text-red-500">*</span>
//                       </th>
//                       <th className="w-48 p-1 text-left text-xs font-medium text-white uppercase border">
//                         Service/Product
//                       </th>
//                       <th className="w-48 p-1 text-left text-xs font-medium text-white uppercase border">
//                         Description
//                       </th>
//                       <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">
//                         Amount<span className="text-red-500">*</span>
//                       </th>
//                       <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">
//                         Discount
//                       </th>
//                       <th className="w-48 p-1 text-left text-xs font-medium text-white uppercase border">
//                         Tax
//                       </th>
//                       <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">
//                         Tax Value
//                       </th>
//                       <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">
//                         Total
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {products.map((product, index) => (
//                       <tr
//                         key={product.id}
//                         className="border-b border-gray-200 hover:bg-gray-50"
//                       >
//                         <td className="p-1 border">
//                           <div className="flex space-x-1">
//                             <button
//                               type="button"
//                               onClick={() => removeProductRow(product.id)}
//                               className="text-red-600 hover:text-red-800 p-0.5 rounded-full border border-red-300 hover:bg-red-50 flex items-center justify-center w-5 h-5"
//                               title="Delete"
//                             >
//                               <svg
//                                 className="w-3 h-3"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                               >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   strokeWidth={2}
//                                   d="M6 18L18 6M6 6l12 12"
//                                 />
//                               </svg>
//                             </button>
//                             {index === products.length - 1 && (
//                               <button
//                                 type="button"
//                                 onClick={addProductRow}
//                                 className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full border border-blue-300 hover:bg-blue-50 flex items-center justify-center w-5 h-5"
//                                 title="Add New"
//                               >
//                                 <svg
//                                   className="w-3 h-3"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   viewBox="0 0 24 24"
//                                 >
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M12 4v16m8-8H4"
//                                   />
//                                 </svg>
//                               </button>
//                             )}
//                           </div>
//                         </td>
//                         <td className="p-1 border text-xs text-gray-600">
//                           {index + 1}
//                         </td>
//                         <td className="p-1 border">
//                           <CustomDropdown
//                             value={product.account}
//                             onChange={(value) =>
//                               handleProductChange(product.id, "account", value)
//                             }
//                             options={accountOptions}
//                             placeholder="Select Account"
//                             searchable={true}
//                           />
//                         </td>
//                         <td className="p-1 border">
//                           <div>
//                             <CustomDropdown
//                               value={product.serviceProduct}
//                               onChange={(value) =>
//                                 handleProductChange(
//                                   product.id,
//                                   "serviceProduct",
//                                   value
//                                 )
//                               }
//                               options={serviceProductOptions}
//                               placeholder="Select Service/Product"
//                               searchable={true}
//                             />
//                             {/* HSN/SAC Code Text - Below the dropdown */}
//                             <div
//                               onClick={() => openHsnSacModal(product.id)}
//                               className="w-full mt-1 px-2 py-1 text-[10px] text-left text-[#00A4E5] hover:text-[#0086C5] hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 transition-colors cursor-pointer"
//                             >
//                               HSN/SAC Code {product.hsnSacCode}
//                             </div>
//                           </div>
//                         </td>
//                         <td className="p-1 border">
//                           <input
//                             type="text"
//                             className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Description"
//                             value={product.description}
//                             onChange={(e) =>
//                               handleProductChange(
//                                 product.id,
//                                 "description",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </td>
//                         <td className="p-1 border">
//                           <input
//                             type="number"
//                             className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Amount"
//                             value={product.amount}
//                             onChange={(e) =>
//                               handleProductChange(
//                                 product.id,
//                                 "amount",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </td>
//                         <td className="p-1 border">
//                           <input
//                             type="number"
//                             className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                             placeholder="Discount"
//                             value={product.discount}
//                             onChange={(e) =>
//                               handleProductChange(
//                                 product.id,
//                                 "discount",
//                                 e.target.value
//                               )
//                             }
//                           />
//                         </td>
//                         <td className="p-1 border">
//                           <div>
//                             <CustomDropdown
//                               value={product.tax}
//                               onChange={(value) =>
//                                 handleProductChange(product.id, "tax", value)
//                               }
//                               options={taxOptions}
//                               placeholder="Select Tax"
//                               searchable={true}
//                             />
//                             {/* Eligible For ITC Text - Below the dropdown */}
//                             <a
//                               onClick={() => openItcModal(product.id)}
//                               className="m-nav__link m-nav__link--icon small cursor-pointer block w-full mt-1 px-2 py-1 text-[10px] text-left text-[#00A4E5] hover:text-[#0086C5]"
//                             >
//                               Eligible For ITC {product.eligibleForITC}
//                             </a>
//                           </div>
//                         </td>
//                         <td className="p-1 border text-xs text-gray-600">
//                           {product.taxValue}
//                         </td>
//                         <td className="p-1 border text-xs text-gray-600">
//                           {product.total}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end space-x-3 mt-6">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="px-6 py-2 border border-gray-300 rounded bg-white text-gray-700 text-sm font-medium hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 h-9"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={handleSaveAndCreateNew}
//               className="px-6 py-2 border border-blue-500 rounded bg-white text-blue-500 text-sm font-medium hover:bg-blue-50 transition-colors duration-200 h-9"
//             >
//               Save & Create New
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 border rounded bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors duration-200 h-9"
//             >
//               Save
//             </button>
//           </div>
//         </form>

//         {/* HSN/SAC Modal */}
//         {hsnSacModal.isOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4">
//               {/* Modal Header */}
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   HSN/SAC Code
//                 </h2>
//               </div>

//               {/* Modal Body - Single Input */}
//               <div className="p-6">
//                 <div className="mb-1">
//                   <input
//                     type="text"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
//                     placeholder="Enter HSN/SAC Code"
//                     value={hsnSacModal.currentValue}
//                     onChange={(e) =>
//                       setHsnSacModal((prev) => ({
//                         ...prev,
//                         currentValue: e.target.value,
//                       }))
//                     }
//                     onKeyPress={(e) => {
//                       if (e.key === "Enter") {
//                         handleHsnSacSelect(hsnSacModal.currentValue);
//                       }
//                     }}
//                     autoFocus
//                   />
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={closeHsnSacModal}
//                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleHsnSacSelect(hsnSacModal.currentValue)}
//                     disabled={!hsnSacModal.currentValue.trim()}
//                     className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                   >
//                     Set
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ITC Modal */}
//         {itcModal.isOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4">
//               {/* Modal Header */}
//               <div className="px-6 py-4 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   Input Tax Credit
//                 </h2>
//               </div>

//               {/* Modal Body - Radio Options */}
//               <div className="p-6">
//                 <div className="space-y-3">
//                   {itcOptions.map((option) => (
//                     <div key={option.value} className="flex items-center">
//                       <input
//                         type="radio"
//                         id={`itc-${option.value}`}
//                         name="itcSelection"
//                         value={option.value}
//                         checked={itcModal.currentValue === option.value}
//                         onChange={(e) =>
//                           setItcModal((prev) => ({
//                             ...prev,
//                             currentValue: e.target.value,
//                           }))
//                         }
//                         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
//                       />
//                       <label
//                         htmlFor={`itc-${option.value}`}
//                         className="ml-3 block text-sm font-medium text-gray-700"
//                       >
//                         {option.label}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Modal Footer */}
//               <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
//                 <div className="flex justify-end space-x-3">
//                   <button
//                     type="button"
//                     onClick={closeItcModal}
//                     className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleItcSelect(itcModal.currentValue)}
//                     disabled={!itcModal.currentValue}
//                     className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
//                   >
//                     Set
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreateNewExpense;
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CustomDropdown from "@/components/Dropdown/CustomDropdown";
import {
  expenseApi,
  dropdownApi,
  generateNextExpenseNumber,
} from "./expenseService";
import {
  validateField,
  validateProductField,
  validateForm,
} from "@/utils/expenseValidations";
import {
  calculateProductTotals,
  calculateAllTotals,
  setTaxSummary,
  applyReverseCharge,
  applyTaxTypeChange,
} from "@/utils/expenseCalculations";
import {
  generateNewProduct,
  getInitialFormData,
  getInitialProducts,
  switchDiscountType,
  showToast,
  prepareExpenseData,
} from "@/utils/expenseHelpers";
import IconHome from "@/components/HomeIcon/IconHome";

const CreateNewExpense = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [formData, setFormData] = useState(getInitialFormData());
  const [products, setProducts] = useState(getInitialProducts());

  // Initialize dropdownOptions with empty arrays to prevent undefined errors
  const [dropdownOptions, setDropdownOptions] = useState({
    party: [],
    account: [],
    tax: [],
    serviceProduct: [],
    reverseCharge: [],
    appliedTaxType: [],
    itcOptions: [],
  });

  // Modal states
  const [hsnSacModal, setHsnSacModal] = useState({
    isOpen: false,
    productId: null,
    currentValue: "",
  });

  const [itcModal, setItcModal] = useState({
    isOpen: false,
    productId: null,
    currentValue: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Summary states
  const [summaryTotals, setSummaryTotals] = useState({
    subtotal: "0.00",
    totalTax: "0.00",
    totalAmount: "0.00",
    roundoff: "0.00",
    netAmount: "0.00",
  });

  const [taxSummary, setTaxSummary] = useState({});

  // Load dropdown options
  const loadDropdownOptions = useCallback(async () => {
    try {
      const [
        partyOptions,
        accountOptions,
        taxOptions,
        serviceProductOptions,
        reverseChargeOptions,
        appliedTaxTypeOptions,
        itcOptions,
      ] = await Promise.all([
        dropdownApi.getParties(),
        dropdownApi.getAccounts(),
        dropdownApi.getTaxRates(),
        dropdownApi.getProductsServices(),
        dropdownApi.getReverseChargeOptions(),
        dropdownApi.getTaxTypeOptions(),
        dropdownApi.getItcOptions(),
      ]);

      // Ensure all options are arrays, fallback to empty array if undefined
      setDropdownOptions({
        party: partyOptions || [],
        account: accountOptions || [],
        tax: taxOptions || [],
        serviceProduct: serviceProductOptions || [],
        reverseCharge: reverseChargeOptions || [],
        appliedTaxType: appliedTaxTypeOptions || [],
        itcOptions: itcOptions || [],
      });
    } catch (error) {
      console.error("Error loading dropdown options:", error);
      showToast("Error loading dropdown options", "error");

      // Set empty arrays on error to prevent undefined issues
      setDropdownOptions({
        party: [],
        account: [],
        tax: [],
        serviceProduct: [],
        reverseCharge: [],
        appliedTaxType: [],
        itcOptions: [],
      });
    }
  }, []);

  const loadNextExpenseNumber = useCallback(async () => {
    try {
      const nextNumber = await generateNextExpenseNumber();
      setFormData((prev) => ({
        ...prev,
        expenseNoNumber: nextNumber,
      }));
    } catch (error) {
      console.error("Error loading next expense number:", error);
    }
  }, []);

  const loadExpenseData = useCallback(async (id) => {
    setLoading(true);
    try {
      const expenseData = await expenseApi.getExpenseById(id);
      if (expenseData) {
        setFormData(getInitialFormData(true, expenseData));
        setProducts(getInitialProducts(expenseData.products));

        // Calculate and set summaries
        updateSummaries();
        showToast("Expense data loaded successfully", "success");
      } else {
        showToast("Expense data not found", "error");
        navigate("/expense");
      }
    } catch (error) {
      console.error("Error loading expense data:", error);
      showToast("Error loading expense data", "error");
      navigate("/expense");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      setPageLoading(true);
      try {
        await loadDropdownOptions();

        // Check if we're in edit mode
        if (location.state?.isEdit && location.state?.expenseId) {
          setIsEdit(true);
          setExpenseId(location.state.expenseId);
          await loadExpenseData(location.state.expenseId);
        } else {
          // Create mode - load next expense number
          await loadNextExpenseNumber();
        }
      } catch (error) {
        console.error("Error initializing component:", error);
        showToast("Error initializing form", "error");
      } finally {
        setPageLoading(false);
      }
    };

    initializeComponent();
  }, [location.state?.isEdit, location.state?.expenseId, loadDropdownOptions, loadExpenseData, loadNextExpenseNumber]);

  // Product management
  const addProductRow = () => {
    setProducts((prev) => [...prev, generateNewProduct(prev)]);
  };

  const removeProductRow = (id) => {
    if (products.length > 1) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
      updateSummaries();
    } else {
      showToast("At least one product is required", "warning");
    }
  };

  const handleProductChange = (id, field, value) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          const updatedProduct = { ...product, [field]: value };

          // Recalculate totals if relevant fields change
          if (["amount", "discount", "tax", "discountType"].includes(field)) {
            const recalculatedProduct = calculateProductTotals(
              updatedProduct,
              formData.reverseCharge,
              updatedProduct.discountType
            );
            return recalculatedProduct;
          }

          return updatedProduct;
        }
        return product;
      })
    );

    // Update summaries after product change
    setTimeout(updateSummaries, 0);

    // Validate product field
    if (touched[`product_${id}_${field}`] || value.length > 0) {
      const error = validateProductField(
        field,
        value,
        products.find((p) => p.id === id),
        formData
      );
      setErrors((prev) => ({
        ...prev,
        [`product_${id}_${field}`]: error,
      }));
    }
  };

  const handleDiscountTypeChange = (productId, currentType) => {
    switchDiscountType(productId, currentType, setProducts);
    updateSummaries();
  };

  // Form field handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Validate field
    if (touched[name] || value.length > 0) {
      const error = validateField(name, value, formData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleDropdownChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field
    if (touched[name] || value.length > 0) {
      const error = validateField(name, value, formData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }

    // Handle special cases
    if (name === "appliedTaxType") {
      const updatedProducts = applyTaxTypeChange(products, value);
      setProducts(updatedProducts);
      updateSummaries();
    }

    if (name === "reverseCharge") {
      const updatedProducts = applyReverseCharge(products, value);
      setProducts(updatedProducts);
      updateSummaries();

      if (value === "Yes") {
        showToast(
          "Tax will not calculate in the Total amount if you select Reverse Charge as Yes",
          "warning"
        );
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleProductBlur = (productId, field, value) => {
    setTouched((prev) => ({
      ...prev,
      [`product_${productId}_${field}`]: true,
    }));
    const error = validateProductField(
      field,
      value,
      products.find((p) => p.id === productId),
      formData
    );
    setErrors((prev) => ({
      ...prev,
      [`product_${productId}_${field}`]: error,
    }));
  };

  // Update summaries
  const updateSummaries = () => {
    const totals = calculateAllTotals(products);
    setSummaryTotals(totals);

    const taxSum = setTaxSummary(products, formData.appliedTaxType);
    setTaxSummary(taxSum);
  };

  // Modal handlers
  const openHsnSacModal = (productId) => {
    const product = products.find((p) => p.id === productId);
    setHsnSacModal({
      isOpen: true,
      productId,
      currentValue: product?.hsnSacCode || "",
    });
  };

  const closeHsnSacModal = () => {
    setHsnSacModal({
      isOpen: false,
      productId: null,
      currentValue: "",
    });
  };

  const handleHsnSacSelect = (value) => {
    if (hsnSacModal.productId) {
      handleProductChange(hsnSacModal.productId, "hsnSacCode", value);
    }
    closeHsnSacModal();
  };

  const openItcModal = (productId) => {
    const product = products.find((p) => p.id === productId);
    setItcModal({
      isOpen: true,
      productId,
      currentValue: product?.eligibleForITC || "Eligible",
    });
  };

  const closeItcModal = () => {
    setItcModal({
      isOpen: false,
      productId: null,
      currentValue: "",
    });
  };

  const handleItcSelect = (value) => {
    if (itcModal.productId) {
      handleProductChange(itcModal.productId, "eligibleForITC", value);
    }
    closeItcModal();
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = markAllFieldsTouched();
    setTouched(allTouched);

    const newErrors = validateForm(formData, products);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await saveExpense();
    } else {
      showToast("Please fix the validation errors before submitting", "error");
    }
  };

  const handleSaveAndCreateNew = async () => {
    const allTouched = markAllFieldsTouched();
    setTouched(allTouched);

    const newErrors = validateForm(formData, products);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await saveExpense(true);
    } else {
      showToast("Please fix the validation errors before submitting", "error");
    }
  };

  // Handle Save & Payment
  const handleSaveAndPayment = async () => {
    const allTouched = markAllFieldsTouched();
    setTouched(allTouched);

    const newErrors = validateForm(formData, products);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      await saveExpenseWithPayment();
    } else {
      showToast("Please fix the validation errors before submitting", "error");
    }
  };

  const saveExpenseWithPayment = async () => {
    setLoading(true);
    try {
      const expensePayload = prepareExpenseData(
        formData,
        products,
        summaryTotals
      );

      let result;
      if (isEdit) {
        result = await expenseApi.updateExpense(expenseId, expensePayload);
        showToast("Expense updated successfully!", "success");
      } else {
        result = await expenseApi.createExpense(expensePayload);
        showToast("Expense added successfully!", "success");
      }

      // Navigate to payment page after saving
      navigate("/payment", { state: { expenseId: result.id } });
    } catch (error) {
      console.error("Error saving expense:", error);
      showToast("Error saving expense", "error");
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Added null checks for Object.keys operations
  const markAllFieldsTouched = () => {
    const allTouched = {};

    // Mark form fields - with null check
    if (formData && typeof formData === "object") {
      Object.keys(formData).forEach((key) => {
        allTouched[key] = true;
      });
    }

    // Mark product fields - with null check
    if (products && Array.isArray(products)) {
      products.forEach((product) => {
        ["account", "amount", "discount", "tax", "serviceProduct"].forEach(
          (field) => {
            allTouched[`product_${product.id}_${field}`] = true;
          }
        );
      });
    }

    return allTouched;
  };

  const saveExpense = async (isSaveAndCreate = false) => {
    setLoading(true);
    try {
      const expensePayload = prepareExpenseData(
        formData,
        products,
        summaryTotals
      );

      let result;
      if (isEdit) {
        result = await expenseApi.updateExpense(expenseId, expensePayload);
        showToast("Expense updated successfully!", "success");
      } else {
        result = await expenseApi.createExpense(expensePayload);
        showToast("Expense added successfully!", "success");
      }

      if (isSaveAndCreate) {
        // Reset form for new entry
        setFormData(getInitialFormData());
        setProducts(getInitialProducts());
        setTouched({});
        setErrors({});
        await loadNextExpenseNumber();
        setSummaryTotals({
          subtotal: "0.00",
          totalTax: "0.00",
          totalAmount: "0.00",
          roundoff: "0.00",
          netAmount: "0.00",
        });
        setTaxSummary({});
      } else {
        navigate("/expense");
      }
    } catch (error) {
      console.error("Error saving expense:", error);
      showToast("Error saving expense", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // Numeric input handler
  const handleNumericInput = (e, productId, field) => {
    const value = e.target.value;
    // Allow empty value, numbers, and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      handleProductChange(productId, field, value);
    }
  };

  // Format numeric value on blur
  const formatNumericValue = (value, field, productId) => {
    if (value === "" || value === "." || value === "0.") {
      const formattedValue = "0.00";
      handleProductChange(productId, field, formattedValue);
      return formattedValue;
    }

    if (value.endsWith(".")) {
      const formattedValue = value + "00";
      handleProductChange(productId, field, formattedValue);
      return formattedValue;
    }

    if (value.includes(".") && value.split(".")[1]?.length === 1) {
      const formattedValue = value + "0";
      handleProductChange(productId, field, formattedValue);
      return formattedValue;
    }

    if (!value.includes(".")) {
      const formattedValue = value + ".00";
      handleProductChange(productId, field, formattedValue);
      return formattedValue;
    }

    return value;
  };

  // Loading state
  if (pageLoading) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-600">Loading expense form...</p>
        </div>
      </div>
    );
  }

  // Safe dropdown options with fallbacks
  const safeReverseChargeOptions = dropdownOptions.reverseCharge || [];
  const safeAppliedTaxTypeOptions = dropdownOptions.appliedTaxType || [];
  const safePartyOptions = dropdownOptions.party || [];
  const safeAccountOptions = dropdownOptions.account || [];
  const safeTaxOptions = dropdownOptions.tax || [];
  const safeServiceProductOptions = dropdownOptions.serviceProduct || [];
  const safeItcOptions = dropdownOptions.itcOptions || [];

  return (
    <div className="min-h-screen bg-gray-300 p-4">
      {/* Header Section */}
      <div className="flex items-center gap-5 mb-4">
        <h1 className="text-xl text-gray-500">
          {isEdit ? "Edit Expense" : "New Expense"}
        </h1>
        <div className="h-6 w-px bg-gray-400"></div>
        <div className="flex items-center gap-4">
          <IconHome className="text-gray-500 w-8 h-8" />
        </div>
      </div>

      {/* Main White Container - Fixed size without scroll */}
      <div className="bg-white border rounded-lg shadow-sm w-full max-w-[95vw] mx-auto overflow-hidden" style={{ height: 'calc(100vh - 140px)' }}>
        <div className="p-4 h-full flex flex-col">
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            {/* Compact Form Section */}
            <div className="flex-1 overflow-hidden">
              {/* First Row - Expense Date, Expense No., Select Party, Invoice No. */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-black">
                    Expense Date<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="expenseDate"
                    value={formData.expenseDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-1.5 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-8"
                  />
                  {errors.expenseDate && (
                    <p className="text-red-500 text-xs">{errors.expenseDate}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-black">
                    Expense No.
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <CustomDropdown
                        value={formData.expenseNoPrefix}
                        onChange={(value) =>
                          handleDropdownChange("expenseNoPrefix", value)
                        }
                        options={
                          safeAppliedTaxTypeOptions.filter(
                            (opt) =>
                              opt &&
                              ["EXP", "INV", "BIL", "PYT"].includes(opt.value)
                          ) || [
                            { value: "EXP", label: "EXP" },
                            { value: "INV", label: "INV" },
                            { value: "BIL", label: "BIL" },
                            { value: "PYT", label: "PYT" },
                          ]
                        }
                        placeholder="Prefix"
                        searchable={false}
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="expenseNoNumber"
                        value={formData.expenseNoNumber}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full border p-1.5 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-8"
                        placeholder="Number"
                        disabled={isEdit}
                      />
                      {errors.expenseNoNumber && (
                        <p className="text-red-500 text-xs">
                          {errors.expenseNoNumber}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-black">
                    Select Party<span className="text-red-500">*</span>
                  </label>
                  <CustomDropdown
                    value={formData.selectParty}
                    onChange={(value) =>
                      handleDropdownChange("selectParty", value)
                    }
                    options={safePartyOptions}
                    placeholder="Select Party"
                    searchable={true}
                  />
                  {errors.selectParty && (
                    <p className="text-red-500 text-xs">{errors.selectParty}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-black">
                    Invoice No.
                  </label>
                  <input
                    type="text"
                    name="invoiceNo"
                    value={formData.invoiceNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-1.5 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-8"
                    placeholder="Invoice No"
                  />
                  {errors.invoiceNo && (
                    <p className="text-red-500 text-xs">{errors.invoiceNo}</p>
                  )}
                </div>
              </div>

              {/* Second Row - Reverse Charge, Applied Tax Type, Non-GST checkbox, Note */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-black">
                    Reverse Charge
                  </label>
                  <CustomDropdown
                    value={formData.reverseCharge}
                    onChange={(value) =>
                      handleDropdownChange("reverseCharge", value)
                    }
                    options={safeReverseChargeOptions}
                    placeholder="Select Reverse Charge"
                    searchable={false}
                  />
                  {errors.reverseCharge && (
                    <p className="text-red-500 text-xs">{errors.reverseCharge}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-black">
                    Applied Tax Type
                  </label>
                  <CustomDropdown
                    value={formData.appliedTaxType}
                    onChange={(value) =>
                      handleDropdownChange("appliedTaxType", value)
                    }
                    options={safeAppliedTaxTypeOptions}
                    placeholder="Select Tax Type"
                    searchable={false}
                  />
                  {errors.appliedTaxType && (
                    <p className="text-red-500 text-xs">
                      {errors.appliedTaxType}
                    </p>
                  )}
                </div>

                <div className="flex items-end space-y-1">
                  <div className="flex items-center h-8">
                    <input
                      type="checkbox"
                      name="isNonGst"
                      checked={formData.isNonGst}
                      onChange={handleChange}
                      className="mr-2 hover:border-blue-600 h-3 w-3"
                    />
                    <label className="text-sm font-semibold text-black">
                      Non-GST
                    </label>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-black">
                    Note
                  </label>
                  <input
                    type="text"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-1.5 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-8"
                    placeholder="Enter a Note"
                  />
                  {errors.note && (
                    <p className="text-red-500 text-xs">{errors.note}</p>
                  )}
                </div>
              </div>

              {/* Product/Service Section - Compact */}
              <div className="mb-3 rounded-lg bg-white border border-gray-200 flex-1 min-h-0">
                <div className="p-3 h-full flex flex-col">
                  <div className="overflow-auto flex-1">
                    <table className="w-full border-collapse min-w-[800px] text-xs">
                      <thead>
                        <tr className="bg-gray-500">
                          <th className="w-6 p-1 text-left text-xs font-medium text-white uppercase border"></th>
                          <th className="w-6 p-1 text-left text-xs font-medium text-white uppercase border">
                            #
                          </th>
                          <th className="w-28 p-1 text-left text-xs font-medium text-white uppercase border">
                            Account<span className="text-red-500">*</span>
                          </th>
                          <th className="w-40 p-1 text-left text-xs font-medium text-white uppercase border">
                            Service/Product
                          </th>
                          <th className="w-40 p-1 text-left text-xs font-medium text-white uppercase border">
                            Description
                          </th>
                          <th className="w-20 p-1 text-left text-xs font-medium text-white uppercase border">
                            Amount<span className="text-red-500">*</span>
                          </th>
                          <th className="w-20 p-1 text-left text-xs font-medium text-white uppercase border">
                            Discount
                          </th>
                          <th className="w-40 p-1 text-left text-xs font-medium text-white uppercase border">
                            Tax
                          </th>
                          <th className="w-20 p-1 text-left text-xs font-medium text-white uppercase border">
                            Tax Value
                          </th>
                          <th className="w-20 p-1 text-left text-xs font-medium text-white uppercase border">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product, index) => (
                          <tr
                            key={product.id}
                            className="border-b border-gray-200 hover:bg-gray-50"
                          >
                            <td className="p-1 border">
                              <div className="flex space-x-1">
                                <button
                                  type="button"
                                  onClick={() => removeProductRow(product.id)}
                                  className="text-red-600 hover:text-red-800 p-0.5 rounded-full border border-red-300 hover:bg-red-50 flex items-center justify-center w-5 h-5"
                                  title="Delete"
                                >
                                  <svg
                                    className="w-2.5 h-2.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </button>
                                {index === products.length - 1 && (
                                  <button
                                    type="button"
                                    onClick={addProductRow}
                                    className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full border border-blue-300 hover:bg-blue-50 flex items-center justify-center w-5 h-5"
                                    title="Add New"
                                  >
                                    <svg
                                      className="w-2.5 h-2.5"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                      />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="p-1 border text-xs text-gray-600">
                              {index + 1}
                            </td>
                            <td className="p-1 border">
                              <CustomDropdown
                                value={product.account}
                                onChange={(value) =>
                                  handleProductChange(
                                    product.id,
                                    "account",
                                    value
                                  )
                                }
                                options={safeAccountOptions}
                                placeholder="Select Account"
                                searchable={true}
                              />
                              {errors[`product_${index}_account`] && (
                                <p className="text-red-500 text-xs mt-0.5">
                                  {errors[`product_${index}_account`]}
                                </p>
                              )}
                            </td>
                            <td className="p-1 border">
                              <div>
                                <CustomDropdown
                                  value={product.serviceProduct}
                                  onChange={(value) =>
                                    handleProductChange(
                                      product.id,
                                      "serviceProduct",
                                      value
                                    )
                                  }
                                  options={safeServiceProductOptions}
                                  placeholder="Select Service/Product"
                                  searchable={true}
                                />
                                {errors[`product_${index}_serviceProduct`] && (
                                  <p className="text-red-500 text-xs mt-0.5">
                                    {errors[`product_${index}_serviceProduct`]}
                                  </p>
                                )}
                                {/* HSN/SAC Code Text - Below the dropdown */}
                                <div
                                  onClick={() => openHsnSacModal(product.id)}
                                  className="w-full mt-0.5 px-1 py-0.5 text-[9px] text-left text-[#00A4E5] hover:text-[#0086C5] hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 transition-colors cursor-pointer"
                                >
                                  HSN/SAC Code {product.hsnSacCode}
                                </div>
                              </div>
                            </td>
                            <td className="p-1 border">
                              <input
                                type="text"
                                className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Description"
                                value={product.description}
                                onChange={(e) =>
                                  handleProductChange(
                                    product.id,
                                    "description",
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td className="p-1 border">
                              <input
                                type="text"
                                className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Amount"
                                value={product.amount}
                                onChange={(e) =>
                                  handleNumericInput(e, product.id, "amount")
                                }
                                onBlur={(e) => {
                                  const formattedValue = formatNumericValue(
                                    e.target.value,
                                    "amount",
                                    product.id
                                  );
                                  handleProductBlur(
                                    product.id,
                                    "amount",
                                    formattedValue
                                  );
                                }}
                              />
                              {errors[`product_${index}_amount`] && (
                                <p className="text-red-500 text-xs mt-0.5">
                                  {errors[`product_${index}_amount`]}
                                </p>
                              )}
                            </td>
                            <td className="p-1 border">
                              <div className="flex">
                                <div className="flex flex-col mr-0.5">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDiscountTypeChange(
                                        product.id,
                                        product.discountType
                                      )
                                    }
                                    className={`p-0.5 text-[10px] border rounded ${
                                      product.discountType === "percentage"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700"
                                    }`}
                                    title={
                                      product.discountType === "percentage"
                                        ? "Switch to Amount"
                                        : "Switch to Percentage"
                                    }
                                  >
                                    {product.discountType === "percentage"
                                      ? "%"
                                      : "₹"}
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  className="flex-1 px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder={
                                    product.discountType === "percentage"
                                      ? "Percentage"
                                      : "Amount"
                                  }
                                  value={product.discount}
                                  onChange={(e) =>
                                    handleNumericInput(e, product.id, "discount")
                                  }
                                  onBlur={(e) => {
                                    const formattedValue = formatNumericValue(
                                      e.target.value,
                                      "discount",
                                      product.id
                                    );
                                    handleProductBlur(
                                      product.id,
                                      "discount",
                                      formattedValue
                                    );
                                  }}
                                />
                              </div>
                              {errors[`product_${index}_discount`] && (
                                <p className="text-red-500 text-xs mt-0.5">
                                  {errors[`product_${index}_discount`]}
                                </p>
                              )}
                            </td>
                            <td className="p-1 border">
                              <div>
                                <CustomDropdown
                                  value={product.tax}
                                  onChange={(value) =>
                                    handleProductChange(product.id, "tax", value)
                                  }
                                  options={safeTaxOptions}
                                  placeholder="Select Tax"
                                  searchable={true}
                                  disabled={formData.appliedTaxType === "No Tax"}
                                />
                                {errors[`product_${index}_tax`] && (
                                  <p className="text-red-500 text-xs mt-0.5">
                                    {errors[`product_${index}_tax`]}
                                  </p>
                                )}
                                {/* Eligible For ITC Text - Below the dropdown */}
                                <a
                                  onClick={() => openItcModal(product.id)}
                                  className="m-nav__link m-nav__link--icon small cursor-pointer block w-full mt-0.5 px-1 py-0.5 text-[9px] text-left text-[#00A4E5] hover:text-[#0086C5]"
                                >
                                  Eligible For ITC {product.eligibleForITC}
                                </a>
                              </div>
                            </td>
                            <td className="p-1 border text-xs text-gray-600">
                              ₹{product.taxValue}
                            </td>
                            <td className="p-1 border text-xs text-gray-600">
                              ₹{product.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td
                            colSpan="8"
                            className="p-1 border text-right font-semibold text-xs"
                          >
                            Total:
                          </td>
                          <td className="p-1 border text-xs text-gray-600 font-semibold">
                            ₹{summaryTotals.totalTax}
                          </td>
                          <td className="p-1 border text-xs text-gray-600 font-semibold">
                            ₹{summaryTotals.netAmount}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  {errors.products && (
                    <p className="text-red-500 text-xs mt-1">{errors.products}</p>
                  )}
                  {errors.netAmount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.netAmount}
                    </p>
                  )}
                </div>
              </div>

              {/* Summary Section - Compact */}
              <div className="flex justify-end">
                <div className="w-full md:w-1/2">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <h3 className="text-md font-semibold mb-2">Amount Summary</h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Subtotal:</span>
                        <span>₹{summaryTotals.subtotal}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Total Tax:</span>
                        <span>₹{summaryTotals.totalTax}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Roundoff:</span>
                        <span>₹{summaryTotals.roundoff}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold border-t pt-1">
                        <span>Net Amount:</span>
                        <span>₹{summaryTotals.netAmount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed Button Section - Always visible at bottom */}
            <div className="border-t border-gray-200 bg-white pt-3 mt-3">
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-1.5 border border-gray-300 rounded bg-white text-gray-700 text-xs font-medium hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 h-8 order-4 sm:order-1"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndCreateNew}
                  className="px-4 py-1.5 border border-blue-500 rounded bg-white text-blue-500 text-xs font-medium hover:bg-blue-50 transition-colors duration-200 h-8 order-3 sm:order-2"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save & Create New"}
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndPayment}
                  className="px-4 py-1.5 border border-green-500 rounded bg-white text-green-500 text-xs font-medium hover:bg-green-50 transition-colors duration-200 h-8 order-2 sm:order-3"
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save & Payment"}
                </button>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-1.5 border rounded bg-blue-500 text-white text-xs font-medium hover:bg-blue-600 transition-colors duration-200 h-8 order-1 sm:order-4"
                  disabled={loading}
                >
                  {loading
                    ? "Saving..."
                    : isEdit
                    ? "Update Expense"
                    : "Save Expense"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* HSN/SAC Modal */}
      {hsnSacModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                HSN/SAC Code
              </h2>
            </div>
            <div className="p-6">
              <div className="mb-1">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter HSN/SAC Code"
                  value={hsnSacModal.currentValue}
                  onChange={(e) =>
                    setHsnSacModal((prev) => ({
                      ...prev,
                      currentValue: e.target.value,
                    }))
                  }
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleHsnSacSelect(hsnSacModal.currentValue);
                    }
                  }}
                  autoFocus
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={closeHsnSacModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleHsnSacSelect(hsnSacModal.currentValue)}
                  disabled={!hsnSacModal.currentValue.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ITC Modal */}
      {itcModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Input Tax Credit
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {safeItcOptions.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`itc-${option.value}`}
                      name="itcSelection"
                      value={option.value}
                      checked={itcModal.currentValue === option.value}
                      onChange={(e) =>
                        setItcModal((prev) => ({
                          ...prev,
                          currentValue: e.target.value,
                        }))
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label
                      htmlFor={`itc-${option.value}`}
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                <button
                  type="button"
                  onClick={closeItcModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleItcSelect(itcModal.currentValue)}
                  disabled={!itcModal.currentValue}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Set
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateNewExpense;