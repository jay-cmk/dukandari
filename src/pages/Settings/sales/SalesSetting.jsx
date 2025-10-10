import React, { useState } from "react";
import { FeatureToggleGroup } from "@/components/featureToggleGroup/FeatureToggleGroup";
import IconHome from "@/components/HomeIcon/IconHome";

const SalesSetting = () => {
    // 🔹 Input states
    const [defaultSalesman, setDefaultSalesman] = useState("");
    const [defaultTax, setDefaultTax] = useState("None");

    // 🔹 Toggle states
    const [checkCreditLimit, setCheckCreditLimit] = useState(true);
    const [customerProductMapping, setCustomerProductMapping] = useState(false);
    const [allowDuplicateProduct, setAllowDuplicateProduct] = useState(false);
    const [allowSalesNewLine, setAllowSalesNewLine] = useState(true);
    const [allowExpenseApproval, setAllowExpenseApproval] = useState(true);

    // 🔹 Feature list for reusable component
    const featureList = [
        {
            label: "Check Credit Limit",
            value: checkCreditLimit,
            setter: setCheckCreditLimit,
            icon: "💳",
        },
        {
            label: "Customer Wise Product Mapping",
            value: customerProductMapping,
            setter: setCustomerProductMapping,
            icon: "👥",
        },
        {
            label: "Allow Duplicate Product In Sales",
            value: allowDuplicateProduct,
            setter: setAllowDuplicateProduct,
            icon: "📝",
        },
        {
            label: "Allow Sales New Line",
            value: allowSalesNewLine,
            setter: setAllowSalesNewLine,
            icon: "➕",
        },
        {
            label: "Allow Expense Approval",
            value: allowExpenseApproval,
            setter: setAllowExpenseApproval,
            icon: "💰",
        },
    ];

    return (
        <div className=" bg-gray-100 p-2">
            <div className=" flex items-center justify-between">
                {/* <div className="flex items-center gap-5">
                    <h1 className="text-1xl text-gray-500">Sales Setting</h1>
                    <div className="h-6 w-px bg-gray-400"></div>
                    <IconHome className="text-gray-500 w-8 h-8" />
                </div> */}
            </div>
            <div className="p-6 rounded-2xl ">
                {/* 🔸 Feature Toggles Section */}
                <FeatureToggleGroup title="Feature Settings" features={featureList} />

                {/* 🔸 Input Fields Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-2">
                    {/* Default Salesman */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Default Salesman
                        </label>
                        <input
                            type="text"
                            value={defaultSalesman}
                            onChange={(e) => setDefaultSalesman(e.target.value)}
                            placeholder="Enter default salesman name"
                            className="border  px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Default Tax */}
                    <div className="flex flex-col bg-white">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Default Tax
                        </label>
                        <select
                            value={defaultTax}
                            onChange={(e) => setDefaultTax(e.target.value)}
                            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="None">None</option>
                            <option value="GST 5%">GST 5%</option>
                            <option value="GST 12%">GST 12%</option>
                            <option value="GST 18%">GST 18%</option>
                        </select>
                    </div>
                </div>
            </div>

              
        </div>
    );
};

export default SalesSetting;
