import { createSlice } from "@reduxjs/toolkit";
import { updateValueByEleId } from "utils/InPersonSigning/updateValueByEleId";
import { fetchAllElementsStatus } from "utils/InPersonSigning/trackAllElementsDone";

export const coordinatesSlice = createSlice({
  name: "coordinatesSlice",
  initialState: {
    allCoordinateData: [],
    activeSignatoriesCoordinateData: [],
    signatoryList: [],
  },
  reducers: {
    setCoordinateData: (state, action) => {
      const { allCoordinateData } = action.payload;
      state.allCoordinateData = allCoordinateData;
    },
    setActiveSignatoriesCoordinateData: (state, action) => {
      const { activeSignatoriesCoordinateData } = action.payload;
      state.activeSignatoriesCoordinateData = activeSignatoriesCoordinateData;
    },
    setSingatoryList: (state, action) => {
      const { signatoryList } = action.payload;
      state.signatoryList = signatoryList;
    },
    updateSignatorySignatureValue: (state, action) => {
      const { signatoryUUID, newValue } = action.payload;

      state.signatoryList = state.signatoryList.map((signatory) => {
        if (signatory.signatoryUUID === signatoryUUID) {
          if (signatory.value === "") {
            let signatureCount = 0;

            for (const item of state.activeSignatoriesCoordinateData) {
              if (item.fieldType === "Signature") {
                signatureCount++;
              }
            }
            signatory.completedNoOfFields += signatureCount;
          }
          signatory.value = newValue;
        }
        return signatory;
      });
    },

    updateCoordinateData: (state, action) => {
      const { signatoryUUID, eleId, newValue } = action.payload;
      console.log("updateCoordinateData",action.payload);
      console.log("state.allCoordinateData",state.allCoordinateData);
      console.log("eleId",eleId);
      state.allCoordinateData = updateValueByEleId(
        state.allCoordinateData,
        eleId,
        newValue
      );

      console.log('state.allCoordinateData: '+ state.allCoordinateData);
      console.log('before updatedSignatoryList: '+ signatoryUUID);
      console.log('before updatedSignatoryList: '+ JSON.stringify(state));
      const updatedSignatoryList = fetchAllElementsStatus(signatoryUUID, state);
      console.log('updatedSignatoryList: '+ JSON.stringify(updatedSignatoryList));
      state.signatoryList = updatedSignatoryList;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCoordinateData,
  setActiveSignatoriesCoordinateData,
  updateCoordinateData,
  setSingatoryList,
  updateSignatorySignatureValue,
  updateSignatoryFieldsTracker,
} = coordinatesSlice.actions;

export default coordinatesSlice.reducer;
