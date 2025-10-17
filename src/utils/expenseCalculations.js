// src/utils/expenseCalculations.js

// Calculate product totals
export const calculateProductTotals = (product, reverseCharge = 'No', discountType = 'amount') => {
  const amount = parseFloat(product.amount) || 0;
  const discount = parseFloat(product.discount) || 0;
  const taxRate = parseFloat(product.tax) || 0;
  
  // Calculate total after discount
  let totalAfterDiscount;
  if (discountType === 'amount') {
    totalAfterDiscount = amount - discount;
  } else {
    totalAfterDiscount = amount - ((amount * discount) / 100);
  }
  
  if (totalAfterDiscount < 0) totalAfterDiscount = 0;
  
  // Calculate tax value
  let taxValue = 0;
  if (reverseCharge === 'No') {
    taxValue = (totalAfterDiscount * taxRate) / 100;
  }
  
  // Calculate final total
  const finalTotal = totalAfterDiscount + (reverseCharge === 'No' ? taxValue : 0);
  
  return {
    ...product,
    taxValue: taxValue.toFixed(2),
    total: finalTotal.toFixed(2)
  };
};

// Calculate all summary totals
export const calculateAllTotals = (products, allowRoundoff = false) => {
  let subtotal = 0;
  let totalTax = 0;
  
  products.forEach(product => {
    const productTotal = parseFloat(product.total) || 0;
    const productTax = parseFloat(product.taxValue) || 0;
    
    subtotal += productTotal - productTax; // Subtotal without tax
    totalTax += productTax;
  });
  
  const totalAmount = subtotal + totalTax;
  
  // Calculate roundoff
  let roundoff = 0;
  let netAmount = totalAmount;
  
  if (!allowRoundoff) {
    roundoff = Math.round(totalAmount) - totalAmount;
    netAmount = Math.round(totalAmount);
  }
  
  return {
    subtotal: subtotal.toFixed(2),
    totalTax: totalTax.toFixed(2),
    totalAmount: totalAmount.toFixed(2),
    roundoff: roundoff.toFixed(2),
    netAmount: netAmount.toFixed(2)
  };
};

// Set tax summary
export const setTaxSummary = (products, taxType) => {
  const taxSummary = {};
  
  products.forEach(product => {
    const taxRate = parseFloat(product.tax) || 0;
    const taxAmount = parseFloat(product.taxValue) || 0;
    
    if (taxRate > 0) {
      if (taxType === 'IGST') {
        const key = `IGST ${taxRate}%`;
        taxSummary[key] = (taxSummary[key] || 0) + taxAmount;
      } else if (taxType === 'CGST+SGST') {
        const cgstAmount = taxAmount / 2;
        const sgstAmount = taxAmount / 2;
        const cgstKey = `CGST ${taxRate/2}%`;
        const sgstKey = `SGST ${taxRate/2}%`;
        
        taxSummary[cgstKey] = (taxSummary[cgstKey] || 0) + cgstAmount;
        taxSummary[sgstKey] = (taxSummary[sgstKey] || 0) + sgstAmount;
      }
    }
  });
  
  return taxSummary;
};

// Apply reverse charge to all products
export const applyReverseCharge = (products, reverseCharge) => {
  return products.map(product => {
    if (reverseCharge === 'Yes') {
      const amount = parseFloat(product.amount) || 0;
      const discount = parseFloat(product.discount) || 0;
      const discountType = product.discountType || 'amount';
      
      let total;
      if (discountType === 'amount') {
        total = amount - discount;
      } else {
        total = amount - ((amount * discount) / 100);
      }
      
      if (total < 0) total = 0;
      
      return {
        ...product,
        total: total.toFixed(2),
        taxValue: '0.00'
      };
    }
    return product;
  });
};

// Apply tax type change
export const applyTaxTypeChange = (products, taxType) => {
  if (taxType === 'No Tax') {
    return products.map(product => {
      const amount = parseFloat(product.amount) || 0;
      const discount = parseFloat(product.discount) || 0;
      const discountType = product.discountType || 'amount';
      
      let total;
      if (discountType === 'amount') {
        total = amount - discount;
      } else {
        total = amount - ((amount * discount) / 100);
      }
      
      if (total < 0) total = 0;
      
      return {
        ...product,
        tax: '',
        taxValue: '0.00',
        total: total.toFixed(2)
      };
    });
  }
  return products;
};