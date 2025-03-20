import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./reducers/uiReducers";
import { authReducer } from "./reducers/authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    ui: uiReducer
})

export const store = configureStore({ reducer:rootReducer })