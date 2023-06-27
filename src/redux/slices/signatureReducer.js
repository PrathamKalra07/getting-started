import { createSlice, current } from "@reduxjs/toolkit";

export const signatureSlice = createSlice({
  name: "signatureSlice",
  initialState: {
    allSignatureData: {},
    signaturePath: "",
    encodedImgData: "",
    allPreviousSignatures: [],
  },
  reducers: {
    setSignatureData: (state, action) => {
      const { allSignatureData } = action.payload;
      state.allSignatureData = allSignatureData;
    },
    setSignaturePathWithEncoddedImg: (state, action) => {
      const { path, encodedImgData } = action.payload;
      state.signaturePath = path;
      state.encodedImgData = encodedImgData;
    },
    setAllPreviousSignatures: (state, action) => {
      const { allPreviousSignatures } = action.payload;
      state.allPreviousSignatures = allPreviousSignatures;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSignatureData,
  setSignaturePathWithEncoddedImg,
  setAllPreviousSignatures,
} = signatureSlice.actions;

export default signatureSlice.reducer;
