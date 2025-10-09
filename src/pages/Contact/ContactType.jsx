import React, { useState } from "react";
import Dropdown from '../../components/Dropdown/Dropdown';

function ContactType() {
    const [selectedContactType, setSelectedContactType] = useState("customer");
    const [selectedAccountGroup, setSelectedAccountGroup] = useState("sundry_debtors");

    return (
        <div className="mx-auto p-2 bg-gray-300">
            <div className="bg-white border p-2 rounded-lg">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-xl font-bold text-gray-800">Contact Type</h1>
                    <h1 className="text-xl font-bold text-gray-800">Account Group*</h1>
                </div>

                {/* Selectors Row */}
                <div className="flex justify-between items-start gap-8">
                    {/* Contact Type Selector */}
                    <div className="flex-1">
                        <div className="flex flex-wrap gap-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="contactType"
                                    value="customer"
                                    checked={selectedContactType === "customer"}
                                    onChange={(e) => setSelectedContactType(e.target.value)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">customer</span>
                            </label>
                            
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="contactType"
                                    value="supplier"
                                    checked={selectedContactType === "supplier"}
                                    onChange={(e) => setSelectedContactType(e.target.value)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Supplier/Vendor</span>
                            </label>
                            
                          
                            
                            
                        </div>
                    </div>

                    {/* Account Group Selector - Dropdown at right end */}
                    <div className="flex-1 flex justify-end">
                        <div className="w-64">
                            <Dropdown
                                name="accountGroup"
                                value={selectedAccountGroup}
                                onChange={(e) => setSelectedAccountGroup(e.target.value)}
                                options={[
                                    { value: 'sundry_debtors', label: 'Sundry Debtors (Current Assets)' },
                                    { value: 'sundry_creditors', label: 'Sundry Creditors (Current Liabilities)' },
                                    { value: 'fixed_assets', label: 'Fixed Assets' },
                                    { value: 'current_assets', label: 'Current Assets' },
                                ]}
                                placeholder="Select Account Group"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactType;