import { configureStore } from '@reduxjs/toolkit';
import user from './user';
import counter from './counter';
import country from './country';

export default configureStore({
  reducer: {
    user,
    counter,
    country,
  }
});
