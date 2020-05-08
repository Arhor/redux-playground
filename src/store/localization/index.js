import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { refExists } from '@/util/helpers.js';
import { default as russian } from '@/assets/translations/lang-ru.json';

export const fetchTranslations = createAsyncThunk(
  'localization/fetchTranslations',
  async (lang, thunkAPI) => {

    const { dictionaries, langs } = (thunkAPI.getState() || {}).localization;

    const [ dictionary ] = dictionaries
      .filter(d => d.lang === lang)
      .map(d => d.data);
    
    if (refExists(dictionary)) {
      thunkAPI.dispatch(setLang(lang))
      return;
    }

    const { load } = langs[lang];

    const data = await load();

    if (data !== undefined && data !== null) {
      thunkAPI.dispatch(setLang(lang))
      return { lang, data };
    }

    throw new Error(`Translations package for '${lang}' is not found`);
  }
);

export const localizationSlice = createSlice({
  name: 'localization',
  initialState: {
    locale: 'RU',
    langs: Object.freeze({
      'RU': { type: 'eager' },
      'EN': { type: 'lazy', load: () => import('../../assets/translations/lang-en.json') },
    }),
    dictionaries: [{
      lang: 'RU',
      data: russian,
    }],
  },
  reducers: {
    setLang: (state, action) => {
      state.locale = action.payload;
    },
  },
  extraReducers: {
    [fetchTranslations.fulfilled]: (state, action) => {
      if (refExists(action.payload)) {
        const { lang, data } = action.payload;
        if (!state.dictionaries.map(d => d.lang).includes(lang)) {
          state.dictionaries.push({
            lang,
            data,
          });
        }
      }
    },
  },
});

export const { setLang } = localizationSlice.actions;

export const localize = ({localization}) => label => {
  const [ dictionary = {} ] = localization.dictionaries
    .filter(d => d.lang === localization.locale)
    .map(d => d.data);
  
  const translation = dictionary[label];

  return refExists(translation)
      ? translation
      : 'ERROR: missing label';
};

export const locales = state => Object.keys(state.localization.langs);

export default localizationSlice.reducer;