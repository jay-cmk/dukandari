// // CreateNewUserRole.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./CreateNewUserRole.css";

// export default function CreateNewUserRole() {
//   const navigate = useNavigate();
//   const [userRoleName, setUserRoleName] = useState("");
//   const [expandedSections, setExpandedSections] = useState({});
//   const [selectedPermissions, setSelectedPermissions] = useState({});

//   // Main sections data
//   const mainSections = [
//     { id: "dashboard", title: "Dashboard", icon: "📊" },
//     { id: "contact", title: "Contact", icon: "👥" },
//     { id: "employee", title: "Employee", icon: "👨‍💼" },
//     { id: "inventory", title: "Inventory", icon: "📦" },
//     { id: "purchase", title: "Purchase", icon: "🛒" },
//     { id: "sales", title: "Sales", icon: "💰" },
//     { id: "bank-cash", title: "Bank/Cash", icon: "🏦" },
//     { id: "pos", title: "POS", icon: "💳" },
//     { id: "outlet", title: "Outlet", icon: "🏪" },
//     { id: "accounting", title: "Accounting", icon: "📋" },
//     { id: "crm", title: "CRM", icon: "🤝" },
//     { id: "utilities", title: "Utilities", icon: "⚙️" }
//   ];

//   // Detailed permissions for each section
//   const sectionPermissions = {
//     dashboard: [
//       { id: "customer-view", name: "Customer View" },
//       { id: "dashboard-view", name: "Dashboard View" },
//       { id: "suppliers-view", name: "Suppliers View" },
//       { id: "product-view", name: "Product View" },
//       { id: "total-stock-view", name: "Total Stock View" },
//       { id: "cash-in-hand-view", name: "Cash in Hand View" },
//       { id: "bank-account-view", name: "Bank Account View" },
//       { id: "receivable", name: "Receivable" },
//       { id: "outstanding", name: "Outstanding" },
//       { id: "payable-outstanding", name: "Payable Outstanding" },
//       { id: "general-view", name: "View" },
//       { id: "sales-invoice", name: "Sales Invoice" },
//       { id: "sales-pos", name: "Sales POS" }
//     ],
//     contact: [
//       { id: "contact-list", name: "Contact List" },
//       { id: "contact-groups", name: "Contact Groups" },
//       { id: "import-contacts", name: "Import Contacts" },
//       { id: "export-contacts", name: "Export Contacts" }
//     ],
//     employee: [
//       { id: "employee-list", name: "Employee List" },
//       { id: "designation", name: "Designation" },
//       { id: "attendance", name: "Attendance" },
//       { id: "payroll", name: "Payroll" }
//     ],
//     inventory: [
//       { id: "product-list", name: "Product List" },
//       { id: "categories", name: "Categories" },
//       { id: "brands", name: "Brands" },
//       { id: "units", name: "Units" },
//       { id: "stock-management", name: "Stock Management" }
//     ],
//     purchase: [
//       { id: "purchase-order", name: "Purchase Order" },
//       { id: "purchase-invoice", name: "Purchase Invoice" },
//       { id: "purchase-return", name: "Purchase Return" },
//       { id: "supplier-management", name: "Supplier Management" }
//     ],
//     sales: [
//       { id: "sales-order", name: "Sales Order" },
//       { id: "sales-invoice", name: "Sales Invoice" },
//       { id: "sales-return", name: "Sales Return" },
//       { id: "customer-management", name: "Customer Management" }
//     ],
//     "bank-cash": [
//       { id: "bank-accounts", name: "Bank Accounts" },
//       { id: "cash-management", name: "Cash Management" },
//       { id: "transactions", name: "Transactions" },
//       { id: "reconciliation", name: "Reconciliation" }
//     ],
//     pos: [
//       { id: "pos-sales", name: "POS Sales" },
//       { id: "pos-settings", name: "POS Settings" },
//       { id: "order-management", name: "Order Management" },
//       { id: "payment-methods", name: "Payment Methods" }
//     ],
//     outlet: [
//       { id: "outlet-management", name: "Outlet Management" },
//       { id: "stock-transfer", name: "Stock Transfer" },
//       { id: "outlet-reports", name: "Outlet Reports" }
//     ],
//     accounting: [
//       { id: "chart-of-accounts", name: "Chart of Accounts" },
//       { id: "journal-entries", name: "Journal Entries" },
//       { id: "ledger", name: "Ledger" },
//       { id: "balance-sheet", name: "Balance Sheet" }
//     ],
//     crm: [
//       { id: "lead-management", name: "Lead Management" },
//       { id: "customer-followup", name: "Customer Followup" },
//       { id: "reports-analytics", name: "Reports & Analytics" }
//     ],
//     utilities: [
//       { id: "backup-restore", name: "Backup & Restore" },
//       { id: "system-settings", name: "System Settings" },
//       { id: "user-management", name: "User Management" }
//     ]
//   };

