// import { Button } from '@/components/ui/button';
// import React, { useState, useRef, useEffect } from 'react';
// import IconHome from "@/components/HomeIcon/IconHome";
// import ProductSearch from "@/components/ProductSearch";

// function CreateNewRecipe() {
//   const [rawProducts, setRawProducts] = useState([{ id: 1, Itemcode: '', product: '', MRP: '', useCry: '' }]);
//   const [finalProducts, setFinalProducts] = useState([{ id: 1, Itemcode: '', product: '', MRP: '', cryGenerate: '' }]);
//   const [recipeType, setRecipeType] = useState('ASSENSE_E');

//   // Product database with separate name and item code
//   const productDatabase = [
//     { itemCode: 'AP5346', name: 'Budsx', mrp: 150 },
//     { itemCode: 'AP5342', name: 'temp', mrp: 1560 },
//     { itemCode: 'AP5341', name: 'test product', mrp: 0 },
//     { itemCode: '8901872576', name: 'AROGYA SONTI COFFEE POWDER 15G', mrp: 139 },
//     { itemCode: '4', name: 'Suvari 200gm', mrp: 200 },
//     { itemCode: '16', name: 'SONF 50G', mrp: 50 },
//     { itemCode: '17', name: '2E SONF 100G', mrp: 100 },
//     { itemCode: '18', name: '2E SONF 250G', mrp: 250 },
//     { itemCode: '32', name: '2E Sunf M/magic Btr 250g', mrp: 280 },
//     { itemCode: '34', name: '2E SCHNA GHEE ILTR', mrp: 500 },
//     { itemCode: '38', name: '2E NIP SURF 700G', mrp: 400 },
//     { itemCode: '42', name: 'K/MIRCH SABAT 100G', mrp: 80 },
//     { itemCode: '46', name: '2E COLGATE SET 300G', mrp: 350 },
//     { itemCode: '48', name: '2E SUNF MOMS BUTTER RSI0', mrp: 450 },
//     { itemCode: '54', name: '2E CLINIC + ST& LO SHMP 650M', mrp: 550 },
//     { itemCode: '61', name: '2E SUNF NICE/TIME ISO6', mrp: 380 }
//   ];

//   // Function to find product by item code
//   const findProductByItemCode = (itemCode) => {
//     return productDatabase.find(product => product.itemCode === itemCode) || null;
//   };

//   // Function to find products by name (for suggestions)
//   const findProductsByName = (searchTerm) => {
//     if (searchTerm.length < 1) return [];
//     return productDatabase.filter(product =>
//       product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       product.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   };

//   // Enhanced Product Search Component for table rows - FIXED
//   const TableProductSearch = ({ value, onChange, placeholder, className = "", context }) => {
//     const [isSearchOpen, setIsSearchOpen] = useState(false);
//     const triggerRef = useRef(null);

//     // Get search popup position
//     const getSearchPopupStyle = () => {
//       if (!triggerRef.current) return {};
      
//       const rect = triggerRef.current.getBoundingClientRect();
//       return {
//         position: 'fixed',
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX,
//         width: Math.max(rect.width, 400),
//         zIndex: 9999,
//         maxHeight: '400px',
//         overflow: 'hidden'
//       };
//     };

//     // Handle product selection from ProductSearch - FIXED
//     const handleProductSelect = (product) => {
//       // Update all fields when product is selected from search
//       if (context.type === 'raw') {
//         setRawProducts(rawProducts.map(item => 
//           item.id === context.productId 
//             ? { 
//                 ...item, 
//                 product: product.name,
//                 Itemcode: product.itemCode, // FIXED: Set item code
//                 MRP: product.mrp.toString() // FIXED: Set MRP
//               } 
//             : item
//         ));
//       } else if (context.type === 'final') {
//         setFinalProducts(finalProducts.map(item => 
//           item.id === context.productId 
//             ? { 
//                 ...item, 
//                 product: product.name,
//                 Itemcode: product.itemCode, // FIXED: Set item code
//                 MRP: product.mrp.toString() // FIXED: Set MRP
//               } 
//             : item
//         ));
//       }
      
//       // Update the product name display
//       onChange(product.name);
//       setIsSearchOpen(false);
//     };

//     return (
//       <div className={`relative ${className}`}>
//         {/* Search Trigger */}
//         <div
//           ref={triggerRef}
//           className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white cursor-pointer flex items-center justify-between hover:border-gray-400"
//           onClick={() => setIsSearchOpen(!isSearchOpen)}
//         >
//           <span className={value ? "text-gray-800" : "text-gray-500"}>
//             {value || placeholder}
//           </span>
//           <svg 
//             className={`w-3 h-3 text-gray-400 transition-transform ${isSearchOpen ? 'rotate-180' : ''}`} 
//             fill="none" 
//             stroke="currentColor" 
//             viewBox="0 0 24 24"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>

