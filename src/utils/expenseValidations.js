// src/utils/expenseValidations.js

// Validation configurations
export const priceValidator = {
  validators: {
    notEmpty: { message: 'The price is required' },
    stringLength: { max: 20, message: 'The price must be less than 20 digits long' },
    regexp: { 
      regexp: /^(\d+)?(\.\d{0,2})?$/,
      message: 'The amount is invalid & It should have up to 2 decimal places'
    },
    greaterThan: {
      value: 0,
      inclusive: false,
      message: 'The amount must be greater than 0'
    }
  }
};

export const discountValidator = {
  validators: {
    notEmpty: { message: 'The Discount is required' },
    stringLength: { max: 20, message: 'The Discount must be less than 20 characters long' },
    regexp: {
      regexp: /^(\d+)?(\.\d{0,2})?$/,
      message: 'Invalid Discount & It should have up to 2 decimal places'
    }
  }
};

export const accountValidator = {
  validators: {
    notEmpty: { message: 'The Account is required' }
  }
};

export const goodServiceValidator = {
  validators: {
    notEmpty: { message: 'The Field is required' }
  }
};

export const taxValidator = {
  validators: {
    notEmpty: { message: 'The Tax is required' }
  }
};

// Field validation functions
export const validateField = (name, value, formData) => {
  switch (name) {
    case 'expenseDate':
      if (!value) return 'Expense Date is required';
      if (new Date(value) > new Date()) return 'Expense Date cannot be in the future';
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'Date format is invalid';
      return '';
    
    case 'selectParty':
      if (!value) return 'Select Party is required';
      return '';
    
    case 'expenseNoPrefix':
      if (!value) return 'Prefix is required';
      if (!/^[a-zA-Z0-9_-\s-.,/ ]+$/.test(value)) return 'Prefix is not valid';
      if (value.length > 20) return 'Prefix must be less than 20 characters';
      return '';
    
    case 'expenseNoNumber':
      if (!value) return 'Expense Number is required';
      if (!/^[0-9]+$/.test(value)) return 'Expense No only consist of numbers';
      if (value.length > 8) return 'Expense No must be less than 8 digits';
      return '';
    
    case 'invoiceNo':
      if (value && value.length > 50) return 'Invoice No must be less than 50 characters';
      return '';
    
    case 'reverseCharge':
      if (!value) return 'Reverse Charge is required';
      return '';
    
    case 'appliedTaxType':
      if (!value) return 'Applied Tax Type is required';
      return '';
    
    case 'note':
      if (value && value.length > 200) return 'Note must be less than 200 characters';
      return '';
    
    default:
      return '';
  }
};

export const validateProductField = (field, value, product, formData) => {
  switch (field) {
    case 'account':
      if (!value) return 'Account is required';
      return '';
    
    case 'amount':
      if (!value || value === '') return 'Amount is required';
      
      // Allow intermediate values during typing
      if (value === '.' || value === '0.' || /^0\d+/.test(value)) {
        return 'Amount format is invalid';
      }
      
      // Final validation for completed values
      const amountNum = parseFloat(value);
      if (isNaN(amountNum)) return 'Amount must be a valid number';
      if (amountNum <= 0) return 'Amount must be greater than 0';
      if (!/^\d+(\.\d{0,2})?$/.test(value)) return 'Amount should have up to 2 decimal places';
      if (value.length > 20) return 'Amount must be less than 20 digits';
      return '';
    
    case 'discount':
      if (!value || value === '') return 'Discount is required';
      
      // Allow intermediate values during typing
      if (value === '.' || value === '0.' || /^0\d+/.test(value)) {
        return 'Discount format is invalid';
      }
      
      // Final validation for completed values
      const discountNum = parseFloat(value);
      if (isNaN(discountNum)) return 'Discount must be a valid number';
      if (discountNum < 0) return 'Discount cannot be negative';
      if (!/^\d+(\.\d{0,2})?$/.test(value)) return 'Discount should have up to 2 decimal places';
      if (value.length > 20) return 'Discount must be less than 20 characters';
      
      // Validate discount limits based on discount type
      const discountType = product.discountType || 'amount';
      const amountNumForDiscount = parseFloat(product.amount || 0);
      
      if (discountType === 'percentage' && discountNum > 100) {
        return 'Discount percentage cannot exceed 100%';
      }
      if (discountType === 'amount' && discountNum > amountNumForDiscount) {
        return 'Discount amount cannot exceed product amount';
      }
      return '';
    
    case 'tax':
      if (formData.appliedTaxType !== 'No Tax' && !value) {
        return 'Tax is required';
      }
      return '';
    
    case 'serviceProduct':
      if (!value) return 'Service/Product is required';
      return '';
    
    default:
      return '';
  }
};

