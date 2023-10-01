import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) :null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setUser(state,value){
      state.user=value.payload;
    }
  },
});

export const { setSignupData, setLoading ,setUser} = authSlice.actions;

export default authSlice.reducer;