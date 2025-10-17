// components/ProductModal.jsx
import React, { useState, useEffect } from "react";

const ProductModal = ({ 
  product, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [stockType, setStockType] = useState("IN");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [inQuantity, setInQuantity] = useState(0);
  const [outQuantity, setOutQuantity] = useState(0);
  const [mfgDate, setMfgDate] = useState("01/10/2025");
  const [expiryDate, setExpiryDate] = useState("11/10/2025");

  // Reset form when modal opens with new product
  useEffect(() => {
    if (isOpen && product) {
      setStockType("IN");
      setInQuantity(0);
      setOutQuantity(0);
      
      if (product.stockMasterVos && product.stockMasterVos.length > 0) {
        setSelectedBatch(product.stockMasterVos[0].stockId.toString());
        setMfgDate(product.stockMasterVos[0].manufactureDate);
        setExpiryDate(product.stockMasterVos[0].expirationDate);
      } else {
        setSelectedBatch("");
        const today = new Date();
        const expiry = new Date();
        expiry.setDate(today.getDate() + (product.productVo?.expirationdays || 30));
        setMfgDate(today.toLocaleDateString('en-GB'));
        setExpiryDate(expiry.toLocaleDateString('en-GB'));
      }
    }
  }, [isOpen, product]);

  // Handle stock type toggle
  const handleStockTypeToggle = () => {
    setStockType(stockType === "IN" ? "OUT" : "IN");
  };

  // Handle form submission
  const handleSave = () => {
    if (!product) return;

    const stockData = {
      product: product,
      type: stockType,
      batchId: selectedBatch,
      inQuantity: stockType === "IN" ? inQuantity : 0,
      outQuantity: stockType === "OUT" ? outQuantity : 0,
      purchasePrice: product.purchasePrice,
      mrp: product.mrp,
      mfgDate,
      expiryDate
    };

    onSave(stockData);
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Add Opening Stock</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-4 space-y-4">
          {/* Stock IN/OUT Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stock IN/OUT</label>
            <div className="flex items-center">
              <span className={`mr-3 text-sm font-medium ${stockType === "IN" ? "text-blue-600" : "text-gray-500"}`}>IN</span>
              <button
                type="button"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  stockType === "IN" ? "bg-blue-600" : "bg-gray-200"
                }`}
                onClick={handleStockTypeToggle}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    stockType === "IN" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`ml-3 text-sm font-medium ${stockType === "OUT" ? "text-blue-600" : "text-gray-500"}`}>OUT</span>
            </div>
          </div>

          {/* Select Product */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50"
              value={product.value}
              readOnly
            />
          </div>

          {/* Select Batch (only for OUT) */}
          {stockType === "OUT" && product.stockMasterVos && product.stockMasterVos.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select batch</label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select batch</option>
                {product.stockMasterVos.map((batch) => (
                  <option key={batch.stockId} value={batch.stockId}>
                    Qty: {batch.quantity} - LC: {batch.landingCost} - MRP: {batch.mrp} - SP: {batch.sellingPrice} - EXP: {batch.expirationDate}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Purchase Price and MRP Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={product.purchasePrice}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MRP Price</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={product.mrp}
                readOnly
              />
            </div>
          </div>

          {/* Quantity Inputs */}
          <div className="grid grid-cols-2 gap-3">
            {stockType === "IN" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">In Qty</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={inQuantity}
                  onChange={(e) => setInQuantity(parseFloat(e.target.value) || 0)}
                  min="0"
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Out Qty</label>
                <input
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={outQuantity}
                  onChange={(e) => setOutQuantity(parseFloat(e.target.value) || 0)}
                  min="0"
                  max={product.stockMasterVos?.find(b => b.stockId.toString() === selectedBatch)?.quantity || 0}
                />
              </div>
            )}
            <div></div>
          </div>

          {/* Expiry Date Section */}
          {product.productVo.isExpiryManage === 1 && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">MFG Date</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={mfgDate}
                  onChange={(e) => setMfgDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                <div className="text-sm text-gray-600 mt-2">
                  {product.productVo.expirationdays}
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Modal Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;