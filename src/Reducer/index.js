import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "./Slices/Auth";

const rootReducer  = combineReducers({
  auth:authReducer,
})

export default rootReducer