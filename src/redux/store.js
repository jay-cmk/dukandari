import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import locationReducer from './features/location/locationSlice';
// import domainReducer from '../features/domain/domainSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
    // domain: domainReducer,
  },
});

export default store;
