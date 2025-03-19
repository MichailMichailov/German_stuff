import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "./reducers/uiReducers";

const rootReducer = combineReducers({
    ui: uiReducer
})

export const store = configureStore({ reducer:rootReducer })