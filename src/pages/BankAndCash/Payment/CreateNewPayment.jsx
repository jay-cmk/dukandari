import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from '@/components/Dropdown/Dropdown';

const CreateNewPayment = () => {
    const navigate = useNavigate();
    
    const [paymentMode, setPaymentMode] = useState("cash");
    const [bankPaymentMode, setBankPaymentMode] = useState("cheque");
    const [paymentType, setPaymentType] = useState("OnAccount");
    
    const [formData, setFormData] = useState({
        // Payment Mode
        cashAccountCustomId: "",
        bankVo: "",
        
        // Party and Dates
        selectParty: "",
        paymentDate: new Date().toISOString().split('T')[0],
        chequeDate: new Date().toISOString().split('T')[0],
        accountNo: "",
        
        // Amount and Description
        totalPayment: "",
        description: "",
    });

    // State for Against Voucher bills
    const [bills, setBills] = useState([
        {
            id: 1,
            billNo: "",
            originalAmount: "",
            paidAmount: "",
            pendingAmount: "",
            kasarAmount: "",
            amount: "",
            paymentAmount: ""
        }
    ]);

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (touched[name] || value.length > 0) {
            // Add validation logic here if needed
        }
    };

    const handleDropdownChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (touched[name] || value.length > 0) {
            // Add validation logic here if needed
        }
    };

    const handlePaymentModeChange = (mode) => {
        setPaymentMode(mode);
    };

    const handleBankPaymentModeChange = (mode) => {
        setBankPaymentMode(mode);
    };

    const handlePaymentTypeChange = (type) => {
        setPaymentType(type);
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        // Add validation logic here if needed
    };

    const handleCancel = () => {
        navigate("/payment");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", { paymentMode, paymentType, ...formData, bills });
        alert("Payment created successfully!");
        navigate("/payment");
    };

    const handleSaveAndCreateNew = () => {
        console.log("Save and create new:", { paymentMode, paymentType, ...formData, bills });
        alert("Payment saved successfully!");
        // Reset form for new entry
        setFormData({
            cashAccountCustomId: "",
            bankVo: "",
            selectParty: "",
            paymentDate: new Date().toISOString().split('T')[0],
            chequeDate: new Date().toISOString().split('T')[0],
            accountNo: "",
            totalPayment: "",
            description: "",
        });
        setBills([{
            id: 1,
            billNo: "",
            originalAmount: "",
            paidAmount: "",
            pendingAmount: "",
            kasarAmount: "",
            amount: "",
            paymentAmount: ""
        }]);
        setTouched({});
        setErrors({});
    };

    // Handle bill input changes
    const handleBillChange = (index, field, value) => {
        const updatedBills = bills.map((bill, i) => {
            if (i === index) {
                const updatedBill = { ...bill, [field]: value };
                
                // Auto-calculate pending amount if original and paid amounts are provided
                if (field === 'originalAmount' || field === 'paidAmount') {
                    const original = field === 'originalAmount' ? value : bill.originalAmount;
                    const paid = field === 'paidAmount' ? value : bill.paidAmount;
                    
                    if (original && paid) {
                        updatedBill.pendingAmount = (parseFloat(original) - parseFloat(paid)).toString();
                    }
                }
                
                return updatedBill;
            }
            return bill;
        });
        setBills(updatedBills);
    };

    // Add new bill row
    const addBillRow = () => {
        setBills(prev => [
            ...prev,
            {
                id: prev.length + 1,
                billNo: "",
                originalAmount: "",
                paidAmount: "",
                pendingAmount: "",
                kasarAmount: "",
                amount: "",
                paymentAmount: ""
            }
        ]);
    };

    // Remove bill row
    const removeBillRow = (index) => {
        if (bills.length > 1) {
            setBills(prev => prev.filter((_, i) => i !== index));
        }
    };

    // Calculate total payment amount
    const calculateTotal = () => {
        return bills.reduce((total, bill) => {
            return total + (parseFloat(bill.paymentAmount) || 0);
        }, 0);
    };

    // Party options
    const partyOptions = [
        { value: "party1", label: "Party 1 - Opening Balance: 60" },
        { value: "party2", label: "Party 2 - Opening Balance: 120" },
        { value: "party3", label: "Party 3 - Opening Balance: 45" },
    ];

    // Cash Type options
    const cashTypeOptions = [
        { value: "cash1", label: "Main Cash" },
        { value: "cash2", label: "Petty Cash" },
    ];

    // Bank options
    const bankOptions = [
        { value: "bank1", label: "State Bank of India" },
        { value: "bank2", label: "HDFC Bank" },
        { value: "bank3", label: "ICICI Bank" },
        { value: "bank4", label: "Axis Bank" },
    ];

    return (
        <div className="mx-auto p-4 bg-gray-300">
            <div className="bg-white border p-6 rounded-lg">
                <form onSubmit={handleSubmit}>
                    {/* First Row - Payment Mode Selection with Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        {/* Left side - Cash/Bank selection and dropdowns */}
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Payment Mode Radio Buttons */}
                                <div className="md:col-span-1">
                                    <label className="block mb-2 text-sm font-semibold text-black">
                                        Payment Mode
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="paymentMode"
                                                checked={paymentMode === "cash"}
                                                onChange={() => handlePaymentModeChange("cash")}
                                                className="mr-2 hover:border-blue-600 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-black">Cash</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="paymentMode"
                                                checked={paymentMode === "bank"}
                                                onChange={() => handlePaymentModeChange("bank")}
                                                className="mr-2 hover:border-blue-600 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-black">Bank</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Cash Type Dropdown */}
                                <div className={`md:col-span-1 ${paymentMode !== "cash" ? "hidden" : ""}`}>
                                    <label className="block mb-2 text-sm font-semibold text-black">
                                        Select Cash Type
                                    </label>
                                    <Dropdown
                                        name="cashAccountCustomId"
                                        value={formData.cashAccountCustomId}
                                        onChange={(value) => handleDropdownChange("cashAccountCustomId", value)}
                                        options={cashTypeOptions}
                                        placeholder="Select Cash Type"
                                        className="h-9"
                                        search={true}
                                    />
                                </div>

                                {/* Bank Search Dropdown */}
                                <div className={`md:col-span-1 ${paymentMode !== "bank" ? "hidden" : ""}`}>
                                    <label className="block mb-2 text-sm font-semibold text-black">
                                        Search Bank
                                    </label>
                                    <Dropdown
                                        name="bankVo"
                                        value={formData.bankVo}
                                        onChange={(value) => handleDropdownChange("bankVo", value)}
                                        options={bankOptions}
                                        placeholder="Search Bank"
                                        className="h-9"
                                        search={true}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right side - Online/Cheque selection (Only shows when Bank is selected) */}
                        <div className={`lg:col-span-2 ${paymentMode !== "bank" ? "hidden" : ""}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-black">
                                        Bank Payment Mode
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="bankPaymentMode"
                                                checked={bankPaymentMode === "online"}
                                                onChange={() => handleBankPaymentModeChange("online")}
                                                className="mr-2 hover:border-blue-600 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-black">Online</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="bankPaymentMode"
                                                checked={bankPaymentMode === "cheque"}
                                                onChange={() => handleBankPaymentModeChange("cheque")}
                                                className="mr-2 hover:border-blue-600 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-black">Cheque</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Row - Select Party, Payment Date, Transaction Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                Select Party<span className="text-red-500">*</span>
                            </label>
                            <Dropdown
                                name="selectParty"
                                value={formData.selectParty}
                                onChange={(value) => handleDropdownChange("selectParty", value)}
                                options={partyOptions}
                                placeholder="Select Party"
                                className="h-9"
                                search={true}
                            />
                            {errors.selectParty && (
                                <p className="text-red-500 text-xs mt-1">{errors.selectParty}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                Payment Date<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="paymentDate"
                                value={formData.paymentDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                            />
                            {errors.paymentDate && (
                                <p className="text-red-500 text-xs mt-1">{errors.paymentDate}</p>
                            )}
                        </div>

                        {/* Transaction/Cheque Date (Only shows when Bank is selected) */}
                        <div className={paymentMode !== "bank" ? "hidden" : ""}>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                {bankPaymentMode === "online" ? "Transaction Date" : "Cheque Date"}
                            </label>
                            <input
                                type="date"
                                name="chequeDate"
                                value={formData.chequeDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                            />
                        </div>

                        {/* Transaction/Cheque No (Only shows when Bank is selected) */}
                        <div className={paymentMode !== "bank" ? "hidden" : ""}>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                {bankPaymentMode === "online" ? "Transaction No." : "Cheque No."}
                            </label>
                            <input
                                type="text"
                                name="accountNo"
                                value={formData.accountNo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                placeholder={bankPaymentMode === "online" ? "Transaction No" : "Cheque No"}
                            />
                        </div>
                    </div>

                    {/* Third Row - Payment Type Options */}
                    <div className="mb-6">
                        <label className="block mb-3 text-sm font-semibold text-black">
                            Payment Type<span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* On Account */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <label className="flex items-start">
                                    <input
                                        type="radio"
                                        name="paymentType"
                                        checked={paymentType === "OnAccount"}
                                        onChange={() => handlePaymentTypeChange("OnAccount")}
                                        className="mr-2 mt-1 hover:border-blue-600 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                        <div className="text-sm font-semibold text-black">On Account</div>
                                        <div className="text-xs text-gray-600 mt-1">Upfront Payment</div>
                                    </div>
                                </label>
                            </div>

                            {/* Advance Payment */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <label className="flex items-start">
                                    <input
                                        type="radio"
                                        name="paymentType"
                                        checked={paymentType === "AdvancePayment"}
                                        onChange={() => handlePaymentTypeChange("AdvancePayment")}
                                        className="mr-2 mt-1 hover:border-blue-600 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                        <div className="text-sm font-semibold text-black">Advance Payment</div>
                                        <div className="text-xs text-gray-600 mt-1">Will be offset by upcoming bills</div>
                                    </div>
                                </label>
                            </div>

                            {/* Against Voucher */}
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <label className="flex items-start">
                                    <input
                                        type="radio"
                                        name="paymentType"
                                        checked={paymentType === "AgainstBill"}
                                        onChange={() => handlePaymentTypeChange("AgainstBill")}
                                        className="mr-2 mt-1 hover:border-blue-600 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <div>
                                        <div className="text-sm font-semibold text-black">Against Voucher</div>
                                        <div className="text-xs text-gray-600 mt-1">Make Payment Against Voucher</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Bill Table - Only shows when Against Voucher is selected */}
                    {paymentType === "AgainstBill" && (
                        <div className="mb-6">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse border border-gray-300">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 p-2 text-sm font-semibold text-black text-left">
                                                Bill No
                                            </th>
                                            <th className="border border-gray-300 p-2 text-sm font-semibold text-black text-left">
                                                Original Amount
                                            </th>
                                            <th className="border border-gray-300 p-2 text-sm font-semibold text-black text-left">
                                                Paid Amount
                                            </th>
                                            <th className="border border-gray-300 p-2 text-sm font-semibold text-black text-left">
                                                Pending Amount
                                            </th>
                                            <th className="border border-gray-300 p-2 text-sm font-semibold text-black text-left">
                                                Kasar Amount*
                                            </th>
                                            <th className="border border-gray-300 p-2 text-sm font-semibold text-black text-left">
                                                Amount*
                                            </th>
                                            <th className="border border-gray-300 p-2 text-sm font-semibold text-black text-left">
                                                Payment Amount
                                            </th>
                                            <th className="border border-gray-300 p-2 text-sm font-semibold text-black text-left">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bills.map((bill, index) => (
                                            <tr key={bill.id}>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="text"
                                                        value={bill.billNo}
                                                        onChange={(e) => handleBillChange(index, 'billNo', e.target.value)}
                                                        className="w-full p-1 border rounded text-sm hover:border-blue-600 transition-colors duration-200"
                                                        placeholder="Bill No"
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        value={bill.originalAmount}
                                                        onChange={(e) => handleBillChange(index, 'originalAmount', e.target.value)}
                                                        className="w-full p-1 border rounded text-sm hover:border-blue-600 transition-colors duration-200"
                                                        placeholder="0.00"
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        value={bill.paidAmount}
                                                        onChange={(e) => handleBillChange(index, 'paidAmount', e.target.value)}
                                                        className="w-full p-1 border rounded text-sm hover:border-blue-600 transition-colors duration-200"
                                                        placeholder="0.00"
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        value={bill.pendingAmount}
                                                        onChange={(e) => handleBillChange(index, 'pendingAmount', e.target.value)}
                                                        className="w-full p-1 border rounded text-sm bg-gray-100"
                                                        placeholder="0.00"
                                                        readOnly
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        value={bill.kasarAmount}
                                                        onChange={(e) => handleBillChange(index, 'kasarAmount', e.target.value)}
                                                        className="w-full p-1 border rounded text-sm hover:border-blue-600 transition-colors duration-200"
                                                        placeholder="0.00"
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        value={bill.amount}
                                                        onChange={(e) => handleBillChange(index, 'amount', e.target.value)}
                                                        className="w-full p-1 border rounded text-sm hover:border-blue-600 transition-colors duration-200"
                                                        placeholder="0.00"
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    <input
                                                        type="number"
                                                        value={bill.paymentAmount}
                                                        onChange={(e) => handleBillChange(index, 'paymentAmount', e.target.value)}
                                                        className="w-full p-1 border rounded text-sm hover:border-blue-600 transition-colors duration-200"
                                                        placeholder="0.00"
                                                    />
                                                </td>
                                                <td className="border border-gray-300 p-2">
                                                    {bills.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeBillRow(index)}
                                                            className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors duration-200"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Add More Button and Total */}
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    type="button"
                                    onClick={addBillRow}
                                    className="px-4 py-2 border border-blue-500 rounded bg-white text-blue-500 text-sm font-medium hover:bg-blue-50 transition-colors duration-200"
                                >
                                    Add More
                                </button>
                                
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-semibold text-black">Total:</span>
                                    <span className="text-lg font-bold text-blue-600">
                                        ${calculateTotal().toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Fourth Row - Amount and Description (Hidden when Against Voucher is selected) */}
                    {paymentType !== "AgainstBill" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                            {/* Amount */}
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-black">
                                    Amount<span className="text-red-500">*</span>
                                </label>
                                <div className="flex">
                                    <span 
                                        className="inline-flex items-center px-3 border border-r-0 rounded-l text-sm"
                                        style={{backgroundColor: "#00a4e5", color: "#fff"}}
                                    >
                                        $
                                    </span>
                                    <input
                                        type="text"
                                        className="flex-1 border p-2 rounded-r text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        name="totalPayment"
                                        value={formData.totalPayment}
                                        onChange={handleChange}
                                        placeholder="0"
                                    />
                                </div>
                                {errors.totalPayment && (
                                    <p className="text-red-500 text-xs mt-1">{errors.totalPayment}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div className="md:col-span-4 ">
                                <label className="block mb-1 text-sm font-semibold text-black">
                                    Description
                                </label>
                                <textarea
                                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="1"
                                    placeholder="Enter a description"
                                />
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-gray-300 rounded bg-white text-gray-700 text-sm font-medium hover:border-blue-600 hover:text-blue-600 transition-colors duration-200 h-9"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveAndCreateNew}
                            className="px-6 py-2 border border-blue-500 rounded bg-white text-blue-500 text-sm font-medium hover:bg-blue-50 transition-colors duration-200 h-9"
                        >
                            Save & Create New
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 border rounded bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors duration-200 h-9"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateNewPayment;