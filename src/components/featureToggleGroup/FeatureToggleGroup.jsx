// src/components/settings/FeatureToggleGroup.jsx
import React from "react";
import { Toggle } from "../Toggle/Toggle";

export const FeatureToggleGroup = ({
  title = "Feature Settings",
  features = [],
  columns = "md:grid-cols-2 lg:grid-cols-3", // Responsive grid layout
}) => {
  return (
    <div className="bg-white  rounded-t shadow-sm  p-4 ">
      {/* Title */}
      <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
        {title}
      </h3>

      {/* Features Grid */}
      <div className={`grid grid-cols-1 ${columns} gap-4 pb-2`}>
        {features.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2 px-1 border-b border-gray-100 last:border-b-0"
          >
            {/* Left side: Icon + label */}
            <div className="flex items-center space-x-3">
              {item.icon && <span className="text-lg">{item.icon}</span>}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-700">
                  {item.label}
                </span>
                <span
                  className={`text-xs font-medium ${
                    item.value ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {item.value ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            {/* Right side: Toggle */}
            <div className="transform scale-90">
              <Toggle
                value={item.value}
                onChange={() => item.setter(!item.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