// Loose validation for real-time input (while typing)
export const validateProductFieldLoose = (field, value, product, formData) => {
  switch (field) {
    case 'amount':
      if (value === '') return ''; // Allow empty during typing
      
      // Basic format check during typing
      if (!/^\d*\.?\d*$/.test(value)) {
        return 'Only numbers and decimal point allowed';
      }
      
      // Check for leading zeros
      if (/^0\d+/.test(value)) {
        return 'Cannot start with 0 followed by other digits';
      }
      
      // Check decimal places
      if (value.includes('.') && value.split('.')[1]?.length > 2) {
        return 'Maximum 2 decimal places allowed';
      }
      return '';
    
    case 'discount':
      if (value === '') return ''; // Allow empty during typing
      
      // Basic format check during typing
      if (!/^\d*\.?\d*$/.test(value)) {
        return 'Only numbers and decimal point allowed';
      }
      
      // Check for leading zeros
      if (/^0\d+/.test(value)) {
        return 'Cannot start with 0 followed by other digits';
      }
      
      // Check decimal places
      if (value.includes('.') && value.split('.')[1]?.length > 2) {
        return 'Maximum 2 decimal places allowed';
      }
      return '';
    
    default:
      return validateProductField(field, value, product, formData);
  }
};

export const validateForm = (formData, products) => {
  const errors = {};
  
  // Validate main form fields
  Object.keys(formData).forEach(key => {
    const error = validateField(key, formData[key], formData);
    if (error) errors[key] = error;
  });
  
  // Validate products
  let hasProductErrors = false;
  products.forEach((product, index) => {
    const productErrors = {};
    
    ['account', 'amount', 'discount', 'serviceProduct'].forEach(key => {
      const error = validateProductField(key, product[key], product, formData);
      if (error) productErrors[key] = error;
    });
    
    // Validate tax based on appliedTaxType
    if (formData.appliedTaxType !== 'No Tax' && !product.tax) {
      productErrors.tax = 'Tax is required';
    }
    
    if (Object.keys(productErrors).length > 0) {
      errors[`product_${index}`] = productErrors;
      hasProductErrors = true;
    }
  });
  
  // Additional business validations
  if (products.length === 0) {
    errors.products = 'Add at least one product/service';
  }
  
  const netAmount = calculateNetAmount(products);
  if (netAmount <= 0) {
    errors.netAmount = 'Net amount must be greater than 0';
  }
  
  return errors;
};

// Helper validation function for calculations
export const calculateNetAmount = (products) => {
  return products.reduce((total, product) => {
    return total + (parseFloat(product.total) || 0);
  }, 0);
};

// Helper function to check if value is valid for numeric input
export const isValidNumericInput = (value) => {
  if (value === '') return true;
  return /^\d*\.?\d*$/.test(value) && !/^0\d+/.test(value);
};

// Helper function to format numeric value on blur
export const formatNumericValue = (value) => {
  if (value === '' || value === '.') return '0';
  if (value.endsWith('.')) return value + '00';
  
  const num = parseFloat(value);
  if (isNaN(num)) return '0';
  
  return num.toFixed(2);
};