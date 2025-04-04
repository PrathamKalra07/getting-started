import { combineReducers } from "redux";

//
import signatureReducer from "./signatureReducer";
import coordinatesReducer from "./coordinatesReducer";
import basicInfoReducer from "./basicInfoReducer";
import textReducer from "./textReducer";
import emailReducer from "./emailReducer";
import dateReducer from "./dateReducer";
import checkboxReducer from "./checkboxReducer";
import externalUserReducer from "./externalUserReducer";
import allFinalDataReducer from "./allFinalDataReducer";
import elementsNavigationHelperReducer from "./elementsNavigationHelperReducer";
import commonReducer from "./common";

import inPersonSigningReducer from "./inPersonSigning";

const rootReducer = combineReducers({
  common: commonReducer,
  inPerson: inPersonSigningReducer,
  signatureList: signatureReducer,
  coordinatesList: coordinatesReducer,
  basicInfoData: basicInfoReducer,
  textList: textReducer,
  dateList: dateReducer,
  emailList: emailReducer,
  checkboxList: checkboxReducer,
  externalUser: externalUserReducer,
  allFinalDataReducer: allFinalDataReducer,
  elementsNavigationHelper: elementsNavigationHelperReducer,
});
export default rootReducer;
