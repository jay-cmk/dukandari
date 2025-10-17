// components/CustomSearchDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';

const CustomSearchDropdown = ({ 
  value, 
  onChange, 
  options, 
  placeholder = "Select...",
  searchable = false,
  className = "",
  renderOption = null,
  context = null
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const triggerRef = useRef(null);
  const dropdownRef = useRef(null);

  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (option.value && option.value.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : options;

  // Get dropdown position (opens outside table)
  const getDropdownStyle = () => {
    if (!triggerRef.current) return {};
    
    const rect = triggerRef.current.getBoundingClientRect();
    return {
      position: 'fixed',
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: Math.max(rect.width, 300),
      zIndex: 9999,
      maxHeight: '400px',
      overflow: 'hidden'
    };
  };

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClickOutside = (event) => {
    if (triggerRef.current && !triggerRef.current.contains(event.target) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`}>
      {/* Trigger Button */}
      <div
        ref={triggerRef}
        className="w-full px-3 py-2 border border-gray-300 rounded text-sm cursor-pointer bg-white hover:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-700 truncate" : "text-gray-500"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Popup - Opens outside table */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          style={getDropdownStyle()}
          className="bg-white border border-gray-300 rounded-lg shadow-xl"
        >
          {/* Search Header */}
          {searchable && (
            <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-gray-800">Search</h4>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Search Input */}
              <div className="relative">
                <svg 
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Options List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredOptions.map((option, index) => (
                  <div
                    key={option.value || index}
                    className={`p-3 cursor-pointer hover:bg-blue-50 transition-colors duration-150 ${
                      value === option.value ? 'bg-blue-100' : ''
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {renderOption ? (
                      renderOption(option)
                    ) : (
                      <div className="flex justify-between items-center">
                        <span className={`text-sm ${value === option.value ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>
                          {option.label}
                        </span>
                        {value === option.value && (
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : searchable && searchTerm.length >= 1 ? (
              <div className="p-6 text-center">
                <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-gray-500">No options found</p>
                <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
              </div>
            ) : searchable ? (
              <div className="p-6 text-center">
                <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-sm text-gray-500">Start typing to search</p>
              </div>
            ) : (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500">No options available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSearchDropdown;