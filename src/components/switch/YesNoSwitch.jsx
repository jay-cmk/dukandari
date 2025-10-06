// src/components/inventory/YesNoSwitch.jsx
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export const YesNoSwitch = ({ label, value, onChange }) => (
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="flex items-center space-x-2"
  >
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <Button onClick={onChange} variant={value ? "default" : "outline"}>
      {value ? "Yes" : "No"}
    </Button>
  </motion.div>
);
