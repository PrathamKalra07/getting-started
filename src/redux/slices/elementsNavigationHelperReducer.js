import { createSlice } from "@reduxjs/toolkit";

export const elementsNavigationHelperSlice = createSlice({
  name: "elementsNavigationHelperSlice",
  initialState: {
    activePage: 0,
    activeElementCoordinateId: 0,
    y: 0,
  },
  reducers: {
    setActiveElement: (state, action) => {
      const { coordinateId, y } = action.payload;

      state.activeElementCoordinateId = coordinateId;
      state.y = y;
    },
    setCurrentPage: (state, action) => {
      const { pageIndex } = action.payload;
      state.activePage = pageIndex;
    },
    // setInfo: (state, action) => {
    //   const { uuid, uuidTemplateInstance, uuidSignatory } = action.payload;
    //   state.uuid = uuid;
    //   state.uuidSignatory = uuidSignatory;
    //   state.uuidTemplateInstance = uuidTemplateInstance;
    // },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveElement, setCurrentPage } =
  elementsNavigationHelperSlice.actions;

export default elementsNavigationHelperSlice.reducer;
