// src/components/inventory/UnitOfMeasurementSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import EmployeeSearch from "@/components/Search";

export const UnitOfMeasurementSection = () => {
  const data = [
    { id: 1, name: "kgs", code: "kkgss", uqc: "KGS-KILOGRAMS", decimals: 3, createdBy: "HUMMING VEDA" },
    { id: 2, name: "PKT", code: "PKT", uqc: "BAG-BAGS", decimals: 3, createdBy: "HUMMING VEDA" },
    { id: 3, name: "KG", code: "KG", uqc: "KGS-KILOGRAMS", decimals: 3, createdBy: "HUMMING VEDA" },
    { id: 4, name: "PIECES", code: "PCS", uqc: "PCS-PIECES", decimals: 3, createdBy: "HUMMING VEDA" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white shadow-md rounded-2xl p-6 mb-6"
    >
      <h2 className="text-lg font-semibold mb-4">⚖️ Unit of Measurement</h2>

      <div className="flex justify-between mb-3">
        <div className="flex items-center space-x-2">
          <label className="text-sm">Show</label>
          <select className="border rounded-md px-2 py-1">
            <option>10</option>
            <option>25</option>
          </select>
        </div>
        <EmployeeSearch placeholder="Search List..." />
        <Button>Create New</Button>
      </div>

      <motion.table layout className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left">#</th>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Code</th>
            <th className="border p-2 text-left">UQC Code</th>
            <th className="border p-2 text-left">No Of Decimal Places</th>
            <th className="border p-2 text-left">Created By</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <motion.tr key={row.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <td className="border p-2">{row.id}</td>
              <td className="border p-2">{row.name}</td>
              <td className="border p-2">{row.code}</td>
              <td className="border p-2">{row.uqc}</td>
              <td className="border p-2">{row.decimals}</td>
              <td className="border p-2">{row.createdBy}</td>
              <td className="border p-2">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">✏️</Button>
                  <Button size="sm" variant="outline">🗑️</Button>
                </div>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </motion.div>
  );
};
