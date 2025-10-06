import React, { useState } from "react";
import { motion } from "framer-motion";
import { YesNoSwitch } from "../../../../components/switch/YesNoSwitch";
import { Toggle } from "../../../../components/Toggle/Toggle";
import { FeatureToggleGroup } from "@/components/featureToggleGroup/FeatureToggleGroup";

export const DefaultsSection = () => {
  // State hooks
  const [purchaseTax, setPurchaseTax] = useState(false);
  const [salesTax, setSalesTax] = useState(true);
  const [createNewProduct, setCreateNewProduct] = useState(true);
  const [garmentTax, setGarmentTax] = useState(false);
  const [allowDuplication, setAllowDuplication] = useState(false);
  const [multiBarcode, setMultiBarcode] = useState(true);
  const [expiry, setExpiry] = useState(true);
  const [duplicateMultiBarcode, setDuplicateMultiBarcode] = useState(true);
  const [billRestriction, setBillRestriction] = useState(false);


    const featureList = [
    { label: "Create New Product from Entire System", value: createNewProduct, setter: setCreateNewProduct, icon: "🆕" },
    { label: "Garment Tax", value: garmentTax, setter: setGarmentTax, icon: "👕" },
    { label: "Allow Duplication Product Names", value: allowDuplication, setter: setAllowDuplication, icon: "📝" },
    { label: "Multi Barcode", value: multiBarcode, setter: setMultiBarcode, icon: "📊" },
    { label: "Expiry", value: expiry, setter: setExpiry, icon: "📅" },
    { label: "Duplicate Multi Barcode", value: duplicateMultiBarcode, setter: setDuplicateMultiBarcode, icon: "🔗" },
    { label: "Bill Restriction and Warning", value: billRestriction, setter: setBillRestriction, icon: "⚠️" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-4 border border-gray-200"
    >
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white text-sm">🧩</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Defaults</h2>
          <p className="text-sm text-gray-500 mt-1">Configure your default system settings</p>
        </div>
      </div>

      {/* Default selectors */}
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Default Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Default Category", value: "TEA & COFFEE", icon: "📦" },
            { label: "Default Brand", value: "ccgv", icon: "🏷️" },
            { label: "Default Tax", value: "Select Tax", select: true, icon: "💰" },
            { label: "Default UOM", value: "kgs", icon: "⚖️" },
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <span className="mr-2 text-base">{item.icon}</span>
                {item.label}
              </label>
              <div className="flex space-x-2">
                {item.select ? (
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                    <option>{item.value}</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={item.value}
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                )}
                <button className="px-4 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-gray-600 font-medium">
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax checkboxes */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Tax Settings</h3>
        <div className="flex flex-wrap gap-8">
          <label className="flex items-center space-x-3 group cursor-pointer">
            <input
              type="checkbox"
              checked={purchaseTax}
              onChange={() => setPurchaseTax(!purchaseTax)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Purchase Tax Including</span>
              <span className="text-xs text-gray-500">Include tax in purchase prices</span>
            </div>
          </label>

          <label className="flex items-center space-x-3 group cursor-pointer">
            <input
              type="checkbox"
              checked={salesTax}
              onChange={() => setSalesTax(!salesTax)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">Sales Tax Including</span>
              <span className="text-xs text-gray-500">Include tax in sales prices</span>
            </div>
          </label>
        </div>
      </div>

      {/* Feature toggles */}
      {/* ✅ Reusable Feature Toggle Group */}
      <FeatureToggleGroup title="Feature Settings" features={featureList} />
    </motion.div>
  );
};