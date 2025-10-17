// pages/OpeningStock.jsx
import React, { useState } from "react";
import { ReusableTable } from "@/components/ReusableTable";
import IconHome from "@/components/HomeIcon/IconHome";
import ProductSearch from "@/components/ProductSearch";
import ProductModal from "@/components/ProductModal";

const seed = [
  { id: 1, productName: "KES/RHYM/Plazo Set XXL", price: 2995.000, inQuantity: 1, outQuantity: 0, createdBy: "KIRTIRAJ", createdOn: "03/10/2025, 6:00:25 pm" },
  { id: 2, productName: "KES/RHYM/Plazo Set XXL", price: 2995.000, inQuantity: 1, outQuantity: 0, createdBy: "KIRTIRAJ", createdOn: "03/10/2025, 6:00:25 pm" },
  // ... your existing seed data
];

export default function OpeningStock() {
  const [products, setProducts] = useState(seed);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isOpeningStockInsert, setIsOpeningStockInsert] = useState(true);

  // Handle product selection from search component
  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Handle save from modal
  const handleSaveOpeningStock = (stockData) => {
    console.log('Saving opening stock:', stockData);
    alert("Opening stock saved successfully!");
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  const handleBarcodeClick = (product) => {
    console.log("Barcode clicked for:", product);
    alert(`Barcode for: ${product.productName}`);
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().includes(searchTerm) ||
    product.inQuantity.toString().includes(searchTerm) ||
    product.outQuantity.toString().includes(searchTerm)
  );

  // Add actions to each filtered product
  const productsWithActions = filteredProducts.map(product => ({
    ...product,
    actions: (
      <button 
        className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
        onClick={() => handleBarcodeClick(product)}
        title="View Barcode"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 5v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"/>
          <path d="M7 7h.01"/>
          <path d="M17 7h.01"/>
          <path d="M7 12h10"/>
          <path d="M7 17h10"/>
          <path d="M17 17h.01"/>
        </svg>
      </button>
    )
  }));

  const columns = [
    { key: "productName", label: "Product Name" },
    { key: "price", label: "Price" },
    { key: "inQuantity", label: "In Quantity" },
    { key: "outQuantity", label: "Out Quantity" },
    { key: "createdBy", label: "Created By" },
    { key: "createdOn", label: "Created On" },
    { key: "actions", label: "Actions" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-3">
      <div className="flex items-center gap-5 mb-6">
        <h1 className="text-2xl text-gray-500">Opening Stock</h1>
        <div className="h-6 w-px bg-gray-400"></div>
        <div className="flex items-center gap-4">
          <IconHome className="text-gray-500 w-8 h-8" />
          <div className="text-sm text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-200">
            - product
          </div>
        </div>
      </div>

      {/* Action Buttons and Product Search */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          {/* Import Button */}
          <div className="flex-1">
            <button 
              type="button" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
              title={isOpeningStockInsert ? "Import" : "Access Denied"}
              disabled={!isOpeningStockInsert}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
              <span>Import</span>
            </button>
          </div>

          {/* Product Search Component */}
          <ProductSearch
            onProductSelect={handleProductSelect}
            disabled={!isOpeningStockInsert}
            showBarcodeScanner={true}
            placeholder="Enter item code or product name..."
          />
        </div>
      </div>

      {/* Table Search */}
      <div className="mb-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search existing stock..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <ReusableTable
        data={productsWithActions}
        columns={columns}
        emptyMessage={searchTerm ? "No products found matching your search" : "No products found"}
        showCreateButton={false}
        showEdit={false}
        showDelete={false}
      />

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={handleCloseModal}
        onSave={handleSaveOpeningStock}
      />
    </div>
  );
}