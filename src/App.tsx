import React, { useState, useLayoutEffect, useEffect } from "react";
import Axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createTextSignature } from "./utils/textSignature";

import "./App.css";

import { Container, Grid, Button, Segment } from "semantic-ui-react";

import { Container as BootstrapContainer } from "reactstrap";

import { MenuBar } from "./components/MenuBar";
import { DrawingModal } from "./modals/components/DrawingModal";
import { usePdf, Pdf } from "./hooks/usePdf";
import { AttachmentTypes } from "./entities";
import { ggID } from "./utils/helpers";
import { useAttachments } from "./hooks/useAttachments";
import { useUploader, UploadTypes } from "./hooks/useUploader";
import { Page } from "./components/Page";
import { Attachments } from "./components/Attachments";

//
import AlreadySignedComponent from "./components/AlreadySignedComponent";

//
import { setInfo } from "./redux/slices/basicInfoReducer";
import { setCoordinateData } from "./redux/slices/coordinatesReducer";
import { setUserData } from "./redux/slices/externalUserReducer";
import { setAllPreviousSignatures } from "./redux/slices/signatureReducer";
import OtpModal from "./modals/components/OtpModal";
import Loading from "./components/Loading";
import { CheckboxContainer } from "./containers/CheckboxContainer";

//
import { setTotalNoOfFields } from "./redux/slices/allFinalDataReducer";
import {
  setActiveElement,
  setCurrentPage,
} from "./redux/slices/elementsNavigationHelperReducer";

