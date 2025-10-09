import { Button } from '@/components/ui/button';
import React, { useState, useRef, useEffect } from 'react';
import IconHome from "@/components/HomeIcon/IconHome";

function CreateNewRecipe() {
  const [rawProducts, setRawProducts] = useState([{ id: 1, Itemcode: '', product: '', MRP: '', useCry: '' }]);
  const [finalProducts, setFinalProducts] = useState([{ id: 1, Itemcode: '', product: '', MRP: '', cryGenerate: '' }]);
  const [recipeType, setRecipeType] = useState('ASSENSE_E');

  // Product options for dropdown
  const productOptions = [
    { value: 'product1', label: 'Product 1' },
    { value: 'product2', label: 'Product 2' },
    { value: 'product3', label: 'Product 3' },
    { value: 'product4', label: 'Product 4' },
    { value: 'product5', label: 'Product 5' }
  ];

  // Custom Dropdown Component that opens outside table
  const TableDropdown = ({ value, onChange, placeholder, className = "" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);
    const triggerRef = useRef(null);

    const filteredOptions = productOptions.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedOption = productOptions.find(option => option.value === value);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
            triggerRef.current && !triggerRef.current.contains(event.target)) {
          setIsOpen(false);
          setSearchTerm("");
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Get dropdown position
    const getDropdownStyle = () => {
      if (!triggerRef.current) return {};
      
      const rect = triggerRef.current.getBoundingClientRect();
      return {
        position: 'fixed',
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999
      };
    };

    return (
      <div className={`relative ${className}`}>
        {/* Dropdown Trigger */}
        <div
          ref={triggerRef}
          className="w-full px-2 py-1 border border-gray-300 rounded text-xs bg-white cursor-pointer flex items-center justify-between hover:border-gray-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={selectedOption ? "text-gray-800" : "text-white-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg 
            className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Dropdown Menu - Fixed positioning to escape table */}
        {isOpen && (
          <div 
            ref={dropdownRef}
            style={getDropdownStyle()}
            className="bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            
            {/* Options List */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`px-3 py-2 text-xs cursor-pointer hover:bg-blue-50 transition-colors ${
                      value === option.value ? 'bg-blue-100 text-blue-800 font-medium' : 'text-gray-800'
                    }`}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-white-500 text-center">
                  No products found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
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
    <div className="min-h-screen bg-gray-50 p-2  md:p-3  ">
      <div className="flex items-center gap-5 ">
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
                  <th className="w-8 p-1 text-left text-xs font-medium text-white-500 uppercase border"></th>
                  <th className="w-8 p-1 text-left text-xs font-medium text-white-500 uppercase border">#</th>
                  <th className="w-24 p-1 text-left text-xs font-medium text-white-500 uppercase border">Itemcode</th>
                  <th className="w-48 p-1 text-left text-xs font-medium text-white-500 uppercase border">
                    Product <span className="text-red-500">*</span>
                  </th>
                  <th className="w-16 p-1 text-center text-xs font-medium text-white-500 uppercase border">MRP</th>
                  <th className="w-24 p-1 text-left text-xs font-medium text-white-500 uppercase border">
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
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Itemcode"
                        value={product.Itemcode}
                        onChange={(e) => handleRawProductChange(product.id, 'Itemcode', e.target.value)}
                      />
                    </td>
                    <td className="p-1 border">
                      <TableDropdown
                        value={product.product}
                        onChange={(value) => handleRawProductChange(product.id, 'product', value)}
                        placeholder="Search Product"
                        className="w-full"
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
                        placeholder="Cry"
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
                  <th className="w-8 p-1 text-left text-xs font-medium text-white-500 uppercase border"></th>
                  <th className="w-8 p-1 text-left text-xs font-medium text-white-500 uppercase border">#</th>
                  <th className="w-24 p-1 text-left text-xs font-medium text-white-500 uppercase border">Itemcode</th>
                  <th className="w-48 p-1 text-left text-xs font-medium text-white-500 uppercase border">
                    Product <span className="text-red-500">*</span>
                  </th>
                  <th className="w-16 p-1 text-center text-xs font-medium text-white-500 uppercase border">MRP</th>
                  <th className="w-24 p-1 text-left text-xs font-medium text-white-500 uppercase border">
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
                      <input
                        type="text"
                        className="w-full px-1 py-0.5 border border-gray-300 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Itemcode"
                        value={product.Itemcode}
                        onChange={(e) => handleFinalProductChange(product.id, 'Itemcode', e.target.value)}
                      />
                    </td>
                    <td className="p-1 border">
                      <TableDropdown
                        value={product.product}
                        onChange={(value) => handleFinalProductChange(product.id, 'product', value)}
                        placeholder="Search Product"
                        className="w-full"
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
                        placeholder="Cry"
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
        {/* <Button
          type="submit"
          className="px-4 py-1.5 text-sm border border-transparent rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Save
        </Button> */}

        <div className="py-1">
                    <Button  className=" py-1 text-sm "  type="submit">
                       
                      Save
                    </Button>
                  </div>
      </div>
    </div>
  );
}

export default CreateNewRecipe;