//         {/* Product Search Popup */}
//         {isSearchOpen && (
//           <div 
//             style={getSearchPopupStyle()}
//             className="bg-white border border-gray-300 rounded shadow-lg"
//           >
//             <div className="p-3 border-b border-gray-200">
//               <div className="flex justify-between items-center mb-2">
//                 <h4 className="text-sm font-medium text-gray-700">Search Product</h4>
//                 <button
//                   onClick={() => setIsSearchOpen(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>
//               <ProductSearch
//                 onProductSelect={handleProductSelect}
//                 disabled={false}
//                 showBarcodeScanner={false}
//                 placeholder="Search by product name, code, or brand..."
//               />
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Handle direct item code input with auto-fill - FIXED
//   const handleItemCodeChange = (id, value, type) => {
//     // Update the item code immediately
//     if (type === 'raw') {
//       setRawProducts(rawProducts.map(item => 
//         item.id === id ? { ...item, Itemcode: value } : item
//       ));
//     } else if (type === 'final') {
//       setFinalProducts(finalProducts.map(item => 
//         item.id === id ? { ...item, Itemcode: value } : item
//       ));
//     }

//     // Auto-fill product name when valid item code is entered - FIXED
//     if (value.trim() !== '') {
//       const foundProduct = findProductByItemCode(value);
//       if (foundProduct) {
//         if (type === 'raw') {
//           setRawProducts(rawProducts.map(item => 
//             item.id === id 
//               ? { 
//                   ...item, 
//                   product: foundProduct.name, // Only product name
//                   Itemcode: foundProduct.itemCode, // FIXED: Ensure item code is set
//                   MRP: foundProduct.mrp.toString() // FIXED: Set MRP
//                 } 
//               : item
//           ));
//         } else if (type === 'final') {
//           setFinalProducts(finalProducts.map(item => 
//             item.id === id 
//               ? { 
//                   ...item, 
//                   product: foundProduct.name, // Only product name
//                   Itemcode: foundProduct.itemCode, // FIXED: Ensure item code is set
//                   MRP: foundProduct.mrp.toString() // FIXED: Set MRP
//                 } 
//               : item
//           ));
//         }
//       }
//     }
//   };

//   // Custom Item Code Input with VISIBLE suggestions - FIXED
//   const ItemCodeInput = ({ value, onChange, placeholder, className = "", context }) => {
//     const [suggestions, setSuggestions] = useState([]);
//     const [showSuggestions, setShowSuggestions] = useState(false);
//     const inputRef = useRef(null);
//     const dropdownRef = useRef(null);

//     const handleInputChange = (e) => {
//       const newValue = e.target.value;
//       onChange(newValue);

//       // Find suggestions and show them - FIXED: Always show when typing
//       if (newValue.length >= 1) {
//         const newSuggestions = findProductsByName(newValue);
//         setSuggestions(newSuggestions);
//         setShowSuggestions(true); // FIXED: Always show dropdown when there are suggestions
//       } else {
//         setShowSuggestions(false);
//         setSuggestions([]);
//       }
//     };

//     const handleSuggestionClick = (product) => {
//       // Update all fields when product is selected - FIXED
//       if (context.type === 'raw') {
//         setRawProducts(rawProducts.map(item => 
//           item.id === context.productId 
//             ? { 
//                 ...item, 
//                 Itemcode: product.itemCode, // Set item code
//                 product: product.name, // Set product name
//                 MRP: product.mrp.toString() // Set MRP
//               } 
//             : item
//         ));
//       } else if (context.type === 'final') {
//         setFinalProducts(finalProducts.map(item => 
//           item.id === context.productId 
//             ? { 
//                 ...item, 
//                 Itemcode: product.itemCode, // Set item code
//                 product: product.name, // Set product name
//                 MRP: product.mrp.toString() // Set MRP
//               } 
//             : item
//         ));
//       }
//       setShowSuggestions(false);
//     };

//     // Get dropdown position
//     const getDropdownStyle = () => {
//       if (!inputRef.current) return {};
      
//       const rect = inputRef.current.getBoundingClientRect();
//       return {
//         position: 'fixed',
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX,
//         width: rect.width,
//         zIndex: 9999,
//         maxHeight: '200px',
//         overflowY: 'auto'
//       };
//     };

//     // Close suggestions when clicking outside
//     useEffect(() => {
//       const handleClickOutside = (event) => {
//         if (inputRef.current && !inputRef.current.contains(event.target) &&
//             dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//           setShowSuggestions(false);
//         }
//       };

//       document.addEventListener('mousedown', handleClickOutside);
//       return () => {
//         document.removeEventListener('mousedown', handleClickOutside);
//       };
//     }, []);

//     return (
//       <div className={`relative ${className}`} ref={inputRef}>
//         <input
//           type="text"
//           className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//           placeholder={placeholder}
//           value={value}
//           onChange={handleInputChange}
//           onFocus={() => {
//             if (value.length >= 1) {
//               const newSuggestions = findProductsByName(value);
//               setSuggestions(newSuggestions);
//               setShowSuggestions(newSuggestions.length > 0);
//             }
//           }}
//         />
        
