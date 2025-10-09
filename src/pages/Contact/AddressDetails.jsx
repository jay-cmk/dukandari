import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from '../../components/Dropdown/Dropdown';
import { validateField, validateForm } from '../../utils/validation';

const AddressDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const [addresses, setAddresses] = useState([{
        // First Row
        gstType: "",
        gstin: "",
        panNo: "",
        contactFirstName: "",
        contactLastName: "",
        contactCompanyName: "",

        // Second Row
        contactNo: "",
        contactEmail: "",
        addressLine1: "",
        addressLine2: "",

        // Third Row
        country: "India",
        state: "Gujarat",
        city: "Ahmedabad",
        pincode: "",
    }]);
    
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    // Initialize form data based on mode (create/edit)
    useEffect(() => {
        if (location.state) {
            const { employeeData, isEdit: editMode, employeeId: id } = location.state;
            
            if (editMode && employeeData) {
                setIsEdit(true);
                setEmployeeId(id);
                setAddresses([{
                    ...addresses[0],
                    ...employeeData
                }]);
            }
        }
    }, [location.state]);

    const handleChange = (index, e) => {
        const { name, value, type, checked } = e.target;

        const updatedAddresses = addresses.map((address, i) => {
            if (i === index) {
                return {
                    ...address,
                    [name]: type === "checkbox" ? checked : value,
                };
            }
            return address;
        });

        setAddresses(updatedAddresses);

        if (touched[name] || value.length > 0) {
            const error = validateField(name, value, addresses[index]);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (index, e) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, value, addresses[index]);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    const handleAddMoreAddress = () => {
        setAddresses([
            ...addresses,
            {
                gstType: "",
                gstin: "",
                panNo: "",
                contactFirstName: "",
                contactLastName: "",
                contactCompanyName: "",
                contactNo: "",
                contactEmail: "",
                addressLine1: "",
                addressLine2: "",
                country: "India",
                state: "Gujarat",
                city: "Ahmedabad",
                pincode: "",
            }
        ]);
    };

    const handleRemoveAddress = (index) => {
        if (addresses.length > 1) {
            const updatedAddresses = addresses.filter((_, i) => i !== index);
            setAddresses(updatedAddresses);
        }
    };

    return (
        <div className="mx-auto p-4 bg-gray-300">
           

            <div className="bg-white border p-2 pl-4 pr-4 rounded-lg">
                 <h1 className="text-xl  mb-2">
                {isEdit ? "Edit Address" : "Address Details"}
            </h1>
                <form>
                    {addresses.map((address, index) => (
                        <div key={index} className="bg-white mb-6 border-b pb-6 last:border-b-0 last:pb-0">
                            {addresses.length > 1 && (
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Address {index + 1}</h3>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveAddress(index)}
                                        className="px-3 py-1 border border-red-500 text-red-500 rounded text-sm hover:bg-red-50 transition-colors duration-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                            
                            <div>
                                {/* First Row: GST Type, GSTIN, PAN No., Contact First Name, Contact Last Name, Contact Company Name */}
                                <div className="mb-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
                                        <div>
                                            <label className="block mb-1 text-sm font-semibold text-black">
                                                GST Type
                                            </label>
                                            <div className="h-9">
                                                <Dropdown
                                                    name="gstType"
                                                    value={address.gstType}
                                                    onChange={(e) => handleChange(index, e)}
                                                    options={[
                                                        { value: 'unregistered', label: 'UnRegistered' },
                                                        { value: 'registered', label: 'Registered' },
                                                        { value: 'composition', label: 'Composition' },
                                                    ]}
                                                    placeholder="Select GST Type"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-semibold text-black">
                                                GSTIN*
                                            </label>
                                            <input
                                                type="text"
                                                name="gstin"
                                                value={address.gstin}
                                                onChange={(e) => handleChange(index, e)}
                                                onBlur={(e) => handleBlur(index, e)}
                                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                                placeholder="GSTIN"
                                            />
                                            {errors.gstin && (
                                                <p className="text-red-500 text-xs mt-1">{errors.gstin}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-semibold text-black">
                                                PAN No.
                                            </label>
                                            <input
                                                type="text"
                                                name="panNo"
                                                value={address.panNo}
                                                onChange={(e) => handleChange(index, e)}
                                                onBlur={(e) => handleBlur(index, e)}
                                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                                placeholder="PAN No."
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-semibold text-black">
                                                Contact First Name*<span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="contactFirstName"
                                                value={address.contactFirstName}
                                                onChange={(e) => handleChange(index, e)}
                                                onBlur={(e) => handleBlur(index, e)}
                                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                                placeholder="Contact First Name"
                                            />
                                            {errors.contactFirstName && (
                                                <p className="text-red-500 text-xs mt-1">{errors.contactFirstName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-semibold text-black">
                                                Contact Last Name
                                            </label>
                                            <input
                                                type="text"
                                                name="contactLastName"
                                                value={address.contactLastName}
                                                onChange={(e) => handleChange(index, e)}
                                                onBlur={(e) => handleBlur(index, e)}
                                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                                placeholder="Contact Last Name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-1 text-sm font-semibold text-black">
                                                Contact Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="contactCompanyName"
                                                value={address.contactCompanyName}
                                                onChange={(e) => handleChange(index, e)}
                                                onBlur={(e) => handleBlur(index, e)}
                                                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                                placeholder="Contact Company Name"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Second Row: Contact No., Contact Email, Address Line 1, Address Line 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div>
                                        <label className="block mb-1 text-sm font-semibold text-black">
                                            Contact No.
                                        </label>
                                        <div className="flex">
                                            <select className="border p-2 rounded-l bg-gray-100 text-sm w-20 hover:border-blue-600 transition-colors duration-200 h-9">
                                                <option>+91</option>
                                            </select>
                                            <input
                                                type="text"
                                                name="contactNo"
                                                value={address.contactNo}
                                                onChange={(e) => handleChange(index, e)}
                                                onBlur={(e) => handleBlur(index, e)}
                                                className="w-full border p-2 rounded-r text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                                placeholder="Contact No."
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-semibold text-black">
                                            Contact Email
                                        </label>
                                        <input
                                            type="email"
                                            name="contactEmail"
                                            value={address.contactEmail}
                                            onChange={(e) => handleChange(index, e)}
                                            onBlur={(e) => handleBlur(index, e)}
                                            className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                            placeholder="Contact Email"
                                        />
                                        {errors.contactEmail && (
                                            <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-semibold text-black">
                                            Address Line 1
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine1"
                                            value={address.addressLine1}
                                            onChange={(e) => handleChange(index, e)}
                                            onBlur={(e) => handleBlur(index, e)}
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
                                            value={address.addressLine2}
                                            onChange={(e) => handleChange(index, e)}
                                            onBlur={(e) => handleBlur(index, e)}
                                            className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                            placeholder="Address Line 2"
                                        />
                                    </div>
                                </div>

                                {/* Third Row: Select Country, Select State, Select City, Pincode */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                    <div>
                                        <label className="block mb-1 text-sm font-semibold text-black">
                                            Select Country*<span className="text-red-500">*</span>
                                        </label>
                                        <div className="h-9">
                                            <Dropdown
                                                name="country"
                                                value={address.country}
                                                onChange={(e) => handleChange(index, e)}
                                                options={[
                                                    { value: 'India', label: 'India' },
                                                    { value: 'USA', label: 'United States' },
                                                    { value: 'UK', label: 'United Kingdom' },
                                                ]}
                                                placeholder="Select Country"
                                            />
                                        </div>
                                        {errors.country && (
                                            <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-semibold text-black">
                                            Select State*<span className="text-red-500">*</span>
                                        </label>
                                        <div className="h-9">
                                            <Dropdown
                                                name="state"
                                                value={address.state}
                                                onChange={(e) => handleChange(index, e)}
                                                options={[
                                                    { value: 'Gujarat', label: 'Gujarat' },
                                                    { value: 'Maharashtra', label: 'Maharashtra' },
                                                    { value: 'Rajasthan', label: 'Rajasthan' },
                                                    { value: 'Karnataka', label: 'Karnataka' },
                                                ]}
                                                placeholder="Select State"
                                            />
                                        </div>
                                        {errors.state && (
                                            <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-semibold text-black">
                                            Select City*<span className="text-red-500">*</span>
                                        </label>
                                        <div className="h-9">
                                            <Dropdown
                                                name="city"
                                                value={address.city}
                                                onChange={(e) => handleChange(index, e)}
                                                options={[
                                                    { value: 'Ahmedabad', label: 'Ahmedabad' },
                                                    { value: 'Surat', label: 'Surat' },
                                                    { value: 'Vadodara', label: 'Vadodara' },
                                                    { value: 'Rajkot', label: 'Rajkot' },
                                                ]}
                                                placeholder="Select City"
                                            />
                                        </div>
                                        {errors.city && (
                                            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block mb-1 text-sm font-semibold text-black">
                                            Pincode
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={address.pincode}
                                            onChange={(e) => handleChange(index, e)}
                                            onBlur={(e) => handleBlur(index, e)}
                                            className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                                            placeholder="Pincode"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add More Address Button */}
                    <div className="flex justify-start mt-6">
                        <button
                            type="button"
                            onClick={handleAddMoreAddress}
                            className="px-4 py-2 border border-black text-black rounded text-sm hover:bg-green-50 transition-colors duration-200"
                        >
                            Add More Address
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressDetails;