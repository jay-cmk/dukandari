import React from "react";
import StatusBadge from "@/components/statusBadge/StatusBadge";
import { ReusableTable } from "@/components/ReusableTable";
import FileFormatSelector from "../../../components/pdf/FileFormatSelector";

const MaterialInword = () => {
    const stats = [
        { label: "All Orders", count: 1 },
        { label: "In Progress", count: 1 },
        { label: "Completed", count: 0 },
    ];

    const columns = [
        
        { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
        {
            key: "inwardNo",
            label: "Inward No.",
            render: (row) => (
                <a href="#" className="text-blue-600 font-medium hover:underline">
                    {row.inwardNo}
                </a>
            ),
        },
        { key: "supplier", label: "Supplier" },
        { key: "inwardDate", label: "Inward Date" },
        { key: "poDate", label: "PO Date" },
        { key: "poNo", label: "PO No" },
        { key: "poAmount", label: "PO Amount", render: (row) => `₹${row.poAmount.toLocaleString()}` },
        { key: "poQty", label: "PO Qty" },
        { key: "inwardAmount", label: "Inward Amount", render: (row) => `₹${row.inwardAmount.toLocaleString()}` },
        { key: "taxAmount", label: "Tax Amount" },
        { key: "inwardQty", label: "Inward Qty" },
        { key: "receivedBy", label: "Received By" },
        { key: "createdBy", label: "Created By" },
        { key: "location", label: "Location" },
        { key: "notes", label: "Notes" },
    ];

    const data = [
        {
            
            status: "INPROGRESS",
            inwardNo: "MI47",
            supplier: "—",
            inwardDate: "10/09/2025",
            poDate: "10/09/2025",
            poNo: "BIL7",
            poAmount: 24000.0,
            poQty: 12,
            inwardAmount: 100000.0,
            taxAmount: 0.0,
            inwardQty: 50,
            receivedBy: "-",
            createdBy: "HUMMING VEDA",
            location: "HUMMING VEDA",
            notes: "-",
        },
    ];

    return (
        <div className="relative bg-gray-50 min-h-screen">
            <div className="p-3">
                <h1 className="text-2xl font-bold mb-6">Material Inward</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="bg-white  text-center rounded-lg shadow-sm border border-gray-200"
                        >
                            <h2 className="text-3xl font-bold text-blue-600">{stat.count}</h2>
                            <p className="text-gray-600 text-sm">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* ✅ FIX: scrollable container */}
                <div className="overflow-x-auto">
                    <ReusableTable
                        title="Material Inward"
                        columns={columns}
                        data={data}
                        showCreateButton={true}
                        createButtonText="Create New"
                        onCreate={() => alert("Create new Material Inward entry")}
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
            </div>
        </div>

    );
};

export default MaterialInword;
