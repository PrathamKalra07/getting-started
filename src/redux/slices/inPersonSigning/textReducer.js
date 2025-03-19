import { createSlice, current } from "@reduxjs/toolkit";

export const textSlice = createSlice({
  name: "textSlice",
  initialState: {
    allTextData: {},
  },
  reducers: {
    setTextData: (state, action) => {
      const { allTextData } = action.payload;
      state.allTextData = allTextData;
      console.log('@@@ setTextData: '+ JSON.stringify(allTextData));
      console.log('@@@ state.allTextData: '+ JSON.stringify(state.allTextData));
      
      
    },
    changeTextData: (state, action) => {
      const { elementIndex, textValue, currentPageNo } = action.payload;
      console.log('change text' + JSON.stringify(action.payload));
      
      const tempData = current(state.allTextData)[currentPageNo];

      console.log('@@@ changeTextData: '+ JSON.stringify(tempData));
      state.allTextData[currentPageNo] = tempData.map((item) => {
        if (elementIndex === item.id) {
          console.log('value in text ' + textValue);
          
          return {
            ...item,
            value: textValue,
          };
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTextData, changeTextData } = textSlice.actions;

export default textSlice.reducer;
