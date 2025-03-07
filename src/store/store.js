import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import languageReducer from './slices/languageSlice';
import themeReducer from './slices/themeSlice';
import sideBarReducer from './slices/sideBarSlice';

// Combine reducers
const rootReducer = combineReducers({
  language: languageReducer,
  theme: themeReducer,
  sidebar: sideBarReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language', 'theme'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
