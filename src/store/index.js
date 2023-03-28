import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loading from "./loading"
import user from "./user"

const rootReducer = combineReducers({
  loading,
  user,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
