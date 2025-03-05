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
            console.log('state.totalNoOfFields', state.totalNoOfFields);
            
        },
        setCompletedNoOfFields: (state, action) => {
            const { completedNoOfFields } = action.payload;
            console.log('completedNoOfFields in all final data reducer', completedNoOfFields);
            
            state.completedNoOfFields = completedNoOfFields;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(changeTextData.type, (state, action) => {
            const { FetchAllElementsStatus } = require("utils/InPersonSigning/FetchAllElementStatus");
            const { totalDoneElements } = FetchAllElementsStatus(action.payload);
            console.log('totalDoneElements', totalDoneElements);
            
            state.completedNoOfFields = totalDoneElements;
        });

        builder.addCase(changeDateData.type, (state, action) => {
            const { FetchAllElementsStatus } = require("utils/InPersonSigning/FetchAllElementStatus");
            const { totalDoneElements } = FetchAllElementsStatus(action.payload);

            state.completedNoOfFields = totalDoneElements;
        });

        builder.addCase(setSignaturePathWithEncoddedImg.type, (state, action) => {
            const { FetchAllElementsStatus } = require("utils/InPersonSigning/FetchAllElementStatus");
            const { totalDoneElements } = FetchAllElementsStatus(action.payload);

            state.completedNoOfFields = totalDoneElements;
        });
    }
});

export const { setTotalNoOfFields, setCompletedNoOfFields } =
  allFinalDataSlice.actions;

export default allFinalDataSlice.reducer;