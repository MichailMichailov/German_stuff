import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./reducers/uiReducers";
import { authReducer } from "./reducers/authReducer";
import { workerReducer } from "./reducers/workerReducer";
import { adminReducer } from "./reducers/adminReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    worker: workerReducer,
    admin: adminReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Отключает проверку сериализуемости
        }),   
})

export const persistor = persistStore(store);