//   // Action types for permissions
//   const actionTypes = [
//     { id: "view", name: "View" },
//     { id: "add", name: "Add" },
//     { id: "edit", name: "Edit" },
//     { id: "delete", name: "Delete" }
//   ];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("User Role Name:", userRoleName);
//     console.log("Selected Permissions:", selectedPermissions);
//     navigate("/userroles");
//   };

//   const handleCancel = () => {
//     navigate("/userroles");
//   };

//   const toggleSection = (sectionId) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [sectionId]: !prev[sectionId]
//     }));
//   };

//   const handlePermissionChange = (sectionId, permissionId, actionId, isChecked) => {
//     const permissionKey = `${sectionId}-${permissionId}-${actionId}`;
//     setSelectedPermissions(prev => ({
//       ...prev,
//       [permissionKey]: isChecked
//     }));
//   };

//   const selectAllInSection = (sectionId, isChecked) => {
//     const newPermissions = { ...selectedPermissions };
//     const permissions = sectionPermissions[sectionId] || [];
    
//     permissions.forEach(permission => {
//       actionTypes.forEach(action => {
//         const permissionKey = `${sectionId}-${permission.id}-${action.id}`;
//         newPermissions[permissionKey] = isChecked;
//       });
//     });
    
//     setSelectedPermissions(newPermissions);
//   };

//   const selectAllForPermission = (sectionId, permissionId, isChecked) => {
//     const newPermissions = { ...selectedPermissions };
    
//     actionTypes.forEach(action => {
//       const permissionKey = `${sectionId}-${permissionId}-${action.id}`;
//       newPermissions[permissionKey] = isChecked;
//     });
    
//     setSelectedPermissions(newPermissions);
//   };

//   // Check if all permissions in a section are selected
//   const isSectionAllSelected = (sectionId) => {
//     const permissions = sectionPermissions[sectionId] || [];
//     if (permissions.length === 0) return false;

//     for (let permission of permissions) {
//       for (let action of actionTypes) {
//         const permissionKey = `${sectionId}-${permission.id}-${action.id}`;
//         if (!selectedPermissions[permissionKey]) {
//           return false;
//         }
//       }
//     }
//     return true;
//   };

//   // Check if a specific permission has all actions selected
//   const isPermissionAllSelected = (sectionId, permissionId) => {
//     for (let action of actionTypes) {
//       const permissionKey = `${sectionId}-${permissionId}-${action.id}`;
//       if (!selectedPermissions[permissionKey]) {
//         return false;
//       }
//     }
//     return true;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             New User Role
//           </h1>
//           <div className="w-20 h-1 bg-blue-600"></div>
//         </div>

//         <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200">
//           {/* User Role Name Section */}
//           <div className="p-6 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-700 mb-4">
//               User Role Name*
//             </h2>
//             <input
//               type="text"
//               value={userRoleName}
//               onChange={(e) => setUserRoleName(e.target.value)}
//               placeholder="Enter user role name"
//               className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//               required
//             />
//           </div>

//           {/* Main Sections */}
//           <div className="p-6">
//             <h3 className="text-lg font-semibold text-gray-700 mb-6">
//               DataPooled
//             </h3>
            
