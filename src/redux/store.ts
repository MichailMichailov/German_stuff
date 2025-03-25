import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./reducers/uiReducers";
import { authReducer } from "./reducers/authReducer";
import { workerReducer } from "./reducers/workerReducer";
import { adminReducer } from "./reducers/adminReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    worker: workerReducer,
    admin: adminReducer
})

export const store = configureStore({ reducer:rootReducer })