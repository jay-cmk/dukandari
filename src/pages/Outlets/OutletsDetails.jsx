// components/OutletDetails.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PencilSquareIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function OutletDetails() {
  const { outletId } = useParams();
  const navigate = useNavigate();

  // Sample data - in real app, this would come from API based on outletId
  const outletData = {
    name: "KIRTIRAJ SNACKS PRIVATE LIMITED",
    displayName: "KIRTIRAJ SNACKS PRIVATE LIMITED",
    contactName: "KIRTIRAJ",
    email: "abc@gmail.com",
    mobileNo: "+91-6355388556",
    telephoneNo: "",
    website: "",
    createdBy: "KIRTIRAJ",
    createdOn: "10-07-2025 18:34:15",
    address: "12/7/125_CAPITAL COMPOUND.LOTESHWAR BHAGOL_ANAND",
    city: "Anand",
    state: "Gujarat",
    country: "India",
    pinCode: "",
    bankName: "",
    branchName: "",
    accountHolderName: "",
    accountNo: "",
    ifscCode: "",
    swiftCode: "",
    userName: "KIRTIRAJ",
    panNo: "*****387Q",
    gstRegistrationType: "Registered",
    gstin: "24AADCK438701ZW",
    financialMonthInterval: "April - March",
    defaultFinancialYear: "2025 - 2026",
    outletCode: "",
    outletType: "Franchise"
  };

  const handleEdit = () => {
    navigate("/outletsForm", { 
      state: { 
        outletData: {
          outletType: outletData.outletType,
          name: outletData.name,
          displayName: outletData.displayName,
          contactName: outletData.contactName,
          mobileNo: outletData.mobileNo,
          telephoneNo: outletData.telephoneNo,
          email: outletData.email,
          userName: outletData.userName,
          password: "",
          yearInterval: outletData.defaultFinancialYear,
          gstType: outletData.gstRegistrationType,
          gstin: outletData.gstin,
          panNo: outletData.panNo,
          website: outletData.website,
          haveFssaiNo: false,
          fssaiNo: "",
          address: outletData.address,
          country: outletData.country,
          state: outletData.state,
          city: outletData.city,
          zipCode: outletData.pinCode,
          bank: outletData.bankName,
          ifscCode: outletData.ifscCode,
          branchName: outletData.branchName,
          accountNo: outletData.accountNo,
          accountHolderName: outletData.accountHolderName,
          printerName: "",
          bankName: outletData.bankName,
        }
      } 
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const DetailSection = ({ title, children }) => (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );

  const DetailField = ({ label, value }) => (
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-600 mb-1">{label}</span>
      <span className="text-gray-800 bg-gray-50 px-3 py-2 rounded border border-gray-200 min-h-[40px] flex items-center">
        {value || <span className="text-gray-400">—</span>}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {outletData.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Outlet Details • ID: {outletId}
              </p>
            </div>
          </div>
          <Button 
            onClick={handleEdit}
            className="flex items-center gap-2"
          >
            <PencilSquareIcon className="h-4 w-4" />
            Edit Outlet
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6">
          {/* Profile Details */}
          <DetailSection title="Profile Details">
            <DetailField label="Name" value={outletData.name} />
            <DetailField label="Display Name" value={outletData.displayName} />
            <DetailField label="Contact Name" value={outletData.contactName} />
            <DetailField label="Email" value={outletData.email} />
            <DetailField label="Mobile No." value={outletData.mobileNo} />
            <DetailField label="Telephone No." value={outletData.telephoneNo} />
            <DetailField label="Website" value={outletData.website} />
            <DetailField label="Created By" value={outletData.createdBy} />
            <DetailField label="Created On" value={outletData.createdOn} />
          </DetailSection>

          {/* Address Details */}
          <DetailSection title="Address Details">
            <DetailField label="Address" value={outletData.address} />
            <DetailField label="City" value={outletData.city} />
            <DetailField label="State" value={outletData.state} />
            <DetailField label="Country" value={outletData.country} />
            <DetailField label="Pin Code" value={outletData.pinCode} />
          </DetailSection>

          {/* Bank Details */}
          <DetailSection title="Bank Details">
            <DetailField label="Bank Name" value={outletData.bankName} />
            <DetailField label="Branch Name" value={outletData.branchName} />
            <DetailField label="Account Holder Name" value={outletData.accountHolderName} />
            <DetailField label="Account No." value={outletData.accountNo} />
            <DetailField label="IFSC Code" value={outletData.ifscCode} />
            <DetailField label="Swift Code" value={outletData.swiftCode} />
          </DetailSection>

          {/* Other Details */}
          <DetailSection title="Other Details">
            <DetailField label="User Name" value={outletData.userName} />
            <DetailField label="PAN No." value={outletData.panNo} />
            <DetailField label="GST Registration Type" value={outletData.gstRegistrationType} />
            <DetailField label="GSTIN" value={outletData.gstin} />
            <DetailField label="Financial Month Interval" value={outletData.financialMonthInterval} />
            <DetailField label="Default Financial Year" value={outletData.defaultFinancialYear} />
            <DetailField label="Outlet Code" value={outletData.outletCode} />
            <DetailField label="Outlet Type" value={outletData.outletType} />
          </DetailSection>
        </div>
      </div>
    </div>
  );
}