//         {/* VISIBLE Suggestions Dropdown - FIXED */}
//         {showSuggestions && (
//           <div 
//             ref={dropdownRef}
//             style={getDropdownStyle()}
//             className="bg-white border border-gray-300 rounded shadow-lg"
//           >
//             {suggestions.length > 0 ? (
//               suggestions.map((product, index) => (
//                 <div
//                   key={`${product.itemCode}-${index}`}
//                   className="px-2 py-2 text-xs cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
//                   onClick={() => handleSuggestionClick(product)}
//                 >
//                   <div className="font-medium text-gray-800">Item Code: {product.itemCode}</div>
//                   <div className="text-gray-600">Product: {product.name}</div>
//                   <div className="text-gray-500">MRP: ₹{product.mrp}</div>
//                 </div>
//               ))
//             ) : (
//               <div className="px-2 py-2 text-xs text-gray-500 text-center">
//                 No products found
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Handle product name change - FIXED
//   const handleProductChange = (id, value, type) => {
//     if (type === 'raw') {
//       setRawProducts(rawProducts.map(item => 
//         item.id === id ? { ...item, product: value } : item
//       ));

//       // Auto-fill when typing product name (after 1 character) - FIXED
//       if (value.length >= 1) {
//         const foundProducts = findProductsByName(value);
//         if (foundProducts.length === 1) {
//           const foundProduct = foundProducts[0];
//           setRawProducts(rawProducts.map(item => 
//             item.id === id 
//               ? { 
//                   ...item, 
//                   Itemcode: foundProduct.itemCode, // Set item code
//                   product: foundProduct.name, // Set product name
//                   MRP: foundProduct.mrp.toString() // Set MRP
//                 } 
//               : item
//           ));
//         }
//       }
//     } else if (type === 'final') {
//       setFinalProducts(finalProducts.map(item => 
//         item.id === id ? { ...item, product: value } : item
//       ));

//       // Auto-fill when typing product name (after 1 character) - FIXED
//       if (value.length >= 1) {
//         const foundProducts = findProductsByName(value);
//         if (foundProducts.length === 1) {
//           const foundProduct = foundProducts[0];
//           setFinalProducts(finalProducts.map(item => 
//             item.id === id 
//               ? { 
//                   ...item, 
//                   Itemcode: foundProduct.itemCode, // Set item code
//                   product: foundProduct.name, // Set product name
//                   MRP: foundProduct.mrp.toString() // Set MRP
//                 } 
//               : item
//           ));
//         }
//       }
//     }
//   };

//   // Rest of your existing functions...
//   const addRawProductRow = () => {
//     const newId = rawProducts.length > 0 ? Math.max(...rawProducts.map(item => item.id)) + 1 : 1;
//     setRawProducts([...rawProducts, { id: newId, Itemcode: '', product: '', MRP: '', useCry: '' }]);
//   };

//   const removeRawProductRow = (id) => {
//     if (rawProducts.length > 1) {
//       setRawProducts(rawProducts.filter(item => item.id !== id));
//     }
//   };

//   const addFinalProductRow = () => {
//     const newId = finalProducts.length > 0 ? Math.max(...finalProducts.map(item => item.id)) + 1 : 1;
//     setFinalProducts([...finalProducts, { id: newId, Itemcode: '', product: '', MRP: '', cryGenerate: '' }]);
//   };

//   const removeFinalProductRow = (id) => {
//     if (finalProducts.length > 1) {
//       setFinalProducts(finalProducts.filter(item => item.id !== id));
//     }
//   };

//   const handleRawProductChange = (id, field, value) => {
//     setRawProducts(rawProducts.map(item => 
//       item.id === id ? { ...item, [field]: value } : item
//     ));
//   };

//   const handleFinalProductChange = (id, field, value) => {
//     setFinalProducts(finalProducts.map(item => 
//       item.id === id ? { ...item, [field]: value } : item
//     ));
//   };

//   const handleRecipeTypeChange = (value) => {
//     setRecipeType(value);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-2 md:p-3">
//       <div className="flex items-center gap-5">
//         <h1 className="text-xl text-gray-500">New Recipe</h1>
//         <div className="h-6 w-px bg-gray-400"></div>
//         <div className="flex items-center gap-4">
//           <IconHome className="text-gray-500 w-8 h-8" />
//           <div className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
//             - Recipe
//           </div>
//         </div>
//       </div>

//       {/* Recipe Information Card */}
//       <div className="mb-4 rounded-lg bg-white p-4 shadow-sm border border-gray-200 pt-3 mt-3">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {/* Recipe Name */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Recipe Name <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               className="w-full px-3 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//               placeholder="Recipe Name"
//             />
//           </div>

//           {/* Recipe Date */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Recipe Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               className="w-full px-3 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//             />
//           </div>

//           {/* Recipe No */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Recipe No.</label>
//             <div className="flex space-x-1">
//               <input
//                 type="text"
//                 readOnly
//                 className="w-1/2 px-3 py-1 border border-gray-300 rounded shadow-sm bg-gray-50 text-sm"
//                 placeholder="Prefix"
//                 value="RCP"
//               />
//               <input
//                 type="text"
//                 readOnly
//                 className="w-1/2 px-3 py-1 border border-gray-300 rounded shadow-sm bg-gray-50 text-sm"
//                 placeholder="Number"
//                 value="1"
//               />
//             </div>
//           </div>

