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