import React, { useState } from 'react';

const ReusableForm = ({ 
  title = '',
  fieldsConfig = [], 
  initialValues = {}, 
  onSubmit,
  submitButtonText = 'Save',
  showSidebar = false,
  columns = 3, // Number of columns for layout
  customClassName = '' // Additional custom classes
}) => {
  const [formData, setFormData] = useState(initialValues);

  const handleInputChange = (e, fieldName) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  // Calendar icon component
  const CalendarIcon = ({ className = "w-4 h-4" }) => (
    <svg 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
      />
    </svg>
  );

  // Helper function to render field based on type
  const renderField = (field) => {
    const value = formData[field.name] || field.defaultValue || '';
    const commonClasses = "w-full border border-gray-300 rounded-md p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500";
    const readOnlyClasses = "w-full border border-gray-300 rounded-md p-2.5 bg-gray-50";
    
    switch (field.type) {
      case 'input':
        return (
          <input
            id={field.name}
            name={field.name}
            type="text"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(e, field.name)}
            required={field.required}
            readOnly={field.readOnly}
            className={field.readOnly ? readOnlyClasses : commonClasses}
          />
        );
      
      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={value}
            onChange={(e) => handleInputChange(e, field.name)}
            required={field.required}
            className={commonClasses}
          >
            {field.placeholder && <option value="">{field.placeholder}</option>}
            {field.options?.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );
      
      case 'date':
        return (
          <div className="relative">
            <input
              id={field.name}
              name={field.name}
              type="date"
              value={value}
              onChange={(e) => handleInputChange(e, field.name)}
              required={field.required}
              className={`${commonClasses} pl-10`}
            />
            <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        );
      
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(e, field.name)}
            rows={field.rows || 3}
            className={commonClasses}
          />
        );

      case 'number':
        return (
          <input
            id={field.name}
            name={field.name}
            type="number"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleInputChange(e, field.name)}
            required={field.required}
            className={commonClasses}
          />
        );
      
      default:
        return null;
    }
  };

  // Group fields by columns for layout
  const groupFieldsByColumns = () => {
    const grouped = [];
    const fieldsPerColumn = Math.ceil(fieldsConfig.length / columns);
    
    for (let i = 0; i < columns; i++) {
      grouped.push(fieldsConfig.slice(i * fieldsPerColumn, (i + 1) * fieldsPerColumn));
    }
    
    return grouped;
  };

  const columnGroups = groupFieldsByColumns();

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${customClassName}`}>
      {title && (
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          {showSidebar && (
            <div className="w-64 bg-gray-50 p-4 rounded">
              <p className="text-sm text-gray-600">Preview</p>
            </div>
          )}
        </div>
      )}

      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-6`}>
        {columnGroups.map((columnFields, columnIndex) => (
          <div key={columnIndex} className="space-y-5">
            {columnFields.map((field) => (
              <div key={field.name}>
                <label 
                  htmlFor={field.name} 
                  className={`block text-sm text-gray-700 mb-1 ${field.required ? 'text-red-500' : ''}`}
                >
                  {field.label}
                </label>
                {renderField(field)}
                {field.description && (
                  <p className="text-xs text-gray-500 mt-1">{field.description}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {submitButtonText && (
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            {submitButtonText}
          </button>
        </div>
      )}
    </form>
  );
};

export default ReusableForm;