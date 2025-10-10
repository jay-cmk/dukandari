// // src/components/inventory/UnitOfMeasurementSection.jsx
// import React from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import EmployeeSearch from "@/components/Search";

// export const UnitOfMeasurementSection = () => {
//   const data = [
//     { id: 1, name: "kgs", code: "kkgss", uqc: "KGS-KILOGRAMS", decimals: 3, createdBy: "HUMMING VEDA" },
//     { id: 2, name: "PKT", code: "PKT", uqc: "BAG-BAGS", decimals: 3, createdBy: "HUMMING VEDA" },
//     { id: 3, name: "KG", code: "KG", uqc: "KGS-KILOGRAMS", decimals: 3, createdBy: "HUMMING VEDA" },
//     { id: 4, name: "PIECES", code: "PCS", uqc: "PCS-PIECES", decimals: 3, createdBy: "HUMMING VEDA" },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4, delay: 0.2 }}
//       className="bg-white shadow-md rounded-2xl p-6 mb-6"
//     >
//       <h2 className="text-lg font-semibold mb-4">⚖️ Unit of Measurement</h2>

//       <div className="flex justify-between mb-3">
//         <div className="flex items-center space-x-2">
//           <label className="text-sm">Show</label>
//           <select className="border rounded-md px-2 py-1">
//             <option>10</option>
//             <option>25</option>
//           </select>
//         </div>
//         <EmployeeSearch placeholder="Search List..." />
//         <Button>Create New</Button>
//       </div>

//       <motion.table layout className="w-full border text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2 text-left">#</th>
//             <th className="border p-2 text-left">Name</th>
//             <th className="border p-2 text-left">Code</th>
//             <th className="border p-2 text-left">UQC Code</th>
//             <th className="border p-2 text-left">No Of Decimal Places</th>
//             <th className="border p-2 text-left">Created By</th>
//             <th className="border p-2 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row) => (
//             <motion.tr key={row.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//               <td className="border p-2">{row.id}</td>
//               <td className="border p-2">{row.name}</td>
//               <td className="border p-2">{row.code}</td>
//               <td className="border p-2">{row.uqc}</td>
//               <td className="border p-2">{row.decimals}</td>
//               <td className="border p-2">{row.createdBy}</td>
//               <td className="border p-2">
//                 <div className="flex space-x-2">
//                   <Button size="sm" variant="outline">✏️</Button>
//                   <Button size="sm" variant="outline">🗑️</Button>
//                 </div>
//               </td>
//             </motion.tr>
//           ))}
//         </tbody>
//       </motion.table>
//     </motion.div>
//   );
// };


// pages/AdditionalCharge.jsx
import React, { useState } from "react";
import { ReusableTable } from "@/components/ReusableTable";
import { ReusableModal } from "@/components/ReusableModal";

// ✅ Configuration for Additional Charge
const additionalChargeConfig = {
  title: "Additional Charge Master",
  data: [
    {
      id: 1,
      chargeName: "test",
      defaultValue: 10,
      tax: "Gst 15",
      accountGroup: "Indirect Expenses",
      hsnCode: "",
      createdBy: "KIRTIRAJ",
    },
    {
      id: 2,
      chargeName: "cov",
      defaultValue: 10,
      tax: "GST 0",
      accountGroup: "Indirect Incomes",
      hsnCode: "19053100",
      createdBy: "SWAGRUHA FOODS",
    },
  ],
  columns: [
    { key: "chargeName", label: "Additional Charge", sortable: true },
    { key: "defaultValue", label: "Default Value", sortable: true },
    { key: "tax", label: "Tax", sortable: true },
    { key: "accountGroup", label: "Account Group", sortable: true },
    { key: "hsnCode", label: "HSN Code", sortable: true },
    { key: "createdBy", label: "Created By", sortable: true },
  ],
  modalFields: [
    {
      name: "chargeName",
      label: "Additional Charge Name",
      type: "text",
      required: true,
      placeholder: "Enter Charge Name",
    },
    {
      name: "defaultValue",
      label: "Default Value",
      type: "number",
      required: true,
      placeholder: "Enter Default Value",
    },
    {
      name: "tax",
      label: "Tax",
      type: "select",
      required: true,
      options: [
        { value: "GST 0", label: "GST 0" },
        { value: "Gst 15", label: "Gst 15" },
        { value: "GST 18", label: "GST 18" },
      ],
    },
    {
      name: "accountGroup",
      label: "Account Group",
      type: "select",
      required: true,
      options: [
        { value: "Indirect Expenses", label: "Indirect Expenses" },
        { value: "Indirect Incomes", label: "Indirect Incomes" },
      ],
    },
    {
      name: "hsnCode",
      label: "HSN Code",
      type: "text",
      required: false,
      placeholder: "Enter HSN Code",
    },
  ],
};

export default function UnitOfMeasurementSection() {
  const [data, setData] = useState(additionalChargeConfig.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // 🟢 Create new record
  const handleCreate = () => {
    setSelectedItem(null);
    setIsEdit(false);
    setIsModalOpen(true);
  };

  // 🟢 Edit record
  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // 🟢 Delete record
  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.chargeName}"?`)) {
      setData((prev) => prev.filter((d) => d.id !== item.id));
    }
  };

  // 🟢 Save record (add/edit)
  const handleSave = (formData) => {
    if (isEdit && selectedItem) {
      // Update existing
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? {
                ...item,
                ...formData,
                defaultValue: parseFloat(formData.defaultValue) || 0,
              }
            : item
        )
      );
    } else {
      // Create new
      const newId = data.length ? Math.max(...data.map((d) => d.id)) + 1 : 1;
      const newItem = {
        ...formData,
        id: newId,
        defaultValue: parseFloat(formData.defaultValue) || 0,
        createdBy: "KIRTIRAJ",
      };
      setData((prev) => [...prev, newItem]);
    }

    // ✅ Close modal and reset form
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      <ReusableTable
        title={additionalChargeConfig.title}
        data={data}
        columns={additionalChargeConfig.columns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        createButtonText="Create New Charge"
      />

      <ReusableModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onSave={handleSave}
        title={isEdit ? "Edit Additional Charge" : "New Additional Charge"}
        fields={additionalChargeConfig.modalFields}
        initialData={selectedItem || {}}
        isEdit={isEdit}
      />
    </>
  );
}
