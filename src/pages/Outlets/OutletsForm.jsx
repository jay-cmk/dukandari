import React, { useState, useEffect } from "react";
import Dropdown from '../../components/Dropdown/Dropdown';
import { validateField, validateForm } from '../../utils/validation';
import { useNavigate, useLocation } from 'react-router-dom';

const OutletForm = () => {
  const [activeTab, setActiveTab] = useState("outletDetails");
  const [formData, setFormData] = useState({
    outletType: "Branch",
    name: "",
    displayName: "",
    contactName: "",
    mobileNo: "",
    telephoneNo: "",
    email: "",
    userName: "",
    password: "",
    yearInterval: "2023–2026",
    gstType: "UnRegistered",
    gstin: "",
    panNo: "",
    website: "",
    haveFssaiNo: false,
    fssaiNo: "",
    address: "",
    country: "InGo",
    state: "Guten",
    city: "Anwedabad",
    zipCode: "",
    bank: "",
    ifscCode: "",
    branchName: "",
    accountNo: "",
    accountHolderName: "",
    printerName: "",
    bankName: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from navigation state
  const outletData = location.state?.outletData;
  const actualMode = outletData ? "edit" : "create";

  // Load data for edit mode from navigation state
  useEffect(() => {
    if (actualMode === "edit" && outletData) {
      // Ensure all fields have values, even if they're undefined in the passed data
      const filledData = { ...formData };
      Object.keys(outletData).forEach(key => {
        if (outletData[key] !== undefined) {
          filledData[key] = outletData[key];
        }
      });
      setFormData(filledData);
    }
  }, [actualMode, outletData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (touched[name] || (value && value.length > 0)) {
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

  useEffect(() => {
    // Fix: Check if gstin exists and has length property
    const gstinValue = formData.gstin || "";
    if (touched.gstin || gstinValue.length > 0) {
      const error = validateField("gstin", gstinValue, formData);
      setErrors((prev) => ({ ...prev, gstin: error }));
    }
  }, [formData.gstType, formData.gstin, touched.gstin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = {};
    Object.keys(formData).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        // Simulate API call - replace with your actual API
        if (actualMode === "create") {
          console.log("Creating outlet:", formData);
          alert("Outlet created successfully!");
        } else {
          console.log("Updating outlet:", formData);
          alert("Outlet updated successfully!");
        }
        navigate('/outlets');
      } catch (error) {
        console.error("Error saving outlet:", error);
        alert("Error saving outlet data");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGstTypeChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      gstType: value,
      gstin: value === "UnRegistered" ? "" : (prev.gstin || ""),
    }));
  };

  return (
    <div className="mx-auto p-8 bg-gray-300">
      <h1 className="text-2xl font-bold mb-2">
        {actualMode === "create" ? "New Outlet" : "Edit Outlet"}
      </h1>

      <div className="bg-white border p-2 pl-4 pr-4 rounded-lg">
        <div className="flex border-b mb-4 p-5 bg-white">
          <button
            onClick={() => setActiveTab("outletDetails")}
            className={`px-4 py-2 ${
              activeTab === "outletDetails" ? "border-b-2 border-blue-600" : ""
            }`}
          >
            Outlet Details
          </button>
          <button
            onClick={() => setActiveTab("location")}
            className={`px-4 py-2 ${
              activeTab === "location" ? "border-b-2 border-blue-600" : ""
            }`}
          >
            Location
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === "outletDetails" && (
            <div className="bg-white">
              <h2 className="text-lg font-semibold mb-4">Outlet Details</h2>

              {/* Row 1: Outlet Type, Name, Display Name, Contact Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 bg-white">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Outlet Type<span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    name="outletType"
                    value={formData.outletType || ""}
                    onChange={handleChange}
                    options={[
                      { value: 'Branch', label: 'Branch' },
                    ]}
                    placeholder="Select Outlet Type"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Display Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Display Name"
                  />
                  {errors.displayName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.displayName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Contact Name"
                  />
                </div>
              </div>

              {/* Row 2: Mobile No., Telephone No., Email, User Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Mobile No.<span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <select className="border p-2 rounded-l bg-gray-100 text-sm w-20 hover:border-blue-600 transition-colors duration-200">
                      <option>+91</option>
                    </select>
                    <input
                      type="text"
                      name="mobileNo"
                      value={formData.mobileNo || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full border p-2 rounded-r text-sm hover:border-blue-600 transition-colors duration-200"
                      placeholder="Mobile No."
                    />
                  </div>
                  {errors.mobileNo && (
                    <p className="text-red-500 text-xs mt-1">{errors.mobileNo}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Telephone No.
                  </label>
                  <input
                    type="text"
                    name="telephoneNo"
                    value={formData.telephoneNo || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Telephone No."
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    User Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="User Name"
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-xs mt-1">{errors.userName}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Password, Year Interval, GST Type, GSTIN */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Password{actualMode === "create" && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Year Interval<span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    name="yearInterval"
                    value={formData.yearInterval || ""}
                    onChange={handleChange}
                    options={[
                      { value: '2023–2026', label: '2023–2026' },
                    ]}
                    placeholder="Select Year Interval"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    GST Type<span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    name="gstType"
                    value={formData.gstType || ""}
                    onChange={handleGstTypeChange}
                    options={[
                      { value: 'UnRegistered', label: 'UnRegistered' },
                      { value: 'Registered', label: 'Registered' },
                    ]}
                    placeholder="Select GST Type"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    GSTIN{formData.gstType === "Registered" && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="GSTIN"
                    disabled={formData.gstType === "UnRegistered"}
                  />
                  {errors.gstin && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.gstin}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4: PAN No., Website, FSSAI No. (with checkbox) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    PAN No.
                  </label>
                  <input
                    type="text"
                    name="panNo"
                    value={formData.panNo || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="PAN No."
                  />
                  {errors.panNo && (
                    <p className="text-red-500 text-xs mt-1">{errors.panNo}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={formData.website || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Website"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center mb-1">
                    <input
                      type="checkbox"
                      name="haveFssaiNo"
                      checked={formData.haveFssaiNo || false}
                      onChange={handleChange}
                      className="mr-2 hover:border-blue-600"
                    />
                    <label className="text-sm font-semibold text-black">
                      FSSAI No.
                    </label>
                  </div>
                  {formData.haveFssaiNo && (
                    <input
                      type="text"
                      name="fssaiNo"
                      value={formData.fssaiNo || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full border p-2 rounded text-sm mt-1 hover:border-blue-600 transition-colors duration-200"
                      placeholder="FSSAI No."
                    />
                  )}
                  {errors.fssaiNo && (
                    <p className="text-red-500 text-xs mt-1">{errors.fssaiNo}</p>
                  )}
                </div>
                <div></div>
              </div>

              {/* Row 5: Address, Select Country, Select State, Bank Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Address<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
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
                  <Dropdown
                    name="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                    options={[
                      { value: 'InGo', label: 'InGo' },
                    ]}
                    placeholder="Select Country"
                    allowClear={true}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Select State<span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                    options={[
                      { value: 'Guten', label: 'Guten' },
                    ]}
                    placeholder="Select State"
                    allowClear={true}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Bank Name"
                  />
                </div>
              </div>

              {/* Row 6: ZIP/Postal Code, Select Bank, IFSC Code, Select City */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="ZIP/Postal Code"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Select Bank
                  </label>
                  <Dropdown
                    name="bank"
                    value={formData.bank || ""}
                    onChange={handleChange}
                    options={[
                      { value: '', label: 'Select Bank' },
                    ]}
                    placeholder="Select Bank"
                    allowClear={true}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="IFSC Code"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Select City<span className="text-red-500">*</span>
                  </label>
                  <Dropdown
                    name="city"
                    value={formData.city || ""}
                    onChange={handleChange}
                    options={[
                      { value: 'Anwedabad', label: 'Anwedabad' },
                    ]}
                    placeholder="Select City"
                    allowClear={true}
                  />
                </div>
              </div>

              {/* Row 7: Branch Name, Account No., Account Holder Name, Printer Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Branch Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="branchName"
                    value={formData.branchName || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Branch Name"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Account No.
                  </label>
                  <input
                    type="text"
                    name="accountNo"
                    value={formData.accountNo || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Account No."
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Account Holder Name"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-semibold text-black">
                    Printer Name
                  </label>
                  <input
                    type="text"
                    name="printerName"
                    value={formData.printerName || ""}
                    onChange={handleChange}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                    placeholder="Printer Name"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "location" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Address<span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                  rows="3"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Map Placeholder
                </label>
                <div className="w-full h-32 bg-gray-200 flex items-center justify-center text-sm">
                  Map View
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 border rounded bg-gray-200 text-sm hover:border-blue-600 transition-colors duration-200"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border rounded bg-blue-500 text-white text-sm hover:border-blue-600 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : (actualMode === "create" ? "Create" : "Update")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OutletForm;