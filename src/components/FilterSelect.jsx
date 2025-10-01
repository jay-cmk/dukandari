import React from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';

export const FilterSelect = ({
  label,
  options,
  value,
  onChange,
  className = ""
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        <FunnelIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 bg-white pl-10 pr-8 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 appearance-none"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};