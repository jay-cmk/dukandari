// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ReusableTable } from "@/components/ReusableTable";
// import IconHome from "@/components/HomeIcon/IconHome";

// // Configuration for Payment
// const paymentConfig = {
//   data: [],
//   columns: [
//     { key: "paymentNo", label: "Payment No", sortable: true },
//     { key: "partyName", label: "Party Name", sortable: true },
//     { key: "paymentMode", label: "Payment Mode", sortable: true },
//     { key: "date", label: "Date", sortable: true },
//     { key: "amount", label: "Amount", sortable: true },
//     { key: "status", label: "Status", sortable: true },
//     { key: "createdBy", label: "Created By", sortable: true },
//     { key: "actions", label: "Action", sortable: false }
//   ]
// };

// export default function Expence() {
//   const [data, setData] = useState(paymentConfig.data);
//   const navigate = useNavigate();

//   const handleCreate = () => {
//     // Navigate to create new payment page
//     navigate("/createNewExpence");
//   };

//   const handleEdit = (item) => {
//     // Handle edit functionality
//     console.log("Edit payment:", item);
//     // If you want to navigate to edit page, you can do:
//     // navigate(`/editPayment/${item.id}`);
//   };

//   const handleDelete = (item) => {
//     if (window.confirm(`Are you sure you want to delete payment "${item.paymentNo}"?`)) {
//       setData(prev => prev.filter(d => d.id !== item.id));
//     }
//   };

//   return (
//     <div className="p-6">
//       {/* Header Section */}
//       <div className="flex items-center gap-5 mb-6">
//         <h1 className="text-2xl text-gray-500">Payment</h1>
//         <div className="h-6 w-px bg-gray-400"></div>
//         <div className="flex items-center gap-4">
//           <IconHome className="text-gray-500 w-8 h-8" />
//         </div>
//       </div>

//       {/* Table Section */}
//       <ReusableTable
//         data={data}
//         columns={paymentConfig.columns}
//         onCreate={handleCreate}
//         onEdit={handleEdit}
//         onDelete={handleDelete}
//         createButtonText="Create New"
//         emptyMessage="No data available in table"
//       />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReusableTable } from "@/components/ReusableTable";
import IconHome from "@/components/HomeIcon/IconHome";
import { expenseApi } from "./expenseService";
import { formatCurrency, showToast } from "@/utils/expenseHelpers";

export default function Expense() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
  });
  const navigate = useNavigate();

  // Load expenses data
  const loadExpenses = async () => {
    setLoading(true);
    try {
      const expenses = await expenseApi.getExpenses();
      const formattedData = expenses.map((expense) => ({
        id: expense.id,
        srNo: expense.id,
        expenseNo: `${expense.expenseNoPrefix}${expense.expenseNoNumber}`,
        expenseDate: formatDate(expense.expenseDate),
        partyName: getPartyName(expense.selectParty),
        total: formatCurrency(expense.netAmount || "0"),
        paid: formatCurrency("0"), // You'll need to add paid logic
        unpaid: formatCurrency(expense.netAmount || "0"), // You'll need to add unpaid logic
        status: getStatusBadge("Completed"),
        branch: "Main Branch", // Add branch logic
        createdBy: "System",
        createdFrom: "Web",
      }));
      setData(formattedData);

      // Calculate stats
      const total = expenses.reduce(
        (sum, exp) => sum + (parseFloat(exp.netAmount) || 0),
        0
      );
      const paid = 0; // Add your paid calculation logic
      const unpaid = total - paid;

      setStats({
        totalAmount: total,
        paidAmount: paid,
        unpaidAmount: unpaid,
      });
    } catch (error) {
      console.error("Error loading expenses:", error);
      showToast("Error loading expenses", "error");
    } finally {
      setLoading(false);
    }
  };

  // Get party name from party value
  const getPartyName = (partyValue) => {
    const partyNames = {
      party1: "ABC Suppliers",
      party2: "XYZ Services",
      party3: "Global Traders",
      party4: "Tech Solutions",
      party5: "Office Mart",
    };
    return partyNames[partyValue] || partyValue;
  };

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      Completed: { class: "bg-green-100 text-green-800", text: "Completed" },
      Pending: { class: "bg-yellow-100 text-yellow-800", text: "Pending" },
      Rejected: { class: "bg-red-100 text-red-800", text: "Rejected" },
    };
    const config = statusConfig[status] || {
      class: "bg-gray-100 text-gray-800",
      text: status,
    };
    return `<span class="px-2 py-1 rounded-full text-xs font-medium ${config.class}">${config.text}</span>`;
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleCreate = () => {
    navigate("/createNewExpence");
  };

  const handleEdit = (item) => {
    navigate("/createNewExpence", {
      state: {
        isEdit: true,
        expenseId: item.id,
      },
    });
  };

  const handleDelete = async (item) => {
    if (
      window.confirm(
        `Are you sure you want to delete expense "${item.expenseNo}"?`
      )
    ) {
      try {
        await expenseApi.deleteExpense(item.id);
        showToast("Expense deleted successfully", "success");
        loadExpenses();
      } catch (error) {
        console.error("Error deleting expense:", error);
        showToast("Error deleting expense", "error");
      }
    }
  };

  // Table configuration
  const expenseConfig = {
    columns: [
      //   { key: "srNo", label: "Sr. No.", sortable: true },
      { key: "expenseNo", label: "Expense No.", sortable: true },
      { key: "expenseDate", label: "Expense Date", sortable: true },
      { key: "partyName", label: "Party Name", sortable: true },
      { key: "total", label: "Total", sortable: true, align: "right" },
      { key: "paid", label: "Paid", sortable: true, align: "right" },
      { key: "unpaid", label: "Unpaid", sortable: true, align: "right" },
      { key: "branch", label: "Branch", sortable: true },
      { key: "createdBy", label: "Created By", sortable: true },
      { key: "createdFrom", label: "Created From", sortable: true },
      //   { key: "actions", label: "Actions", sortable: false, align: "center" }
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex items-center gap-5 mb-6">
          <h1 className="text-2xl text-gray-500">Expense</h1>
          <div className="h-6 w-px bg-gray-400"></div>
          <div className="flex items-center gap-4">
            <IconHome className="text-gray-500 w-8 h-8" />
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 mb-6">
          {/* Total Expense */}
          <div className="flex flex-col items-center">
            <div
              className="bg-[#d9e4ec] rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
              style={{ width: "100px", height: "50px" }}
            >
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mt-2">
              Total Expense
            </p>
          </div>

          {/* Paid */}
          <div className="flex flex-col items-center">
            <div
              className="bg-[#d9e4ec] rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
              style={{ width: "100px", height: "50px" }}
            >
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mt-2">
              Paid
            </p>
          </div>

          {/* Unpaid */}
          <div className="flex flex-col items-center">
            <div
              className="bg-[#d9e4ec] rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex items-center justify-center"
              style={{ width: "100px", height: "50px" }}
            >
              <p className="text-2xl font-semibold text-gray-900">0</p>
            </div>
            <p className="text-sm font-medium text-gray-600 uppercase tracking-wide mt-2">
              Unpaid
            </p>
          </div>
        </div>

        {/* Table Section - Only ReusableTable component */}
        <ReusableTable
          data={data}
          columns={expenseConfig.columns}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
          createButtonText="Create New"
          emptyMessage="No expenses found"
          loading={loading}
          searchable={true}
          sortable={true}
          pagination={true}
          tableClass="min-w-full divide-y divide-gray-200"
        />
      </div>
    </div>
  );
}
