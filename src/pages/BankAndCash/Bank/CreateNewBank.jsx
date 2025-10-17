import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from '@/components/Dropdown/Dropdown';
import { validateField, validateForm } from '@/utils/validation';

const CreateNewBank = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [bankId, setBankId] = useState(null);
    
    const [formData, setFormData] = useState({
        // First Row
        selectGroup: "Bank Account",
        ifscCode: "",
        bankName: "",
        branchName: "",
        accountHolderName: "",

        // Second Row
        accountNo: "",
        swiftCode: "",
        openingBalanceDebit: "",
        openingBalanceCredit: "",
        isUpiAvailable: false,

        // Third Row
        addressLine1: "",
        addressLine2: "",

        // Fourth Row
        selectCountry: "India",
        selectState: "",
        selectCity: "",
        postalCode: "",

        // Branches - now single value for radio selection
        branches: "HUMMING VEDA"
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Initialize form data based on mode (create/edit)
    useEffect(() => {
        if (location.state) {
            const { bankData, isEdit: editMode, bankId: id } = location.state;
            
            if (editMode && bankData) {
                setIsEdit(true);
                setBankId(id);
                setFormData(prev => ({
                    ...prev,
                    ...bankData
                }));
            }
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (touched[name] || value.length > 0) {
            const error = validateField(name, value, formData);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    // Handle dropdown changes
    const handleDropdownChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (touched[name] || value.length > 0) {
            const error = validateField(name, value, formData);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    // Handle branch radio changes
    const handleBranchChange = (branchValue) => {
        setFormData(prev => ({
            ...prev,
            branches: branchValue
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, value, formData);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const allTouched = {};
        Object.keys(formData).forEach((key) => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            if (isEdit) {
                console.log("Updating Bank:", { id: bankId, ...formData });
                alert("Bank updated successfully!");
            } else {
                console.log("Creating Bank:", formData);
                alert("Bank added successfully!");
            }
            
            navigate("/banks");
        }
    };

    const handleSaveAndCreateNew = () => {
        const allTouched = {};
        Object.keys(formData).forEach((key) => {
            allTouched[key] = true;
        });
        setTouched(allTouched);

        const newErrors = validateForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Creating Bank:", formData);
            alert("Bank added successfully!");
            
            // Reset form for new entry
            setFormData({
                selectGroup: "Bank Account",
                ifscCode: "",
                bankName: "",
                branchName: "",
                accountHolderName: "",
                accountNo: "",
                swiftCode: "",
                openingBalanceDebit: "",
                openingBalanceCredit: "",
                isUpiAvailable: false,
                addressLine1: "",
                addressLine2: "",
                selectCountry: "India",
                selectState: "",
                selectCity: "",
                postalCode: "",
                branches: "HUMMING VEDA"
            });
            setTouched({});
            setErrors({});
        }
    };

    // Country options
    const countryOptions = [
        { value: "India", label: "India" },
        { value: "USA", label: "USA" },
        { value: "UK", label: "UK" },
        { value: "Canada", label: "Canada" },
        { value: "Australia", label: "Australia" },
        { value: "Germany", label: "Germany" },
        { value: "France", label: "France" }
    ];

    // State options
    const stateOptions = [
        { value: "maharashtra", label: "Maharashtra" },
        { value: "gujarat", label: "Gujarat" },
        { value: "karnataka", label: "Karnataka" },
        { value: "delhi", label: "Delhi" },
        { value: "tamil_nadu", label: "Tamil Nadu" },
        { value: "kerala", label: "Kerala" },
        { value: "rajasthan", label: "Rajasthan" }
    ];

    // City options
    const cityOptions = [
        { value: "mumbai", label: "Mumbai" },
        { value: "pune", label: "Pune" },
        { value: "ahmedabad", label: "Ahmedabad" },
        { value: "bengaluru", label: "Bengaluru" },
        { value: "chennai", label: "Chennai" },
        { value: "kolkata", label: "Kolkata" },
        { value: "hyderabad", label: "Hyderabad" }
    ];

    // Group options
    const groupOptions = [
        { value: "Bank Account", label: "Bank Account" },
        { value: "Savings Account", label: "Savings Account" },
        { value: "Current Account", label: "Current Account" },
        { value: "Fixed Deposit", label: "Fixed Deposit" },
        { value: "Recurring Deposit", label: "Recurring Deposit" }
    ];

    // Branches options - in the exact order from your image
    const branchesOptions = [
        { value: "HUMMING VEDA", label: "HUMMING VEDA" },
        { value: "C", label: "C" },
        { value: "HINDUSTAN COPPER LIMITED", label: "HINDUSTAN COPPER LIMITED" },
        { value: "pune", label: "pune" },
        { value: "nashik", label: "nashik" },
        { value: "HARSH MEENA", label: "HARSH MEENA" }
    ];

    return (
        <div className="mx-auto p-4 bg-gray-300">
            <div className="bg-white border p-6 rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-gray-700">
                    {isEdit ? "Edit Bank" : "New Bank"}
                </h1>
                
                <form onSubmit={handleSubmit}>
                    {/* First Row - Select Group, IFSC Code, Bank Name, Branch Name, Account Holder Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                Select Group<span className="text-red-500">*</span>
                            </label>
                            <div className="h-9">
                                <Dropdown
                                    name="selectGroup"
                                    value={formData.selectGroup}
                                    onChange={(value) => handleDropdownChange("selectGroup", value)}
                                    options={groupOptions}
                                    placeholder="Select Group"
                                    search={true}
                                />
                            </div>
                            {errors.selectGroup && (
                                <p className="text-red-500 text-xs mt-1">{errors.selectGroup}</p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                IFSC Code
                            </label>
                            <input
                                type="text"
                                name="ifscCode"
                                value={formData.ifscCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                placeholder="IFSC Code"
                            />
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                Bank Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="bankName"
                                value={formData.bankName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                placeholder="Bank Name"
                            />
                            {errors.bankName && (
                                <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                Branch Name<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="branchName"
                                value={formData.branchName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                placeholder="Branch Name"
                            />
                            {errors.branchName && (
                                <p className="text-red-500 text-xs mt-1">{errors.branchName}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                Account Holder Name
                            </label>
                            <input
                                type="text"
                                name="accountHolderName"
                                value={formData.accountHolderName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                placeholder="Account Holder Name"
                            />
                        </div>
                    </div>

                    {/* Second Row - Account No., Swift Code, Opening Balance (Debit/Credit), Is UPI Available */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                Account No.<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="accountNo"
                                value={formData.accountNo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                placeholder="Account No."
                            />
                            {errors.accountNo && (
                                <p className="text-red-500 text-xs mt-1">{errors.accountNo}</p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm font-semibold text-black">
                                Swift Code
                            </label>
                            <input
                                type="text"
                                name="swiftCode"
                                value={formData.swiftCode}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                placeholder="Swift Code"
                            />
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold mb-2 text-black">Opening Balance</h4>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    {/* <label className="block mb-1 text-xs font-semibold text-black">
                                        Debit
                                    </label> */}
                                    <input
                                        type="text"
                                        name="openingBalanceDebit"
                                        value={formData.openingBalanceDebit}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="Debit"
                                    />
                                </div>
                                <div>
                                    {/* <label className="block mb-1 text-xs font-semibold text-black">
                                        Credit
                                    </label> */}
                                    <input
                                        type="text"
                                        name="openingBalanceCredit"
                                        value={formData.openingBalanceCredit}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="Credit"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isUpiAvailable"
                                checked={formData.isUpiAvailable}
                                onChange={handleChange}
                                className="mr-2 hover:border-blue-600 h-4 w-4"
                            />
                            <label className="text-sm font-semibold text-black">
                                Is UPI Available?
                            </label>
                        </div>
                    </div>

                    {/* Third and Fourth Rows with Branches on the side */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                        {/* Left side - Third and Fourth rows content */}
                        <div className="lg:col-span-3">
                            {/* Third Row - Address Line 1, Address Line 2 */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Address Line 1
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine1"
                                        value={formData.addressLine1}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="Address Line 1"
                                    />
                                </div>
                                
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Address Line 2
                                    </label>
                                    <input
                                        type="text"
                                        name="addressLine2"
                                        value={formData.addressLine2}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="Address Line 2"
                                    />
                                </div>
                            </div>

                            {/* Fourth Row - Select Country, Select State, Select City, ZIP/Postal Code */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Select Country<span className="text-red-500">*</span>
                                    </label>
                                    <div className="h-9">
                                        <Dropdown
                                            name="selectCountry"
                                            value={formData.selectCountry}
                                            onChange={(value) => handleDropdownChange("selectCountry", value)}
                                            options={countryOptions}
                                            placeholder="Select Country"
                                            search={true}
                                        />
                                    </div>
                                    {errors.selectCountry && (
                                        <p className="text-red-500 text-xs mt-1">{errors.selectCountry}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Select State<span className="text-red-500">*</span>
                                    </label>
                                    <div className="h-9">
                                        <Dropdown
                                            name="selectState"
                                            value={formData.selectState}
                                            onChange={(value) => handleDropdownChange("selectState", value)}
                                            options={stateOptions}
                                            placeholder="Select State"
                                            search={true}
                                        />
                                    </div>
                                    {errors.selectState && (
                                        <p className="text-red-500 text-xs mt-1">{errors.selectState}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Select City<span className="text-red-500">*</span>
                                    </label>
                                    <div className="h-9">
                                        <Dropdown
                                            name="selectCity"
                                            value={formData.selectCity}
                                            onChange={(value) => handleDropdownChange("selectCity", value)}
                                            options={cityOptions}
                                            placeholder="Select City"
                                            search={true}
                                        />
                                    </div>
                                    {errors.selectCity && (
                                        <p className="text-red-500 text-xs mt-1">{errors.selectCity}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        ZIP/Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="ZIP/Postal Code"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right side - Vertical Branches */}
                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <label className="block mb-3 text-sm font-semibold text-black">
                                    Branches<span className="text-red-500">*</span>
                                </label>
                                <div className="space-y-3">
                                    {branchesOptions.map((branch) => (
                                        <div key={branch.value} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="branches"
                                                value={branch.value}
                                                checked={formData.branches === branch.value}
                                                onChange={() => handleBranchChange(branch.value)}
                                                className="mr-2 hover:border-blue-600 h-4 w-4 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label className="text-sm text-black cursor-pointer">
                                                {branch.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.branches && (
                                    <p className="text-red-500 text-xs mt-1">{errors.branches}</p>
                                )}
                            </div>
                        </div>
                    </div>

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

export default CreateNewBank;