//             <div className="space-y-4">
//               {mainSections.map((section) => (
//                 <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
//                   {/* Section Header */}
//                   <div 
//                     className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
//                     onClick={() => toggleSection(section.id)}
//                   >
//                     <div className="flex items-center gap-3">
//                       <span className="text-xl">{section.icon}</span>
//                       <h4 className="text-md font-semibold text-gray-700">
//                         {section.title}
//                       </h4>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       {/* Select All for Section */}
//                       <label className="flex items-center gap-2 cursor-pointer" onClick={(e) => e.stopPropagation()}>
//                         <span className="text-sm font-medium text-gray-600">Select All</span>
//                         <input
//                           type="checkbox"
//                           checked={isSectionAllSelected(section.id)}
//                           onChange={(e) => selectAllInSection(section.id, e.target.checked)}
//                           className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                         />
//                       </label>
//                       <svg 
//                         className={`w-5 h-5 text-gray-500 transform transition-transform ${
//                           expandedSections[section.id] ? 'rotate-180' : ''
//                         }`}
//                         fill="none" 
//                         stroke="currentColor" 
//                         viewBox="0 0 24 24"
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                   </div>

//                   {/* Expanded Content */}
//                   {expandedSections[section.id] && (
//                     <div className="p-4 bg-white border-t border-gray-200">
//                       <div className="overflow-x-auto">
//                         <table className="w-full min-w-full">
//                           <thead>
//                             <tr className="bg-gray-50">
//                               <th className="text-left p-3 font-semibold text-gray-700 min-w-48">
//                                 Permission
//                               </th>
//                               <th className="text-center p-3 font-semibold text-gray-700">
//                                 Select All
//                               </th>
//                               {actionTypes.map((action) => (
//                                 <th key={action.id} className="text-center p-3 font-semibold text-gray-700">
//                                   {action.name}
//                                 </th>
//                               ))}
//                             </tr>
//                           </thead>
//                           <tbody className="divide-y divide-gray-200">
//                             {sectionPermissions[section.id]?.map((permission) => (
//                               <tr key={permission.id} className="hover:bg-gray-50">
//                                 <td className="p-3 text-gray-700 font-medium">
//                                   {permission.name}
//                                 </td>
//                                 <td className="text-center p-3">
//                                   <input
//                                     type="checkbox"
//                                     checked={isPermissionAllSelected(section.id, permission.id)}
//                                     onChange={(e) => selectAllForPermission(section.id, permission.id, e.target.checked)}
//                                     className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                                   />
//                                 </td>
//                                 {actionTypes.map((action) => (
//                                   <td key={action.id} className="text-center p-3">
//                                     <input
//                                       type="checkbox"
//                                       checked={selectedPermissions[`${section.id}-${permission.id}-${action.id}`] || false}
//                                       onChange={(e) => handlePermissionChange(
//                                         section.id, 
//                                         permission.id, 
//                                         action.id, 
//                                         e.target.checked
//                                       )}
//                                       className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                                     />
//                                   </td>
//                                 ))}
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//             >
//               Create Role
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


