// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { alertslice } from './features/alertslice';
import { locationSlice } from './features/locationslice';
import { userSlice } from './features/userslice';
import {doctorSlice} from './features/doctorslice'

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { moodslice } from './features/moodslice';

const rootReducer = combineReducers({
  alert: alertslice.reducer,
  location: locationSlice.reducer,
  user: userSlice.reducer,
  doctor:doctorSlice.reducer,
  mood:moodslice.reducer
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['location'], // 🔥 Exclude location from being persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ Prevents redux-persist warnings
    }),
});

export const persistor = persistStore(store);
export default store;
