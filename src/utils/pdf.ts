import { readAsArrayBuffer } from "./asyncReader";
import { getAsset } from "./prepareAssets";
import { normalize } from "./helpers";
import { Buffer } from "buffer";
import axios from "axios";

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
      background-color: #F4EDE4;
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
      <img src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/sales-Image2%402x.gif" style="width:70%" />

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
    const bodyContent = {
      uuid: basicInfoData.uuid,
      uuid_signatory: basicInfoData.uuidSignatory,
      uuid_template_instance: basicInfoData.uuidTemplateInstance,
      allElementsData: pageWiseAllData,
    };

    console.log(bodyContent);

    const { data } = await axios.request({
      url: `${process.env.REACT_APP_API_URL}/api/common/saveSignedDoc`,
      method: "POST",
      data: bodyContent,
    });

    console.log(data);

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
        <img src="https://ouch-cdn2.icons8.com/tDVPnO7F3kdD0xVzd2VnMPmlb_Bhb841G_CUofgmuqk/rs:fit:256:324/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjgy/L2ExZGYxMGE0LTFk/NjMtNDA0Mi04ZWNj/LWI3OWU4N2ViM2Iw/Zi5wbmc.png" style="width:30%" />
  
        <span class="mb-5"><b>Thank You Your Work Is Done </b></span>
      </div>
    </div>`;
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
