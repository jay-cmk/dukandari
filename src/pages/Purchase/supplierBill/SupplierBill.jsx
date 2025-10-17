import React from "react";
import StatusBadge from "@/components/statusBadge/StatusBadge";
import { ReusableTable } from "@/components/ReusableTable";
import FileFormatSelector from "../../../components/pdf/FileFormatSelector";

const SupplierBill = () => {
  const stats = [
    { label: "Total Purchase", count: "10.00 L" },
    { label: "Paid", count: "0" },
    { label: "Unpaid", count: "10.00 L" },
  ];

  const columns = [
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "billNo",
      label: "Bill No.",
      render: (row) => (
        <a href="#" className="text-blue-600 font-medium hover:underline">
          {row.billNo}
        </a>
      ),
    },
    { key: "supplier", label: "Supplier" },
    { key: "billDate", label: "Bill Date" },
    { key: "poNo", label: "PO No" },
    {
      key: "billAmount",
      label: "Bill Amount",
      render: (row) => `₹${row.billAmount.toLocaleString()}`,
    },
    {
      key: "paidAmount",
      label: "Paid Amount",
      render: (row) => `₹${row.paidAmount.toLocaleString()}`,
    },
    {
      key: "dueAmount",
      label: "Due Amount",
      render: (row) => `₹${row.dueAmount.toLocaleString()}`,
    },
    {
      key: "taxAmount",
      label: "Tax Amount",
      render: (row) => `₹${row.taxAmount.toLocaleString()}`,
    },
    { key: "dueDate", label: "Due Date" },
    { key: "createdBy", label: "Created By" },
    { key: "location", label: "Location" },
    { key: "notes", label: "Notes" },
    { key: "actions", label: "Actions" },
  ];

  const data = [
    {
      
      status: "OVERDUE",
      billNo: "123asd",
      supplier: "HUMMING VEDA",
      billDate: "10/09/2025",
      poNo: "-",
      billAmount: 200000.0,
      paidAmount: 0.0,
      dueAmount: 200000.0,
      taxAmount: 0.0,
      dueDate: "11/09/2025",
      createdBy: "HUMMING VEDA",
      location: "HUMMING VEDA",
      notes: "-",
    },
    {
     
      status: "OVERDUE",
      billNo: "123",
      supplier: "HUMMING VEDA",
      billDate: "10/09/2025",
      poNo: "-",
      billAmount: 200000.0,
      paidAmount: 0.0,
      dueAmount: 200000.0,
      taxAmount: 0.0,
      dueDate: "11/09/2025",
      createdBy: "HUMMING VEDA",
      location: "HUMMING VEDA",
      notes: "-",
    },
    {
     
      status: "OVERDUE",
      billNo: "abcqw",
      supplier: "HUMMING VEDA",
      billDate: "10/09/2025",
      poNo: "-",
      billAmount: 200000.0,
      paidAmount: 0.0,
      dueAmount: 200000.0,
      taxAmount: 0.0,
      dueDate: "11/09/2025",
      createdBy: "HUMMING VEDA",
      location: "HUMMING VEDA",
      notes: "-",
    },
    {
      
      status: "OVERDUE",
      billNo: "BIL4",
      supplier: "HUMMING VEDA",
      billDate: "10/09/2025",
      poNo: "-",
      billAmount: 200000.0,
      paidAmount: 0.0,
      dueAmount: 200000.0,
      taxAmount: 0.0,
      dueDate: "11/09/2025",
      createdBy: "HUMMING VEDA",
      location: "HUMMING VEDA",
      notes: "-",
    },
    {
     
      status: "OVERDUE",
      billNo: "BIL3",
      supplier: "HUMMING VEDA",
      billDate: "10/09/2025",
      poNo: "-",
      billAmount: 200000.0,
      paidAmount: 0.0,
      dueAmount: 200000.0,
      taxAmount: 0.0,
      dueDate: "25/09/2025",
      createdBy: "HUMMING VEDA",
      location: "HUMMING VEDA",
      notes: "-",
    },
  ];

  return (
    <div className="relative  bg-gray-50 min-h-screen">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Supplier Bill</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-4 text-center rounded-lg shadow-sm border border-gray-200"
          >
            <h2 className="text-3xl font-bold text-blue-600">{stat.count}</h2>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <ReusableTable
        title="Supplier Bill"
        columns={columns}
        data={data}
        showCreateButton={true}
        createButtonText="Create New"
        onCreate={() => alert("Create new Supplier Bill")}
        showEdit={false}
        showDelete={false}
        extraComponent={
          <FileFormatSelector
            data={data.map((row) => {
              const formattedRow = {};
              columns.forEach((col) => {
                if (col.key === "status") {
                  formattedRow[col.label] = row.status;
                } else if (col.render) {
                  const rendered = col.render(row);
                  formattedRow[col.label] =
                    typeof rendered === "string"
                      ? rendered
                      : rendered.props?.children || "";
                } else {
                  formattedRow[col.label] = row[col.key] ?? "";
                }
              });
              return formattedRow;
            })}
          />
        }
      />
    </div>
  );
};

export default SupplierBill;
