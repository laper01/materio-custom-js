
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from "redux-persist";
import { createWrapper } from "next-redux-wrapper";

const persistConfig = {
  key: process.env.NEXT_PUBLIC_FINGERPRINT_NAME,
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }),
});

const persistor = persistStore(store);

const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export { store, persistor, wrapper };