const App: React.FC = () => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);
  const [isFetchingCordinatesData, setIsFetchingCordinatesData] =
    useState(true);

  const [originalOtpValue, setOriginalOtpValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isAlreadySign, setIsAlreadySign] = useState(false);
  const [isOtpVerificationDone, setIsOtpVerificationDone] = useState(false);
  const [isResendOtp, setIsResendOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userErrorMsg, setUserErrorMsg] = useState("");

  //
  const currentReduxState = useSelector((state) => state);
  const allCoordinateDataWithCordinates = useSelector(
    (state: any) => state.coordinatesList.allCoordinateData
  );
  const elementsNavigationData = useSelector(
    (state: any) => state.elementsNavigationHelper
  );

  const {
    file,
    initialize,
    pageIndex,
    isMultiPage,
    isFirstPage,
    isLastPage,
    currentPage,
    isSaving,
    setIsSaving,
    savePdf,
    previousPage,
    nextPage,
    setDimensions,
    name,
    dimensions,
    pages,
    goToPage,
  } = usePdf();
  const {
    add: addAttachment,
    allPageAttachments,
    pageAttachments,
    reset: resetAttachments,
    update,
    remove,
    setPageIndex,
  } = useAttachments();

  //
  const dispatch = useDispatch();

  //

  const initializePageAndAttachments = (pdfDetails: Pdf) => {
    initialize(pdfDetails);
    const numberOfPages = pdfDetails.pages.length;
    resetAttachments(numberOfPages);
  };

  const {
    inputRef: pdfInput,
    handleClick: handlePdfClick,
    isUploading,
    onClick,
    upload: uploadPdf,
  } = useUploader({
    use: UploadTypes.PDF,
    afterUploadPdf: initializePageAndAttachments,
  });
  const {
    inputRef: imageInput,
    handleClick: handleImageClick,
    onClick: onImageClick,
    upload: uploadImage,
  } = useUploader({
    use: UploadTypes.IMAGE,
    afterUploadAttachment: addAttachment,
  });

  const addText = () => {
    const newTextAttachment: TextAttachment = {
      id: ggID(),
      type: AttachmentTypes.TEXT,
      x: 0,
      y: 0,
      width: 120,
      height: 25,
      size: 16,
      lineHeight: 1.4,
      fontFamily: "Times-Roman",
      text: "Enter Text Here",
    };
    addAttachment(newTextAttachment);
  };

  const addDrawing = (drawing?: {
    width: number;
    height: number;
    path: string;
    encodedImgData: string;
  }) => {
    // if (!drawing) return;
    // setSignatureData(drawing);
    // const newDrawingAttachment: DrawingAttachment = {
    //   id: ggID(),
    //   type: AttachmentTypes.SIGNATURE,
    //   ...drawing,
    //   x: 0,
    //   y: 0,
    //   scale: 1,
    // };
    // addAttachment(newDrawingAttachment);
  };

  useLayoutEffect(() => setPageIndex(pageIndex), [pageIndex, setPageIndex]);

  const hiddenInputs = (
    <>
      <input
        data-testid="pdf-input"
        ref={pdfInput}
        type="file"
        name="pdf"
        id="pdf"
        accept="application/pdf"
        onChange={uploadPdf}
        onClick={onClick}
        style={{ display: "none" }}
      />
      <input
        ref={imageInput}
        type="file"
        id="image"
        name="image"
        accept="image/*"
        onClick={onImageClick}
        style={{ display: "none" }}
        onChange={uploadImage}
      />
    </>
  );

  const handleSignRejection = async (commentText: string) => {
    const thankYouContainer: HTMLElement = document.getElementById(
      "thankyou-container"
    ) as HTMLElement;
    try {
      setIsSaving(true);

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
            <svg height="100" width="100" fill="#ffffff" viewBox="-3.6 -3.6 31.20 31.20" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"><rect x="-3.6" y="-3.6" width="31.20" height="31.20" rx="15.6" fill="#354259" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" strokeLinejoin="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M18,18c-0.55,0-1,0.45-1,1v1H6V4h6v5c0,0.55,0.45,1,1,1h4v1c0,0.55,0.45,1,1,1s1-0.45,1-1V9c0-0.13-0.03-0.25-0.07-0.37 c-0.02-0.04-0.04-0.08-0.07-0.11c-0.03-0.05-0.05-0.11-0.09-0.16l-5-6c-0.01-0.01-0.02-0.02-0.03-0.03 c-0.07-0.07-0.15-0.13-0.23-0.18c-0.03-0.02-0.06-0.05-0.1-0.06C13.28,2.03,13.15,2,13,2H5C4.45,2,4,2.45,4,3v18c0,0.55,0.45,1,1,1 h13c0.55,0,1-0.45,1-1v-2C19,18.45,18.55,18,18,18z M14,5.76L15.86,8H14V5.76z"></path><path d="M8,10h2c0.55,0,1-0.45,1-1s-0.45-1-1-1H8C7.45,8,7,8.45,7,9S7.45,10,8,10z"></path><path d="M13,11H8c-0.55,0-1,0.45-1,1s0.45,1,1,1h5c0.55,0,1-0.45,1-1S13.55,11,13,11z"></path><path d="M13,14H8c-0.55,0-1,0.45-1,1s0.45,1,1,1h5c0.55,0,1-0.45,1-1S13.55,14,13,14z"></path><path d="M13,17H8c-0.55,0-1,0.45-1,1s0.45,1,1,1h5c0.55,0,1-0.45,1-1S13.55,17,13,17z"></path><path d="M20.71,12.29c-0.39-0.39-1.02-0.39-1.41,0L18,13.59l-1.29-1.29c-0.39-0.39-1.02-0.39-1.41,0s-0.39,1.02,0,1.41L16.59,15 l-1.29,1.29c-0.39,0.39-0.39,1.02,0,1.41s1.02,0.39,1.41,0L18,16.41l1.29,1.29C19.49,17.9,19.74,18,20,18s0.51-0.1,0.71-0.29 c0.39-0.39,0.39-1.02,0-1.41L19.41,15l1.29-1.29C21.1,13.32,21.1,12.68,20.71,12.29z"></path></g></svg>
        </div>

      <span class="my-5">
      
      <h4 class="text-center"><b>Oops! you have rejected signature</b></h4>
      
      <h6 class="text-center text-secondary mt-4 text-justify" >
        We regret to see that you had rejected for signature. If this happends by mistake then please notify admin.
      </h6>

      <!-- <h6 class="text-center mt-4">For More Information About EwSign  <a target="_blank" href="https://www.eruditeworks.com/ewsign/">Click Here</a> </h6>-->
      </span>
    </div>
  </div>`;

      const tempState = currentReduxState as any;

      const signatoryUUID = tempState.basicInfoData.uuidSignatory;

      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        uuid_signatory: signatoryUUID,
        rejectionReason: commentText,
      });

      let reqOptions = {
        url: `${process.env.REACT_APP_API_URL}/api/common/handleSignRejection`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await Axios.request(reqOptions);

      localStorage.clear();
    } catch (err) {
      console.log(err);
      alert("something want wrong please try again");
      thankYouContainer.innerHTML = "";
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePdf = () => {
    const tempState = currentReduxState as any;

    const isSignatureDone =
      tempState.signatureList.encodedImgData.length > 0 ? true : false;
    const textData = tempState.textList.allTextData;
    const dateData = tempState.dateList.allDateData;

    var isTextDataDone = true;
    var isDateDataDone = true;

    for (const indexNo in textData) {
      for (let i = 0; i < textData[indexNo].length; i++) {
        const innerElement = textData[indexNo][i];

        if (innerElement.value.length == 0) {
          isTextDataDone = false;

          break;
        }
      }
    }
    for (const indexNo in dateData) {
      for (let i = 0; i < dateData[indexNo].length; i++) {
        const innerElement = dateData[indexNo][i];

        if (innerElement.value.length == 0) {
          isDateDataDone = false;

          break;
        }
      }
    }

    if (!isSignatureDone) {
      alert("Please Fill Signature");
    } else if (!isTextDataDone) {
      alert("Please Fill All Text Data");
    } else if (!isDateDataDone) {
      alert("Please Fill All Date Data");
    } else {
      savePdf(allPageAttachments, tempState);
    }
  };

  //
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleStartAndScrollElement = async () => {
    try {
      const { activeElementCoordinateId } = elementsNavigationData;

      const nextIndex =
        allCoordinateDataWithCordinates.findIndex(
          (item: any) => item.coordinateId == activeElementCoordinateId
        ) + 1;

      const indexNo =
        activeElementCoordinateId == 0 ||
        nextIndex == allCoordinateDataWithCordinates.length
          ? 0
          : nextIndex;

      const currentElementData = allCoordinateDataWithCordinates[indexNo];

      goToPage(currentElementData.pageNo + 1);

      window.scroll({
        top: currentElementData.y,
        behavior: "smooth",
      });

      dispatch(
        setActiveElement({
          coordinateId: currentElementData.coordinateId,
          y: currentElementData.y,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const { y } = elementsNavigationData;

    const signatureIndicator = document.getElementsByClassName(
      "signature-indicator"
    )[0] as any;

    if (signatureIndicator && y > 0) {
      signatureIndicator.style.top = `${y - 5}px`;
    }

    return () => {};
  }, [elementsNavigationData]);

  useEffect(() => {
    if (elementsNavigationData.activeElementCoordinateId > 0) {
      const indexNoList: Array<number> = [];

      const currentPageElements = allCoordinateDataWithCordinates.filter(
        (item: any, index: number) => {
          if (item.pageNo == pageIndex) {
            indexNoList.push(index);

            return item;
          }
        }
      );

      if (currentPageElements[0]) {
        const currentElementData = currentPageElements[0];

        dispatch(
          setActiveElement({
            coordinateId: currentElementData.coordinateId,
            y: currentElementData.y,
          })
        );
        // window.scroll({
        //   top: currentElementData.y,
        //   behavior: "smooth",
        // });
      }
    }

    if (pageIndex > -1) {
      dispatch(setCurrentPage({ pageIndex }));
    }

    return () => {};
  }, [currentPage]);

  const fetchingCordinates = async (
    uuid_template_instance: string,
    uuidS: string
  ) => {
    try {
      // {{baseUrl}}/api/fetchCordinatesData

      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        uuid_template_instance: uuid_template_instance,
        uuid_signatory: uuidS,
      });

      let reqOptions = {
        url: `${process.env.REACT_APP_API_URL}/api/common/fetchCordinatesData`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await Axios.request(reqOptions);

      const responseData = response.data.data;

      const sortedCoordinateData: any = [
        ...(new Set(
          responseData
            .map((item: any) => item.pageNo)
            .sort((a: number, b: number) => a - b)
        ) as any),
      ];

      const finalData: Array<Object> = [];

      sortedCoordinateData.map((currentPageNo: number) => {
        const data = responseData.filter(
          (item: any) => item.pageNo == currentPageNo
        );

        const t = data.sort((a: any, b: any) => {
          return a.y - b.y;
        });
        finalData.push(...t);
      });

      dispatch(setCoordinateData({ allCoordinateData: finalData }));
      dispatch(setTotalNoOfFields({ allCoordinateData: finalData }));

      setIsFetchingCordinatesData(false);
    } catch (err: any) {
      // console.log(err);
      console.log(err.response);

      if (
        err.response.data.msg.toLowerCase() ==
        "Sorry Your Signature Is Already Done".toLowerCase()
      ) {
        setIsAlreadySign(true);
      }
    }
  };

  const fetchingUsersResources = async (uuidSignatory: string) => {
    try {
      // {{baseUrl}}/api/fetchCordinatesData

      var reqOptions = {
        url: `${process.env.REACT_APP_API_URL}/api/common/externalUser/data/checkOrAdd`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          uuidSignatory: uuidSignatory,
        }),
      };

      var {
        data: { data: usersData },
      } = await Axios.request(reqOptions);

      const userId = usersData.userId;

      var reqOptions = {
        url: `${process.env.REACT_APP_API_URL}/api/common/externalUser/signature/fetchAll`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          userId: userId,
        }),
      };

      var {
        data: { data: signatureData },
      } = await Axios.request(reqOptions);

      dispatch(setUserData({ userId }));
      dispatch(
        setAllPreviousSignatures({ allPreviousSignatures: signatureData })
      );
    } catch (err: any) {
      // console.log(err);
      console.log(err.response);
    }
  };

  const sendOtp = async (
    signatoryUniqUUID: string,
    uuidTemplateInstance: string
  ) => {
    try {
      // {{baseUrl}}/api/fetchCordinatesData

      const isOtpSent = localStorage.getItem("isOtpSent") ? true : false;
      const signatodyUUIDStorage = localStorage.getItem("signatoryUUID")
        ? localStorage.getItem("signatoryUUID")
        : "";

      const isOtpVerifyOffline = localStorage.getItem("isOtpVerifyOffline")
        ? true
        : false;

      if (isOtpVerifyOffline && signatodyUUIDStorage === signatoryUniqUUID) {
        setIsOtpVerificationDone(true);
        return;
      }

      if (isOtpSent && signatodyUUIDStorage === signatoryUniqUUID) {
        const otpValue = localStorage.getItem("otpValue") || "";
        setOriginalOtpValue(otpValue);

        return;
      } else if (
        !isOtpSent ||
        isResendOtp != false ||
        signatodyUUIDStorage !== signatoryUniqUUID
      ) {
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };
        let bodyContent = JSON.stringify({
          uuid_signatory: signatoryUniqUUID,
          uuid_template_instance: uuidTemplateInstance,
        });
        let reqOptions = {
          url: `${process.env.REACT_APP_API_URL}/api/sendOtp`,
          method: "POST",
          headers: headersList,
          data: bodyContent,
        };
        let response = await Axios.request(reqOptions);
        localStorage.setItem("isOtpSent", "true");
        localStorage.setItem("otpValue", response.data.data.otpValue);
        localStorage.setItem("signatoryUUID", signatoryUniqUUID);
        setOriginalOtpValue(response.data.data.otpValue);
        // console.log(response.data.data.otpValue);
      }
    } catch (err: any) {
      // console.log(err);
      // console.log(err.response);

      if (err.response.data.msg) {
        if (
          err.response.data.msg.toLowerCase() ==
          "Sorry Your Signature Is Already Done".toLowerCase()
        ) {
          const msg: string = "Sorry You Had Already Done Your Work";
          setUserErrorMsg(msg);
          setIsAlreadySign(true);
        } else if (
          err.response.data.msg.toLowerCase() ==
          "Sorry Your Template Is Already Signed".toLowerCase()
        ) {
          const msg: string =
            "Sorry Your Template Is Already Signed Either By You Or By SomeOne Else In Your Group";
          setUserErrorMsg(msg);
          setIsAlreadySign(true);
        } else if (
          err.response.data.msg.toLowerCase() ==
          "Sorry Someone Had Rejected This Template".toLowerCase()
        ) {
          const msg: string =
            "Sorry Someone Had Rejected This Template So You Are Unable To Go Further";
          setUserErrorMsg(msg);
          setIsAlreadySign(true);
        }

        localStorage.clear();
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOtpVerificationDone) {
      const fetchingAsync = async () => {
        // console.log("done");
        const uuid = searchParams.get("uuid");
        const uuidTemplateInstance = searchParams.get("uuid_template_instance");
        const uuidSignatory = searchParams.get("uuid_signatory");

        await fetchingUsersResources(uuidSignatory as string);

        await fetchingCordinates(
          uuidTemplateInstance as string,
          uuidSignatory as string
        );
        await uploadPdf(uuid);
      };
      fetchingAsync();
    }

    return () => {};
  }, [isOtpVerificationDone]);

  useEffect(() => {
    const fetchParamsAndFetchPdf = async () => {
      try {
        const uuid = searchParams.get("uuid");
        const uuidTemplateInstance = searchParams.get("uuid_template_instance");
        const uuidSignatory = searchParams.get("uuid_signatory");

        if (!uuid || !uuidTemplateInstance || !uuidSignatory) {
          navigate("/page404", { replace: true });

          return;
        }

        dispatch(setInfo({ uuid, uuidTemplateInstance, uuidSignatory }));

        if (
          originalOtpValue.length == 0 &&
          uuid &&
          uuidTemplateInstance &&
          uuidSignatory
        ) {
          await sendOtp(
            uuidSignatory as string,
            uuidTemplateInstance as string
          );
          // setIsOtpVerificationDone(true);
          // setIsLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchParamsAndFetchPdf();

    return () => {};
  }, [isResendOtp]);

  return (
    <Container style={{ margin: 30 }}>
      {/* thank you */}

      <div id="thankyou-container"></div>

      {/*  */}

      {isLoading ? <Loading /> : null}

      {isAlreadySign ? (
        <AlreadySignedComponent userErrorMsg={userErrorMsg} />
      ) : (
        <>
          {!isOtpVerificationDone ? (
            <OtpModal
              otp={otp}
              originalOtpValue={originalOtpValue}
              setIsOtpVerificationDone={setIsOtpVerificationDone}
              setIsResendOtp={setIsResendOtp}
              setOriginalOtpValue={setOriginalOtpValue}
            />
          ) : (
            <>
              {hiddenInputs}
              <MenuBar
                rejectSign={handleSignRejection}
                savePdf={handleSavePdf}
                addText={addText}
                addImage={handleImageClick}
                addDrawing={() => setDrawingModalOpen(true)}
                savingPdfStatus={isSaving}
                uploadNewPdf={handlePdfClick}
                isPdfLoaded={!!file}
              />
              <div className="pdf-viewer-div">
                {!file || isFetchingCordinatesData ? (
                  <Loading />
                ) : (
                  <div className=" d-flex justify-content-center align-items-center overflow-x-scroll">
                    <div className="inner-container">
                      {currentPage && (
                        <div className="border mb-5 position-relative">
                          {" "}
                          <div>
                            <Page
                              dimensions={dimensions}
                              updateDimensions={setDimensions}
                              page={currentPage}
                              allPages={pages}
                              goToPage={goToPage}
                              isFetchingCordinatesData={
                                isFetchingCordinatesData
                              }
                              setDrawingModalOpen={setDrawingModalOpen}
                            />

                            <div
                              className="signature-indicator"
                              onClick={handleStartAndScrollElement}
                            >
                              {elementsNavigationData.activeElementCoordinateId ==
                              0 ? (
                                `Start`
                              ) : (
                                <span>
                                  <i className="fa-solid fa-circle-arrow-right"></i>{" "}
                                  Next
                                </span>
                              )}
                            </div>

                            {/*  */}

                            {/* <SignatureContainer
                              page={currentPage}
                              addDrawing={() => setDrawingModalOpen(true)}
                              isFetchingCordinatesData={
                                isFetchingCordinatesData
                              }
                            />
                            <TextContainer
                              page={currentPage}
                              isFetchingCordinatesData={
                                isFetchingCordinatesData
                              }
                            />
                            <DateContainer
                              page={currentPage}
                              isFetchingCordinatesData={
                                isFetchingCordinatesData
                              }
                            />
                            <CheckboxContainer
                              page={currentPage}
                              isFetchingCordinatesData={
                                isFetchingCordinatesData
                              }
                            /> */}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {drawingModalOpen ? (
                <DrawingModal
                  open={drawingModalOpen}
                  dismiss={() => setDrawingModalOpen(false)}
                  confirm={addDrawing}
                />
              ) : null}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default App;
