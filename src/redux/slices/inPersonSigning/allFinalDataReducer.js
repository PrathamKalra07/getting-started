import { createSlice } from "@reduxjs/toolkit";

import { changeTextData } from "./textReducer";
import { changeDateData } from "./dateReducer";
import { changeCheckboxData } from "./checkboxReducer";
import { setSignaturePathWithEncoddedImg } from "./signatureReducer";
import { changeEmailData } from "./emailReducer";

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
        setListOfCompletedElements: (state, action) => {
            const { listOfCompletedElements } = action.payload;
            state.listOfCompletedElements = listOfCompletedElements;

            console.log('list of completed element in allFinalDataReducer');
            
        }
    },

    extraReducers: (builder) => {
        builder.addCase(changeTextData.type, (state, action) => {
            const { FetchAllElementsStatus } = require("utils/InPersonSigning/FetchAllElementStatus");
            const { totalDoneElements, listOfCompletedElements } = FetchAllElementsStatus(action.payload);
            console.log('totalDoneElements', totalDoneElements);
            console.log('total Done element action payload' + JSON.stringify(action.payload));
            console.log('total Done element action payload listofcompletedelements' + listOfCompletedElements.length);
                        
            state.completedNoOfFields = listOfCompletedElements.length;
            console.log('state.completedNoOfFields' + state.completedNoOfFields);
            
        });

        builder.addCase(changeEmailData.type, (state, action) => {
            const { FetchAllElementsStatus } = require("utils/InPersonSigning/FetchAllElementStatus");
            const { totalDoneElements, listOfCompletedElements } = FetchAllElementsStatus(action.payload);
    
            state.completedNoOfFields = totalDoneElements;
        });

        builder.addCase(changeDateData.type, (state, action) => {
            const { FetchAllElementsStatus } = require("utils/InPersonSigning/FetchAllElementStatus");
            const { totalDoneElements, listOfCompletedElements } = FetchAllElementsStatus(action.payload);
                    console.log('total Done element action payload' + JSON.stringify(action.payload));
                    console.log('total Done element action payload listofcompletedelements' + listOfCompletedElements.length);
                    
            state.completedNoOfFields = listOfCompletedElements.length;
            console.log('state.completedNoOfFields' + state.completedNoOfFields);
            
        });

        builder.addCase(setSignaturePathWithEncoddedImg.type, (state, action) => {
            const { FetchAllElementsStatus } = require("utils/InPersonSigning/FetchAllElementStatus");
            const { totalDoneElements, listOfCompletedElements } = FetchAllElementsStatus(action.payload);
                    console.log('total Done element action payload' + JSON.stringify(action.payload));
                    console.log('total Done element action payload listofcompletedelements length' + listOfCompletedElements.length);
                    console.log('total Done element action payload listofcompletedelements' + listOfCompletedElements);
                    
            state.completedNoOfFields = listOfCompletedElements.length;
            console.log('state.completedNoOfFields' + state.completedNoOfFields);
            
        });
    }
});

export const { setTotalNoOfFields, setCompletedNoOfFields } =
  allFinalDataSlice.actions;

export default allFinalDataSlice.reducer;