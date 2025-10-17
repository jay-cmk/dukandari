import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // Added useParams import
import { HomeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

const BankDetails = () => {
    // const { id } = useParams(); // Now this will work
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get bank data from navigation state
    const bankData = location.state?.bankData || {
        bankName: "Bank Not Found",
        location: "",
        accountHolderName: "",
        accountNo: "",
        addressLine1: "",
        addressLine2: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        isUpiAvailable: false,
        createdOn: "",
        ifscCode: "",
        swiftCode: "",
        creditBalance: "",
        debitBalance: "",
        accountGroup: "",
        branches: []
    };

    const branchesOptions = [
        "HUMMING VEDA",
        "C",
        "HINDUSTAN COPPER LIMITED",
        "pune",
        "nashik",
        "HARSH MEENA"
    ];

    const handleBack = () => {
        navigate(-1);
    };

    const handleEdit = () => {
        navigate("/createNewBank", {
            state: {
                isEdit: true,
                bankData: bankData,
                bankId: bankData.id
            }
        });
    };

    if (!bankData) {
        return (
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <p className="text-gray-500">No bank data found</p>
                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                    >
                        Back to Banks
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 p-2">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span className="mr-2">{bankData.bankName}</span>
                        <HomeIcon className="h-4 w-4 mr-1" />
                        <span>- Bank</span>
                    </div>
                </div>
                <button
                    onClick={handleEdit}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-indigo-600 border rounded-md hover:bg-indigo-50"
                >
                    <PencilSquareIcon className="h-4 w-4" />
                    Edit
                </button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-6 border-b border-gray-200 mb-4">
                {["Bank Details", "Transaction", "History"].map((tab) => (
                    <button
                        key={tab}
                        className={`pb-2 px-1 text-sm font-medium border-b-2 ${
                            tab === "Bank Details"
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
                {/* Bank Details + Address + Branches */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Bank Details */}
                    <div className="border rounded-lg">
                        <h2 className="bg-gray-100 px-4 py-2 font-medium text-sm border-b">Bank Details</h2>
                        <div className="divide-y text-sm">
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Bank Name</span>
                                <span className="text-gray-900">{bankData.bankName}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Branch Name</span>
                                <span className="text-gray-900">{bankData.location}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Account Holder Name</span>
                                <span className="text-gray-900">{bankData.accountHolderName}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Account No.</span>
                                <span className="text-gray-900">{bankData.accountNo}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">IFSC Code</span>
                                <span className="text-gray-900">{bankData.ifscCode}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Swift Code</span>
                                <span className="text-gray-900">{bankData.swiftCode}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Account Group</span>
                                <span className="text-gray-900">{bankData.accountGroup}</span>
                            </div>
                        </div>
                    </div>

                    {/* Address Details */}
                    <div className="border rounded-lg">
                        <h2 className="bg-gray-100 px-4 py-2 font-medium text-sm border-b">Address Details</h2>
                        <div className="divide-y text-sm">
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Address Line 1</span>
                                <span className="text-gray-900">{bankData.addressLine1}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Address Line 2</span>
                                <span className="text-gray-900">{bankData.addressLine2}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Country</span>
                                <span className="text-gray-900">{bankData.country}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">State</span>
                                <span className="text-gray-900">{bankData.state}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">City</span>
                                <span className="text-gray-900">{bankData.city}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">ZIP/Postal Code</span>
                                <span className="text-gray-900">{bankData.postalCode}</span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details */}
                    <div className="border rounded-lg">
                        <h2 className="bg-gray-100 px-4 py-2 font-medium text-sm border-b">Additional Details</h2>
                        <div className="divide-y text-sm">
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Credit Balance</span>
                                <span className="text-gray-900">{bankData.creditBalance}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Debit Balance</span>
                                <span className="text-gray-900">{bankData.debitBalance}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">UPI Available</span>
                                <span className="text-gray-900">{bankData.isUpiAvailable ? "Yes" : "No"}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Created By</span>
                                <span className="text-gray-900">{bankData.createdBy}</span>
                            </div>
                            <div className="flex justify-between px-4 py-1">
                                <span className="text-gray-500">Created On</span>
                                <span className="text-gray-900">{bankData.createdOn}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Assignee Branches */}
                <div className="border rounded-lg">
                    <h2 className="bg-gray-100 px-4 py-2 font-medium text-sm border-b">Assignee Branches</h2>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {branchesOptions.map((branch, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={bankData.branches?.includes(branch) || false}
                                        readOnly
                                        className="mr-2 h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                                    />
                                    <label className="text-sm text-gray-700">
                                        {branch}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={handleEdit}
                        className="px-4 py-2 border rounded bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors duration-200"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BankDetails;