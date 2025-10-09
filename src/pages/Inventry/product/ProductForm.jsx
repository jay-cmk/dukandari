import React, { useState } from 'react';

const ProductForm = () => {
  const [formData, setFormData] = useState({
    barcode: 'AP53949',
    autoGenerate: false,
    productName: '',
    printName: '',
    category: 'Tea & Coffee',
    subcategory: '',
    brand: 'ccg Brand',
    subBrand: '',
    hsnCode: 'kg UOM',
    purchaseTax: '',
    salesTax: '',
    expiryDays: '',
    mfgDate: '2025-10-07',
    calculateExpiry: false,
    purchaseTaxIncludingCess: true,
    salesTaxIncludingCess: true,
    manageMultipleBatch: false,
    hasExpiry: true,
    isExpiryProductSaleable: true,
    ingredientsDescription: '',
    shortDescription: '',
    description: '',
    netWeight: ''
  });

  const [errors, setErrors] = useState({});
  const [showNutrition, setShowNutrition] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    // Basic validation
    if (!value && name !== 'subcategory' && name !== 'subBrand' && name !== 'purchaseTax') {
      setErrors(prev => ({
        ...prev,
        [name]: 'This field is required'
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    // Handle cancel action
    console.log('Form cancelled');
  };

  const handleAddNutrition = () => {
    setShowNutrition(!showNutrition);
  };

  return (
    <div className="mx-auto p-4 bg-gray-300">
      <h1 className="text-2xl font-bold mb-2">
        New Product
      </h1>

      <div className="bg-white border p-2 pl-4 pr-4 rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="bg-white">
            {/* Row 1: Barcode, Product Name, Print Name, Category, Subcategory */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4 bg-white">
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Barcode
                </label>
                <div className="flex">
                  <input
                    type="text"
                    name="barcode"
                    value={formData.barcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded-l text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                    placeholder="Barcode"
                  />
                  <div className="flex items-center border border-l-0 p-2 rounded-r bg-gray-100">
                    <input
                      type="checkbox"
                      name="autoGenerate"
                      checked={formData.autoGenerate}
                      onChange={handleChange}
                      className="mr-2 hover:border-blue-600 h-4 w-4"
                    />
                    <label className="text-sm text-black whitespace-nowrap">
                      Auto Generate
                    </label>
                  </div>
                </div>
                {errors.barcode && (
                  <p className="text-red-500 text-xs mt-1">{errors.barcode}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Product Name<span className="text-red-500">*</span>
                </label>
                <select
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                >
                  <option value="">Select *</option>
                  <option value="green-tea">Green Tea</option>
                  <option value="black-tea">Black Tea</option>
                </select>
                {errors.productName && (
                  <p className="text-red-500 text-xs mt-1">{errors.productName}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Print Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="printName"
                  value={formData.printName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                  placeholder="Print Name"
                />
                {errors.printName && (
                  <p className="text-red-500 text-xs mt-1">{errors.printName}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Category<span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                >
                  <option value="Tea & Coffee">Tea & Coffee *</option>
                  <option value="Beverages">Beverages</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                >
                  <option value="">Select Subcategory</option>
                  <option value="herbal-tea">Herbal Tea</option>
                </select>
              </div>
            </div>

            {/* Row 2: Brand, Sub Brand, HSN Code, Purchase Tax, Sales Tax */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Brand
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                >
                  <option value="ccg Brand">ccg Brand</option>
                  <option value="premium-brand">Premium Brand</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Sub Brand
                </label>
                <select
                  name="subBrand"
                  value={formData.subBrand}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                >
                  <option value="">Select Sub Brand</option>
                  <option value="organic-line">Organic Line</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  HSN Code
                </label>
                <select
                  name="hsnCode"
                  value={formData.hsnCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                >
                  <option value="kg UOM">kg UOM</option>
                  <option value="0901">0901 - Coffee</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Purchase Tax
                </label>
                <select
                  name="purchaseTax"
                  value={formData.purchaseTax}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                >
                  <option value="">Select Purchase Tax</option>
                  <option value="5%">5% GST</option>
                  <option value="12%">12% GST</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Sales Tax<span className="text-red-500">*</span>
                </label>
                <select
                  name="salesTax"
                  value={formData.salesTax}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                >
                  <option value="">Select Sales Tax *</option>
                  <option value="5%">5% GST</option>
                  <option value="12%">12% GST</option>
                </select>
                {errors.salesTax && (
                  <p className="text-red-500 text-xs mt-1">{errors.salesTax}</p>
                )}
              </div>
            </div>

            {/* Row 3: Expiry Days, MFG Date, Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Select Expiry Days
                </label>
                <input
                  type="number"
                  name="expiryDays"
                  value={formData.expiryDays}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                  placeholder="Expiry Days"
                  min="0"
                />
              </div>

              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="block mb-1 text-sm font-semibold text-black">
                    MFG<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="mfgDate"
                    value={formData.mfgDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                  />
                </div>
                <div className="flex items-center h-9">
                  <input
                    type="checkbox"
                    name="calculateExpiry"
                    checked={formData.calculateExpiry}
                    onChange={handleChange}
                    className="mr-2 hover:border-blue-600 h-4 w-4"
                  />
                  <label className="text-sm text-black whitespace-nowrap">
                    Calculate Expiry On *
                  </label>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="purchaseTaxIncludingCess"
                  checked={formData.purchaseTaxIncludingCess}
                  onChange={handleChange}
                  className="mr-2 hover:border-blue-600 h-4 w-4"
                />
                <label className="text-sm font-semibold text-black">
                  Purchase Tax including Cess %
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="salesTaxIncludingCess"
                  checked={formData.salesTaxIncludingCess}
                  onChange={handleChange}
                  className="mr-2 hover:border-blue-600 h-4 w-4"
                />
                <label className="text-sm font-semibold text-black">
                  Sales Tax including Cess %
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="manageMultipleBatch"
                  checked={formData.manageMultipleBatch}
                  onChange={handleChange}
                  className="mr-2 hover:border-blue-600 h-4 w-4"
                />
                <label className="text-sm font-semibold text-black">
                  Manage Multiple Batch
                </label>
              </div>
            </div>

            {/* Row 4: More Checkboxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="hasExpiry"
                  checked={formData.hasExpiry}
                  onChange={handleChange}
                  className="mr-2 hover:border-blue-600 h-4 w-4"
                />
                <label className="text-sm font-semibold text-black">
                  Has Expiry
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isExpiryProductSaleable"
                  checked={formData.isExpiryProductSaleable}
                  onChange={handleChange}
                  className="mr-2 hover:border-blue-600 h-4 w-4"
                />
                <label className="text-sm font-semibold text-black">
                  Is Expiry Product Saleable
                </label>
              </div>
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Ingredients Description
                </label>
                <textarea
                  name="ingredientsDescription"
                  value={formData.ingredientsDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                  style={{ minHeight: '60px' }}
                  placeholder="Ingredients description..."
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Short Description
                </label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                  style={{ minHeight: '60px' }}
                  placeholder="Short description..."
                />
              </div>
            </div>

            {/* Description with formatting toolbar */}
            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold text-black">
                Description
              </label>
              <div className="flex items-center mb-2 p-2 border rounded text-sm">
                <button type="button" className="mr-3 font-bold hover:text-blue-600">B</button>
                <button type="button" className="mr-3 italic hover:text-blue-600">I</button>
                <button type="button" className="mr-3 underline hover:text-blue-600">U</button>
                <button type="button" className="mr-3 line-through hover:text-blue-600">S</button>
                <button type="button" className="mr-3 hover:text-blue-600">OL</button>
                <button type="button" className="mr-3 hover:text-blue-600">UL</button>
                <button type="button" className="hover:text-blue-600">Insert</button>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200"
                style={{ minHeight: '100px' }}
                placeholder="Product description..."
              />
            </div>

            {/* Net Weight and Nutrition */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              <div>
                <label className="block mb-1 text-sm font-semibold text-black">
                  Net Weight
                </label>
                <input
                  type="text"
                  name="netWeight"
                  value={formData.netWeight}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                  placeholder="Net Weight"
                />
              </div>
              
              <div className="flex items-center">
                <span className="text-sm text-black mr-3">Nutrition</span>
                <button
                  type="button"
                  onClick={handleAddNutrition}
                  className="px-3 py-1 border rounded bg-green-500 text-white text-sm hover:bg-green-600 transition-colors duration-200 h-9"
                >
                  + Add Nutrition
                </button>
              </div>
            </div>

            {/* Nutrition Details Section */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${showNutrition ? 'max-h-96 opacity-100 mb-6 border-b pb-6' : 'max-h-0 opacity-0'}`}>
              {showNutrition && (
                <div>
                  <h3 className="text-md font-semibold mb-4">Nutrition Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block mb-1 text-sm font-semibold text-black">
                        Calories
                      </label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                        placeholder="Calories"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-semibold text-black">
                        Protein (g)
                      </label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                        placeholder="Protein"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm font-semibold text-black">
                        Carbohydrates (g)
                      </label>
                      <input
                        type="text"
                        className="w-full border p-2 rounded text-sm hover:border-blue-600 transition-colors duration-200 h-9"
                        placeholder="Carbs"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

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
              Save & Create New
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;