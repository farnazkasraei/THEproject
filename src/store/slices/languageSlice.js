import { createSlice } from '@reduxjs/toolkit';
import en from '@locales/en.json';
import fa from '@locales/fa.json';

const translations = { en, fa };

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: 'en',
    direction: 'ltr',
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.direction = action.payload === 'fa' ? 'rtl' : 'ltr';
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;

export const getTranslations = language => translations[language] || translations['en'];
