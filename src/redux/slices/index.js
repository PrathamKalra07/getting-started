import { combineReducers } from "redux";

//
import signatureReducer from "./signatureReducer";
import coordinatesReducer from "./coordinatesReducer";
import basicInfoReducer from "./basicInfoReducer";
import textReducer from "./textReducer";

const rootReducer = combineReducers({
  signatureList: signatureReducer,
  coordinatesList: coordinatesReducer,
  basicInfoData: basicInfoReducer,
  textList: textReducer,
});
export default rootReducer;
