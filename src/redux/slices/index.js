import { combineReducers } from "redux";

//
import inPersonOriginalSignatoryWithCoordsDataReducer from "./inPersonSigning/originalSignatoryWithCoordsDataReducer";
import inPersonActiveSignatoryReducer from "./inPersonSigning/activeSignatoryReducer";
import inPersonSignatureReducer from "./inPersonSigning/signatureReducer";
import inPersonTextReducer from "./inPersonSigning/textReducer";
import inPersonDateReducer from "./inPersonSigning/dateReducer";
import inPersonCheckboxReducer from "./inPersonSigning/checkboxReducer";
import inPersonCoordinatesReducer from "./inPersonSigning/coordinatesReducer";
import inPersonElementsNavigationHelperReducer from "./inPersonSigning/elementsNavigationHelperReducer";
import inPersonBasicInfoReducer from "./inPersonSigning/basicInfoReducer";
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
  inPersonOriginalSignatoryWithCoordsData: inPersonOriginalSignatoryWithCoordsDataReducer,
  inPersonActiveSignatory: inPersonActiveSignatoryReducer,
  inPersonSignatureList: inPersonSignatureReducer,
  inPersonTextList: inPersonTextReducer,
  inPersonDateList: inPersonDateReducer,
  inPersonCheckboxList: inPersonCheckboxReducer,
  inPersonCoordinatesList: inPersonCoordinatesReducer,
  inPersonElementsNavigationHelper: inPersonElementsNavigationHelperReducer,
  inPersonBasicInfoData: inPersonBasicInfoReducer,
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
