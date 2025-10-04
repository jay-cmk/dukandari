// // utils/validation.js
// export const validateMobileNumber = (mobileNo) => {
//   const pattern91 = /^[6-9]\d{9}$/;
//   const countryCode = "91";
//   return countryCode === "91" ? pattern91.test(mobileNo) : true;
// };

// export const validateField = (name, value, formData = {}) => {
//   switch (name) {
//     case "name":
//       if (!value.trim()) return "The Name is Required";
//       if (!/^[a-zA-Z0-9_-\s-., ]+$/.test(value))
//         return "The name can only consist of alphabetical, number and underscore";
//       return "";

//     case "displayName":
//       if (!value.trim()) return "The Display Name is Required";
//       if (!/^[a-zA-Z0-9_-\s-., ]+$/.test(value))
//         return "The name can only consist of alphabetical, number and underscore";
//       return "";

//     case "mobileNo":
//       if (!value.trim()) return "The mobile no is Required";
//       if (!/^[0-9+]+$/.test(value))
//         return "The mobile no. can only consist of number";
//       if (!validateMobileNumber(value)) return "Mobile number not Valid";
//       return "";

//     case "userName":
//       if (!value.trim()) return "The User Name is Required";
//       if (!/^(?!.*[<>?=;:,/])([A-Za-z0-9.+-@]+)$/.test(value))
//         return "Invalid Username or Username cannot have spaces at the start or end";
//       return "";

//     case "password":
//       if (!value.trim()) return "The Password Is required";
//       if (value.length < 6 || value.length > 20)
//         return "The password must be min 6 and max 20 character long";
//       return "";

//     case "address":
//       if (!value.trim()) return "The address is Required";
//       return "";

//     case "panNo":
//       if (value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
//         return "Pan Number is not a valid";
//       return "";

//     case "email":
//       if (
//         value &&
//         !/^(?!.*[^A-Za-z0-9]{2})[A-Za-z0-9]\.*(?=[a-z0-9][a-z0-9@._-]{5,40}$)[a-z0-9._-]{1,29}@(?:(?=[a-z0-9-]{1,15}\.)[a-z0-9]+(?:-[a-z0-9]+)*\.){1,2}[a-z]{2,6}$/.test(
//           value
//         )
//       )
//         return "Email address is not valid";
//       return "";

//     case "gstin":
//       if (formData.gstType === "Registered") {
//         if (!value.trim()) return "The GSTIN Should Not Be Empty";
//         if (
//           !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z]{1}[A-Z0-9]{1}$/.test(value)
//         )
//           return "The GSTIN/UIN that you have entered is invalid. Please enter a valid GSTIN/UIN";
//         if (value.length !== 15)
//           return "GSTIN/UIN is not more than 15 digit long";
//       }
//       return "";

//     case "fssaiNo":
//       if (formData.haveFssaiNo && value && value.length !== 14)
//         return "The FSSAI NO. must be 14 digit long";
//       return "";

//     default:
//       return "";
//   }
// };

// export const validateForm = (formData) => {
//   const errors = {};
//   const fieldsToValidate = [
//     "name",
//     "displayName",
//     "mobileNo",
//     "userName",
//     "password",
//     "address",
//   ];

//   fieldsToValidate.forEach((field) => {
//     const error = validateField(field, formData[field], formData);
//     if (error) errors[field] = error;
//   });

//   if (formData.gstType === "Registered") {
//     const gstinError = validateField("gstin", formData.gstin, formData);
//     if (gstinError) errors.gstin = gstinError;
//   }

//   return errors;
// };



// utils/validate.js

// ✅ Mobile validation helper
export const validateMobileNumber = (mobileNo, countryCode = "91") => {
  const pattern91 = /^[6-9]\d{9}$/;
  const patternOther = /^[1-9]\d{2,14}$/;
  return countryCode === "91" ? pattern91.test(mobileNo) : patternOther.test(mobileNo);
};

