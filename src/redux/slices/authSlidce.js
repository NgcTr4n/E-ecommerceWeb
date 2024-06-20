// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userId: null, // Set initial value to null or an appropriate default value
    // other auth-related properties...
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    // other auth-related reducers...
  },
});

export const { setUserId } = authSlice.actions;

export default authSlice.reducer;
