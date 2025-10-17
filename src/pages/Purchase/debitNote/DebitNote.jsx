import React, { useState } from "react";
import StatusBadge from "@/components/statusBadge/StatusBadge";
import { ReusableTable } from "@/components/ReusableTable";
import FileFormatSelector from "../../../components/pdf/FileFormatSelector";
import { useNavigate } from "react-router-dom";

const DebitNote = () => {
   const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");

  const columns = [
    { key: "srNo", label: "SR No." },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "debitNoteNo",
      label: "Debit Note No.",
      render: (row) => (
        <a href="#" className="text-blue-600 font-medium hover:underline">
          {row.debitNoteNo}
        </a>
      ),
    },
    { key: "supplier", label: "Supplier" },
    { key: "debitNoteDate", label: "Debit Note Date" },
    {
      key: "debitNoteAmount",
      label: "Debit Note Amount",
      render: (row) => `₹${row.debitNoteAmount.toLocaleString()}`,
    },
    {
      key: "taxAmount",
      label: "Tax Amount",
      render: (row) => `${row.taxAmount.toFixed(3)}`,
    },
    { key: "createdBy", label: "Created By" },
    { key: "location", label: "Location" },
    { key: "notes", label: "Notes" },
  ];

  const data = [
    {
      srNo: 1,
      status: "OPEN",
      debitNoteNo: "BIL2",
      supplier: "HUMMING VEDA",
      debitNoteDate: "10/09/2025",
      debitNoteAmount: 20000.0,
      taxAmount: 0.0,
      createdBy: "HUMMING VEDA",
      location: "HUMMING VEDA",
      notes: "-",
    },
  ];

  // total
  const totalAmount = data.reduce((sum, item) => sum + item.debitNoteAmount, 0);
  const totalTax = data.reduce((sum, item) => sum + item.taxAmount, 0);

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen">
      {/* Header Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Debit Note</h1>
      </div>

      {/* Total Amount Box */}
      <div className="flex justify-center mb-8">
        <div className="bg-white shadow-md rounded-lg px-10 py-6 text-center">
          <h2 className="text-3xl font-bold text-blue-600">
            {totalAmount.toLocaleString()}
          </h2>
          <p className="text-gray-600 text-sm mt-1">Total Amount</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-gray-200 mb-4">
        {["All", "Unpaid"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <ReusableTable
        title=""
        columns={columns}
        data={data}
        showCreateButton={true}
        createButtonText="Create New"
        onCreate={() => navigate('/new')}
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
        footerRow={{
          debitNoteAmount: `₹${totalAmount.toLocaleString()}`,
          taxAmount: totalTax.toFixed(3),
        }}
      />
    </div>
  );
};

export default DebitNote;
