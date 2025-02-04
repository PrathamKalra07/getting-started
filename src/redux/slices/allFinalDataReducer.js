import { createSlice } from "@reduxjs/toolkit";

import { changeTextData } from "./textReducer";
import { changeDateData } from "./dateReducer";
import { changeCheckboxData } from "./checkboxReducer";
import { setSignaturePathWithEncoddedImg } from "./signatureReducer";

export const allFinalDataSlice = createSlice({
  name: "allFinalData",
  initialState: {
    totalNoOfFields: 0,
    completedNoOfFields: 0,
    listOfCompletedElements: [],
  },
  reducers: {
    setTotalNoOfFields: (state, action) => {
      const { allCoordinateData } = action.payload;
      state.totalNoOfFields = allCoordinateData.filter(
        (item) => item.isRequired
      ).length;
    },
    setCompletedNoOfFields: (state, action) => {
      const { completedNoOfFields } = action.payload;
      state.completedNoOfFields = completedNoOfFields;
    },
  },
  extraReducers: (builder) => {
    //
    builder.addCase(changeTextData.type, (state, action) => {
      const { FetchAllElementsStatus } = require("utils/trackAllElementsDone");
      const { totalDoneElements } = FetchAllElementsStatus(action.payload);

      state.completedNoOfFields = totalDoneElements;
    });
    //
    builder.addCase(changeDateData.type, (state, action) => {
      const { FetchAllElementsStatus } = require("utils/trackAllElementsDone");
      const { totalDoneElements } = FetchAllElementsStatus(action.payload);

      state.completedNoOfFields = totalDoneElements;
    });
    //
    builder.addCase(setSignaturePathWithEncoddedImg.type, (state, action) => {
      const { FetchAllElementsStatus } = require("utils/trackAllElementsDone");
      const { totalDoneElements } = FetchAllElementsStatus(action.payload);

      state.completedNoOfFields = totalDoneElements;
    });
    //
    // builder.addCase(changeCheckboxData.type, (state, action) => {
    //   const { FetchAllElementsStatus } = require("utils/trackAllElementsDone");
    //   const { totalDoneElements } = FetchAllElementsStatus(action.payload);

    //   state.completedNoOfFields = totalDoneElements;
    // });
  },
});

// Action creators are generated for each case reducer function
export const { setTotalNoOfFields, setCompletedNoOfFields } =
  allFinalDataSlice.actions;

export default allFinalDataSlice.reducer;
