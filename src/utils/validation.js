// utils/validation.js
export const validateMobileNumber = (mobileNo) => {
  const pattern91 = /^[6-9]\d{9}$/;
  const countryCode = "91";
  return countryCode === "91" ? pattern91.test(mobileNo) : true;
};

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
      if (!value.trim()) return "The mobile no is Required";
      if (!/^[0-9+]+$/.test(value))
        return "The mobile no. can only consist of number";
      if (!validateMobileNumber(value)) return "Mobile number not Valid";
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
      return "";

    case "panNo":
      if (value && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
        return "Pan Number is not a valid";
      return "";

    case "email":
      if (
        value &&
        !/^(?!.*[^A-Za-z0-9]{2})[A-Za-z0-9]\.*(?=[a-z0-9][a-z0-9@._-]{5,40}$)[a-z0-9._-]{1,29}@(?:(?=[a-z0-9-]{1,15}\.)[a-z0-9]+(?:-[a-z0-9]+)*\.){1,2}[a-z]{2,6}$/.test(
          value
        )
      )
        return "Email address is not valid";
      return "";

    case "gstin":
      if (formData.gstType === "Registered") {
        if (!value.trim()) return "The GSTIN Should Not Be Empty";
        if (
          !/^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d{1}[A-Z]{1}[A-Z0-9]{1}$/.test(value)
        )
          return "The GSTIN/UIN that you have entered is invalid. Please enter a valid GSTIN/UIN";
        if (value.length !== 15)
          return "GSTIN/UIN is not more than 15 digit long";
      }
      return "";

    case "fssaiNo":
      if (formData.haveFssaiNo && value && value.length !== 14)
        return "The FSSAI NO. must be 14 digit long";
      return "";

    default:
      return "";
  }
};

export const validateForm = (formData) => {
  const errors = {};
  const fieldsToValidate = [
    "name",
    "displayName",
    "mobileNo",
    "userName",
    "password",
    "address",
  ];

  fieldsToValidate.forEach((field) => {
    const error = validateField(field, formData[field], formData);
    if (error) errors[field] = error;
  });

  if (formData.gstType === "Registered") {
    const gstinError = validateField("gstin", formData.gstin, formData);
    if (gstinError) errors.gstin = gstinError;
  }

  return errors;
};