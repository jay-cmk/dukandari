// import React, { useState, useEffect } from "react";

// export default function CreateModal({ show, onClose, title, fields, onSave }) {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (fields) {
//       const initialData = fields.reduce(
//         (acc, f) => ({ ...acc, [f.valueKey]: f.value || "" }),
//         {}
//       );
//       setFormData(initialData);
//     }
//   }, [fields, show]);

//   const handleChange = (key, value) => {
//     setFormData({ ...formData, [key]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//     setFormData(fields.reduce((acc, f) => ({ ...acc, [f.valueKey]: "" }), {}));
//   };

//   return (
//     <div
//       className={`fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
//         show ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`}
//     >
//       <div
//         className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-transform duration-300 ${
//           show ? "scale-100" : "scale-75"
//         }`}
//       >
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">{title}</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
//         </div>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {fields.map((f) => (
//             <div key={f.valueKey}>
//               <label className="block text-sm font-medium mb-1">{f.label}</label>
//               {f.type === "textarea" ? (
//                 <textarea
//                   rows={3}
//                   placeholder={f.placeholder}
//                   value={formData[f.valueKey]}
//                   onChange={(e) => handleChange(f.valueKey, e.target.value)}
//                   className="w-full p-2 border rounded-md bg-white"
//                 />
//               ) : (
//                 <input
//                   type={f.type}
//                   placeholder={f.placeholder}
//                   value={formData[f.valueKey]}
//                   onChange={(e) => handleChange(f.valueKey, e.target.value)}
//                   className="w-full p-2 border rounded-md bg-white"
//                 />
//               )}
//             </div>
//           ))}
//           <div className="flex justify-end space-x-2 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//             >
//               Close
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:shadow-lg"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { FiX, FiSave, FiArrowLeft } from "react-icons/fi";

export default function CreateModal({ show, onClose, title, fields, onSave }) {
  const [formData, setFormData] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (fields) {
      const initialData = fields.reduce(
        (acc, f) => ({ ...acc, [f.valueKey]: f.value || "" }),
        {}
      );
      setFormData(initialData);
    }
  }, [fields, show]);

  // Animation handling
  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData(fields.reduce((acc, f) => ({ ...acc, [f.valueKey]: "" }), {}));
  };

  if (!isVisible && !show) return null;

  return (
    <div
      className={`fixed inset-0  flex items-center justify-center z-50 p-4 transition-all duration-300 ${
        show ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop with slide effect */}
      <div 
        className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      
      {/* Modal with enhanced animations */}
      <div
        className={`relative bg-white  shadow-2xl max-w-md w-full transform transition-all duration-300 ${
          show 
            ? "scale-100 opacity-100 translate-y-0" 
            : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-black to-indigo-800  p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="p-1 text-white/80 hover:text-white transition-colors duration-200"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-white">{title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit} className="p-3 space-y-3">
          {fields.map((f, index) => (
            <div 
              key={f.valueKey}
              className="space-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <label className="block text-sm font-semibold text-gray-700">
                {f.label}
              </label>
              {f.type === "textarea" ? (
                <textarea
                  rows={4}
                  placeholder={f.placeholder}
                  value={formData[f.valueKey] || ""}
                  onChange={(e) => handleChange(f.valueKey, e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300   transition-all duration-200 resize-none bg-white"
                />
              ) : f.type === "select" ? (
                <select
                  value={formData[f.valueKey] || ""}
                  onChange={(e) => handleChange(f.valueKey, e.target.value)}
                  className="w-full px-4 py-1 border border-gray-300     transition-all duration-200 bg-white"
                >
                  <option value="">{f.placeholder}</option>
                  {f.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={formData[f.valueKey] || ""}
                  onChange={(e) => handleChange(f.valueKey, e.target.value)}
                  className="w-full px-4 py-1 border border-gray-300   transition-all duration-200 bg-white"
                />
              )}
            </div>
          ))}

          {/* Action buttons */}
          <div className="flex justify-end space-x-3  ">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 border border-gray-300 text-gray-700  hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3  bg-gradient-to-r from-black to-indigo-800 text-white  hover:from-blue-700 hover:to-indigo-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-sm hover:shadow flex items-center space-x-2"
            >
              <FiSave className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}