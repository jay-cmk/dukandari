import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Normally you'd fetch from API, but using mock data for now
  const product = {
    id,
    name: 'KES/RHYM/Plazo Set',
    printName: 'Plazo Set',
    department: 'CLOTHING',
    category: 'SET',
    subCategory: 'PLZ-SET',
    brand: 'RHYM',
    salesTax: 'GST 12%',
    unit: 'PIECES',
    hasExpiry: 'Yes',
    expiryDays: '30',
    totalQty: 24.0,
    createdOn: '03-10-2025 17:57:48',
    createdBy: 'KIRTIRAJ',
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">
            {product.name}
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Back
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p><strong>Print Name:</strong> {product.printName}</p>
            <p><strong>Department:</strong> {product.department}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Sub Category:</strong> {product.subCategory}</p>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Sales Tax:</strong> {product.salesTax}</p>
          </div>

          <div>
            <p><strong>Unit:</strong> {product.unit}</p>
            <p><strong>Has Expiry:</strong> {product.hasExpiry}</p>
            <p><strong>Expiration Days:</strong> {product.expiryDays}</p>
            <p><strong>Total Qty:</strong> {product.totalQty}</p>
            <p><strong>Created On:</strong> {product.createdOn}</p>
            <p><strong>Created By:</strong> {product.createdBy}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
