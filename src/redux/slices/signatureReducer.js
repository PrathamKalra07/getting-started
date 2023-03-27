import { createSlice, current } from "@reduxjs/toolkit";

export const signatureSlice = createSlice({
  name: "signatureSlice",
  initialState: {
    allSignatureData: {},
    signaturePath: "",
    encodedImgData: "",
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
  },
});

// Action creators are generated for each case reducer function
export const { setSignatureData, setSignaturePathWithEncoddedImg } =
  signatureSlice.actions;

export default signatureSlice.reducer;
