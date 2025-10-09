import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from '../../components/Dropdown/Dropdown';
import { validateField, validateForm } from '../../utils/validation';

const GeneralDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    
    const [formData, setFormData] = useState({
        // First Row - Name Section
        firstName: "",
        lastName: "",
        companyName: "",
        code: "",
        email: "",
        mobileNo: "",

        // Second Row
        telephoneNo: "",
        remarks: "",
        applyTDS: false,
        creditLimit: "",

        // Third Row - Payment
        paymentMode: "",
        paymentTerms: "",
        openingBalanceDebit: "",
        openingBalanceCredit: "",

        // Fourth Row
        whatsappNo: "",
        dateOfBirth: "",
        anniversaryDate: "",
        type: "",
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

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, value, formData);
        setErrors((prev) => ({ ...prev, [name]: error }));
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

    // Handle type selection
    const handleTypeSelect = (type) => {
        setFormData(prev => ({
            ...prev,
            type: type
        }));
    };

    return (
        <div className="mx-auto p-4 bg-gray-300">
           

            <div className="bg-white border p-2 pl-4 pr-4 rounded-lg">
                 <h1 className="text-xl  mb-2">
                {isEdit ? "Edit Employee" : "General Details"}
            </h1>
                <form onSubmit={handleSubmit}>
                    <div className="bg-white">
                        {/* First Row: Name Section */}
                        <div className="mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        First Name<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="First Name"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="Company Name"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Code
                                    </label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={formData.code}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="Code"
                                    />
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
                                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Mobile No.<span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex">
                                        <select className="border p-2 rounded-l bg-gray-100 text-sm w-20 hover:border-blue-600 transition-colors duration-200 h-9">
                                            <option>+91</option>
                                        </select>
                                        <input
                                            type="text"
                                            name="mobileNo"
                                            value={formData.mobileNo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="w-full border p-2 rounded-r text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                            placeholder="Mobile No."
                                        />
                                    </div>
                                    {errors.mobileNo && (
                                        <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Second Row: Telephone No., Remarks, Apply TDS, Credit Limit */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-black">
                                    Telephone No.
                                </label>
                                <input
                                    type="text"
                                    name="telephoneNo"
                                    value={formData.telephoneNo}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                    placeholder="Telephone No."
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-black">
                                    Remarks
                                </label>
                                <input
                                    type="text"
                                    name="remarks"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                    placeholder="Remarks"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="applyTDS"
                                    checked={formData.applyTDS}
                                    onChange={handleChange}
                                    className="mr-2 hover:border-blue-600 h-4 w-4"
                                />
                                <label className="text-sm font-semibold text-black">
                                    Apply TDS
                                </label>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-black">
                                    Credit Limit
                                </label>
                                <input
                                    type="text"
                                    name="creditLimit"
                                    value={formData.creditLimit}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                    placeholder="Credit Limit"
                                />
                            </div>
                        </div>

                        {/* Third Row: Payment Mode, Payment Terms, Opening Balance */}
                        <div className="mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Select Payment Mode
                                    </label>
                                    <div className="h-9">
                                        <Dropdown
                                            name="paymentMode"
                                            value={formData.paymentMode}
                                            onChange={handleChange}
                                            options={[
                                                { value: 'cash', label: 'Cash' },
                                                { value: 'card', label: 'Card' },
                                                { value: 'upi', label: 'UPI' },
                                                { value: 'bank_transfer', label: 'Bank Transfer' },
                                            ]}
                                            placeholder="Select Payment Mode"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block mb-1 text-sm font-semibold text-black">
                                        Select Payment Terms
                                    </label>
                                    <div className="h-9">
                                        <Dropdown
                                            name="paymentTerms"
                                            value={formData.paymentTerms}
                                            onChange={handleChange}
                                            options={[
                                                { value: 'net_15', label: 'Net 15' },
                                                { value: 'net_30', label: 'Net 30' },
                                                { value: 'net_60', label: 'Net 60' },
                                                { value: 'due_on_receipt', label: 'Due on Receipt' },
                                            ]}
                                            placeholder="Select Payment Terms"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-md font-semibold mb-2 text-gray-700">Opening Balance</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block mb-1 text-xs font-semibold text-black">
                                                Debit Amount
                                            </label>
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
                                            <label className="block mb-1 text-xs font-semibold text-black">
                                                Credit Amount
                                            </label>
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
                            </div>
                        </div>

                        {/* Fourth Row: WhatsApp No., Date of Birth, Anniversary Date, Type */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-black">
                                    WhatsApp No.
                                </label>
                                <div className="flex">
                                    <select className="border p-2 rounded-l bg-gray-100 text-sm w-20 hover:border-blue-600 transition-colors duration-200 h-9">
                                        <option>+91</option>
                                    </select>
                                    <input
                                        type="text"
                                        name="whatsappNo"
                                        value={formData.whatsappNo}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className="w-full border p-2 rounded-r text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                        placeholder="WhatsApp No."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-black">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-black">
                                    Anniversary Date
                                </label>
                                <input
                                    type="date"
                                    name="anniversaryDate"
                                    value={formData.anniversaryDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                />
                            </div>
                            <div>
                                <label className="block mb-1 text-sm font-semibold text-black">
                                    Type*<span className="text-red-500">*</span>
                                </label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    <button
                                        type="button"
                                        onClick={() => handleTypeSelect('retailer')}
                                        className={`px-3 py-1.5 text-xs border rounded transition-colors duration-200 ${
                                            formData.type === 'retailer' 
                                            ? 'bg-blue-500 text-white border-blue-500' 
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                                        }`}
                                    >
                                        Retailer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeSelect('wholesaler')}
                                        className={`px-3 py-1.5 text-xs border rounded transition-colors duration-200 ${
                                            formData.type === 'wholesaler' 
                                            ? 'bg-blue-500 text-white border-blue-500' 
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                                        }`}
                                    >
                                        Wholesaler
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeSelect('other')}
                                        className={`px-3 py-1.5 text-xs border rounded transition-colors duration-200 ${
                                            formData.type === 'other' 
                                            ? 'bg-blue-500 text-white border-blue-500' 
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                                        }`}
                                    >
                                        Other
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleTypeSelect('merchant')}
                                        className={`px-3 py-1.5 text-xs border rounded transition-colors duration-200 ${
                                            formData.type === 'merchant' 
                                            ? 'bg-blue-500 text-white border-blue-500' 
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
                                        }`}
                                    >
                                        Merchant
                                    </button>
                                </div>
                                {errors.type && (
                                    <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        {/* <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 border rounded bg-gray-200 text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                        >
                            Cancel
                        </button> */}
                        {/* <button
                            type="submit"
                            className="px-4 py-2 border rounded bg-blue-500 text-white text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                        >
                            {isEdit ? 'Update' : 'Submit'}
                        </button> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GeneralDetails;