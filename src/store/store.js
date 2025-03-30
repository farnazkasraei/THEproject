import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import languageReducer from './slices/language';
import themeReducer from './slices/theme';
import sideBarReducer from './slices/sideBar';
import usersReducer from './slices/users';

// Combine reducers
const rootReducer = combineReducers({
  language: languageReducer,
  theme: themeReducer,
  sidebar: sideBarReducer,
  users: usersReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['language', 'theme', 'users'],
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
