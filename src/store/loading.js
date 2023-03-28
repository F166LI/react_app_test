import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const counterSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    open: (state) => {
      state.loading = true;
    },
    close: (state) => {
      state.loading = false;
    },
  },
});

const store = configureStore({
  reducer: counterSlice.reducer,
});

export const { open, close } = counterSlice.actions;
export const getValue = (state) => state.loading;

export default store;
