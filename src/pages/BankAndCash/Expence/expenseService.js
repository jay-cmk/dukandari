// src/services/expenseService.js

// Dummy data storage (simulating database)
let expenses = [
  {
    id: 1,
    expenseDate: '2024-01-15',
    expenseNoPrefix: 'EXP',
    expenseNoNumber: '001',
    selectParty: 'party1',
    invoiceNo: 'INV-001',
    reverseCharge: 'No',
    appliedTaxType: 'CGST+SGST',
    note: 'Office supplies purchase',
    isNonGst: false,
    products: [
      {
        id: 1,
        account: 'acc1',
        serviceProduct: 'prod1',
        hsnSacCode: '9988',
        description: 'Office supplies',
        amount: '1000',
        discount: '100',
        tax: '18',
        eligibleForITC: 'Eligible',
        taxValue: '162.00',
        total: '1062.00',
        discountType: 'amount'
      }
    ],
    subtotal: '900.00',
    totalTax: '162.00',
    netAmount: '1062.00',
    roundoff: '0.00'
  }
];

let nextExpenseId = 2;
let nextProductId = 2;

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const expenseApi = {
  // Get all expenses
  getExpenses: async () => {
    await delay(500);
    return expenses;
  },

  // Get expense by ID
  getExpenseById: async (id) => {
    await delay(300);
    const expense = expenses.find(exp => exp.id === parseInt(id));
    if (!expense) {
      throw new Error('Expense not found');
    }
    return expense;
  },

  // Create new expense
  createExpense: async (expenseData) => {
    await delay(800);
    const newExpense = {
      id: nextExpenseId++,
      ...expenseData,
      products: expenseData.products.map(product => ({
        ...product,
        id: nextProductId++
      }))
    };
    expenses.push(newExpense);
    return { success: true, id: newExpense.id, data: newExpense };
  },

  // Update expense
  updateExpense: async (id, expenseData) => {
    await delay(600);
    const index = expenses.findIndex(exp => exp.id === parseInt(id));
    if (index === -1) {
      throw new Error('Expense not found');
    }
    expenses[index] = { ...expenses[index], ...expenseData };
    return { success: true, data: expenses[index] };
  },

  // Delete expense
  deleteExpense: async (id) => {
    await delay(400);
    const index = expenses.findIndex(exp => exp.id === parseInt(id));
    if (index === -1) {
      throw new Error('Expense not found');
    }
    expenses.splice(index, 1);
    return { success: true };
  }
};

export const dropdownApi = {
  // Get parties
  getParties: async () => {
    await delay(300);
    return [
      { value: 'party1', label: 'ABC Suppliers', account_type: 'Vendor' },
      { value: 'party2', label: 'XYZ Services', account_type: 'Vendor' },
      { value: 'party3', label: 'Global Traders', account_type: 'Vendor' },
      { value: 'party4', label: 'Tech Solutions', account_type: 'Vendor' },
      { value: 'party5', label: 'Office Mart', account_type: 'Vendor' }
    ];
  },

  // Get accounts
  getAccounts: async (searchTerm = '') => {
    await delay(300);
    const allAccounts = [
      { value: 'acc1', label: 'Office Supplies', account_group_name: 'Expenses' },
      { value: 'acc2', label: 'Travel Expenses', account_group_name: 'Expenses' },
      { value: 'acc3', label: 'Utilities', account_group_name: 'Expenses' },
      { value: 'acc4', label: 'Marketing', account_group_name: 'Expenses' },
      { value: 'acc5', label: 'Professional Services', account_group_name: 'Expenses' },
      { value: 'acc6', label: 'Rent', account_group_name: 'Fixed Assets' },
      { value: 'acc7', label: 'Software', account_group_name: 'Intangible Assets' }
    ];
    
    if (searchTerm) {
      return allAccounts.filter(account => 
        account.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.account_group_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return allAccounts;
  },

  // Get tax rates
  getTaxRates: async () => {
    await delay(200);
    return [
      { value: '18', label: 'GST 18%', name: '18' },
      { value: '12', label: 'GST 12%', name: '12' },
      { value: '5', label: 'GST 5%', name: '5' },
      { value: '0', label: 'GST 0%', name: '0' },
      { value: '28', label: 'GST 28%', name: '28' }
    ];
  },

  // Get products/services
  getProductsServices: async () => {
    await delay(250);
    return [
      { value: 'product', label: 'Product' },
      { value: 'service', label: 'Service' }
    ];
  },

  // Get reverse charge options
  getReverseChargeOptions: async () => {
    await delay(100);
    return [
      { value: 'No', label: 'No' },
      { value: 'Yes', label: 'Yes' }
    ];
  },

  // Get tax type options
  getTaxTypeOptions: async () => {
    await delay(100);
    return [
      { value: 'CGST+SGST', label: 'CGST+SGST' },
      { value: 'IGST', label: 'IGST' },
      { value: 'No Tax', label: 'No Tax' }
    ];
  },

  // Get ITC options
  getItcOptions: async () => {
    await delay(100);
    return [
      { value: 'Eligible', label: 'Eligible' },
      { value: 'InEligible', label: 'InEligible' }
    ];
  }
};

// Generate next expense number
export const generateNextExpenseNumber = async () => {
  await delay(200);
  const lastExpense = expenses[expenses.length - 1];
  const nextNumber = lastExpense ? parseInt(lastExpense.expenseNoNumber) + 1 : 1;
  return nextNumber.toString().padStart(3, '0');
};