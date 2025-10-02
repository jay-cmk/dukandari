// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//     const navigate=useNavigate()
//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//     // Handle form submission
//   };

//   return (
//     <div className="h-screen w-screen bg-gray-50 flex items-center justify-center border-2 border-b-blue-900 ">
//       <div className="flex flex-row gap-10 w-full bg-white  shadow-lg overflow-hidden ">
//         {/* Left Side - Form */}
//         <div className="w-screen h-screen md:w-1/2 p-3 ">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's Get Started</h1>
//             <h2 className="text-xl text-gray-600">Signup for Dukandari</h2>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//             {/* Business Name and URL */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Business Name *
//                 </label>
//                 <input
//                   type="text"
//                   defaultValue="test@vasyerp.com"
//                   {...register("businessName", { required: "Business name is required" })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 {errors.businessName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.businessName.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Business URL *
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     defaultValue="yourstore"
//                     {...register("businessUrl", { required: "Business URL is required" })}
//                     className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                   {/* <span className="text-gray-500 whitespace-nowrap">.dukandari.in</span> */}
//                   {/* <button
//                     type="button"
//                     className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
//                   >
//                     Change
//                   </button> */}
//                 </div>
//                 {errors.businessUrl && (
//                   <p className="text-red-500 text-sm mt-1">{errors.businessUrl.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Business Type and Email */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Business Type *
//                 </label>
//                 <select
//                   {...register("businessType", { required: "Business type is required" })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="">Select</option>
//                   <option value="retail">Retail</option>
//                   <option value="wholesale">Wholesale</option>
//                   <option value="manufacturing">Manufacturing</option>
//                   <option value="service">Service</option>
//                 </select>
//                 {errors.businessType && (
//                   <p className="text-red-500 text-sm mt-1">{errors.businessType.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   {...register("email", { 
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                       message: "Invalid email address"
//                     }
//                   })}
//                   placeholder="Email"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* First Name and Phone */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   First Name *
//                 </label>
//                 <input
//                   type="text"
//                   {...register("firstName", { required: "First name is required" })}
//                   placeholder="First Name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 {errors.firstName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Phone *
//                 </label>
//                 <input
//                   type="tel"
//                   defaultValue="+91"
//                   {...register("phone", { 
//                     required: "Phone is required",
//                     pattern: {
//                       value: /^\+?[\d\s-]+$/,
//                       message: "Invalid phone number"
//                     }
//                   })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 {errors.phone && (
//                   <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Divider */}
//             <div className="border-t border-gray-200 my-6"></div>

//             {/* Country and Password */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Country *
//                 </label>
//                 <select
//                   defaultValue="India"
//                   {...register("country", { required: "Country is required" })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 >
//                   <option value="India">India</option>
//                   <option value="USA">USA</option>
//                   <option value="UK">UK</option>
//                   <option value="Other">Other</option>
//                 </select>
//                 {errors.country && (
//                   <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Password *
//                 </label>
//                 <input
//                   type="password"
//                   {...register("password", { 
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: "Password must be at least 6 characters"
//                     }
//                   })}
//                   placeholder="••••••"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 {errors.password && (
//                   <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Last Name */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Last Name *
//                 </label>
//                 <input
//                   type="text"
//                   {...register("lastName", { required: "Last name is required" })}
//                   placeholder="Last Name"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 {errors.lastName && (
//                   <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
//                 )}
//               </div>
//               <div></div> {/* Empty spacer for grid alignment */}
//             </div>

//             {/* Get OTP Button */}
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
//             >
//               Get OTP
//             </button>

//             {/* Sign In Link */}
//             <div className="text-center">
//               <p className="text-gray-600">
//                 Already Have An Account?{" "}
//                 <button
//                   type="button"
//                    onClick={() => navigate("/Login")} 
//                   className="text-blue-500 hover:text-blue-600 font-medium underline"
//                 >
//                   Sign In
//                 </button>
//               </p>
//             </div>
//           </form>
//         </div>

//         {/* Right Side - Image */}
//         <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-blue-500 to-blue-600 relative p-3">
//           <div className="absolute inset-0 flex items-center justify-center p-12">
//             <div className="text-center text-white">
//               <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
//                 <svg 
//                   className="w-32 h-32 text-white" 
//                   fill="currentColor" 
//                   viewBox="0 0 20 20"
//                 >
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
//                 </svg>
//               </div>
//               <h3 className="text-2xl font-bold mb-4">Welcome to Dukandari</h3>
//               <p className="text-blue-100 text-lg">
//                 Streamline your business operations with our comprehensive ERP solution
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;










