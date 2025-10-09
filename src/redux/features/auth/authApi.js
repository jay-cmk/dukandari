import axiosInstance from '../../services/axiosInstance';

export const signUp = (data) => axiosInstance.post('/signup', data);
// 🔹 Login API (using FormData)


export const login = (data) => {
  const formData = new FormData();
  formData.append("username", data.username);
  formData.append("password", data.password);

  // If OTP login is used
  if (data.otp) formData.append("otp", data.otp);

  return axiosInstance.post("/api/auth/login", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const verifyOtp = (data) => {
  const formData = new URLSearchParams();
  formData.append("mobileNo", data.mobileNo);
  formData.append("otp", data.otp);

  return axiosInstance.post("/api/auth/signup/verify-otp", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};





export const sendOtp = (data) => {
  const formData = new FormData();
  formData.append('mobileNo', data.mobileNo);

  return axiosInstance.post('/api/auth/signup/send-otp', formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // जरूरी
    }
  });
};
// ✅ Correct version:
export const checkMobileNumber = (mobileNo) =>
  axiosInstance.get('/api/auth/checkmobileNo', { params: { mobileNo } });