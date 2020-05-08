import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk(
  'country/fetchCountries',
  async () => {
    const { data } = await axios.get('https://restcountries.eu/rest/v2/region/europe');
    console.log(data)
    return data;
  }
);

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    all: [],
  },
  reducers: {
  },
  extraReducers: {
    [fetchCountries.rejected]: (...args) => {
      console.log('-------------------------------------------------------------------')
      args.forEach(a => console.error(a));
      console.log('-------------------------------------------------------------------')
    },
    [fetchCountries.fulfilled]: (state, action) => {
      const fetchedCountries = state.all.map(c => c.name);
      const newCountries = action.payload.filter(c => !fetchedCountries.includes(c.name));
      state.all = [
        ...state.all,
        ...newCountries
      ];
    }
  }
});

export const getCountries = state => state.country.all;

export default countrySlice.reducer;