import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const [showOtpSection, setShowOtpSection] = useState(false);
    const [isPhoneDisabled, setIsPhoneDisabled] = useState(false);
    const [verifyOtpPhoneNo, setVerifyOtpPhoneNo] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '']);
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [countries, setCountries] = useState([]);
    const [countryDialCode, setCountryDialCode] = useState('91');
    const [phoneError, setPhoneError] = useState('');

    const otpInputs = useRef([]);

    // Watch form values
    const businessName = watch("businessName");
    const businessUrl = watch("businessUrl");
    const email = watch("email");
    const password = watch("password");
    const phone = watch("phone");

    // Initialize OTP inputs ref
    useEffect(() => {
        otpInputs.current = otpInputs.current.slice(0, 5);
    }, []);

    // Business Name to URL conversion
    useEffect(() => {
        if (businessName) {
            const urlFriendly = businessName.replace(/[_\W]+/g, "").toLowerCase();
            setValue("businessUrl", urlFriendly);
        }
    }, [businessName, setValue]);

    // Password strength calculation
    useEffect(() => {
        if (password) {
            calculatePasswordStrength(password);
        } else {
            setPasswordStrength(0);
        }
    }, [password]);

    // Load countries on component mount
    useEffect(() => {
        getAllCountries();
    }, []);

    // Check if OTP is complete
    useEffect(() => {
        const isOtpComplete = otp.every(digit => digit !== '');
        setIsSubmitDisabled(!isOtpComplete);
    }, [otp]);

    const getAllCountries = async () => {
        try {
            // Mock API call - replace with actual API
            const mockCountries = [
                { code: 'IN', name: 'India', dialCode: '91' },
                { code: 'US', name: 'United States', dialCode: '1' },
                { code: 'GB', name: 'United Kingdom', dialCode: '44' }
            ];
            setCountries(mockCountries);
            setValue("country", 'IN');
        } catch (error) {
            console.error('Error loading countries:', error);
        }
    };

    const calculatePasswordStrength = (password) => {
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
        setPasswordStrength(value);
    };

    const validatePasswordPattern = (password) => {
        const specialCharacterRegex = /^[a-zA-Z0-9!@#$%^&*]+$/;
        return specialCharacterRegex.test(password);
    };

    const validPassword = (password, email) => {
        // Basic password validation - enhance with zxcvbn if needed
        return password && password.length >= 8 && 
               /[a-z]/.test(password) && 
               /[A-Z]/.test(password) && 
               /\d/.test(password);
    };

    const validateEmail = (email) => {
        const regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phoneNumber, dialCode) => {
        let regex;
        if (dialCode === "91") {
            regex = /^[6-9]\d{9}$/;
        } else {
            regex = /^[1-9]\d{2,14}$/;
        }
        
        const numericRegex = /^[0-9]*$/;
        
        if (phoneNumber.length > 0) {
            return regex.test(phoneNumber) && numericRegex.test(phoneNumber);
        }
        return false;
    };

    const validateMobileNumber = (value) => {
        return value.replace(/[^0-9]/g, '');
    };

    const handlePhoneChange = (e) => {
        const sanitizedValue = validateMobileNumber(e.target.value);
        setValue("phone", sanitizedValue);
        
        if (sanitizedValue.length > 0) {
            if (!validatePhoneNumber(sanitizedValue, countryDialCode)) {
                setPhoneError("Invalid phone number");
            } else {
                setPhoneError("");
            }
        } else {
            setPhoneError("");
        }
    };

    const handleOtpChange = (index, value) => {
        // Only allow numbers
        const digit = value.replace(/[^0-9]/g, '');
        
        const newOtp = [...otp];
        newOtp[index] = digit;
        setOtp(newOtp);

        // Auto-focus next input
        if (digit !== '' && index < 4) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    const handleGetOtp = async (data) => {
        // Validate business name
        if (!data.businessName || data.businessName.trim() === "") {
            toast.error("Business Name is Required");
            return;
        }

        // Validate password pattern
        if (!validatePasswordPattern(data.password)) {
            toast.error("Password must contain only letters, numbers, and special characters !@#$%^&*");
            return;
        }

        // Validate password strength
        if (!validPassword(data.password, data.email)) {
            toast.error("Password is too Weak");
            return;
        }

        // Validate email
        if (!data.email || !validateEmail(data.email)) {
            toast.error("Please enter Valid Email Address");
            return;
        }

        // Validate phone number
        if (!data.phone || !validatePhoneNumber(data.phone, countryDialCode)) {
            toast.error("Phone number is not valid");
            return;
        }

        try {
            // Check if mobile number already exists
            const mobileCheck = await checkMobileNumber(data.phone);
            if (mobileCheck.exists) {
                toast.error("Already registered, please enter another phone number");
                return;
            }

            // Send OTP
            const otpResult = await sendOtp(data.phone, data.email, countryDialCode);
            if (otpResult.success) {
                toast.info("OTP sent successfully");
                setShowOtpSection(true);
                setVerifyOtpPhoneNo(data.phone);
                setIsPhoneDisabled(true);
            } else {
                toast.error("OTP isn't sent, please check your phone number");
            }
        } catch (error) {
            toast.error("Error sending OTP");
            console.error('OTP sending error:', error);
        }
    };

    const handleVerifyOtp = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 5) {
            toast.error("OTP is Not Valid");
            return;
        }

        try {
            const result = await verifyOtp(verifyOtpPhoneNo, otpString);
            if (result.success) {
                toast.success("OTP matched successfully");
                await submitSignUp();
            } else {
                toast.error(result.message || "Invalid OTP");
            }
        } catch (error) {
            toast.error("Error verifying OTP");
            console.error('OTP verification error:', error);
        }
    };

    const submitSignUp = async () => {
        const formData = {
            name: businessName,
            domainname: businessUrl,
            industrytype: watch("businessType"),
            email: email,
            userName: email,
            password: password,
            contactName: `${watch("firstName")} ${watch("lastName")}`,
            contactNo: phone,
            countryDialCodePrefix: countryDialCode,
            countriesCode: watch("country"),
            otpCheck: otp.join('')
        };

        try {
            toast.info("We are Processing Your Request. This May Take a Moment...");
            
            const result = await signUp(formData);
            if (result.status === "200") {
                toast.success(result.message);
                setTimeout(() => {
                    window.location.replace(`https://${businessUrl}.yourdomain.com`);
                }, 1000);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Error during signup");
            console.error('Signup error:', error);
        }
    };

    // Mock API functions - replace with actual API calls
    const checkMobileNumber = async (phone) => {
        // Replace with actual API call
        return { exists: false };
    };

    const sendOtp = async (phone, email, dialCode) => {
        // Replace with actual API call
        return { success: true };
    };

    const verifyOtp = async (phone, otp) => {
        // Replace with actual API call
        return { success: true };
    };

    const signUp = async (formData) => {
        // Replace with actual API call
        return { status: "200", message: "Signup successful" };
    };

    const handleEditNumber = () => {
        setShowOtpSection(false);
        setIsPhoneDisabled(false);
        setOtp(['', '', '', '', '']);
    };

    // const getPasswordStrengthText = () => {
    //     switch (passwordStrength) {
    //         case 1:
    //         case 2:
    //             return "Weak";
    //         case 3:
    //         case 4:
    //             return "Medium";
    //         case 5:
    //             return "Strong";
    //         default:
    //             return "";
    //     }
    // };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
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

    return (
        <div className="h-screen w-screen bg-gray-50 flex items-center justify-center border-2 border-b-blue-900 border-amber-500">
            <div className="flex flex-row gap-4  w-full bg-white  shadow-lg overflow-hidden ">
                {/* Left Side - Form */}
                <div className=" w-screen h-screen md:w-1/2  p-7">
                    <div className="mb-4">
                        <a href="https://www.vasyerp.com" target="_blank" rel="noopener noreferrer">
                            <img src="./images/logo.png" className="h-12 mt-6" alt="VasyERP Logo" />
                        </a>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Let's get started</h1>
                        <h2 className="text-xl text-gray-600">Signup for VasyERP</h2>
                    </div>

                    {!showOtpSection ? (
                        <form onSubmit={handleSubmit(handleGetOtp)} className="space-y-3">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {/* Business Name */}
                                <div className=''>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Business Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("businessName", { 
                                            required: "Business name is required",
                                            onBlur: () => {
                                                if (!businessName || businessName.trim() === "") {
                                                    toast.error("Business Name is Required");
                                                }
                                            }
                                        })}
                                        className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Business Name"
                                    />
                                    {errors.businessName && (
                                        <p className="text-red-500 text-xs ">{errors.businessName.message}</p>
                                    )}
                                </div>

                                {/* Business URL */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1 flex justify-between">
                                        <div>Business URL <span className="text-danger">*</span></div>
                                        <div>
                                            <button type="button" className="text-blue-600 hover:text-blue-800 text-sm">
                                                Change
                                            </button>
                                        </div>
                                    </label>
                                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-1">
                                        <span className="text-gray-500 mr-2">{businessUrl || 'yourstore'}</span>
                                        <span className="text-gray-700">.yourdomain.com</span>
                                    </div>
                                </div>

                                {/* Business Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Business Type <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...register("businessType", { required: "Business type is required" })}
                                        className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select</option>
                                        <option value="retail">Retail</option>
                                        <option value="wholesale">Wholesale</option>
                                        <option value="manufacturing">Manufacturing</option>
                                    </select>
                                    {errors.businessType && (
                                        <p className="text-red-500 text-xs ">{errors.businessType.message}</p>
                                    )}
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Country <span className="text-danger">*</span>
                                    </label>
                                    <select
                                        {...register("country", { required: "Country is required" })}
                                        className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((country) => (
                                            <option key={country.code} value={country.code}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.country && (
                                        <p className="text-red-500 text-xs ">{errors.country.message}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", { 
                                            required: "Email is required",
                                            pattern: {
                                                value: /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
                                                message: "Invalid email address"
                                            },
                                            onBlur: (e) => {
                                                if (e.target.value && !validateEmail(e.target.value)) {
                                                    toast.error("Please enter valid email");
                                                }
                                            }
                                        })}
                                        className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs">{errors.email.message}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Password <span className="text-danger">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            {...register("password", { 
                                                required: "Password is required",
                                                minLength: {
                                                    value: 8,
                                                    message: "Password must be at least 8 characters"
                                                }
                                            })}
                                            className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                            onClick={() => {
                                                const input = document.querySelector('input[name="password"]');
                                                if (input.type === 'password') {
                                                    input.type = 'text';
                                                } else {
                                                    input.type = 'password';
                                                }
                                            }}
                                        >
                                            👁️
                                        </button>
                                    </div>
                                    
                                    {/* Password Strength Meter */}
                                    {/* <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div 
                                            className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
                                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                        ></div>
                                    </div> */}
                                    {/* <p className="text-xs mt-1">{getPasswordStrengthText()}</p> */}
                                    
                                    {errors.password && (
                                        <p className="text-red-500 text-xs">{errors.password.message}</p>
                                    )}
                                </div>

                                {/* First Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        First Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("firstName", { required: "First name is required" })}
                                        className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="First Name"
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-xs">{errors.firstName.message}</p>
                                    )}
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("lastName", { required: "Last name is required" })}
                                        className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Last Name"
                                    />
                                    {errors.lastName && (
                                        <p className="text-red-500 text-xs">{errors.lastName.message}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <select 
                                            value={countryDialCode}
                                            onChange={(e) => setCountryDialCode(e.target.value)}
                                            className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="91">+91</option>
                                            <option value="1">+1</option>
                                            <option value="44">+44</option>
                                        </select>
                                        <input
                                            type="text"
                                            {...register("phone", { 
                                                required: "Phone is required",
                                                onChange: handlePhoneChange
                                            })}
                                            disabled={isPhoneDisabled}
                                            className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Phone Number"
                                        />
                                    </div>
                                    {phoneError && (
                                        <p className="text-red-500 text-xs">{phoneError}</p>
                                    )}
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs">{errors.phone.message}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
                            >
                                Get OTP
                            </button>

                            <div className="text-center">
                                <p className="text-gray-600">
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/login")}
                                        className="text-blue-500 hover:text-blue-600 font-medium underline"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Enter OTP Verification</h2>
                            
                            <div className="flex justify-center space-x-4 mb-4">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => otpInputs.current[index] = el}
                                        type="text"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                        maxLength={1}
                                        className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={handleEditNumber}
                                className="text-blue-500 hover:text-blue-600 font-medium"
                            >
                                Edit Phone Number
                            </button>

                            <button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={isSubmitDisabled}
                                className={`w-full py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium ${
                                    isSubmitDisabled 
                                        ? 'bg-gray-400 cursor-not-allowed' 
                                        : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                            >
                                Verify & Continue
                            </button>

                            <div className="text-center text-sm text-gray-600">
                                <p>
                                    By clicking "Verify & Continue" you agree to VasyERP{" "}
                                    <a href="https://www.vasyerp.com/terms-and-conditions.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                        terms of use
                                    </a>{" "}
                                    and confirm that you've read and acknowledged VasyERP{" "}
                                    <a href="https://www.vasyerp.com/privacy-policy.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                                        privacy policy
                                    </a>.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Side - Image */}
                <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-500 to-blue-600 relative">
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                        <div className="text-center text-white">
                            <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                <svg 
                                    className="w-32 h-32 text-white" 
                                    fill="currentColor" 
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Welcome to VasyERP</h3>
                            <p className="text-blue-100 text-lg">
                                Streamline your business operations with our comprehensive ERP solution
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;