//           {/* Recipe Type */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Type</label>
//             <select 
//               className="w-full px-3 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
//               value={recipeType}
//               onChange={(e) => handleRecipeTypeChange(e.target.value)}
//             >
//               <option value="ASSENSE_E">ASSEMBLE</option>
//               <option value="OTHER">UNASSEMBLE</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Raw Product Card */}
//       <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
//         <div className="px-3 py-2 border-b border-gray-200">
//           <h3 className="text-sm font-medium text-gray-700">Raw Product</h3>
//         </div>
//         <div className="p-2">
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-500">
//                   <th className="w-8 p-1 text-left text-xs font-medium text-white uppercase border"></th>
//                   <th className="w-8 p-1 text-left text-xs font-medium text-white uppercase border">#</th>
//                   <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">Itemcode</th>
//                   <th className="w-48 p-1 text-left text-xs font-medium text-white uppercase border">
//                     Product <span className="text-red-500">*</span>
//                   </th>
//                   <th className="w-16 p-1 text-center text-xs font-medium text-white uppercase border">MRP</th>
//                   <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">
//                    Use Qty <span className="text-red-500">*</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {rawProducts.map((product, index) => (
//                   <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
//                     <td className="p-1 border">
//                       <div className="flex space-x-1">
//                         <button
//                           type="button"
//                           onClick={() => removeRawProductRow(product.id)}
//                           className="text-red-600 hover:text-red-800 p-0.5 rounded-full border border-red-300 hover:bg-red-50 flex items-center justify-center w-5 h-5"
//                           title="Delete"
//                         >
//                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                           </svg>
//                         </button>
//                         {index === rawProducts.length - 1 && (
//                           <button
//                             type="button"
//                             onClick={addRawProductRow}
//                             className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full border border-blue-300 hover:bg-blue-50 flex items-center justify-center w-5 h-5"
//                             title="Add New"
//                           >
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                             </svg>
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                     <td className="p-1 border text-xs text-gray-600">
//                       {index + 1}
//                     </td>
//                     <td className="p-1 border">
//                       <ItemCodeInput
//                         value={product.Itemcode}
//                         onChange={(value) => handleItemCodeChange(product.id, value, 'raw')}
//                         placeholder="Enter item code"
//                         className="w-full"
//                         context={{ type: 'raw', productId: product.id }}
//                       />
//                     </td>
//                     <td className="p-1 border">
//                       <TableProductSearch
//                         value={product.product}
//                         onChange={(value) => handleProductChange(product.id, value, 'raw')}
//                         placeholder="Search Product"
//                         className="w-full"
//                         context={{ type: 'raw', productId: product.id }}
//                       />
//                     </td>
//                     <td className="p-1 border text-center">
//                       <input
//                         type="text"
//                         className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="MRP"
//                         value={product.MRP}
//                         onChange={(e) => handleRawProductChange(product.id, 'MRP', e.target.value)}
//                       />
//                     </td>
//                     <td className="p-1 border">
//                       <input
//                         type="text"
//                         className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Use Qty"
//                         value={product.useCry}
//                         onChange={(e) => handleRawProductChange(product.id, 'useCry', e.target.value)}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Final Product Card */}
//       <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
//         <div className="px-3 py-2 border-b border-gray-200">
//           <h3 className="text-sm font-medium text-gray-700">Final Product</h3>
//         </div>
//         <div className="p-2">
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-500">
//                   <th className="w-8 p-1 text-left text-xs font-medium text-white uppercase border"></th>
//                   <th className="w-8 p-1 text-left text-xs font-medium text-white uppercase border">#</th>
//                   <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">Itemcode</th>
//                   <th className="w-48 p-1 text-left text-xs font-medium text-white uppercase border">
//                     Product <span className="text-red-500">*</span>
//                   </th>
//                   <th className="w-16 p-1 text-center text-xs font-medium text-white uppercase border">MRP</th>
//                   <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">
//                     Cry Generate <span className="text-red-500">*</span>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {finalProducts.map((product, index) => (
//                   <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
//                     <td className="p-1 border">
//                       <div className="flex space-x-1">
//                         {(recipeType === 'OTHER' && index > 0) && (
//                           <button
//                             type="button"
//                             onClick={() => removeFinalProductRow(product.id)}
//                             className="text-red-600 hover:text-red-800 p-0.5 rounded-full border border-red-300 hover:bg-red-50 flex items-center justify-center w-5 h-5"
//                             title="Delete"
//                           >
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                           </button>
//                         )}
//                         {recipeType === 'OTHER' && index === finalProducts.length - 1 && (
//                           <button
//                             type="button"
//                             onClick={addFinalProductRow}
//                             className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full border border-blue-300 hover:bg-blue-50 flex items-center justify-center w-5 h-5"
//                             title="Add New"
//                           >
//                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                             </svg>
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                     <td className="p-1 border text-xs text-gray-600">
//                       {index + 1}
//                     </td>
//                     <td className="p-1 border">
//                       <ItemCodeInput
//                         value={product.Itemcode}
//                         onChange={(value) => handleItemCodeChange(product.id, value, 'final')}
//                         placeholder="Enter item code"
//                         className="w-full"
//                         context={{ type: 'final', productId: product.id }}
//                       />
//                     </td>
//                     <td className="p-1 border">
//                       <TableProductSearch
//                         value={product.product}
//                         onChange={(value) => handleProductChange(product.id, value, 'final')}
//                         placeholder="Search Product"
//                         className="w-full"
//                         context={{ type: 'final', productId: product.id }}
//                       />
//                     </td>
//                     <td className="p-1 border text-center">
//                       <input
//                         type="text"
//                         className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="MRP"
//                         value={product.MRP}
//                         onChange={(e) => handleFinalProductChange(product.id, 'MRP', e.target.value)}
//                       />
//                     </td>
//                     <td className="p-1 border">
//                       <input
//                         type="text"
//                         className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                         placeholder="Cry Generate"
//                         value={product.cryGenerate}
//                         onChange={(e) => handleFinalProductChange(product.id, 'cryGenerate', e.target.value)}
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end space-x-2">
//         <button
//           type="button"
//           className="px-4 py-1.5 text-sm border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
//         >
//           Cancel
//         </button>
//         <div className="py-1">
//           <Button className="py-1 text-sm" type="submit">
//             Save
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateNewRecipe;

