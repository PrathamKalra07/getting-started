import { createSlice } from "@reduxjs/toolkit";

export const elementsNavigationHelperSlice = createSlice({
  name: "elementsNavigationHelperSlice",
  initialState: {
    activePage: 0,
    activeElementCoordinateId: 0,
    y: 0,
    x: 0,
  },
  reducers: {
    setActiveElement: (state, action) => {
      const { coordinateId, y, x } = action.payload;

      state.activeElementCoordinateId = coordinateId;
      state.y = y;
      state.x = x;
    },
    setCurrentPage: (state, action) => {
      const { pageIndex } = action.payload;
      state.activePage = pageIndex;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveElement, setCurrentPage } =
  elementsNavigationHelperSlice.actions;

export default elementsNavigationHelperSlice.reducer;
