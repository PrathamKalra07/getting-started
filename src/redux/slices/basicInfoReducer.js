import { createSlice } from "@reduxjs/toolkit";

export const basicInfoSlice = createSlice({
  name: "allSlice",
  initialState: {
    uuid: "",
    uuidTemplateInstance: "",
    uuidSignatory: "",
    salesforceOrgId: ""
  },
  reducers: {
    setInfo: (state, action) => {
      const { uuid, uuidTemplateInstance, uuidSignatory } = action.payload;

      state.uuid = uuid;
      state.uuidSignatory = uuidSignatory;
      state.uuidTemplateInstance = uuidTemplateInstance;
    },
    setSalesforceOrgId: (state, action) => {
      const { salesforceOrgId } = action.payload;
      state.salesforceOrgId = salesforceOrgId;
    }
  },
});

// Action creators are generated for each case reducer function
export const { setInfo, setSalesforceOrgId } = basicInfoSlice.actions;

export default basicInfoSlice.reducer;
