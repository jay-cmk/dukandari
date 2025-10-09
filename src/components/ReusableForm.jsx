import React, { useState } from 'react';
import { 
  Input, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue, 
  Checkbox, 
  Label, 
  Textarea, 
  Button 
} from '@/components/ui'; // Assuming shadcn/ui components; adjust path as needed
import { CalendarIcon } from '@heroicons/react/24/outline';

const ReusableForm = ({ 
  title = 'Product Form',
  fieldsConfig = [], 
  initialValues = {}, 
  onSubmit,
  submitButtonText = 'Save',
  showSidebar = false // For potential preview sidebar as in image
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [purchaseTaxIncluding, setPurchaseTaxIncluding] = useState(false);
  const [cess, setCess] = useState(false);
  const [manageMultipleBatch, setManageMultipleBatch] = useState(true);
  const [hasExpiry, setHasExpiry] = useState(true);
  const [isExpiryProductSaleable, setIsExpiryProductSaleable] = useState(true);

  const handleInputChange = (e, fieldName) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = { ...formData, autoGenerate, purchaseTaxIncluding, cess, manageMultipleBatch, hasExpiry, isExpiryProductSaleable };
    onSubmit?.(submitData);
  };

  // Hardcoded config for the product form based on image; can be overridden via props
  const defaultFields = [
    { type: 'input', name: 'itemCode', label: 'Item Code/Barcode *', placeholder: 'Enter item code', required: true },
    { type: 'input', name: 'productName', label: 'Product Name *', placeholder: 'Enter product name', required: true },
    { type: 'input', name: 'printName', label: 'Print Name *', placeholder: 'Enter print name', required: true },
    { 
      type: 'select', 
      name: 'category', 
      label: 'Category *', 
      options: ['TEA & COFFEE', 'COOKING', 'Jeans'], 
      required: true,
      defaultValue: 'TEA & COFFEE'
    },
    { 
      type: 'select', 
      name: 'subCategory', 
      label: 'Sub Category', 
      options: [], 
      placeholder: 'Select sub category'
    },
    { 
      type: 'select', 
      name: 'brand', 
      label: 'Select Brand *', 
      options: ['ccgy', 'ARCOGYA', 'ANCHOR', '24MANTRA', 'Lee'], 
      required: true,
      defaultValue: 'ccgy'
    },
    { 
      type: 'select', 
      name: 'subBrand', 
      label: 'Sub Brand', 
      options: [], 
      placeholder: 'Select sub brand'
    },
    { 
      type: 'select', 
      name: 'uom', 
      label: 'Select UOM *', 
      options: ['kgs', 'grams', 'units'], 
      required: true,
      defaultValue: 'kgs'
    },
    { type: 'input', name: 'hsnCode', label: 'HSN Code', placeholder: 'Enter HSN code' },
    { 
      type: 'select', 
      name: 'purchaseTax', 
      label: 'Purchase Tax *', 
      options: ['5%', '12%', '18%'], 
      required: true
    },
    { 
      type: 'select', 
      name: 'salesTax', 
      label: 'Sales Tax *', 
      options: ['5%', '12%', '18%'], 
      required: true
    },
    { type: 'input', name: 'expiryDays', label: 'Select Expiry Days *', placeholder: 'Enter expiry days', required: true },
    { 
      type: 'select', 
      name: 'calculateExpiryOn', 
      label: 'Calculate Expiry On *', 
      options: ['MFG', 'Install'], 
      required: true,
      defaultValue: 'MFG'
    },
    { 
      type: 'date', 
      name: 'mfgDate', 
      label: 'Select MFG Date *', 
      required: true,
      defaultValue: '2025-10-07' // YYYY-MM-DD format for input type=date
    },
    { type: 'textarea', name: 'shortDescription', label: 'Short Description', placeholder: 'Enter short description', rows: 3 },
    { type: 'textarea', name: 'ingredients', label: 'Ingredients', placeholder: 'Enter ingredients', rows: 3 }
  ];

  const fields = fieldsConfig.length > 0 ? fieldsConfig : defaultFields;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        {showSidebar && (
          <div className="w-64 bg-gray-50 p-4 rounded">
            {/* Sidebar preview if needed */}
            <p className="text-sm text-gray-600">Preview</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <Label className="flex items-center gap-2">
              <Checkbox 
                id="autoGenerate" 
                checked={autoGenerate} 
                onCheckedChange={setAutoGenerate} 
              />
              Auto Generate
            </Label>
          </div>
          {fields.filter(f => ['itemCode', 'salesTax', 'expiryDays', 'shortDescription'].includes(f.name)).map(field => (
            <div key={field.name}>
              <Label htmlFor={field.name} className={field.required ? 'text-red-500' : ''}>
                {field.label}
              </Label>
              {field.type === 'input' && (
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(e, field.name)}
                  required={field.required}
                />
              )}
              {field.type === 'select' && (
                <Select value={formData[field.name] || field.defaultValue} onValueChange={(val) => handleInputChange({ target: { value: val } }, field.name)}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.type === 'textarea' && (
                <Textarea
                  id={field.name}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(e, field.name)}
                  rows={field.rows || 3}
                />
              )}
            </div>
          ))}
        </div>

        {/* Middle Column */}
        <div className="space-y-4">
          {fields.filter(f => ['productName', 'calculateExpiryOn'].includes(f.name)).map(field => (
            <div key={field.name}>
              <Label htmlFor={field.name} className={field.required ? 'text-red-500' : ''}>
                {field.label}
              </Label>
              {field.type === 'input' && (
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(e, field.name)}
                  required={field.required}
                />
              )}
              {field.type === 'select' && (
                <Select value={formData[field.name] || field.defaultValue} onValueChange={(val) => handleInputChange({ target: { value: val } }, field.name)}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          ))}
          {/* Checkboxes */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Checkbox 
                id="purchaseTaxIncluding" 
                checked={purchaseTaxIncluding} 
                onCheckedChange={setPurchaseTaxIncluding} 
              />
              Purchase Tax including
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox 
                id="cess" 
                checked={cess} 
                onCheckedChange={setCess} 
              />
              Cess %
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox 
                id="manageMultipleBatch" 
                checked={manageMultipleBatch} 
                onCheckedChange={setManageMultipleBatch} 
              />
              Manage Multiple Batch
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox 
                id="hasExpiry" 
                checked={hasExpiry} 
                onCheckedChange={setHasExpiry} 
              />
              Has Expiry
            </Label>
            <Label className="flex items-center gap-2">
              <Checkbox 
                id="isExpiryProductSaleable" 
                checked={isExpiryProductSaleable} 
                onCheckedChange={setIsExpiryProductSaleable} 
              />
              Is Expiry Product Saleable
            </Label>
          </div>
          {fields.filter(f => f.name === 'ingredients').map(field => (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Textarea
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(e, field.name)}
                rows={field.rows || 3}
              />
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {fields.filter(f => ['printName', 'category', 'subCategory', 'brand', 'subBrand', 'uom', 'hsnCode', 'purchaseTax', 'mfgDate'].includes(f.name)).map(field => (
            <div key={field.name}>
              <Label htmlFor={field.name} className={field.required ? 'text-red-500' : ''}>
                {field.label}
              </Label>
              {field.type === 'input' && (
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(e, field.name)}
                  required={field.required}
                />
              )}
              {field.type === 'select' && (
                <Select value={formData[field.name] || field.defaultValue} onValueChange={(val) => handleInputChange({ target: { value: val } }, field.name)}>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map(opt => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {field.type === 'date' && (
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type="date"
                    value={formData[field.name] || field.defaultValue}
                    onChange={(e) => handleInputChange(e, field.name)}
                    required={field.required}
                    className="pl-10"
                  />
                  <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">{submitButtonText}</Button>
      </div>
    </form>
  );
};

export default ReusableForm;