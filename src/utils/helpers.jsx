import { useNavigate } from 'react-router-dom';

export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Option 2: Function that requires navigate as parameter
// utils/helpers.jsx
export const handleEdit = (item, navigate) => {
  if (navigate) {
    // Map table data to form data structure
    const formData = {
      outletType: item.type || "Branch",
      name: item.name || "",
      displayName: item.name || "", // Using name as displayName if not available
      contactName: item.contactName || "",
      mobileNo: item.contactNo || "", // Map contactNo to mobileNo
      telephoneNo: "",
      email: "",
      userName: "",
      password: "",
      yearInterval: item.year || "2023–2026", // Map year to yearInterval
      gstType: "UnRegistered",
      gstin: "",
      panNo: "",
      website: "",
      haveFssaiNo: false,
      fssaiNo: "",
      address: "",
      country: "InGo",
      state: "Guten",
      city: "Anwedabad",
      zipCode: "",
      bank: "",
      ifscCode: "",
      branchName: "",
      accountNo: "",
      accountHolderName: "",
      printerName: "",
      bankName: "",
    };

    navigate("/outletsForm", { 
      state: { 
        outletData: formData 
      } 
    });
  } else {
    alert(`Edit ${item.name}`);
  }
};
// console.log('item',item)

export const handleDisable = (item) => {
  alert(`Disable ${item.name}`);
};

export const handleDelete = (item) => {
  if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
    alert("Implement delete logic");
  }
};

export const handleOpen = (item) => {
  window.open(item.href || "#", "_blank");
};



// handle edit employee

export const handleEditEmployee = (employee, navigate) => {
  if (navigate) {
    const formData = {
      // Map your employee object to form fields
      name: employee.name || "",
      mobileNo: employee.mobileNo || employee.contactNo || "",
      email: employee.email || "",
      panNo: employee.panNo || "",
      isManager: employee.isManager || false,
      isDeliveryUser: employee.isDeliveryUser || false,
      isSalaryAccount: employee.isSalaryAccount || false,
      selectGroup: employee.selectGroup || employee.group || "",
      address: employee.address || "",
      country: employee.country || "India",
      state: employee.state || "Gujarat",
      city: employee.city || "Ahmedabad",
      zipCode: employee.zipCode || employee.pincode || "",
      bankName: employee.bankName || employee.bank || "",
      branchName: employee.branchName || "",
      accountNo: employee.accountNo || "",
      ifscCode: employee.ifscCode || "",
      accountHolderName: employee.accountHolderName || "",
      swiftCode: employee.swiftCode || "",
      wages: employee.wages || employee.salary || "",
      commission: employee.commission || "",
      extraWages: employee.extraWages || "",
      target: employee.target || "",
      selectedBranch: employee.selectedBranch || employee.branch || "KRITRAJ",
      userName: employee.userName || "",
      password: employee.password || "",
      role: employee.role || "",
    };

    navigate("/employee-form", { 
      state: { 
        employeeData: formData,
        isEdit: true,
        employeeId: employee.id || employee._id // for updates
      } 
    });
  } else {
    alert(`Edit ${employee.name}`);
  }
};


// handle edit product
export const handleEditProduct = (product, navigate) => {
  if (navigate) {
    // Map table product data to form structure
    const formData = {
      itemCode: product.itemCode || "",
      productName: product.productName || "",
      printName: product.printName || "",
      category: product.category || "",
      subCategory: product.subCategory || "",
      brand: product.brand || "",
      subBrand: product.subBrand || "",
      uom: product.uom || "",
      hsnCode: product.hsnCode || "",
      purchaseTax: product.purchaseTax || "",
      salesTax: product.salesTax || "",
      expiryDays: product.expiryDays || "",
      calculateExpiryOn: product.calculateExpiryOn || "MFG",
      mfgDate: product.mfgDate || new Date().toISOString().slice(0, 10), // today's date
      shortDescription: product.shortDescription || "",
      ingredients: product.ingredients || "",
      autoGenerate: product.autoGenerate || false,
      purchaseTaxIncluding: product.purchaseTaxIncluding || false,
      cess: product.cess || false,
      manageMultipleBatch: product.manageMultipleBatch ?? true,
      hasExpiry: product.hasExpiry ?? true,
      isExpiryProductSaleable: product.isExpiryProductSaleable ?? true,
    };

    navigate("/product-form", {
      state: {
        productData: formData,
        isEdit: !!product?.id || !!product?._id,
        productId: product.id || product._id || null,
      },
    });
  } else {
    alert(`Edit ${product.productName || "Product"}`);
  }
};

