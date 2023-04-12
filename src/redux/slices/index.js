import { combineReducers } from "redux";

//
import signatureReducer from "./signatureReducer";
import coordinatesReducer from "./coordinatesReducer";
import basicInfoReducer from "./basicInfoReducer";
import textReducer from "./textReducer";
import dateReducer from "./dateReducer";
import checkboxReducer from "./checkboxReducer";
import colorsReducer from "./colorsReducer";

const rootReducer = combineReducers({
  signatureList: signatureReducer,
  coordinatesList: coordinatesReducer,
  basicInfoData: basicInfoReducer,
  textList: textReducer,
  dateList: dateReducer,
  checkboxList: checkboxReducer,
  colorsList: colorsReducer,
});
export default rootReducer;
