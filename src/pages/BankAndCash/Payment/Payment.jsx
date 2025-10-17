import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReusableTable } from "@/components/ReusableTable";
import IconHome from "@/components/HomeIcon/IconHome";

// Configuration for Payment
const paymentConfig = {
  data: [],
  columns: [
    { key: "paymentNo", label: "Payment No", sortable: true },
    { key: "partyName", label: "Party Name", sortable: true },
    { key: "paymentMode", label: "Payment Mode", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "amount", label: "Amount", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "createdBy", label: "Created By", sortable: true },
    { key: "actions", label: "Action", sortable: false }
  ]
};

export default function Payment() {
  const [data, setData] = useState(paymentConfig.data);
  const navigate = useNavigate();

  const handleCreate = () => {
    // Navigate to create new payment page
    navigate("/createNewPayment");
  };

  const handleEdit = (item) => {
    // Handle edit functionality
    console.log("Edit payment:", item);
    // If you want to navigate to edit page, you can do:
    // navigate(`/editPayment/${item.id}`);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete payment "${item.paymentNo}"?`)) {
      setData(prev => prev.filter(d => d.id !== item.id));
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center gap-5 mb-6">
        <h1 className="text-2xl text-gray-500">Payment</h1>
        <div className="h-6 w-px bg-gray-400"></div>
        <div className="flex items-center gap-4">
          <IconHome className="text-gray-500 w-8 h-8" />
        </div>
      </div>

      {/* Table Section */}
      <ReusableTable
        data={data}
        columns={paymentConfig.columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        createButtonText="Create New"
        emptyMessage="No data available in table"
      />
    </div>
  );
}