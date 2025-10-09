import axiosInstance from '../../services/axiosInstance';

export const getCountries = () => axiosInstance.get('/location/country'); // Use the axiosInstance for API calls
export const getStates = (code) => axiosInstance.get(`/statelistwithcountrycode?code=${code}`);
export const getCities = (code) => axiosInstance.get(`/citylistwithstatecode?code=${code}`);
export const getLocalities = (code) => axiosInstance.get(`/localitylistwithcitycode?code=${code}`);
