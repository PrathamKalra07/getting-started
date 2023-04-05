import { readAsArrayBuffer } from "./asyncReader";
import { getAsset } from "./prepareAssets";
import { normalize } from "./helpers";
import { Buffer } from "buffer";

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
      background-color: white
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
      <img src="https://superstorefinder.net/support/wp-content/uploads/2018/01/elastic.gif" />
    </div>
  </div>`;

  const { signatureList, textList, basicInfoData, dateList, checkboxList } =
    tempState;

  // const svgPath = signatureList.signaturePath;
  const base64OfPng = signatureList.encodedImgData;
  const signatureDataPagesWise = signatureList.allSignatureData;
  const textDataPagesWise = textList.allTextData;
  const dateDataPagesWise = dateList.allDateData;
  const checkboxDataPagesWise = checkboxList.allCheckboxData;

  // const tempArr: any = [];
  // // for (let key in signatureDataPagesWise) {
  // //   tempArr.push(signatureDataPagesWise[key]);
  // // }
  // // for (let key in textDataPagesWise) {
  // //   tempArr.push(textDataPagesWise[key]);
  // // }

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

  // const pagesProcesses = pdfDoc.getPages().map(async (page, pageIndex) => {
  //   const pageObjects = objects[pageIndex];

  //   //
  //   // 'y' starts from bottom in PDFLib, use this to calculate y
  //   const pageHeight = page.getHeight();
  //   // const embedProcesses = pageObjects.map(async (object: Attachment) => {
  //   //   if (object.type === "image") {
  //   //     const { file, x, y, width, height, encodedImgData } = object as any;
  //   //     let img: any;
  //   //     try {
  //   //       if (file.type === "image/jpeg") {
  //   //         img = await pdfDoc.embedJpg(await readAsArrayBuffer(file));
  //   //       } else {
  //   //         img = await pdfDoc.embedPng(await readAsArrayBuffer(file));
  //   //       }
  //   //       return () =>
  //   //         page.drawImage(img, {
  //   //           x,
  //   //           y: pageHeight - y - height,
  //   //           width,
  //   //           height,
  //   //         });
  //   //     } catch (e) {
  //   //       console.log("Failed to embed image.", e);
  //   //       throw e;
  //   //     }
  //   //   } else if (object.type === "text") {
  //   //     const { x, y, text, lineHeight, size, fontFamily, width } =
  //   //       object as TextAttachment;
  //   //     const pdfFont = await pdfDoc.embedFont(fontFamily);
  //   //     return () =>
  //   //       page.drawText(text, {
  //   //         maxWidth: width,
  //   //         font: pdfFont,
  //   //         size,
  //   //         lineHeight,
  //   //         x,
  //   //         y: pageHeight - size! - y,
  //   //       });
  //   //   } else if (object.type === "drawing") {
  //   //     const { x, y, path, scale, stroke, strokeWidth } =
  //   //       object as DrawingAttachment;
  //   //     const {
  //   //       pushGraphicsState,
  //   //       setLineCap,
  //   //       popGraphicsState,
  //   //       setLineJoin,
  //   //       LineCapStyle,
  //   //       LineJoinStyle,
  //   //       rgb,
  //   //     } = PDFLib;
  //   //     return () => {
  //   //       page.pushOperators(
  //   //         pushGraphicsState(),
  //   //         setLineCap(LineCapStyle.Round),
  //   //         setLineJoin(LineJoinStyle.Round)
  //   //       );

  //   //       const color = window.w3color(stroke!).toRgb();

  //   //       page.drawSvgPath(path, {
  //   //         borderColor: rgb(
  //   //           normalize(color.r),
  //   //           normalize(color.g),
  //   //           normalize(color.b)
  //   //         ),
  //   //         borderWidth: strokeWidth,
  //   //         scale,
  //   //         x,
  //   //         y: pageHeight - y,
  //   //       });
  //   //       page.pushOperators(popGraphicsState());
  //   //     };
  //   //   } else if (object.type == "signature") {
  //   //     // const { x, y, width, height, encodedImgData } =
  //   //     //   object as ImageAttachment;
  //   //     // let img: any;

  //   //     try {
  //   //       const svgPath = localStorage.getItem("svgSignaturePath");
  //   //       const signatureDataPagesWise = JSON.parse(
  //   //         localStorage.getItem("signatureDataPagesWise")!
  //   //       );

  //   //       return () => {
  //   //         console.log(signatureDataPagesWise[pageIndex]);

  //   //         // allSignatures[pageIndex].map((item: any) => {
  //   //         //   page.drawSvgPath(svgPath, {
  //   //         //     x: item.x - 20,
  //   //         //     y: pageHeight + 20 - item.y,
  //   //         //     maxHeight: item.height,
  //   //         //     maxWidth: item.width,
  //   //         //     scale: 0.5,
  //   //         //   });
  //   //         // });
  //   //       };
  //   //     } catch (e) {
  //   //       console.log("Failed to embed signature image.", e);
  //   //       throw e;
  //   //     }
  //   //   }
  //   // });

  //   if (pageWiseAllData[pageIndex]) {
  //     const embedProcesses = pageWiseAllData[pageIndex].map(
  //       async (elementData: any) => {
  //         try {
  //           if (elementData.fieldType == "Signature") {
  //             return () => {
  //               page.drawSvgPath(svgPath, {
  //                 // x: item.x - 25,
  //                 // y: pageHeight + 20 - item.y,
  //                 x: elementData.x,
  //                 y: pageHeight - elementData.y,
  //                 maxHeight: elementData.height,
  //                 maxWidth: elementData.width,
  //                 scale: 0.4,
  //               });
  //             };
  //           } else if (elementData.fieldType == "Text") {
  //             return () => {
  //               page.drawText(elementData.value, {
  //                 // maxWidth: elementData.width,
  //                 // font: pdfFont,
  //                 // size,
  //                 // lineHeight,
  //                 // lineHeight: 10,
  //                 size: 15,
  //                 height: elementData.height,
  //                 width: elementData.width,
  //                 x: elementData.x,
  //                 y: pageHeight - elementData.y - 20,
  //               });
  //             };
  //           }

  //           // return () => {
  //           //   signatureDataPagesWise[pageIndex].map((item: any) => {
  //           //     // page.drawSvgPath(svgPath, {
  //           //     //   // x: item.x - 25,
  //           //     //   // y: pageHeight + 20 - item.y,
  //           //     //   x: item.x,
  //           //     //   y: pageHeight - item.y,
  //           //     //   maxHeight: item.height,
  //           //     //   maxWidth: item.width,
  //           //     //   scale: 0.4,
  //           //     // });
  //           //   });
  //           // };
  //         } catch (e) {
  //           console.log("Failed to embed signature image.", e);
  //           throw e;
  //         }
  //       }
  //     );

  //     // embed objects in order
  //     const drawProcesses: any[] = await Promise.all(embedProcesses);

  //     drawProcesses.forEach((p) => p());
  //   }
  // });

  // await Promise.all(pagesProcesses);
  try {
    // const pdfBytes = await pdfDoc.save();
    // const base64Pdf = Buffer.from(pdfBytes).toString("base64");

    const body = {
      uuid: basicInfoData.uuid,
      uuid_signatory: basicInfoData.uuidSignatory,
      uuid_template_instance: basicInfoData.uuidTemplateInstance,
      allElementsData: pageWiseAllData,
    };
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/saveSignedDoc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    const response = await res.json();
    console.log("@@@ saveSignedDoc RESPONSE: " + JSON.stringify(response));
    const thankYouContainer: HTMLElement = document.getElementById(
      "thankyou-container"
    ) as HTMLElement;
    thankYouContainer.innerHTML = `<div
      style="
        position: fixed;
        z-index: 6;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #E8EFF5
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
        <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTkxODQ2YzNhNGQ3MmY4YTkxN2ZiMzEzODAyMTA5OWI4Yzk3ZDk1OSZjdD1z/I5dflEG9U9haQ3fUUv/giphy.gif" />
      </div>
    </div>`;

    // download(pdfBytes, name, "application/pdf");
  } catch (e) {
    console.log("Failed to save PDF.");

    console.log(e);
  }
}
