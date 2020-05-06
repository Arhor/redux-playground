import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    all: [],
  },
  reducers: {
    setCountries: (state, action) => {
      state.all = action.payload;
    },
  },
});

export const { setCountries } = countrySlice.actions;

export const fetchCountries = () => dispatch => {
  axios
    .get('https://restcountries.eu/rest/v2/region/europe')
    .then(res => {
      console.log(res);
      const { data } = res;
      dispatch(setCountries(data));
    })
    .catch(err => console.error(err));
};

export const getCountries = state => state.country.all;

export default countrySlice.reducer;
