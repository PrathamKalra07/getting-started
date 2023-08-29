import { createSlice } from "@reduxjs/toolkit";

// handlePrintPdf
export const basicInfoSlice = createSlice({
  name: "allSlice",
  initialState: {
    uuid: "",
    uuidTemplateInstance: "",
    uuidSignatory: "",
  },
  reducers: {
    setInfo: (state, action) => {
      const { uuid, uuidTemplateInstance, uuidSignatory } = action.payload;

      state.uuid = uuid;
      state.uuidSignatory = uuidSignatory;
      state.uuidTemplateInstance = uuidTemplateInstance;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setInfo } = basicInfoSlice.actions;

export default basicInfoSlice.reducer;
