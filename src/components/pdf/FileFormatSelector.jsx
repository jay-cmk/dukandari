import React, { useState, useRef, useEffect } from "react";
import { FileDown, FileSpreadsheet, FileText } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";

const FileFormatSelector = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Export Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-sm transition-colors"
      >
        <FileDown className="w-5 h-5 mr-1" />
        <FaCaretDown className="w-3 h-3" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              alert("Exporting Excel...");
              setOpen(false);
            }}
            className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-t-md"
          >
            <FileSpreadsheet className="w-5 h-5 text-green-600 mr-2" />
            Excel
          </button>
          <button
            onClick={() => {
              alert("Exporting PDF...");
              setOpen(false);
            }}
            className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-b-md"
          >
            <FileText className="w-5 h-5 text-red-600 mr-2" />
            PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default FileFormatSelector;
