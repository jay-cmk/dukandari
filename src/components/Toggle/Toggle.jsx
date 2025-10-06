// src/components/inventory/Toggle.jsx
import React from "react";
import { motion } from "framer-motion";

export const Toggle = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between space-x-2">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <motion.button
      onClick={onChange}
      whileTap={{ scale: 0.9 }}
      animate={{ backgroundColor: value ? "#3B82F6" : "#E5E7EB" }}
      className="relative w-14 h-6 rounded-full transition-colors duration-300"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute top-0.5 left-[2px] w-5 h-5 rounded-full bg-white shadow ${
          value ? "translate-x-8" : "translate-x-0"
        }`}
      />
    </motion.button>
  </div>
);
