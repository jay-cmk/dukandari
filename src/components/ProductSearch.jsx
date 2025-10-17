// components/ProductSearch.jsx
import React, { useState, useEffect, useRef } from "react";

// Static product data (you can also pass this as prop)
const staticProducts = [
   {
    id: 1,
    itemCode: "AP5346",
    value: "Budsx - AP5346",
    name: "Budsx",
    category: "TEA&COFFEE",
    brand: "ccgy",
    qty: 140,
    allowNegativeStock: false,
    productVarientId: 101,
    availableQty: 140,
    productVo: {
      name: "Budsx",
      isExpiryManage: 1,
      expirationdays: 10,
      purchaseTaxIncluded: 1,
      purchaseTaxVo: { taxRate: 18 }
    },
    designNo: "AP5346",
    purchasePrice: 100,
    mrp: 150,
    sellingPrice: 150,
    stockMasterVos: [
      {
        stockId: 1,
        quantity: 100,
        purchasePrice: 100,
        mrp: 200,
        landingCost: 100,
        sellingPrice: 200,
        expirationDate: "11/10/2025",
        manufactureDate: "01/10/2025"
      }
    ]
  },
  {
    id: 2,
    itemCode: "AP5342",
    value: "temp - AP5342",
    name: "temp",
    category: "TEA&COFFEE",
    brand: "ARCOGYA",
    qty: 44.90,
    allowNegativeStock: true,
    productVarientId: 102,
    availableQty: 44.90,
    productVo: {
      name: "temp",
      isExpiryManage: 0,
      expirationdays: 0,
      purchaseTaxIncluded: 1,
      purchaseTaxVo: { taxRate: 18 }
    },
    designNo: "AP5342",
    purchasePrice: 1200,
    mrp: 1560,
    sellingPrice: 1560,
    stockMasterVos: []
  },
  {
    id: 3,
    itemCode: "AP5341",
    value: "test product - AP5341",
    name: "test product",
    category: "COOKING",
    brand: "ANCHOR",
    qty: 15,
    allowNegativeStock: false,
    productVarientId: 103,
    availableQty: 15,
    productVo: {
      name: "test product",
      isExpiryManage: 1,
      expirationdays: 30,
      purchaseTaxIncluded: 0,
      purchaseTaxVo: { taxRate: 12 }
    },
    designNo: "AP5341",
    purchasePrice: 0,
    mrp: 0,
    sellingPrice: 0,
    stockMasterVos: [
      {
        stockId: 2,
        quantity: 50,
        purchasePrice: 80,
        mrp: 120,
        landingCost: 85,
        sellingPrice: 110,
        expirationDate: "15/11/2025",
        manufactureDate: "15/10/2025"
      }
    ]
  },
  {
    id: 4,
    itemCode: "8901872576",
    value: "AROGYA SONTI COFFEE POWDER 15G - 8901872576",
    name: "AROGYA SONTI COFFEE POWDER 15G",
    category: "TEA&COFFEE",
    brand: "ARCOGYA",
    qty: -6,
    allowNegativeStock: true,
    productVarientId: 104,
    availableQty: 0,
    productVo: {
      name: "AROGYA SONTI COFFEE POWDER 15G",
      isExpiryManage: 1,
      expirationdays: 365,
      purchaseTaxIncluded: 1,
      purchaseTaxVo: { taxRate: 18 }
    },
    designNo: "8901872576",
    purchasePrice: 100,
    mrp: 139,
    sellingPrice: 130,
    stockMasterVos: [
      {
        stockId: 3,
        quantity: 25,
        purchasePrice: 95,
        mrp: 139,
        landingCost: 100,
        sellingPrice: 130,
        expirationDate: "31/12/2025",
        manufactureDate: "01/01/2025"
      }
    ]
  }
  // Add more products as needed...
];

const ProductSearch = ({ 
  onProductSelect, 
  disabled = false,
  showBarcodeScanner = false,
  placeholder = "Type product name, code, or brand...",
  products = staticProducts // Allow passing custom products array
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Real-time search as user types
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Show suggestions immediately when user starts typing
    if (value.length >= 1) {
      const filtered = products.filter(product =>
        product.value.toLowerCase().includes(value.toLowerCase()) ||
        product.itemCode.toLowerCase().includes(value.toLowerCase()) ||
        product.name.toLowerCase().includes(value.toLowerCase()) ||
        product.category.toLowerCase().includes(value.toLowerCase()) ||
        product.brand.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle product selection from suggestions
  const handleProductSelect = (product) => {
    setSearchTerm(product.itemCode);
    setShowSuggestions(false);
    onProductSelect(product);
  };

  // Handle manual search (Enter key)
  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      e.preventDefault();
      const foundProducts = products.filter(product =>
        product.itemCode.toLowerCase() === searchTerm.trim().toLowerCase() ||
        product.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );

      if (foundProducts.length > 0) {
        handleProductSelect(foundProducts[0]);
      } else {
        alert("Product not found!");
      }
    }
  };

  // Handle barcode scan simulation
  const handleBarcodeScan = () => {
    // Simulate scanning a random product
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    setSearchTerm(randomProduct.itemCode);
    handleProductSelect(randomProduct);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-1 w-full flex gap-2">
      <div className="relative flex-1" ref={searchRef}>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleSearchSubmit}
          disabled={disabled}
        />
        
        {/* Real-time Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 mt-1 max-h-80 overflow-y-auto">
            {suggestions.map((product) => (
              <div
                key={product.id}
                className="px-3 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                onClick={() => handleProductSelect(product)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-800 mb-1">
                      {product.value}
                    </div>
                    <div className="text-xs text-gray-500 flex flex-wrap gap-2">
                      <span>Code: {product.itemCode}</span>
                      <span>•</span>
                      <span>Brand: {product.brand}</span>
                      <span>•</span>
                      <span>Category: {product.category}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 ml-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">
                      Qty: {product.qty}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold">
                      MRP: ₹{product.mrp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search tips */}
        {searchTerm.length === 1 && (
          <div className="absolute top-full left-0 right-0 bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-1 text-xs text-yellow-800">
            💡 <strong>Tip:</strong> Continue typing to refine your search. You can search by product name, code, brand, or category.
          </div>
        )}
      </div>
      
      {/* Barcode Scanner Button */}
      {showBarcodeScanner && (
        <button 
          type="button" 
          className="bg-gray-800 hover:bg-gray-900 text-white p-2 rounded-lg transition-colors duration-200"
          title="Scan Barcode"
          onClick={handleBarcodeScan}
          disabled={disabled}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ProductSearch;