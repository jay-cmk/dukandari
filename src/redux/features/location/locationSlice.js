import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCountries, getStates, getCities, getLocalities } from './locationApi';

export const fetchCountries = createAsyncThunk('location/fetchCountries', async () => {
  try {
    const res = await getCountries();
    console.log("res.data", res.data); // Log the response data for debugging
    return res.data; // Return the countries data
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error; // Handle the error appropriately
  }
});

export const fetchStates = createAsyncThunk('location/fetchStates', async (code) => {
  const res = await getStates(code);
  return res.data;
});

export const fetchCities = createAsyncThunk('location/fetchCities', async (code) => {
  const res = await getCities(code);
  return res.data;
});

export const fetchLocalities = createAsyncThunk('location/fetchLocalities', async (code) => {
  const res = await getLocalities(code);
  return res.data;
});

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    countries: [],
    states: [],
    cities: [],
    localities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.states = action.payload;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.cities = action.payload;
      })
      .addCase(fetchLocalities.fulfilled, (state, action) => {
        state.localities = action.payload;
      });
  },
});

export default locationSlice.reducer;


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { getCountries, getStates, getCities, getLocalities } from './locationApi';

// export const fetchCountries = createAsyncThunk('location/fetchCountries', async () => {
//   try {
//     const res = await getCountries();
//     console.log("res.data", res.data);

//     // ✅ Flatten in case res.data is an array of arrays
//     let data = res.data;

//     if (Array.isArray(data) && Array.isArray(data[0])) {
//       // merge nested arrays into one
//       data = data.flat();
//     }

//     return data;
//   } catch (error) {
//     console.error('Error fetching countries:', error);
//     throw error;
//   }
// });


// export const fetchStates = createAsyncThunk('location/fetchStates', async (code) => {
//   const res = await getStates(code);
//   // Also unwrap nested data, just in case
//   return Array.isArray(res.data) && Array.isArray(res.data[0]) ? res.data[0] : res.data;
// });

// export const fetchCities = createAsyncThunk('location/fetchCities', async (code) => {
//   const res = await getCities(code);
//   return Array.isArray(res.data) && Array.isArray(res.data[0]) ? res.data[0] : res.data;
// });

// export const fetchLocalities = createAsyncThunk('location/fetchLocalities', async (code) => {
//   const res = await getLocalities(code);
//   return Array.isArray(res.data) && Array.isArray(res.data[0]) ? res.data[0] : res.data;
// });

// const locationSlice = createSlice({
//   name: 'location',
//   initialState: {
//     countries: [],
//     states: [],
//     cities: [],
//     localities: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // ✅ Countries
//       .addCase(fetchCountries.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchCountries.fulfilled, (state, action) => {
//         state.loading = false;
//         state.countries = Array.isArray(action.payload) ? action.payload : [];
//       })
//       .addCase(fetchCountries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })

//       // ✅ States
//       .addCase(fetchStates.fulfilled, (state, action) => {
//         state.states = Array.isArray(action.payload) ? action.payload : [];
//       })

//       // ✅ Cities
//       .addCase(fetchCities.fulfilled, (state, action) => {
//         state.cities = Array.isArray(action.payload) ? action.payload : [];
//       })

//       // ✅ Localities
//       .addCase(fetchLocalities.fulfilled, (state, action) => {
//         state.localities = Array.isArray(action.payload) ? action.payload : [];
//       });
//   },
// });

// export default locationSlice.reducer;
