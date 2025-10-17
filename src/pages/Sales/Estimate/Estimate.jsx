// import React from "react";
// import { purchaseOrders } from "../purchaseOrders";
// import StatusBadge from "@/components/statusBadge/StatusBadge";
// import { ReusableTable } from "@/components/ReusableTable";
// import FileFormatSelector from "../../../components/pdf/FileFormatSelector";

// const Estimate = () => {
//     const stats = [
//         { label: "All Orders", count: 1 },
//         { label: "In Progress", count: 0 },
//         { label: "Delivered", count: 0 },
//         { label: "Partially Delivered", count: 0 },
//         { label: "Exceed", count: 0 },
//         { label: "Completed", count: 1 },
//         { label: "Cancel", count: 0 },
//     ];

//     const columns = [
//         { key: "status", label: "Status", render: (row) => <StatusBadge status={row.status} /> },
//         {
//             key: "poNo",
//             label: "PO No.",
//             render: (row) => (
//                 <a href="#" className="text-blue-600 font-medium hover:underline">
//                     {row.poNo}
//                 </a>
//             ),
//         },
//         { key: "supplier", label: "Supplier" },
//         { key: "poDate", label: "PO Date" },
//         { key: "supplyDate", label: "Supply Date" },
//         { key: "poAmount", label: "PO Amount", render: (row) => `₹${row.poAmount?.toLocaleString()}` },
//         { key: "poQty", label: "PO Qty" },
//         { key: "receivedQty", label: "Received Qty" },
//         { key: "createdBy", label: "Created By" },
//         { key: "location", label: "Location" },
//         { key: "notes", label: "Notes" },
//     ];

//     return (
//         <div className="relative p-6 bg-gray-50 min-h-screen">
//             <h1 className="text-2xl font-bold mb-4">Purchase Order</h1>

//             {/* Summary Cards */}
//             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
//                 {stats.map((stat, idx) => (
//                     <div
//                         key={idx}
//                         className="bg-white p-4 text-center rounded-lg shadow-sm border"
//                     >
//                         <h2 className="text-2xl font-bold text-blue-600">{stat.count}</h2>
//                         <p className="text-gray-600 text-sm">{stat.label}</p>
//                     </div>
//                 ))}
//             </div>

//             {/* Table with FileFormatSelector */}
//             <ReusableTable
//                 title="Purchase Orders"
//                 columns={columns}
//                 data={purchaseOrders}
//                 showCreateButton={true}               // ✅ Show the create button
//                 createButtonText="Create New" // ✅ Text for the button
//                 onCreate={() => alert("Create new Purchase Order")} // ✅ Click handler
//                 showEdit={false}
//                 showDelete={false}
//                 extraComponent={
//                     <FileFormatSelector
//                         data={purchaseOrders.map((row) => {
//                             const newRow = {};
//                             columns.forEach((col) => {
//                                 // Use render if exists, otherwise raw value
//                                 if (col.key === "status") {
//                                     newRow[col.label] = row.status; // Use plain status text
//                                 } else if (col.render) {
//                                     const rendered = col.render(row);
//                                     newRow[col.label] =
//                                         typeof rendered === "string"
//                                             ? rendered
//                                             : rendered.props?.children || "";
//                                 } else {
//                                     newRow[col.label] = row[col.key] ?? "";
//                                 }

//                             });
//                             return newRow;
//                         })}
//                     />
//                 }
//             />

//         </div>
//     );
// };

// export default Estimate;