import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';
import { getToken, setToken, removeToken } from '@/utils/auth'

const initialState = {
  token: getToken(),
  userInfo: localStorage.getItem('USER_INFO') || null,
};

const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, { data }) => {
      setToken(data.token)
      state.userInfo = data;
      localStorage.setItem('USER_INFO', data)
    },
  },
});

// const store = configureStore({
//   reducer: counterSlice.reducer,
// });

export default counterSlice.reducer;
