// import React, { useState, useRef, useEffect } from "react";
// import { FileDown, FileSpreadsheet, FileText } from "lucide-react";
// import { FaCaretDown } from "react-icons/fa";

// const FileFormatSelector = () => {
//   const [open, setOpen] = useState(false);
//   const menuRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative inline-block" ref={menuRef}>
//       {/* Export Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center text-xs bg-neutral-600 hover:bg-black text-white  px-3 py-1.5 rounded-sm transition-colors"
//       >
//         <FileDown className="w-5 h-5 mr-1" />
//         <FaCaretDown className="w-3 h-3" />
//       </button>

//       {/* Dropdown Menu */}
//       {open && (
//         <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
//           <button
//             onClick={() => {
//               alert("Exporting Excel...");
//               setOpen(false);
//             }}
//             className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-t-md"
//           >
//             <FileSpreadsheet className="w-5 h-5 text-green-600 mr-2" />
//             Excel
//           </button>
//           <button
//             onClick={() => {
//               alert("Exporting PDF...");
//               setOpen(false);
//             }}
//             className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-b-md"
//           >
//             <FileText className="w-5 h-5 text-red-600 mr-2" />
//             PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileFormatSelector;



import React, { useState, useRef, useEffect } from "react";
import { FileDown, FileSpreadsheet, FileText } from "lucide-react";
import { FaCaretDown } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const FileFormatSelector = ({ data = [] }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exportToExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "employees.xlsx");
  };

  const exportToPDF = (data) => {
    const doc = new jsPDF();
    doc.text("Employee Data", 14, 10);

    const tableColumn = Object.keys(data[0] || {});
    const tableRows = data.map((row) => Object.values(row));

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      styles: { fontSize: 8 },
    });

    doc.save("employees.pdf");
  };

  return (
    <div className="relative inline-block" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center text-xs bg-neutral-600 hover:bg-black text-white px-3 py-1.5 rounded-sm transition-colors"
      >
        <FileDown className="w-5 h-5 mr-1" />
        <FaCaretDown className="w-3 h-3" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40  border border-gray-200 bg-gray-100 rounded-sm shadow-lg z-50">
          <button
            onClick={() => {
              exportToExcel(data);
              setOpen(false);
            }}
            className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-200 rounded-t-md"
          >
            <FileSpreadsheet className="w-5 h-5 text-green-600 mr-2" />
            Excel
          </button>

          <button
            onClick={() => {
              exportToPDF(data);
              setOpen(false);
            }}
            className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-200 rounded-b-md"
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
