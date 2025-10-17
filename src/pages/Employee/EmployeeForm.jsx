import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from '../../components/Dropdown/Dropdown';
import { validateField, validateForm } from '../../utils/validation';

const EmployeeForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("employeeDetails");
    const [showAuthentication, setShowAuthentication] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);

    const [formData, setFormData] = useState({
        // Employee Details
        name: "",
        mobileNo: "",
        email: "",
        panNo: "",
        isManager: false,
        isDeliveryUser: false,
        isSalaryAccount: false,
        selectGroup: "",

        // Address Details
        address: "",
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        zipCode: "",

        // Bank Details
        bankName: "",
        branchName: "",
        accountNo: "",
        ifscCode: "",
        accountHolderName: "",
        swiftCode: "",

        // Employment Details
        wages: "",
        commission: "",
        extraWages: "",
        target: "",
        selectedBranch: "KRITRAJ",

        // Authentication Details
        userName: "",
        password: "",
        role: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Initialize form data based on mode (create/edit)
    useEffect(() => {
        if (location.state) {
            const { employeeData, isEdit: editMode, employeeId: id } = location.state;

            if (editMode && employeeData) {
                setIsEdit(true);
                setEmployeeId(id);
                setFormData(prev => ({
                    ...prev,
                    ...employeeData
                }));

                // Show authentication section if credentials exist
                if (employeeData.userName || employeeData.role) {
                    setShowAuthentication(true);
                }
            }
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle manager checkbox to automatically check/uncheck salary account and control select group visibility
        if (name === "isManager") {
            setFormData((prev) => ({
                ...prev,
                isManager: checked,
                isSalaryAccount: checked, // Automatically check/uncheck salary account
                selectGroup: checked ? prev.selectGroup : "" // Clear select group when unchecked
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }

        if (touched[name] || value.length > 0) {
            const error = validateField(name, value, formData);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, value, formData);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleAddAuthentication = () => {
        setShowAuthentication(!showAuthentication);
    };

    const handleCancel = () => {
        navigate(-1); // Go back to previous page
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
                console.log("Updating Employee:", { id: employeeId, ...formData });
                alert("Employee updated successfully!");
            } else {
                console.log("Creating Employee:", formData);
                alert("Employee added successfully!");
            }

            // Navigate back to employee list after successful submission
            navigate("/employees");
        }
    };

    return (
        <div className="mx-auto p-4 bg-gray-300 ">
            <h1 className="text-2xl font-bold mb-2">
                {isEdit ? "Edit Employee" : "New Employee"}
            </h1>

            <div className="bg-white border p-2 pl-4 pr-4 rounded-lg">
                <form onSubmit={handleSubmit}>
                    {activeTab === "employeeDetails" && (
                        <div className="bg-white">
                            {/* Row 1: Name, Mobile No., Email, PAN No. */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4 bg-white">
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="Name"
                                    />

                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Mobile No.<span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex">
                                        <select className="border p-2 rounded-l bg-gray-100 text-sm w-20 hover:border-blue-600 transition-colors duration-200 h-7">
                                            <option>+91</option>
                                        </select>
                                        <input
                                            type="text"
                                            name="mobileNo"
                                            value={formData.mobileNo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full border p-2 rounded-r text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                            placeholder="Mobile No."
                                        />
                                    </div>
                                    {errors.mobileNo && (
                                        <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        PAN No.
                                    </label>
                                    <input
                                        type="text"
                                        name="panNo"
                                        value={formData.panNo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="PAN No."
                                    />
                                    {errors.panNo && (
                                        <p className="text-red-500 text-xs mt-1">{errors.panNo}</p>
                                    )}
                                </div>

                                {/* Row 2: Select Group (conditionally rendered) and Checkboxes */}
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
                                    {formData.isManager && (
                                        <div>
                                            <label className="block mb-1 text-sm font-semibold text-black">
                                                Select Group
                                            </label>
                                            <div className="h-7">
                                                <Dropdown
                                                    name="selectGroup"
                                                    value={formData.selectGroup}
                                                    onChange={handleChange}
                                                    options={[
                                                        { value: 'group1', label: 'Group 1' },
                                                        { value: 'group2', label: 'Group 2' },
                                                        { value: 'group3', label: 'Group 3' },
                                                    ]}
                                                    placeholder="Select Group"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Checkboxes */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isManager"
                                        checked={formData.isManager}
                                        onChange={handleChange}
                                        className="mr-2 hover:border-blue-600 h-4 w-4 "
                                    />
                                    <label className="text-sm font-semibold text-black">
                                        Manager
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isDeliveryUser"
                                        checked={formData.isDeliveryUser}
                                        onChange={handleChange}
                                        className="mr-2 hover:border-blue-600 h-4 w-4 "
                                    />
                                    <label className="text-sm font-semibold text-black">
                                        Is Delivery User
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isSalaryAccount"
                                        checked={formData.isSalaryAccount}
                                        onChange={handleChange}
                                        className="mr-2 hover:border-blue-600 h-4 w-4"
                                    />
                                    <label className="text-sm font-semibold text-black">
                                        Salary Account
                                    </label>
                                </div>
                            </div>

                            {/* Row 3: Address, Country, State, City, ZIP */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Address<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="Address"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Select Country<span className="text-red-500">*</span>
                                    </label>
                                    <div className="h-7">
                                        <Dropdown
                                            name="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            options={[
                                                { value: 'India', label: 'India' },
                                            ]}
                                            placeholder="Select Country"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Select State<span className="text-red-500">*</span>
                                    </label>
                                    <div className="h-7">
                                        <Dropdown
                                            name="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            options={[
                                                { value: 'Gujarat', label: 'Gujarat' },
                                            ]}
                                            placeholder="Select State"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Select City<span className="text-red-500">*</span>
                                    </label>
                                    <div className="h-7">
                                        <Dropdown
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            options={[
                                                { value: 'Ahmedabad', label: 'Ahmedabad' },
                                            ]}
                                            placeholder="Select City"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        ZIP/Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="ZIP/Postal code"
                                    />
                                    {errors.zipCode && (
                                        <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>
                                    )}
                                </div>
                            </div>

                            {/* Bank Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Bank Name
                                    </label>
                                    <input
                                        type="text"
                                        name="bankName"
                                        value={formData.bankName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="BankName"
                                    />
                                    {errors.bankName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Branch Name
                                    </label>
                                    <input
                                        type="text"
                                        name="branchName"
                                        value={formData.branchName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="Branch Name"
                                    />
                                    {errors.branchName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.branchName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Account No.
                                    </label>
                                    <input
                                        type="text"
                                        name="accountNo"
                                        value={formData.accountNo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="Account No."
                                    />
                                    {errors.accountNo && (
                                        <p className="text-red-500 text-xs mt-1">{errors.accountNo}</p>
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
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="IFSC Code"
                                    />
                                    {errors.ifscCode && (
                                        <p className="text-red-500 text-xs mt-1">{errors.ifscCode}</p>
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
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="Account Holder Name"
                                    />
                                    {errors.accountHolderName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.accountHolderName}</p>
                                    )}
                                </div>
                            </div>

                            {/* Employment Details Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Wages
                                    </label>
                                    <input
                                        type="text"
                                        name="wages"
                                        value={formData.wages}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="Wages"
                                    />
                                    {errors.wages && (
                                        <p className="text-red-500 text-xs mt-1">{errors.wages}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Commission (%)
                                    </label>
                                    <input
                                        type="text"
                                        name="commission"
                                        value={formData.commission}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="Commission (%)"
                                    />
                                    {errors.commission && (
                                        <p className="text-red-500 text-xs mt-1">{errors.commission}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Extra Wages
                                    </label>
                                    <input
                                        type="text"
                                        name="extraWages"
                                        value={formData.extraWages}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="Extra Wages"
                                    />
                                    {errors.extraWages && (
                                        <p className="text-red-500 text-xs mt-1">{errors.extraWages}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Target
                                    </label>
                                    <input
                                        type="text"
                                        name="target"
                                        value={formData.target}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                        placeholder="Target"
                                    />
                                    {errors.target && (
                                        <p className="text-red-500 text-xs mt-1">{errors.target}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Select Branch
                                    </label>
                                    <div className="h-7">
                                        <Dropdown
                                            name="selectedBranch"
                                            value={formData.selectedBranch}
                                            onChange={handleChange}
                                            options={[
                                                { value: 'KRITRAJ', label: 'KRITRAJ' },
                                            ]}
                                            placeholder="Select Branch"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Authentication Details Section */}
                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showAuthentication ? 'max-h-96 opacity-100 mb-6 border-b pb-6' : 'max-h-0 opacity-0'
                                }`}>
                                {showAuthentication && (
                                    <div>
                                        <h3 className="text-md font-semibold mb-4">Authentication Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block mb-1 text-sm font-semibold text-black">
                                                    User Name{!isEdit && <span className="text-red-500">*</span>}
                                                </label>
                                                <input
                                                    type="text"
                                                    name="userName"
                                                    value={formData.userName}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                                    placeholder="User name"
                                                />
                                                {errors.userName && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-semibold text-black">
                                                    Password{!isEdit && <span className="text-red-500">*</span>}
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-7"
                                                    placeholder={isEdit ? "Leave blank to keep current" : "Password"}
                                                />
                                                {errors.password && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block mb-1 text-sm font-semibold text-black">
                                                    Select Role{!isEdit && <span className="text-red-500">*</span>}
                                                </label>
                                                <div className="h-7">
                                                    <Dropdown
                                                        name="role"
                                                        value={formData.role}
                                                        onChange={handleChange}
                                                        options={[
                                                            { value: 'admin', label: 'Admin' },
                                                            { value: 'manager', label: 'Manager' },
                                                            { value: 'user', label: 'User' },
                                                        ]}
                                                        placeholder="Select Role"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Add Authentication Details Button */}
                            <div className="mt-3 mb-4">
                                <button
                                    type="button"
                                    onClick={handleAddAuthentication}
                                    className={`px-4 py-2 border rounded text-sm transition-colors duration-200 h-9 ${showAuthentication
                                        ? 'bg-gray-500 text-white hover:bg-gray-600'
                                        : 'bg-green-500 text-white hover:bg-green-600'
                                        }`}
                                >
                                    {showAuthentication ? 'Close Authentication Details' : 'Add Authentication Details'}
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 border rounded bg-gray-200 text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border rounded bg-blue-500 text-white text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                        >
                            {isEdit ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeForm;