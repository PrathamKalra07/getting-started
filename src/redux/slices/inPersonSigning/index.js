import { combineReducers } from "redux";

//
import inPersonOriginalSignatoryWithCoordsDataReducer from "./originalSignatoryWithCoordsDataReducer";
import inPersonActiveSignatoryReducer from "./activeSignatoryReducer";
import inPersonSignatureReducer from "./signatureReducer";
import inPersonTextReducer from "./textReducer";
import inPersonEmailReducer from "./emailReducer";
import inPersonDateReducer from "./dateReducer";
import inPersonCheckboxReducer from "./checkboxReducer";
import inPersonCoordinatesReducer from "./coordinatesReducer";
import inPersonElementsNavigationHelperReducer from "./elementsNavigationHelperReducer";
import allFinalDataReducer from "./allFinalDataReducer";
import inPersonBasicInfoReducer from "./basicInfoReducer";

const rootReducer = combineReducers({
  inPersonOriginalSignatoryWithCoordsData:
    inPersonOriginalSignatoryWithCoordsDataReducer,
  inPersonActiveSignatory: inPersonActiveSignatoryReducer,
  inPersonSignatureList: inPersonSignatureReducer,
  inPersonTextList: inPersonTextReducer,
  inPersonEmailList: inPersonEmailReducer,
  inPersonDateList: inPersonDateReducer,
  inPersonCheckboxList: inPersonCheckboxReducer,
  inPersonCoordinatesList: inPersonCoordinatesReducer,
  inPersonElementsNavigationHelper: inPersonElementsNavigationHelperReducer,
  inPersonBasicInfoData: inPersonBasicInfoReducer,
  allFinalDataReducer: allFinalDataReducer,
});
export default rootReducer;
