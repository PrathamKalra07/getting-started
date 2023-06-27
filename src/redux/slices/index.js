import { combineReducers } from "redux";

//
import signatureReducer from "./signatureReducer";
import coordinatesReducer from "./coordinatesReducer";
import basicInfoReducer from "./basicInfoReducer";
import textReducer from "./textReducer";
import dateReducer from "./dateReducer";
import checkboxReducer from "./checkboxReducer";
import externalUserReducer from "./externalUserReducer";
import allFinalDataReducer from "./allFinalDataReducer";
import elementsNavigationHelperReducer from "./elementsNavigationHelperReducer";

const rootReducer = combineReducers({
  signatureList: signatureReducer,
  coordinatesList: coordinatesReducer,
  basicInfoData: basicInfoReducer,
  textList: textReducer,
  dateList: dateReducer,
  checkboxList: checkboxReducer,
  externalUser: externalUserReducer,
  allFinalDataReducer: allFinalDataReducer,
  elementsNavigationHelper: elementsNavigationHelperReducer,
});
export default rootReducer;
