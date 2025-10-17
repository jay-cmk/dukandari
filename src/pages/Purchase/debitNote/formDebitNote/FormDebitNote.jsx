import React, { useState } from "react";
import ReusableForm from "../../../../components/ReusableForm";

const FormDebitNote = () => {
  const [mainFormData, setMainFormData] = useState({});
  const [additionalChargesData, setAdditionalChargesData] = useState({});

  const handleMainFormSubmit = (data) => {
    console.log("Main form submitted:", data);
    setMainFormData(data);
  };

  const handleAdditionalChargesSubmit = (data) => {
    console.log("Additional charges submitted:", data);
    setAdditionalChargesData(data);
  };

  // Main debit note form fields - organized by columns
  const mainFormFields = [ 
    // Left Column
    { 
      type: 'select', 
      name: 'supplier', 
      label: 'Select Supplier *', 
      options: ['Search Supplier'], 
      required: true,
      placeholder: 'Search Supplier'
    },

    // Middle Column
    { 
      type: 'date', 
      name: 'debitNoteDate', 
      label: 'Debit Note Date *', 
      required: true,
      defaultValue: '2025-10-17'
    },
    { 
      type: 'select', 
      name: 'paymentTerm', 
      label: 'Payment Term', 
      options: ['Select Payment Term'], 
      placeholder: 'Select Payment Term'
    },
    { 
      type: 'date', 
      name: 'shippingDate', 
      label: 'Shipping Date *', 
      required: true,
      defaultValue: '2025-10-17'
    },
    { 
      type: 'input', 
      name: 'reason', 
      label: 'Reason', 
      placeholder: 'Enter a Reason'
    },
    { 
      type: 'select', 
      name: 'accountLedger', 
      label: 'Select Account Ledger *', 
      options: ['Purchase Return'], 
      required: true,
      defaultValue: 'Purchase Return'
    },

    // Right Column
    { 
      type: 'input', 
      name: 'debitNoteNo', 
      label: 'Debit Note No.', 
      defaultValue: 'BIL3',
      readOnly: true
    },
    { 
      type: 'input', 
      name: 'referenceBillNo', 
      label: 'Reference Bill No. *', 
      defaultValue: 'BIL3',
      required: true
    },
    { 
      type: 'date', 
      name: 'dueDate', 
      label: 'Due Date *', 
      required: true,
      defaultValue: '2025-10-17'
    },
    { 
      type: 'select', 
      name: 'reverseCharge', 
      label: 'Reverse Charge', 
      options: ['No', 'Yes'], 
      defaultValue: 'No'
    },
    { 
      type: 'select', 
      name: 'selectPurchase', 
      label: 'Select Purchase *', 
      options: ['Select Purchase'], 
      required: true,
      placeholder: 'Select Purchase'
    }
  ];

  // Additional charges fields
  const additionalChargesFields = [
    { 
      type: 'input', 
      name: 'customerAmount', 
      label: 'Customer Amount',
      placeholder: 'Enter customer amount'
    },
    { 
      type: 'input', 
      name: 'totalAmount', 
      label: 'O total Amount',
      placeholder: 'Enter total amount'
    },
    { 
      type: 'input', 
      name: 'bonusUnit', 
      label: 'Bonus Unit',
      placeholder: 'Enter bonus unit'
    },
    { 
      type: 'input', 
      name: 'netAmount', 
      label: 'Net Amount',
      placeholder: 'Enter net amount'
    }
  ];

  // Summary note field
  const summaryFields = [
    { 
      type: 'textarea', 
      name: 'note', 
      label: 'Note',
      placeholder: 'Enter note',
      rows: 4
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">New Debit Note</h1>

      {/* Top section with 3 columns */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Supplier and addresses */}
        <div className="space-y-5">
          <ReusableForm
            fieldsConfig={[mainFormFields[0]]} // Just the supplier field
            onSubmit={handleMainFormSubmit}
            submitButtonText=""
            columns={1}
          />

          <div className="text-sm text-gray-600">
            <div className="flex items-center justify-between">
              <span>Place of Supply:</span>
              <span className="text-gray-500">-</span>
            </div>
            <div className="mt-1 flex items-center justify-between">
              <span>GSTIN:</span>
              <span className="text-gray-500">-</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Billing Address</h3>
              <p className="text-sm text-gray-500">Billing Address is Not Provided</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-1">Shipping Address</h3>
              <p className="text-sm text-gray-500">Shipping Address is Not Provided</p>
            </div>
          </div>
        </div>

        {/* Middle: Core dates */}
        <div className="space-y-5">
          <ReusableForm
            fieldsConfig={mainFormFields.slice(1, 6)} // Middle column fields
            onSubmit={handleMainFormSubmit}
            submitButtonText=""
            columns={1}
          />
        </div>

        {/* Right: Numbers and references */}
        <div className="space-y-5">
          <ReusableForm
            fieldsConfig={mainFormFields.slice(6)} // Right column fields
            onSubmit={handleMainFormSubmit}
            submitButtonText=""
            columns={1}
          />

          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">
                Select Purchase<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-md p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option>Select Purchase</option>
                </select>
              </div>
            </div>
            <button
              type="button"
              className="h-10 px-3 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Display All Items
            </button>
          </div>

          <label className="inline-flex items-center gap-2 text-sm text-gray-700">
            <input 
              type="checkbox" 
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
            />
            Export/SEZ
          </label>
        </div>
      </section>

      {/* Product table section */}
      <section className="mt-8">
        <div className="border rounded-md">
          <div className="px-4 py-3 border-b">
            <h2 className="text-lg font-semibold text-gray-700">Product Details</h2>
          </div>

          <div className="px-4 py-3">
            <div className="mb-3">
              <h3 className="text-sm font-medium text-gray-700">Shipping Details</h3>
            </div>

            {/* Header row */}
            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-600">
              <div className="col-span-1">#</div>
              <div className="col-span-2">Item Code/Barcode<span className="text-red-500">*</span></div>
              <div className="col-span-2">Product Name<span className="text-red-500">*</span></div>
              <div className="col-span-1">Batch<span className="text-red-500">*</span></div>
              <div className="col-span-1">Qty<span className="text-red-500">*</span></div>
              <div className="col-span-1">Unit Cost<span className="text-red-500">*</span></div>
              <div className="col-span-1">MRP<span className="text-red-500">*</span></div>
              <div className="col-span-1">Selling Price<span className="text-red-500">*</span></div>
              <div className="col-span-1">Tax</div>
              <div className="col-span-1">Landing Cost</div>
            </div>

            {/* One empty row */}
            <div className="mt-2 grid grid-cols-12 gap-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="col-span-1 border border-gray-300 rounded-md p-2 bg-white"></div>
              ))}
            </div>

            {/* Totals bar */}
            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                <div className="w-16 text-right text-sm text-gray-600 ml-2">0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Discount and totals card */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ReusableForm
              fieldsConfig={summaryFields}
              onSubmit={() => {}}
              submitButtonText=""
              columns={1}
            />
          </div>

          <div className="border rounded-md">
            <div className="px-4 py-3 border-b text-sm font-medium text-gray-700">Summary</div>
            <div className="p-4 space-y-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span>Flat Discount</span>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    className="w-24 border border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                    defaultValue={0} 
                  />
                  <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-indigo-600 px-2 text-white">%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Total Amount</span>
                <span>0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount Amount</span>
                <span>0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Gross</span>
                <span>0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Tax Amount</span>
                <span>0</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Roundoff</span>
                <span>0.0</span>
              </div>
              <div className="pt-2 mt-2 border-t text-right">
                <div className="text-gray-500 text-sm">Net Amount</div>
                <div className="text-2xl font-semibold">0</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional charges section */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-indigo-600">
          <span className="text-lg">+</span>
          <h2 className="text-lg font-semibold">Add Additional Charges</h2>
        </div>

        <ReusableForm
          fieldsConfig={additionalChargesFields}
          onSubmit={handleAdditionalChargesSubmit}
          submitButtonText=""
          columns={2}
          customClassName="mt-4"
        />
      </section>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save & Print
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Save Debit Note
        </button>
      </div>
    </div>
  );
};

export default FormDebitNote;