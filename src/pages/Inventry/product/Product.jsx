import React from 'react';
import { ReusableTable } from '@/components/ReusableTable'; // Adjust path as needed
<<<<<<< HEAD
import { Link, useNavigate } from 'react-router-dom';
=======
import { PlusIcon, EyeIcon } from '@heroicons/react/24/outline'; // Assuming icons for actions if needed
import { useNavigate } from 'react-router-dom';
import IconHome from '@/components/HomeIcon/IconHome';
>>>>>>> 927e860ffbdc23fbd62c563312ef1351eeaf35a8

const Product = () => {
  const title = 'Setup Opening Stock';
  const navigate = useNavigate(); // ✅ React Router hook

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
    {
      id: 6,
      itemCode: 'AP5349',
      category: '1st',
      brand: '24MANTRA',
      name: 'MS',
      mrp: 682.5,
      sellingPrice: 682.5,
      hsn: '',
      qty: 0,
      status: 'ACTIVE',
      showOnline: true,
    },
    {
      id: 7,
      itemCode: 'AP5348',
      category: 'FOURTH FLOOR-A',
      brand: '24MANTRA',
      name: 'Stock Transfer product testing',
      mrp: 650.0,
      sellingPrice: 650.0,
      hsn: '',
      qty: 0,
      status: 'ACTIVE',
      showOnline: false,
    },
    {
      id: 8,
      itemCode: '73653',
      category: 'Jeans',
      brand: 'Lee',
      name: 'Rajafari18',
      mrp: 2500.0,
      sellingPrice: 2350.0,
      hsn: '09840',
      qty: 0,
      status: 'ACTIVE',
      showOnline: true,
    },
    {
      id: 9,
      itemCode: '73652',
      category: 'Jeans',
      brand: 'Lee',
      name: 'Rajafari17',
      mrp: 2500.0,
      sellingPrice: 2350.0,
      hsn: '09879',
      qty: -1.0,
      status: 'ACTIVE',
      showOnline: true,
    },
    {
      id: 10,
      itemCode: '73651',
      category: 'Jeans',
      brand: 'Lee',
      name: 'Rajafari16',
      mrp: 2500.0,
      sellingPrice: 2400.0,
      hsn: '09878',
      qty: 0,
      status: 'ACTIVE',
      showOnline: false,
    },
  ];

  // ✅ Only change: render "Name" as clickable link
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

  const onCreate = () => {
    navigate('/product-form', { state: { mode: 'create' } });
  };

  const onEdit = (row) => {
    console.log('Edit product:', row);
  };

  const onDelete = (row) => {
    console.log('Delete product:', row);
  };

<<<<<<< HEAD
  return (
    <div className="p-4">
      {/* Toolbar */}
      <div className="mb-4 flex gap-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Import</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Update Bulk Products
        </button>
        <button className="px-4 py-2 bg-green-500 text-white rounded">
          Update Bulk Product Variation
        </button>
      </div>

      {/* Table */}
      <ReusableTable
        title={title}
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
=======
 return (
  <div className="p-4">
  <div className="flex items-center gap-5 justify-between">
  <div className="flex items-center gap-5">
    <h1 className="text-xl text-gray-500">Product</h1>
    <div className="h-6 w-px bg-gray-400"></div>
    <div className="flex items-center gap-4">
      <IconHome className="text-gray-500 w-8 h-8" />
    </div>
  </div>
  
  <a href="/openingStock" className="text-sky-500 no-underline hover:text-sky-600">
    setup opening stock
  </a>
</div>
    
    {/* Additional buttons as per image */}
    <div className="mb-4 flex gap-2 mt-3">
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Import</button>
      <button className="px-4 py-2 bg-green-500 text-white rounded">Update Bulk Products</button>
      <button className="px-4 py-2 bg-green-500 text-white rounded">Update Bulk Product Variation</button>
    </div>
    
    <ReusableTable
      // title={title}
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
}
export default Product;
>>>>>>> 927e860ffbdc23fbd62c563312ef1351eeaf35a8
