// components/ReusableModal.jsx
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export const ReusableModal = ({
  isOpen,
  onClose,
  onSave,
  title,
  fields,
  initialData = {},
  isEdit = false,
}) => {
  const [formData, setFormData] = React.useState({});

  React.useEffect(() => {
    if (isOpen) {
      const initialFormData = {};
      fields.forEach(field => {
        const value = initialData[field.name];
        initialFormData[field.name] = value !== undefined && value !== null 
          ? value.toString() 
          : field.defaultValue || "";
      });
      setFormData(initialFormData);
    }
  }, [isOpen, initialData, fields]);

  const handleChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSave = () => {
    if (fields.every(field => !field.required || formData[field.name])) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md mx-auto shadow-xl border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-4 py-2 text-sm border border-gray-300 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Close
          </Button>
          <div className="py-1">
            <Button 
              onClick={handleSave} 
              className="py-1 text-sm"
              disabled={fields.some(field => field.required && !formData[field.name])}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};