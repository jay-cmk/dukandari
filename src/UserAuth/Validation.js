import React from 'react'



// Password strength calculation
export const calculatePasswordStrength = (password) => {
  const patterns = [
    /[a-z]/,
    /[A-Z]/,
    /\d/,
    /[!@#$%^&*]/
  ];
  let score = 0;
  patterns.forEach(pattern => {
    if (pattern.test(password)) {
      score++;
    }
  });
  if (password.length >= 8) {
    score++;
  }
  const value = Math.min(Math.ceil(score / 5 * 5), 5);
  return value;
};

// Validate password pattern (only allowed characters)
export const validatePasswordPattern = (password) => {
  const specialCharacterRegex = /^[a-zA-Z0-9!@#$%^&*]+$/;
  return specialCharacterRegex.test(password);
};

// Comprehensive password validation
export const validPassword = (password, email) => {
  return password && 
         password.length >= 8 && 
         /[a-z]/.test(password) && 
         /[A-Z]/.test(password) && 
         /\d/.test(password);
};

// Email validation
export const validateEmail = (email) => {
  const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

// Phone number validation based on country dial code
export const validatePhoneNumber = (phoneNumber, dialCode) => {
  let regex;
  if (dialCode === "91") {
    // Indian phone numbers: starts with 6-9 and 10 digits total
    regex = /^[6-9]\d{9}$/;
  } else {
    // International: 3-15 digits, doesn't start with 0
    regex = /^[1-9]\d{2,14}$/;
  }
  const numericRegex = /^[0-9]*$/;
  if (phoneNumber.length > 0) {
    return regex.test(phoneNumber) && numericRegex.test(phoneNumber);
  }
  return false;
};

// Sanitize mobile number input (remove non-numeric characters)
export const validateMobileNumber = (value) => {
  return value.replace(/[^0-9]/g, '');
};

// Business name validation
export const validateBusinessName = (businessName) => {
  return businessName && businessName.trim() !== "";
};

// Business URL validation
export const validateBusinessUrl = (businessUrl) => {
  const urlRegex = /^[a-z0-9]+$/;
  return urlRegex.test(businessUrl);
};

// OTP validation
export const validateOtp = (otpArray) => {
  return otpArray.every(digit => digit !== '') && otpArray.length === 6;
};

// Get password strength text
export const getPasswordStrengthText = (strength) => {
  switch (strength) {
    case 1:
    case 2:
      return "Weak";
    case 3:
    case 4:
      return "Medium";
    case 5:
      return "Strong";
    default:
      return "";
  }
};

// Get password strength color for UI
export const getPasswordStrengthColor = (strength) => {
  switch (strength) {
    case 1:
    case 2:
      return "bg-red-500";
    case 3:
    case 4:
      return "bg-yellow-500";
    case 5:
      return "bg-green-500";
    default:
      return "bg-gray-300";
  }
};

// Comprehensive form validation
export const validateSignupForm = (formData, countryDialCode) => {
  const errors = {};

  if (!validateBusinessName(formData.businessName)) {
    errors.businessName = "Business Name is required";
  }

  if (!formData.businessType) {
    errors.businessType = "Business Type is required";
  }

  if (!formData.country) {
    errors.country = "Country is required";
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (!validatePasswordPattern(formData.password)) {
    errors.password = "Password must contain only letters, numbers, and special characters !@#$%^&*";
  } else if (!validPassword(formData.password, formData.email)) {
    errors.password = "Password must be at least 8 characters with uppercase, lowercase, and numbers";
  }

  if (!formData.firstName) {
    errors.firstName = "First Name is required";
  }

  if (!formData.lastName) {
    errors.lastName = "Last Name is required";
  }

  if (!formData.phone) {
    errors.phone = "Phone is required";
  } else if (!validatePhoneNumber(formData.phone, countryDialCode)) {
    errors.phone = "Phone number is not valid";
  }

  return errors;
};

