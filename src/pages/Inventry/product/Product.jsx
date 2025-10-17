import React from 'react';
import { ReusableTable } from '@/components/ReusableTable';
import { useNavigate } from 'react-router-dom';
import IconHome from '@/components/HomeIcon/IconHome';

const Product = () => {
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      itemCode: 'AP5346',
      category: 'TEA&COFFEE',
      brand: 'ccgy',
      name: 'Budsx',
      mrp: 150.0,
      sellingPrice: 150.0,
      hsn: '',
      qty: 140.0,
      status: 'ACTIVE',
      showOnline: true,
    },
    {
      id: 2,
      itemCode: 'AP5342',
      category: 'TEA&COFFEE',
      brand: 'ARCOGYA',
      name: 'temp',
      mrp: 1560.0,
      sellingPrice: 1560.0,
      hsn: '0902',
      qty: 44.9,
      status: 'ACTIVE',
      showOnline: false,
    },
    {
      id: 3,
      itemCode: 'AP5341',
      category: 'COOKING',
      brand: 'ANCHOR',
      name: 'test product',
      mrp: 0.0,
      sellingPrice: 0.0,
      hsn: '',
      qty: 15.0,
      status: 'ACTIVE',
      showOnline: true,
    },
    {
      id: 4,
      itemCode: '8901872576',
      category: 'TEA&COFFEE',
      brand: 'ARCOGYA',
      name: 'AROGYA SONTI COFFEE POWDER 15G',
      mrp: 139.0,
      sellingPrice: 130.0,
      hsn: '',
      qty: -6.0,
      status: 'ACTIVE',
      showOnline: true,
    },
    {
      id: 5,
      itemCode: 'AP5340',
      category: '1st',
      brand: '24MANTRA',
      name: 'shani',
      mrp: 1300.0,
      sellingPrice: 1300.0,
      hsn: '',
      qty: -15.0,
      status: 'ACTIVE',
      showOnline: false,
    },
  ];

  const columns = [
    { key: 'itemCode', label: 'Item Code' },
    { key: 'category', label: 'Category' },
    { key: 'brand', label: 'Brand' },
    {
      key: 'name',
      label: 'Name',
      render: (row) => (
        <button
          onClick={() => navigate(`/product/${row.id}`)}
          className="text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
        >
          {row.name}
        </button>
      ),
    },
    { key: 'mrp', label: 'MRP' },
    { key: 'sellingPrice', label: 'Selling Price' },
    { key: 'hsn', label: 'HSN' },
    { key: 'qty', label: 'Qty' },
    { key: 'status', label: 'Status' },
    { key: 'showOnline', label: 'Show Online' },
  ];

  const onCreate = () => navigate('/product-form', { state: { mode: 'create' } });
  const onEdit = (row) => console.log('Edit product:', row);
  const onDelete = (row) => console.log('Delete product:', row);

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-5">
          <h1 className="text-xl text-gray-700 font-semibold">Product</h1>
          <div className="h-6 w-px bg-gray-400"></div>
          <IconHome className="text-gray-500 w-6 h-6" />
        </div>

        <a
          href="/openingStock"
          className="text-sky-500 no-underline hover:text-sky-600"
        >
          Setup Opening Stock
        </a>
      </div>

      {/* Action Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Import
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Update Bulk Products
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Update Bulk Product Variation
        </button>
      </div>

      {/* Product Table */}
      <ReusableTable
        data={data}
        columns={columns}
        onCreate={onCreate}
        onEdit={onEdit}
        onDelete={onDelete}
        createButtonText="Create New"
        searchPlaceholder="Filter List"
        emptyMessage="No products found"
        showCreateButton={true}
        showEdit={true}
        showDelete={true}
      />
    </div>
  );
};

export default Product;
