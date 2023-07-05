import { readAsArrayBuffer } from "./asyncReader";
import { getAsset } from "./prepareAssets";
import { normalize } from "./helpers";
import { Buffer } from "buffer";
import axios from "axios";
import { fetchIpInfo } from "./fetchIpInfo";

export async function Save(
  pdfFile: File,
  objects: Attachments[],
  name: string,
  tempState: any
) {
  const PDFLib = await getAsset("PDFLib");
  const download = await getAsset("download");
  let pdfDoc: {
    getPages: () => any[];
    embedFont: (arg0: unknown) => any;
    embedJpg: (arg0: unknown) => any;
    embedPng: (arg0: unknown) => any;
    embedPdf: (arg0: any) => [any] | PromiseLike<[any]>;
    // #changes here
    // embedPdf: (arg0: any) => any;
    save: () => any;
  };

  try {
    pdfDoc = await PDFLib.PDFDocument.load(await readAsArrayBuffer(pdfFile));
  } catch (e) {
    console.log("Failed to load PDF.");
    throw e;
  }

  /**/
  // loading gif
  const thankYouContainer: HTMLElement = document.getElementById(
    "thankyou-container"
  ) as HTMLElement;
  thankYouContainer.innerHTML = `<div
  style="
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
  "
>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      flex-direction: column
    "
  >
    <img src="/loading.gif" class="loading-logo-gif" />

    <span class="mb-3"><b>Saving Your Document </b></span>
  </div>
</div>`;

  const { signatureList, textList, basicInfoData, dateList, checkboxList } =
    tempState;

  const base64OfPng = signatureList.encodedImgData;
  const signatureDataPagesWise = signatureList.allSignatureData;
  const textDataPagesWise = textList.allTextData;
  const dateDataPagesWise = dateList.allDateData;
  const checkboxDataPagesWise = checkboxList.allCheckboxData;

  const totalPages = pdfDoc.getPages().length;
  const pageWiseAllData: any = {};

  for (let i = 0; i < totalPages; i++) {
    if (!pageWiseAllData[i]) {
      pageWiseAllData[i] = [];
    }

    var element;

    if (signatureDataPagesWise[i]) {
      element = signatureDataPagesWise[i];

      pageWiseAllData[i].push(
        ...element.map((item: any) => ({
          id: item.coordinateId,
          value: base64OfPng,
        }))
      );
    }
    if (textDataPagesWise[i]) {
      element = textDataPagesWise[i];

      pageWiseAllData[i].push(
        ...element.map((item: any) => ({
          id: item.coordinateId,
          value: item.value,
        }))
      );
    }
    if (dateDataPagesWise[i]) {
      element = dateDataPagesWise[i];

      pageWiseAllData[i].push(
        ...element.map((item: any) => ({
          id: item.coordinateId,
          value: item.value,
        }))
      );
    }
    if (checkboxDataPagesWise[i]) {
      element = checkboxDataPagesWise[i];

      pageWiseAllData[i].push(
        ...element.map((item: any) => ({
          id: item.coordinateId,
          value: item.value,
        }))
      );
    }
  }

  try {
    //

    const locationData: any = await fetchIpInfo();

    const bodyContent = {
      uuid: basicInfoData.uuid,
      uuid_signatory: basicInfoData.uuidSignatory,
      uuid_template_instance: basicInfoData.uuidTemplateInstance,
      allElementsData: pageWiseAllData,
      location: locationData,
    };

    // console.log(bodyContent);

    const { data } = await axios.request({
      url: `${process.env.REACT_APP_API_URL}/api/common/saveSignedDoc`,
      method: "POST",
      data: bodyContent,
    });

    const thankYouContainer: HTMLElement = document.getElementById(
      "thankyou-container"
    ) as HTMLElement;
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
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 90vw;
        flex-direction: column;
      "
    >

        <div class="w-100 d-flex justify-content-center">
          <svg height="100" width="100" viewBox="-2 -2 24.00 24.00" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-2" y="-2" width="24.00" height="24.00" rx="12" fill="#354259" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 5L8 15l-5-4"></path> </g></svg>
        </div>

      <span class="my-5">
      
      <h4 class="text-center"><b>Congratulations! you have successfully completed the signature</b></h4>
      
      <h6 class="text-center text-secondary mt-4 text-justify" > We are one step closer to finalizing the document. Please wait for the remaining signatories to complete their signatures.<br/><br/> The final singed pdf will be emailed to you once all signers have finished signing the document. </h6>

      <!-- <h6 class="text-center mt-4">For More Information About EwSign  <a target="_blank" href="https://www.eruditeworks.com/ewsign/">Click Here</a> </h6>-->
      </span>
    </div>
  </div>`;
    localStorage.clear();
  } catch (e) {
    console.log("Failed to save PDF.");

    const thankYouContainer: HTMLElement = document.getElementById(
      "thankyou-container"
    ) as HTMLElement;
    thankYouContainer.innerHTML = "";
    alert("Something Want Wrong Try Again");
    //

    console.log(e);
  }
}
