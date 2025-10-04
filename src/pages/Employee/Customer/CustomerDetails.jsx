import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { handleEditEmployee } from "@/utils/helpers";

const EmployeeProfile = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { employee } = location.state || {};

  if (!employee) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 text-center">
          <p className="text-gray-500">No employee data found</p>
          <button
            onClick={() => navigate("/employees")}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gray-50 p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          {/* <h1 className="text-xl font-semibold text-gray-900">{employee.name}</h1> */}
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <HomeIcon className="h-4 w-4 mr-1" />
            <span>- Employee</span>
          </div>
        </div>
        <button
            onClick={() => handleEditEmployee(employee, navigate)}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-indigo-600 border rounded-md hover:bg-indigo-50"
        >
          <PencilSquareIcon className="h-4 w-4" />
          Edit
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-200 mb-4">
        {["Employee Details", "Expense", "Payment", "Receipt", "Transaction", "History"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-1 text-sm font-medium border-b-2 ${
              tab === "Employee Details"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Card Layout */}
      <div className="bg-white rounded-lg border shadow-sm p-6 space-y-3">
        {/* General + Address + Bank */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* General Details */}
          <div className="border rounded-lg">
            <h2 className="bg-gray-100 px-4 py-2 font-medium text-sm border-b">General Details</h2>
            <div className="divide-y text-sm">
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Name</span>
                <span className="text-gray-900">{employee.name}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Mobile No.</span>
                <span className="text-indigo-600">{employee.mobile || employee.mobileNo}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Email</span>
                <span>{employee.email || ""}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">PAN No.</span>
                <span>{employee.panNo || ""}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Manager</span>
                <span>{employee.isManager ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Created By</span>
                <span>{employee.createdBy || "KIRITRAJ"}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Created On</span>
                <span>{employee.createdOn || "29-07-2025 12:06:08"}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Assigned Branch</span>
                <span>{employee.outlet || employee.branch || "NEXUS BRANCH"}</span>
              </div>
            </div>
          </div>

          {/* Address Details */}
          <div className="border rounded-lg">
            <h2 className="bg-gray-100 px-4 py-2 font-medium text-sm border-b">Address Details</h2>
            <div className="divide-y text-sm">
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Address</span>
                <span>{employee.address || ""}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Country</span>
                <span>{employee.country || "India"}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">State</span>
                <span>{employee.state || "Gujarat"}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">City</span>
                <span>{employee.city || "Ahmedabad"}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">ZIP/Postal Code</span>
                <span>{employee.zipCode || employee.pincode || ""}</span>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="border rounded-lg">
            <h2 className="bg-gray-100 px-4 py-2 font-medium text-sm border-b">Bank Details</h2>
            <div className="divide-y text-sm">
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Bank Name</span>
                <span>{employee.bankName || employee.bank || ""}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Branch Name</span>
                <span>{employee.branchName || ""}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Account No.</span>
                <span>{employee.accountNo || ""}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">IFSC Code</span>
                <span>{employee.ifscCode || ""}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Account Holder Name</span>
                <span>{employee.accountHolderName || ""}</span>
              </div>
              <div className="flex justify-between px-4 py-1">
                <span className="text-gray-500">Swift Code</span>
                <span>{employee.swiftCode || ""}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payroll */}
        <div className="border rounded-lg">
          <h2 className="bg-gray-100 px-4 py-2 font-medium text-sm border-b">Payroll Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x text-sm">
            <div className="px-4 py-2 flex justify-between">
              <span className="text-gray-500">Wages</span>
              <span>{employee.wages || "0.0"}</span>
            </div>
            <div className="px-4 py-1 flex justify-between">
              <span className="text-gray-500">Extra Wages</span>
              <span>{employee.extraWages || "0.0"}</span>
            </div>
            <div className="px-4 py-1 flex justify-between">
              <span className="text-gray-500">Commission</span>
              <span>{employee.commission || "0.0"}</span>
            </div>
            <div className="px-4 py-1 flex justify-between">
              <span className="text-gray-500">Target</span>
              <span>{employee.target || "0.0"}</span>
            </div>
          </div>
          <div className="px-4 py-1 border-t text-sm flex justify-between">
            <span className="text-gray-500">Salary Account</span>
            <span>{employee.isSalaryAccount ? "Salary Payable" : ""}</span>
          </div>
        </div>

        {/* Authentication */}
        <div className="border rounded-lg">
          <h2 className="bg-gray-100 px-4 py-2 font-medium text-sm border-b">Authentication Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x text-sm">
            <div className="px-4 py-1 flex justify-between">
              <span className="text-gray-500">User Name</span>
              <span>{employee.userName || ""}</span>
            </div>
            <div className="px-4 py-1 flex justify-between">
              <span className="text-gray-500">User Role</span>
              <span>{employee.role ? employee.role.charAt(0).toUpperCase() + employee.role.slice(1) : ""}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
