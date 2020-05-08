import { configureStore } from '@reduxjs/toolkit';
import user from '@/store/user';
import counter from '@/store/counter';
import country from '@/store/country';
import localization from '@/store/localization';

export default configureStore({
  reducer: {
    user,
    counter,
    country,
    localization,
  }
});
