import React, { useState } from "react";
import { ReusableTable } from "@/components/ReusableTable";
import IconHome from "@/components/HomeIcon/IconHome";

// Stock data matching your table structure
const stockData = [
  { 
    id: 1,
    itemCode: "A953436",
    productName: "Budsx black",
    brandName: "ccgv",
    availableQty: 20,
    mrp: 150.000,
    stockValue: 2000.000,
    landingStockValue: 2360.000
  },
  { 
    id: 2,
    itemCode: "A953437",
    productName: "Budsx blue",
    brandName: "ccgv",
    availableQty: 80,
    mrp: 150.000,
    stockValue: 8000.000,
    landingStockValue: 9440.000
  },
  { 
    id: 3,
    itemCode: "A953438",
    productName: "Budsx red",
    brandName: "ccgv",
    availableQty: 40,
    mrp: 153.400,
    stockValue: 4000.000,
    landingStockValue: 4720.000
  },
  { 
    id: 4,
    itemCode: "A953432",
    productName: "temp",
    brandName: "AROGHYA",
    availableQty: 449,
    mrp: 1560.000,
    stockValue: 538800.000,
    landingStockValue: 538800.000
  },
  { 
    id: 5,
    itemCode: "A953431",
    productName: "test product",
    brandName: "ANCHOR",
    availableQty: 15,
    mrp: 0.000,
    stockValue: 0.000,
    landingStockValue: 0.000
  },
  { 
    id: 6,
    itemCode: "890118572756",
    productName: "AROGHYA SONTI COFFEE POWDER 150G",
    brandName: "AROGHYA",
    availableQty: -6,
    mrp: 139.000,
    stockValue: -618.000,
    landingStockValue: -648.900
  },
  { 
    id: 7,
    itemCode: "A953430",
    productName: "shani",
    brandName: "24 MANTRA",
    availableQty: -151,
    mrp: 1300.000,
    stockValue: -151000.000,
    landingStockValue: -151000.000
  },
  { 
    id: 8,
    itemCode: "A953429",
    productName: "MS",
    brandName: "24 MANTRA",
    availableQty: 0,
    mrp: 682.500,
    stockValue: 0,
    landingStockValue: 0.000
  },
  { 
    id: 9,
    itemCode: "A953428",
    productName: "Stock Transfer product testing",
    brandName: "24 MANTRA",
    availableQty: 0,
    mrp: 650.000,
    stockValue: 0,
    landingStockValue: 0.000
  },
  { 
    id: 10,
    itemCode: "73653",
    productName: "RajaFarari18",
    brandName: "Lee",
    availableQty: 0,
    mrp: 2500.000,
    stockValue: 0,
    landingStockValue: 0.000
  }
];

// Define table columns for stock data
const columns = [
  {
    key: "itemCode",
    label: "Item Code",
  },
  {
    key: "productName",
    label: "Product Name",
  },
  {
    key: "brandName",
    label: "Brand Name",
  },
  {
    key: "availableQty",
    label: "Available Qty",
  },
  {
    key: "mrp",
    label: "MRP",
  },
  {
    key: "stockValue",
    label: "Stock Value",
  },
  {
    key: "landingStockValue",
    label: "Landing Stock Value",
  }
];

export default function Stock() {
  const [stock] = useState(stockData);

  return (
    <div className="min-h-screen bg-gray-50 p-2 md:p-3">
      {/* Title Section */}
      <div className="flex items-center gap-5 mb-6">
        <h1 className="text-2xl text-gray-500">Stock</h1>
        <div className="h-6 w-px bg-gray-400"></div>
        <div className="flex items-center gap-4">
          <IconHome className="text-gray-500 w-8 h-8" />
        </div>
      </div>

      {/* Table Section */}
      <ReusableTable
        // title="Stock List"
        data={stock}
        columns={columns}
        searchPlaceholder="Search stock items..."
        emptyMessage="No stock items found"
        showCreateButton={false}
        showEdit={false}
        showDelete={false}
      />
    </div>
  );
}