import { Button } from '@/components/ui/button';
import React, { useState, useRef, useEffect } from 'react';
import IconHome from "@/components/HomeIcon/IconHome";

function CreateNewRecipe() {
  const [rawProducts, setRawProducts] = useState([{ id: 1, Itemcode: '', product: '', MRP: '', useCry: '' }]);
  const [finalProducts, setFinalProducts] = useState([{ id: 1, Itemcode: '', product: '', MRP: '', cryGenerate: '' }]);
  const [recipeType, setRecipeType] = useState('ASSENSE_E');

  // Enhanced product database with more details
  const productDatabase = [
    { itemCode: 'AP5346', name: 'Budsx', mrp: 150, brand: 'AudioTech', category: 'Electronics' },
    { itemCode: 'AP5342', name: 'temp', mrp: 1560, brand: 'TempCorp', category: 'Electronics' },
    { itemCode: 'AP5341', name: 'test product', mrp: 0, brand: 'TestBrand', category: 'Testing' },
    { itemCode: '8901872576', name: 'AROGYA SONTI COFFEE POWDER 15G', mrp: 139, brand: 'Arogya', category: 'Beverages' },
    { itemCode: '4', name: 'Suvari 200gm', mrp: 200, brand: 'Suvari', category: 'Food' },
    { itemCode: '16', name: 'SONF 50G', mrp: 50, brand: 'SpiceCo', category: 'Spices' },
    { itemCode: '17', name: '2E SONF 100G', mrp: 100, brand: 'SpiceCo', category: 'Spices' },
    { itemCode: '18', name: '2E SONF 250G', mrp: 250, brand: 'SpiceCo', category: 'Spices' },
    { itemCode: '32', name: '2E Sunf M/magic Btr 250g', mrp: 280, brand: 'Sunfood', category: 'Food' },
    { itemCode: '34', name: '2E SCHNA GHEE ILTR', mrp: 500, brand: 'Schna', category: 'Dairy' },
    { itemCode: '38', name: '2E NIP SURF 700G', mrp: 400, brand: 'Nip', category: 'Cleaning' },
    { itemCode: '42', name: 'K/MIRCH SABAT 100G', mrp: 80, brand: 'SpiceCo', category: 'Spices' },
    { itemCode: '46', name: '2E COLGATE SET 300G', mrp: 350, brand: 'Colgate', category: 'Personal Care' },
    { itemCode: '48', name: '2E SUNF MOMS BUTTER RSI0', mrp: 450, brand: 'Sunfood', category: 'Food' },
    { itemCode: '54', name: '2E CLINIC + ST& LO SHMP 650M', mrp: 550, brand: 'ClinicPlus', category: 'Personal Care' },
    { itemCode: '61', name: '2E SUNF NICE/TIME ISO6', mrp: 380, brand: 'Sunfood', category: 'Food' }
  ];

  // Function to find product by item code
  const findProductByItemCode = (itemCode) => {
    return productDatabase.find(product => product.itemCode === itemCode) || null;
  };

  // Function to find products by name (for suggestions)
  const findProductsByName = (searchTerm) => {
    if (searchTerm.length < 1) return [];
    return productDatabase.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Enhanced Product Search Component for table rows - UPDATED UI
  const TableProductSearch = ({ value, onChange, placeholder, className = "", context }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const triggerRef = useRef(null);
    const searchRef = useRef(null);

    // Get search popup position
    const getSearchPopupStyle = () => {
      if (!triggerRef.current) return {};
      
      const rect = triggerRef.current.getBoundingClientRect();
      return {
        position: 'fixed',
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 450),
        zIndex: 9999,
        maxHeight: '400px',
        overflow: 'hidden'
      };
    };

    // Find products based on search term
    const findProducts = (term) => {
      if (term.length < 1) return [];
      
      return productDatabase.filter(product =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.itemCode.toLowerCase().includes(term.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(term.toLowerCase()))
      ).slice(0, 8); // Limit to 8 results
    };

    // Handle search input change
    const handleSearchChange = (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      
      if (term.length >= 1) {
        const newSuggestions = findProducts(term);
        setSuggestions(newSuggestions);
      } else {
        setSuggestions([]);
      }
    };

    // Handle product selection
    const handleProductSelect = (product) => {
      if (context.type === 'raw') {
        setRawProducts(rawProducts.map(item => 
          item.id === context.productId 
            ? { 
                ...item, 
                product: product.name,
                Itemcode: product.itemCode,
                MRP: product.mrp.toString()
              } 
            : item
        ));
      } else if (context.type === 'final') {
        setFinalProducts(finalProducts.map(item => 
          item.id === context.productId 
            ? { 
                ...item, 
                product: product.name,
                Itemcode: product.itemCode,
                MRP: product.mrp.toString()
              } 
            : item
        ));
      }
      
      onChange(product.name);
      setIsSearchOpen(false);
      setSearchTerm("");
      setSuggestions([]);
    };

    // Close search when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (triggerRef.current && !triggerRef.current.contains(event.target) &&
            searchRef.current && !searchRef.current.contains(event.target)) {
          setIsSearchOpen(false);
          setSearchTerm("");
          setSuggestions([]);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className={`relative ${className}`}>
        {/* Search Trigger */}
        <div
          ref={triggerRef}
          className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white cursor-pointer flex items-center justify-between hover:border-gray-400 transition-colors"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <span className={`truncate ${value ? "text-gray-800" : "text-gray-500"}`}>
            {value || placeholder}
          </span>
          <svg 
            className={`w-3 h-3 text-gray-400 transition-transform ${isSearchOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Product Search Popup - UPDATED UI */}
        {isSearchOpen && (
          <div 
            ref={searchRef}
            style={getSearchPopupStyle()}
            className="bg-white border border-gray-300 rounded-lg shadow-xl"
          >
            {/* Search Header */}
            <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-gray-800">Search Product</h4>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchTerm("");
                    setSuggestions([]);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Search Input */}
              <div className="relative">
                <svg 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by product name, code, or brand..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  autoFocus
                />
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-64 overflow-y-auto">
              {suggestions.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {suggestions.map((product, index) => (
                    <div
                      key={`${product.itemCode}-${index}`}
                      className="p-3 cursor-pointer hover:bg-blue-50 transition-colors duration-150"
                      onClick={() => handleProductSelect(product)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-900 line-clamp-1">
                              {product.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                              </svg>
                              Code: {product.itemCode}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                              </svg>
                              MRP: ₹{product.mrp}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Brand and Category */}
                      <div className="flex items-center gap-3 mt-1">
                        {product.brand && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {product.brand}
                          </span>
                        )}
                        {product.category && (
                          <span className="text-xs text-gray-500">{product.category}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchTerm.length >= 1 ? (
                <div className="p-6 text-center">
                  <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-gray-500">No products found</p>
                  <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
                </div>
              ) : (
                <div className="p-6 text-center">
                  <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-xs text-gray-500">Start typing to search products</p>
                  <p className="text-xs text-gray-400 mt-1">Search by name, code, or brand</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Enhanced Item Code Input with better suggestions
  const ItemCodeInput = ({ value, onChange, placeholder, className = "", context }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    const handleInputChange = (e) => {
      const newValue = e.target.value;
      onChange(newValue);

      if (newValue.length >= 1) {
        const newSuggestions = findProductsByName(newValue);
        setSuggestions(newSuggestions);
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
        setSuggestions([]);
      }
    };

    const handleSuggestionClick = (product) => {
      if (context.type === 'raw') {
        setRawProducts(rawProducts.map(item => 
          item.id === context.productId 
            ? { 
                ...item, 
                Itemcode: product.itemCode,
                product: product.name,
                MRP: product.mrp.toString()
              } 
            : item
        ));
      } else if (context.type === 'final') {
        setFinalProducts(finalProducts.map(item => 
          item.id === context.productId 
            ? { 
                ...item, 
                Itemcode: product.itemCode,
                product: product.name,
                MRP: product.mrp.toString()
              } 
            : item
        ));
      }
      setShowSuggestions(false);
    };

    // Get dropdown position
    const getDropdownStyle = () => {
      if (!inputRef.current) return {};
      
      const rect = inputRef.current.getBoundingClientRect();
      return {
        position: 'fixed',
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 300),
        zIndex: 9999,
        maxHeight: '200px',
        overflowY: 'auto'
      };
    };

    // Close suggestions when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target) &&
            dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowSuggestions(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    return (
      <div className={`relative ${className}`} ref={inputRef}>
        <input
          type="text"
          className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => {
            if (value.length >= 1) {
              const newSuggestions = findProductsByName(value);
              setSuggestions(newSuggestions);
              setShowSuggestions(newSuggestions.length > 0);
            }
          }}
        />
        
        {/* VISIBLE Suggestions Dropdown - FIXED */}
        {showSuggestions && (
          <div 
            ref={dropdownRef}
            style={getDropdownStyle()}
            className="bg-white border border-gray-300 rounded shadow-lg"
          >
            {suggestions.length > 0 ? (
              suggestions.map((product, index) => (
                <div
                  key={`${product.itemCode}-${index}`}
                  className="px-2 py-2 text-xs cursor-pointer hover:bg-blue-50 transition-colors border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSuggestionClick(product)}
                >
                  <div className="font-medium text-gray-800">Item Code: {product.itemCode}</div>
                  <div className="text-gray-600">Product: {product.name}</div>
                  <div className="text-gray-500">MRP: ₹{product.mrp}</div>
                </div>
              ))
            ) : (
              <div className="px-2 py-2 text-xs text-gray-500 text-center">
                No products found
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  // Handle direct item code input with auto-fill - FIXED
  const handleItemCodeChange = (id, value, type) => {
    // Update the item code immediately
    if (type === 'raw') {
      setRawProducts(rawProducts.map(item => 
        item.id === id ? { ...item, Itemcode: value } : item
      ));
    } else if (type === 'final') {
      setFinalProducts(finalProducts.map(item => 
        item.id === id ? { ...item, Itemcode: value } : item
      ));
    }

    // Auto-fill product name when valid item code is entered - FIXED
    if (value.trim() !== '') {
      const foundProduct = findProductByItemCode(value);
      if (foundProduct) {
        if (type === 'raw') {
          setRawProducts(rawProducts.map(item => 
            item.id === id 
              ? { 
                  ...item, 
                  product: foundProduct.name, // Only product name
                  Itemcode: foundProduct.itemCode, // FIXED: Ensure item code is set
                  MRP: foundProduct.mrp.toString() // FIXED: Set MRP
                } 
              : item
          ));
        } else if (type === 'final') {
          setFinalProducts(finalProducts.map(item => 
            item.id === id 
              ? { 
                  ...item, 
                  product: foundProduct.name, // Only product name
                  Itemcode: foundProduct.itemCode, // FIXED: Ensure item code is set
                  MRP: foundProduct.mrp.toString() // FIXED: Set MRP
                } 
              : item
          ));
        }
      }
    }
  };

  // Handle product name change - FIXED
  const handleProductChange = (id, value, type) => {
    if (type === 'raw') {
      setRawProducts(rawProducts.map(item => 
        item.id === id ? { ...item, product: value } : item
      ));

      // Auto-fill when typing product name (after 1 character) - FIXED
      if (value.length >= 1) {
        const foundProducts = findProductsByName(value);
        if (foundProducts.length === 1) {
          const foundProduct = foundProducts[0];
          setRawProducts(rawProducts.map(item => 
            item.id === id 
              ? { 
                  ...item, 
                  Itemcode: foundProduct.itemCode, // Set item code
                  product: foundProduct.name, // Set product name
                  MRP: foundProduct.mrp.toString() // Set MRP
                } 
              : item
          ));
        }
      }
    } else if (type === 'final') {
      setFinalProducts(finalProducts.map(item => 
        item.id === id ? { ...item, product: value } : item
      ));

      // Auto-fill when typing product name (after 1 character) - FIXED
      if (value.length >= 1) {
        const foundProducts = findProductsByName(value);
        if (foundProducts.length === 1) {
          const foundProduct = foundProducts[0];
          setFinalProducts(finalProducts.map(item => 
            item.id === id 
              ? { 
                  ...item, 
                  Itemcode: foundProduct.itemCode, // Set item code
                  product: foundProduct.name, // Set product name
                  MRP: foundProduct.mrp.toString() // Set MRP
                } 
              : item
          ));
        }
      }
    }
  };

  // Rest of your existing functions...
  const addRawProductRow = () => {
    const newId = rawProducts.length > 0 ? Math.max(...rawProducts.map(item => item.id)) + 1 : 1;
    setRawProducts([...rawProducts, { id: newId, Itemcode: '', product: '', MRP: '', useCry: '' }]);
  };

  const removeRawProductRow = (id) => {
    if (rawProducts.length > 1) {
      setRawProducts(rawProducts.filter(item => item.id !== id));
    }
  };

  const addFinalProductRow = () => {
    const newId = finalProducts.length > 0 ? Math.max(...finalProducts.map(item => item.id)) + 1 : 1;
    setFinalProducts([...finalProducts, { id: newId, Itemcode: '', product: '', MRP: '', cryGenerate: '' }]);
  };

  const removeFinalProductRow = (id) => {
    if (finalProducts.length > 1) {
      setFinalProducts(finalProducts.filter(item => item.id !== id));
    }
  };

  const handleRawProductChange = (id, field, value) => {
    setRawProducts(rawProducts.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleFinalProductChange = (id, field, value) => {
    setFinalProducts(finalProducts.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleRecipeTypeChange = (value) => {
    setRecipeType(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-3">
      <div className="flex items-center gap-5">
        <h1 className="text-xl text-gray-500">New Recipe</h1>
        <div className="h-6 w-px bg-gray-400"></div>
        <div className="flex items-center gap-4">
          <IconHome className="text-gray-500 w-8 h-8" />
          <div className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
            - Recipe
          </div>
        </div>
      </div>

      {/* Recipe Information Card */}
      <div className="mb-4 rounded-lg bg-white p-4 shadow-sm border border-gray-200 pt-3 mt-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Recipe Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full px-3 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Recipe Name"
            />
          </div>

          {/* Recipe Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Recipe Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full px-3 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Recipe No */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe No.</label>
            <div className="flex space-x-1">
              <input
                type="text"
                readOnly
                className="w-1/2 px-3 py-1 border border-gray-300 rounded shadow-sm bg-gray-50 text-sm"
                placeholder="Prefix"
                value="RCP"
              />
              <input
                type="text"
                readOnly
                className="w-1/2 px-3 py-1 border border-gray-300 rounded shadow-sm bg-gray-50 text-sm"
                placeholder="Number"
                value="1"
              />
            </div>
          </div>

          {/* Recipe Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Type</label>
            <select 
              className="w-full px-3 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={recipeType}
              onChange={(e) => handleRecipeTypeChange(e.target.value)}
            >
              <option value="ASSENSE_E">ASSEMBLE</option>
              <option value="OTHER">UNASSEMBLE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Raw Product Card */}
      <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
        <div className="px-3 py-2 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">Raw Product</h3>
        </div>
        <div className="p-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-500">
                  <th className="w-8 p-1 text-left text-xs font-medium text-white uppercase border"></th>
                  <th className="w-8 p-1 text-left text-xs font-medium text-white uppercase border">#</th>
                  <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">Itemcode</th>
                  <th className="w-48 p-1 text-left text-xs font-medium text-white uppercase border">
                    Product <span className="text-red-500">*</span>
                  </th>
                  <th className="w-16 p-1 text-center text-xs font-medium text-white uppercase border">MRP</th>
                  <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">
                   Use Qty <span className="text-red-500">*</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rawProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-1 border">
                      <div className="flex space-x-1">
                        <button
                          type="button"
                          onClick={() => removeRawProductRow(product.id)}
                          className="text-red-600 hover:text-red-800 p-0.5 rounded-full border border-red-300 hover:bg-red-50 flex items-center justify-center w-5 h-5"
                          title="Delete"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        {index === rawProducts.length - 1 && (
                          <button
                            type="button"
                            onClick={addRawProductRow}
                            className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full border border-blue-300 hover:bg-blue-50 flex items-center justify-center w-5 h-5"
                            title="Add New"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="p-1 border text-xs text-gray-600">
                      {index + 1}
                    </td>
                    <td className="p-1 border">
                      <ItemCodeInput
                        value={product.Itemcode}
                        onChange={(value) => handleItemCodeChange(product.id, value, 'raw')}
                        placeholder="Enter item code"
                        className="w-full"
                        context={{ type: 'raw', productId: product.id }}
                      />
                    </td>
                    <td className="p-1 border">
                      <TableProductSearch
                        value={product.product}
                        onChange={(value) => handleProductChange(product.id, value, 'raw')}
                        placeholder="Search Product"
                        className="w-full"
                        context={{ type: 'raw', productId: product.id }}
                      />
                    </td>
                    <td className="p-1 border text-center">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MRP"
                        value={product.MRP}
                        onChange={(e) => handleRawProductChange(product.id, 'MRP', e.target.value)}
                      />
                    </td>
                    <td className="p-1 border">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Use Qty"
                        value={product.useCry}
                        onChange={(e) => handleRawProductChange(product.id, 'useCry', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Final Product Card */}
      <div className="mb-4 rounded-lg bg-white p-1 shadow-sm border border-gray-200">
        <div className="px-3 py-2 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">Final Product</h3>
        </div>
        <div className="p-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-500">
                  <th className="w-8 p-1 text-left text-xs font-medium text-white uppercase border"></th>
                  <th className="w-8 p-1 text-left text-xs font-medium text-white uppercase border">#</th>
                  <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">Itemcode</th>
                  <th className="w-48 p-1 text-left text-xs font-medium text-white uppercase border">
                    Product <span className="text-red-500">*</span>
                  </th>
                  <th className="w-16 p-1 text-center text-xs font-medium text-white uppercase border">MRP</th>
                  <th className="w-24 p-1 text-left text-xs font-medium text-white uppercase border">
                    Cry Generate <span className="text-red-500">*</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {finalProducts.map((product, index) => (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="p-1 border">
                      <div className="flex space-x-1">
                        {(recipeType === 'OTHER' && index > 0) && (
                          <button
                            type="button"
                            onClick={() => removeFinalProductRow(product.id)}
                            className="text-red-600 hover:text-red-800 p-0.5 rounded-full border border-red-300 hover:bg-red-50 flex items-center justify-center w-5 h-5"
                            title="Delete"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                        {recipeType === 'OTHER' && index === finalProducts.length - 1 && (
                          <button
                            type="button"
                            onClick={addFinalProductRow}
                            className="text-blue-600 hover:text-blue-800 p-0.5 rounded-full border border-blue-300 hover:bg-blue-50 flex items-center justify-center w-5 h-5"
                            title="Add New"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="p-1 border text-xs text-gray-600">
                      {index + 1}
                    </td>
                    <td className="p-1 border">
                      <ItemCodeInput
                        value={product.Itemcode}
                        onChange={(value) => handleItemCodeChange(product.id, value, 'final')}
                        placeholder="Enter item code"
                        className="w-full"
                        context={{ type: 'final', productId: product.id }}
                      />
                    </td>
                    <td className="p-1 border">
                      <TableProductSearch
                        value={product.product}
                        onChange={(value) => handleProductChange(product.id, value, 'final')}
                        placeholder="Search Product"
                        className="w-full"
                        context={{ type: 'final', productId: product.id }}
                      />
                    </td>
                    <td className="p-1 border text-center">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MRP"
                        value={product.MRP}
                        onChange={(e) => handleFinalProductChange(product.id, 'MRP', e.target.value)}
                      />
                    </td>
                    <td className="p-1 border">
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Cry Generate"
                        value={product.cryGenerate}
                        onChange={(e) => handleFinalProductChange(product.id, 'cryGenerate', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="px-4 py-1.5 text-sm border border-gray-300 rounded shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Cancel
        </button>
        <div className="py-1">
          <Button className="py-1 text-sm" type="submit">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateNewRecipe;