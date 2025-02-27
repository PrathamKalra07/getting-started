import axios from "axios";
//
import { patchRequest, postRequest } from "helpers/axios";
import { API_ROUTES } from "helpers/constants/apis";


let uuid;
let uuidTemplateInstance;
const generateData = (tempState) => {
  uuid = tempState.basicInfoData.uuid;
  uuidTemplateInstance = tempState.basicInfoData.uuidTemplateInstance;
  console.log("@@@ tempState: " + JSON.stringify(tempState));
  const { inPerson } = tempState;
  let coordinatesData = inPerson.inPersonCoordinatesList.allCoordinateData;
  const signatoryList = inPerson.inPersonCoordinatesList.signatoryList;
  coordinatesData = coordinatesData.map((coordData) => {
    if (coordData.fieldType === "Signature") {
      const matchingSignatory = signatoryList.find(
        (signatory) => signatory.signatoryUUID === coordData.signatoryUUID
      );

      console.log(
        "@@@ matchingSignatory: " + JSON.stringify(matchingSignatory)
      );
      if (matchingSignatory) {
        return {
          eleId: coordData.eleId,
          value: matchingSignatory.value,
        };
      }
    }
    return coordData;
  });

  console.log("@@@ coordinatesData: " + JSON.stringify(coordinatesData));
  return coordinatesData;
};

const savePdfDataToServer = async (tempState, tiUUID) => {
  try {
    const coordinatesData = generateData(tempState);

    if (window.location.pathname === "/in-person-signing/") {
      await patchRequest(
        API_ROUTES.COMMON_DOCUMENTS_INPERSONSIGNING_SAVESIGNATURE,
        false,
        {
          tiUUID: tiUUID,
          allElementsData: coordinatesData,
        }
      );
    } else if (window.location.pathname === "/self-signing/") {
      await patchRequest(
        API_ROUTES.COMMON_DOCUMENTS_SELFSIGNING_SAVESIGNATURE,
        false,
        {
          tiUUID: tiUUID,
          allElementsData: coordinatesData,
        }
      );
    } else {
      alert("contact developer something want wrong");
      return;
    }

    const thankYouContainer = document.getElementById("thankyou-container");
    thankYouContainer.innerHTML = `<div
            style="
            position: fixed;
            z-index: 5;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #F4EDE4;
            display:flex;
            justify-content:center;
            "
        >
           <div
    class="parent-container">
    <div class="child-container">
    <div class="preview-container">
    <a
    href="https://ew-signpad.netlify.app/viewFinalPdf?uuid=${uuid}&uuid_template_instance=${uuidTemplateInstance}"
      target="_blank"
      class="preview"
   >
     Preview Document
   </a>
    </div>
      <div class="img-container">
        <img src="/thankyou.png" alt="Thank You Illustration" class="img-size"/>
        <p class="congrats-text">
          Congratulations! You have successfully completed the signature.
        </p>
        <p class="closer-text">
          We are one step closer to finalizing the document. Please wait for
          the remaining signatories to complete their signatures.
        </p>
      </div>

        
      <div class="footer-parent">
        <div class="footer-child">
          <span>
            This document has been signed via </span>
            <a href="https://www.eruditeworks.com/ew-sign/demo/"
            class="span-one">EWSIGN.</a>
        </div>
        <div class="footer-child">
          <span>Learn more about </span>
          <a href="https://www.eruditeworks.com/ew-sign/demo/"
          class="span-one">EWSIGN</a>
        </div>
      </div>
    </div>
  </div>`;
    localStorage.clear();
  } catch (error) {
    console.log("Failed to save PDF.");
    const thankYouContainer = document.getElementById("thankyou-container");
    thankYouContainer.innerHTML = "";
    alert("Something Want Wrong Try Again");
    console.log(error);
  }
};

export { savePdfDataToServer };
