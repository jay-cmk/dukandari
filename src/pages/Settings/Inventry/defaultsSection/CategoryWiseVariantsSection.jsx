// src/components/inventory/CategoryWiseVariantsSection.jsx
import React from "react";
import { motion } from "framer-motion";
import EmployeeSearch from "@/components/Search";

export const CategoryWiseVariantsSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.3 }}
    className="bg-white shadow-md rounded-2xl p-6"
  >
    <h2 className="text-lg font-semibold mb-4">📦 Category Wise Variants</h2>

    <div className="flex justify-between mb-3">
      <div className="flex items-center space-x-2">
        <label className="text-sm">Show</label>
        <select className="border rounded-md px-2 py-1">
          <option>10</option>
          <option>25</option>
        </select>
      </div>
      <EmployeeSearch placeholder="Search..." />
    </div>

    <div className="text-center text-gray-500 py-6 border rounded-md">
      No data available in table
    </div>
  </motion.div>
);
