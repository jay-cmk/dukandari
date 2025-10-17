// src/utils/expenseHelpers.js

// Generate new product
export const generateNewProduct = (existingProducts = []) => {
  const newId = existingProducts.length > 0 
    ? Math.max(...existingProducts.map(p => p.id)) + 1 
    : 1;
    
  return {
    id: newId,
    account: '',
    serviceProduct: '',
    hsnSacCode: '',
    description: '',
    amount: '',
    discount: '',
    tax: '',
    eligibleForITC: 'Eligible',
    taxValue: '0.00',
    total: '0.00',
    discountType: 'amount'
  };
};

// Initialize form data
export const getInitialFormData = (isEdit = false, expenseData = null) => {
  if (isEdit && expenseData) {
    return expenseData;
  }
  
  const today = new Date().toISOString().split('T')[0];
  
  return {
    expenseDate: today,
    expenseNoPrefix: 'EXP',
    expenseNoNumber: '',
    selectParty: '',
    invoiceNo: '',
    reverseCharge: 'No',
    appliedTaxType: 'CGST+SGST',
    note: '',
    isNonGst: false,
  };
};

// Initialize products
export const getInitialProducts = (productsData = null) => {
  if (productsData && productsData.length > 0) {
    return productsData.map(product => ({
      ...product,
      taxValue: product.taxValue || '0.00',
      total: product.total || '0.00',
      discountType: product.discountType || 'amount'
    }));
  }
  
  return [generateNewProduct()];
};

// Format currency
export const formatCurrency = (amount, currency = '₹') => {
  return `${currency} ${parseFloat(amount).toFixed(2)}`;
};

// Validate numeric input
export const validateNumericInput = (e) => {
  const allowedKeys = [
    9, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, // Numpad
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // Numbers
    8, 37, 39, 109, 189, 46, 110, 190 // Backspace, arrows, minus, delete, decimal
  ];
  
  if (!allowedKeys.includes(e.keyCode)) {
    e.preventDefault();
    return false;
  }
  
  // Prevent multiple decimal points
  if ((e.keyCode === 110 || e.keyCode === 190) && e.target.value.includes('.')) {
    e.preventDefault();
    return false;
  }
  
  return true;
};

// Switch discount type
export const switchDiscountType = (productId, currentType, setProducts) => {
  setProducts(prev => prev.map(product => {
    if (product.id === productId) {
      const newType = currentType === 'amount' ? 'percentage' : 'amount';
      let discount = product.discount;
      
      // Reset discount if switching types
      if (newType === 'percentage' && parseFloat(discount) > 100) {
        discount = '100';
      }
      
      return {
        ...product,
        discountType: newType,
        discount: discount
      };
    }
    return product;
  }));
};

// Show toast notification
export const showToast = (message, type = 'info') => {
  // You can integrate with any toast library like react-toastify
  const toastOptions = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-top-center',
    preventDuplicates: true,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '5000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut'
  };
  
  console.log(`Toast ${type}:`, message, toastOptions);
  // In real implementation, you would use:
  // toast[type](message, toastOptions);
};

// Prepare data for API submission
export const prepareExpenseData = (formData, products, summaryTotals) => {
  return {
    ...formData,
    products: products.map(product => ({
      ...product,
      amount: parseFloat(product.amount),
      discount: parseFloat(product.discount),
      tax: product.tax ? parseFloat(product.tax) : 0,
      taxValue: parseFloat(product.taxValue),
      total: parseFloat(product.total)
    })),
    subtotal: parseFloat(summaryTotals.subtotal),
    totalTax: parseFloat(summaryTotals.totalTax),
    netAmount: parseFloat(summaryTotals.netAmount),
    roundoff: parseFloat(summaryTotals.roundoff)
  };
};