// ✅ Core field validator (everything in one function)
export const validateField = (name, value, formData = {}) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "The Name is Required";
      if (!/^[a-zA-Z0-9_-\s-., ]+$/.test(value))
        return "The name can only consist of alphabetical, number and underscore";
      return "";

    case "displayName":
      if (!value.trim()) return "The Display Name is Required";
      if (!/^[a-zA-Z0-9_-\s-., ]+$/.test(value))
        return "The name can only consist of alphabetical, number and underscore";
      return "";

    case "mobileNo":
    case "contactNo":
      if (!value.trim()) return "The mobile no is Required";
      if (!/^[0-9+]+$/.test(value))
        return "The mobile no. can only consist of number";
      if (!validateMobileNumber(value, formData.countryDialCodePrefix || "91"))
        return "Mobile number not Valid";
      return "";

    case "userName":
      if (!value.trim()) return "The User Name is Required";
      if (!/^(?!.*[<>?=;:,/])([A-Za-z0-9.+-@]+)$/.test(value))
        return "Invalid Username or Username cannot have spaces at the start or end";
      return "";

    case "password":
      if (!value.trim()) return "The Password Is required";
      if (value.length < 6 || value.length > 20)
        return "The password must be min 6 and max 20 character long";
      return "";

    case "address":
      if (!value.trim()) return "The address is Required";
      if (value.length > 250) return "The address must be less than 250 characters long";
      return "";

    case "panNo":
      if (value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
        return "Pan Number is not a valid";
      if (value && value.length !== 10)
        return "The pan no. must be 10 characters long";
      return "";

    case "email":
      if (
        value &&
        !/^(?!.*[^A-Za-z0-9]{2})[A-Za-z0-9]\.*(?=[a-z0-9][a-z0-9@._-]{5,40}$)[a-z0-9._-]{1,29}@(?:(?=[a-z0-9-]{1,15}\.)[a-z0-9]+(?:-[a-z0-9]+)*\.){1,2}[a-z]{2,6}$/.test(
          value
        )
      )
        return "Email address is not valid";
      if (value.length > 50) return "Email Address should not be greater than 50 characters";
      return "";

    case "gstin":
      if (formData.gstType === "Registered") {
        if (!value.trim()) return "The GSTIN Should Not Be Empty";
        if (
          !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z]{1}[A-Z0-9]{1}$/.test(value)
        )
          return "The GSTIN/UIN that you have entered is invalid. Please enter a valid GSTIN/UIN";
        if (value.length !== 15)
          return "GSTIN/UIN must be 15 characters long";
      }
      return "";

    case "fssaiNo":
      if (formData.haveFssaiNo && value && value.length !== 14)
        return "The FSSAI NO. must be 14 digit long";
      return "";

    case "pincode":
      if (formData.governmentTaxType === "GST") {
        if (!/^[0-9]{6}$/.test(value)) return "The ZIP/Postal code must be a 6 digit number";
      } else {
        if (value && value.length > 50) return "The ZIP/Postal code can only consist of 50 digits";
      }
      return "";

    case "bankName":
      if (value && value.length > 50)
        return "The Bank name should not be greater than 50 characters";
      return "";

    case "accountHolderName":
      if (!value.trim()) return "The Account Holder Name is required";
      if (value.length > 50)
        return "The Account Holder Name should not be greater than 50 characters";
      if (!/^[A-Za-z\s.]+$/.test(value))
        return "The Account Holder Name can only contain alphabets and spaces";
      return "";

    case "branchName":
      if (value && value.length > 50)
        return "The Branch name should not be greater than 50 characters";
      return "";

    case "accountNo":
      if (value && value.length > 20)
        return "The bank account no must be 20 digit long";
      if (value && !/^[a-zA-Z0-9]+$/.test(value))
        return "The bank account no can only consist of alphabetical and number";
      return "";

    case "ifscCode":
      if (value && value.length > 11)
        return "The IFSC code must be less than 11 characters long";
      if (value && !/^[A-Z]{4}0[A-Za-z0-9]{6}$/.test(value))
        return "The IFSC code is invalid";
      return "";

    case "wages":
    case "extraWages":
    case "target": {
      if (!value) return "";
      if (value.length > 20)
        return `The ${name} must be less than 20 characters long`;
      if (!/^(\d+(\.\d{1,2})?)$/.test(value))
        return `The ${name} is invalid`;
      return "";
    }

    case "commission": {
      if (!value) return "";
      if (value.length > 20)
        return "The commission must be less than 20 characters long";
      if (!/^(\d+(\.\d{1,2})?)$/.test(value))
        return "The commission is invalid";
      const num = parseFloat(value);
      if (num < 0 || num > 100)
        return "The commission must be between 0 and 100 Percentage";
      return "";
    }

    case "userRoleId":
      if (!value.trim()) return "The User Role is required";
      return "";

    case "countriesCode":
      if (!value.trim()) return "The Country is required";
      return "";

    case "stateCode":
      if (!value.trim()) return "The State is required";
      return "";

    case "cityCode":
      if (!value.trim()) return "The City is required";
      return "";

    default:
      return "";
  }
};

// ✅ Whole form validator
export const validateForm = (formData) => {
  const errors = {};
  const fieldsToValidate = [
    "name",
    "displayName",
    "mobileNo",
    "userName",
    "password",
    "address",
    "panNo",
    "email",
    "pincode",
    "bankName",
    "accountHolderName",
    "branchName",
    "accountNo",
    "ifscCode",
    "wages",
    "extraWages",
    "target",
    "commission",
    "userRoleId",
    "countriesCode",
    "stateCode",
    "cityCode",
  ];

  fieldsToValidate.forEach((field) => {
    const error = validateField(field, formData[field], formData);
    if (error) errors[field] = error;
  });

  if (formData.gstType === "Registered") {
    const gstinError = validateField("gstin", formData.gstin, formData);
    if (gstinError) errors.gstin = gstinError;
  }

  if (formData.haveFssaiNo) {
    const fssaiError = validateField("fssaiNo", formData.fssaiNo, formData);
    if (fssaiError) errors.fssaiNo = fssaiError;
  }

  return errors;
};
