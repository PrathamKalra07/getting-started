import { createSlice, current } from "@reduxjs/toolkit";

export const externalUserSlice = createSlice({
  name: "externalUserSlice",
  initialState: {
    userId: 0,
  },
  reducers: {
    setUserData: (state, action) => {
      const { userId } = action.payload;

      state.userId = userId;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData } = externalUserSlice.actions;

export default externalUserSlice.reducer;