// CreateNewUserRole.jsx
// CreateNewUserRole.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function UserRoleForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get role ID from URL for edit mode
  const isEditMode = Boolean(id);

  const [userRoleName, setUserRoleName] = useState("");
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState({});
  const [viewPermissions, setViewPermissions] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search state for permissions

  // Main sections data
  const mainSections = [
    { id: "dashboard", title: "Dashboard", icon: "📊" },
    { id: "contact", title: "Contact", icon: "👥" },
    { id: "employee", title: "Employee", icon: "👨‍💼" },
    { id: "inventory", title: "Inventory", icon: "📦" },
    { id: "purchase", title: "Purchase", icon: "🛒" },
    { id: "sales", title: "Sales", icon: "💰" },
    { id: "bank-cash", title: "Bank/Cash", icon: "🏦" },
    { id: "pos", title: "POS", icon: "💳" },
    { id: "outlet", title: "Outlet", icon: "🏪" },
    { id: "accounting", title: "Accounting", icon: "📋" },
    { id: "crm", title: "CRM", icon: "🤝" },
    { id: "utilities", title: "Utilities", icon: "⚙️" }
  ];

  // Detailed permissions for each section
  const sectionPermissions = {
    dashboard: [
      { id: "customer-view", name: "Customer View" },
      { id: "dashboard-view", name: "Dashboard" },
      { id: "suppliers-view", name: "Suppliers View" },
      { id: "product-view", name: "Product View" },
      { id: "total-stock-view", name: "Total Stock View" },
      { id: "cash-in-hand-view", name: "Cash in Hand View" },
      { id: "bank-account-view", name: "Bank Account View" },
      { id: "receivable", name: "Receivable" },
      { id: "outstanding", name: "Outstanding" },
      { id: "payable-outstanding", name: "Payable Outstanding" },
      { id: "general-view", name: "View" },
      { id: "sales-invoice", name: "Sales Invoice" },
      { id: "sales-pos", name: "Sales POS" }
    ],
    contact: [
      { id: "contact-list", name: "Contact List" },
      { id: "contact-groups", name: "Contact Groups" },
      { id: "import-contacts", name: "Import Contacts" },
      { id: "export-contacts", name: "Export Contacts" }
    ],
    employee: [
      { id: "employee-list", name: "Employee List" },
      { id: "designation", name: "Designation" },
      { id: "attendance", name: "Attendance" },
      { id: "payroll", name: "Payroll" }
    ],
    inventory: [
      { id: "product-list", name: "Product List" },
      { id: "categories", name: "Categories" },
      { id: "brands", name: "Brands" },
      { id: "units", name: "Units" },
      { id: "stock-management", name: "Stock Management" }
    ],
    purchase: [
      { id: "purchase-order", name: "Purchase Order" },
      { id: "purchase-invoice", name: "Purchase Invoice" },
      { id: "purchase-return", name: "Purchase Return" },
      { id: "supplier-management", name: "Supplier Management" }
    ],
    sales: [
      { id: "sales-order", name: "Sales Order" },
      { id: "sales-invoice", name: "Sales Invoice" },
      { id: "sales-return", name: "Sales Return" },
      { id: "customer-management", name: "Customer Management" }
    ],
    "bank-cash": [
      { id: "bank-accounts", name: "Bank Accounts" },
      { id: "cash-management", name: "Cash Management" },
      { id: "transactions", name: "Transactions" },
      { id: "reconciliation", name: "Reconciliation" }
    ],
    pos: [
      { id: "pos-sales", name: "POS Sales" },
      { id: "pos-settings", name: "POS Settings" },
      { id: "order-management", name: "Order Management" },
      { id: "payment-methods", name: "Payment Methods" }
    ],
    outlet: [
      { id: "outlet-management", name: "Outlet Management" },
      { id: "stock-transfer", name: "Stock Transfer" },
      { id: "outlet-reports", name: "Outlet Reports" }
    ],
    accounting: [
      { id: "chart-of-accounts", name: "Chart of Accounts" },
      { id: "journal-entries", name: "Journal Entries" },
      { id: "ledger", name: "Ledger" },
      { id: "balance-sheet", name: "Balance Sheet" }
    ],
    crm: [
      { id: "lead-management", name: "Lead Management" },
      { id: "customer-followup", name: "Customer Followup" },
      { id: "reports-analytics", name: "Reports & Analytics" }
    ],
    utilities: [
      { id: "backup-restore", name: "Backup & Restore" },
      { id: "system-settings", name: "System Settings" },
      { id: "user-management", name: "User Management" }
    ]
  };

  // Filter sections based on search query
  const filteredSections = mainSections.filter(section => {
    if (!searchQuery || searchQuery.trim() === '') return true;
    
    const searchTerm = searchQuery.toLowerCase().trim();
    
    // Check if section title matches
    if (section.title.toLowerCase().includes(searchTerm)) return true;
    
    // Check if any permission in this section matches
    const permissions = sectionPermissions[section.id] || [];
    return permissions.some(permission => 
      permission.name.toLowerCase().includes(searchTerm)
    );
  });

  // Filter permissions within each section based on search query
  const getFilteredPermissions = (sectionId) => {
    const permissions = sectionPermissions[sectionId] || [];
    if (!searchQuery || searchQuery.trim() === '') return permissions;
    
    const searchTerm = searchQuery.toLowerCase().trim();
    return permissions.filter(permission => 
      permission.name.toLowerCase().includes(searchTerm)
    );
  };

  // Search handler for permissions
  const handleSearchChange = (searchQuery) => {
    setSearchQuery(searchQuery);
    
    // Auto-expand sections that match the search
    if (searchQuery && searchQuery.trim() !== '') {
      const matchingSections = {};
      mainSections.forEach(section => {
        const sectionMatches = section.title.toLowerCase().includes(searchQuery.toLowerCase());
        const permissionsMatch = getFilteredPermissions(section.id).length > 0;
        if (sectionMatches || permissionsMatch) {
          matchingSections[section.id] = true;
        }
      });
      setExpandedSections(matchingSections);
    }
  };

  // Clear search when input is clicked and it's empty
  const handleSearchClick = (e) => {
    if (searchQuery === '' || searchQuery.trim() === '') {
      setSearchQuery('');
    }
  };

  // Mock function to fetch role data for edit mode
  const fetchRoleData = async (roleId) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data for editing - replace with actual API call
      const mockRoleData = {
        id: roleId,
        name: "Manager Role",
        permissions: {
          "dashboard-customer-view": true,
          "dashboard-dashboard-view": true,
          "contact-contact-list": true,
          "contact-contact-groups": false,
        },
        viewPermissions: {
          "dashboard-customer-view": true,
          "dashboard-dashboard-view": false,
          "contact-contact-list": true,
        }
      };
      
      setUserRoleName(mockRoleData.name);
      setSelectedPermissions(mockRoleData.permissions);
      setViewPermissions(mockRoleData.viewPermissions);
    } catch (error) {
      console.error("Error fetching role data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load role data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      fetchRoleData(id);
    }
  }, [isEditMode, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const roleData = {
        name: userRoleName,
        permissions: selectedPermissions,
        viewPermissions: viewPermissions
      };

      console.log(`${isEditMode ? "Updating" : "Creating"} User Role:`, roleData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate back to user roles list after success
      navigate("/userroles");
    } catch (error) {
      console.error("Error saving role:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/userroles");
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handlePermissionChange = (sectionId, permissionId, isChecked) => {
    const permissionKey = `${sectionId}-${permissionId}`;
    setSelectedPermissions(prev => ({
      ...prev,
      [permissionKey]: isChecked
    }));
  };

  const handleViewPermissionChange = (sectionId, permissionId, isChecked) => {
    const permissionKey = `${sectionId}-${permissionId}`;
    setViewPermissions(prev => ({
      ...prev,
      [permissionKey]: isChecked
    }));
  };

  const selectAllInSection = (sectionId, isChecked) => {
    const newPermissions = { ...selectedPermissions };
    const permissions = sectionPermissions[sectionId] || [];
    
    permissions.forEach(permission => {
      const permissionKey = `${sectionId}-${permission.id}`;
      newPermissions[permissionKey] = isChecked;
    });
    
    setSelectedPermissions(newPermissions);
  };

  const selectAllViewInSection = (sectionId, isChecked) => {
    const newViewPermissions = { ...viewPermissions };
    const permissions = sectionPermissions[sectionId] || [];
    
    permissions.forEach(permission => {
      const permissionKey = `${sectionId}-${permission.id}`;
      newViewPermissions[permissionKey] = isChecked;
    });
    
    setViewPermissions(newViewPermissions);
  };

  // Check if all permissions in a section are selected
  const isSectionAllSelected = (sectionId) => {
    const permissions = sectionPermissions[sectionId] || [];
    if (permissions.length === 0) return false;

    return permissions.every(permission => 
      selectedPermissions[`${sectionId}-${permission.id}`]
    );
  };

  // Check if all view permissions in a section are selected
  const isSectionAllViewSelected = (sectionId) => {
    const permissions = sectionPermissions[sectionId] || [];
    if (permissions.length === 0) return false;

    return permissions.every(permission => 
      viewPermissions[`${sectionId}-${permission.id}`]
    );
  };

  // Expand all sections
  const expandAllSections = () => {
    const allExpanded = {};
    mainSections.forEach(section => {
      allExpanded[section.id] = true;
    });
    setExpandedSections(allExpanded);
  };

  // Collapse all sections
  const collapseAllSections = () => {
    setExpandedSections({});
  };

  if (loading && isEditMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading role data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isEditMode ? "Edit User Role" : "New User Role"}
          </h1>
          <div className="w-16 h-1 bg-blue-600 rounded"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-8">
            {/* User Role Name Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">User Role Name*</h2>
              <input
                type="text"
                value={userRoleName}
                onChange={(e) => setUserRoleName(e.target.value)}
                placeholder="Enter user role name"
                className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                required
                disabled={loading}
              />
            </div>

            {/* Single Line Sections */}
            <div className="flex items-center gap-8 mb-8 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">User Role Details</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">Report Details</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-semibold text-gray-700">Departments</span>
              </div>
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            {/* Expand/Collapse All Buttons and Search */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">DataPooled</h3>
              <div className="flex gap-4 items-center">
                {/* Search Component for Permissions */}
                <div className="flex-1 md:flex-none">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search permissions..."
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onClick={handleSearchClick}
                      onFocus={handleSearchClick}
                      className="w-64 rounded-lg border border-gray-300 bg-white px-3 py-2 pl-9 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-colors"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={expandAllSections}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    onClick={collapseAllSections}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Collapse All
                  </button>
                </div>
              </div>
            </div>

            {/* DataPooled Section */}
            <div className="mb-8">
              <div className="space-y-4">
                {filteredSections.map((section) => {
                  const filteredPermissions = getFilteredPermissions(section.id);
                  
                  return (
                    <div key={section.id} className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                      {/* Section Header - Clickable to expand/collapse */}
                      <div 
                        className="flex items-center justify-between p-6 bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-xl">{section.icon}</span>
                          <h4 className="text-lg font-semibold text-gray-800">{section.title}</h4>
                          {searchQuery && filteredPermissions.length > 0 && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {filteredPermissions.length} permission{filteredPermissions.length !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-4">
                            <label 
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="checkbox"
                                checked={isSectionAllSelected(section.id)}
                                onChange={(e) => selectAllInSection(section.id, e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                disabled={loading}
                              />
                              <span className="text-sm font-semibold text-gray-700">Select All</span>
                            </label>
                            <label 
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="checkbox"
                                checked={isSectionAllViewSelected(section.id)}
                                onChange={(e) => selectAllViewInSection(section.id, e.target.checked)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                disabled={loading}
                              />
                              <span className="text-sm font-semibold text-gray-700">View All</span>
                            </label>
                          </div>
                          <span className={`text-gray-600 transition-transform ${expandedSections[section.id] ? 'rotate-180' : ''}`}>
                            ▼
                          </span>
                        </div>
                      </div>

                      {/* Expanded Permissions Table - Only shown when expanded */}
                      {expandedSections[section.id] && filteredPermissions.length > 0 && (
                        <div className="bg-white border-t border-gray-200">
                          <table className="w-full">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="text-left p-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">Permission</th>
                                <th className="text-center p-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">Select All</th>
                                <th className="text-center p-4 font-semibold text-gray-700 text-sm uppercase tracking-wide">View</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {filteredPermissions.map((permission) => (
                                <tr key={permission.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="p-4 text-gray-700 font-medium">{permission.name}</td>
                                  <td className="text-center p-4">
                                    <input
                                      type="checkbox"
                                      checked={selectedPermissions[`${section.id}-${permission.id}`] || false}
                                      onChange={(e) => handlePermissionChange(section.id, permission.id, e.target.checked)}
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                      disabled={loading}
                                    />
                                  </td>
                                  <td className="text-center p-4">
                                    <input
                                      type="checkbox"
                                      checked={viewPermissions[`${section.id}-${permission.id}`] || false}
                                      onChange={(e) => handleViewPermissionChange(section.id, permission.id, e.target.checked)}
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                      disabled={loading}
                                    />
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                      
                      {/* No permissions found message */}
                      {expandedSections[section.id] && filteredPermissions.length === 0 && (
                        <div className="bg-white border-t border-gray-200 p-8 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <MagnifyingGlassIcon className="h-8 w-8 text-gray-300" />
                            <p className="text-sm font-medium text-gray-500">No permissions found</p>
                            <p className="text-xs text-gray-400">
                              {searchQuery ? "Try adjusting your search query" : "No permissions available"}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* No sections found message */}
                {filteredSections.length === 0 && (
                  <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <MagnifyingGlassIcon className="h-8 w-8 text-gray-300" />
                      <p className="text-sm font-medium text-gray-500">No sections found</p>
                      <p className="text-xs text-gray-400">
                        {searchQuery ? "Try adjusting your search query" : "No sections available"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !userRoleName.trim()}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {isEditMode ? "Update Role" : "Create Role"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}