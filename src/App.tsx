import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { AxiosResponse } from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Container } from "semantic-ui-react";
import {disableReactDevTools} from "@fvilers/disable-react-devtools"

//
import { MenuBar } from "./components/MenuBar";
import { DrawingModal } from "./modals/components/DrawingModal";
import { usePdf, Pdf } from "./hooks/usePdf";
import { useUploader, UploadTypes } from "./hooks/useUploader";

//
import { setInfo, setSalesforceOrgId } from "./redux/slices/basicInfoReducer";
import { setCoordinateData } from "./redux/slices/coordinatesReducer";
import { setRecordData } from "./redux/slices/coordinatesReducer";
import { setUserData } from "./redux/slices/externalUserReducer";
import { setAllPreviousSignatures } from "./redux/slices/signatureReducer";
import {
  setActiveElement,
  setCurrentPage,
} from "./redux/slices/elementsNavigationHelperReducer";
import {
  setTotalNoOfFields,
  setCompletedNoOfFields,
} from "./redux/slices/allFinalDataReducer";

//
import { fetchIpInfo } from "./utils/fetchIpInfo";
import { AuditTrailModal } from "./modals/components/AuditTrailModal";

import OtpModal from "./modals/components/OtpModal";
//
import { Page } from "./components/Page";
import AlreadySignedComponent from "./components/Common/AlreadySignedComponent";
import Loading from "./components/Common/Loading";

//
import { postRequest } from "helpers/axios";
import { API_ROUTES } from "helpers/constants/apis";

//
import { RootState } from "redux/store";

//
import "semantic-ui-css/semantic.min.css";
import "./App.css";

const App: React.FC = () => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);
  const [isFetchingCordinatesData, setIsFetchingCordinatesData] =
    useState(true);

  const [originalOtpValue, setOriginalOtpValue] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isAlreadySign, setIsAlreadySign] = useState(false);
  const [isOtpVerificationDone, setIsOtpVerificationDone] = useState(true);
  const [isResendOtp, setIsResendOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userErrorMsg, setUserErrorMsg] = useState("");
  const [isAuditHistoryShown, setIsAuditHistoryShown] = useState(false);

  //
  const signatureIndicatorRef = useRef<any>(null);

  //
  const currentReduxState = useSelector((state: RootState) => state);
  const allCoordinateDataWithCordinates = useSelector(
    (state: RootState) => state.coordinatesList.allCoordinateData
  );
  const elementsNavigationData = useSelector(
    (state: RootState) => state.elementsNavigationHelper
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

  //
  const dispatch = useDispatch();

  //

  const initializePageAndAttachments = (pdfDetails: Pdf) => {
    initialize(pdfDetails);
    const numberOfPages = pdfDetails.pages.length;
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
    
        <span class="mb-3"><b>Processing Your Request </b></span>
      </div>
    </div>`;

      const tempState = currentReduxState as any;

      const signatoryUUID = tempState.basicInfoData.uuidSignatory;

      const locationData = await fetchIpInfo();

      const {
        data: { data: responseData },
      }: AxiosResponse = await postRequest(
        API_ROUTES.COMMON_HANDLESIGNREJECTION,
        false,
        {
          uuid_signatory: signatoryUUID,
          rejectionReason: commentText,
          location: locationData,
        }
      );

      localStorage.clear();

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
          We regret to see that you had rejected for signature. If this happens by mistake then please notify admin.
        </h6>
  
        <!-- <h6 class="text-center mt-4">For More Information About EwSign  <a target="_blank" href="https://www.eruditeworks.com/ewsign/">Click Here</a> </h6>-->
        </span>
      </div>
    </div>`;
    } catch (err) {
      console.log(err);
      alert("something want wrong please try again");
      thankYouContainer.innerHTML = "";
    } finally {
      setIsSaving(false);
    }
  };

  const handleSavePdf = () => {
    const tempState = currentReduxState as RootState;
    const { coordinatesList, signatureList, textList, dateList, checkboxList } =
      currentReduxState as RootState;

    console.log("DataList",dateList);
    console.log("DataList",JSON.stringify(dateList));
    const signatureData = signatureList.allSignatureData;
    const textData = textList.allTextData;
    const dateData = dateList.allDateData;
    const checkboxData = checkboxList.allCheckboxData;

    for (const indexNo in signatureData) {
      for (let i = 0; i < signatureData[indexNo].length; i++) {
        const innerElement = signatureData[indexNo][i];

        if (
          innerElement.isRequired &&
          signatureList.encodedImgData.length === 0
        ) {
          // alert("Please Fill Signature");
          handleRequiredFieldLogic(innerElement);

          return;
        }
      }
    }
    for (const indexNo in textData) {
      for (let i = 0; i < textData[indexNo].length; i++) {
        const innerElement = textData[indexNo][i];

        if (innerElement.isRequired && innerElement.value.length === 0) {
          // alert("Please Fill All Text Data");
          handleRequiredFieldLogic(innerElement);

          return;
        }
      }
    }
    for (const indexNo in dateData) {
      for (let i = 0; i < dateData[indexNo].length; i++) {
        const innerElement = dateData[indexNo][i];

        if (innerElement.isRequired && innerElement.value.length === 0) {
          // alert("Please Fill All Date Data");
          handleRequiredFieldLogic(innerElement);

          return;
        }
      }
    }
    for (const indexNo in checkboxData) {
      for (let i = 0; i < checkboxData[indexNo].length; i++) {
        const innerElement = checkboxData[indexNo][i];

        if (innerElement.isRequired && innerElement.value === false) {
          // alert("Please Check All Checkbox Data");
          handleRequiredFieldLogic(innerElement);

          return;
        }
      }
    }

    // here changed
    if (coordinatesList.allCoordinateData.length === 0) {
      alert("oops there is no fields are seems");

      return;
    }

    savePdf(tempState);
  };

  //
  const handleRequiredFieldLogic = (innerElement) => {
    try {
      document.getElementsByClassName(
        "signature-indicator"
      )[0].innerHTML = `<span>
      <i class="fa-solid fa-circle-arrow-down"></i> Required
    </span>`;

      const { coordinateId, x, y } = innerElement;

      dispatch(setActiveElement({ coordinateId, y, x }));
    } catch (err) {
      console.log(err);
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

      const currentElementData: any = allCoordinateDataWithCordinates[indexNo];

      if (window.innerWidth > 550) {
        window.scroll({
          top: currentElementData.y,
          behavior: "smooth",
        });
      } else {
        window.scroll({
          top: currentElementData.y - 50,
          behavior: "smooth",
        });
      }

      dispatch(
        setActiveElement({
          coordinateId: currentElementData.coordinateId,
          y: currentElementData.y,
          x: currentElementData.x,
        })
      );

      goToPage(currentElementData.pageNo + 1);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const { y, x } = elementsNavigationData;

    if (signatureIndicatorRef.current && y > 0 && x > -1) {
      const currentPageElements = allCoordinateDataWithCordinates.find(
        (item: any) => item.pageNo == pageIndex
      );

      if (currentPageElements) {
        signatureIndicatorRef.current.style.top = `${y - 35}px`;
        signatureIndicatorRef.current.style.left = `${x}px`;

        // scroll inner div
        document.getElementsByClassName("pdf-viewer-container")[0].scrollLeft =
          x - 20;
      }
    }

    return () => {};
  }, [elementsNavigationData]);


  // useEffect(() => {
  //   disableReactDevTools();
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (
  //       event.key === "F12" ||
  //       (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "C" || event.key === "J" || event.key === "K")) ||
  //       (event.ctrlKey && event.key === "U")
  //     ) {
  //       event.preventDefault();
  //     }
  //   };
  
  //   const handleContextMenu = (event: MouseEvent) => {
  //     event.preventDefault();
  //   };
  
  //   const handleResize = () => {
  //     if (
  //       window.outerWidth - window.innerWidth > 100 || 
  //       window.outerHeight - window.innerHeight > 100 
  //     ) {
  //       // window.location.reload(); 
  //     }
  //   };
  
  //   window.addEventListener("keydown", handleKeyDown);
  //   window.addEventListener("contextmenu", handleContextMenu);
  //   window.addEventListener("resize", handleResize);
  
  //   return () => {
  //     window.removeEventListener("keydown", handleKeyDown);
  //     window.removeEventListener("contextmenu", handleContextMenu);
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  

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
        const currentElementData: any = currentPageElements[0];

        if (window.innerWidth > 550) {
          window.scroll({
            top: currentElementData.y,
            behavior: "smooth",
          });
        } else {
          window.scroll({
            top: currentElementData.y - 50,
            behavior: "smooth",
          });
        }

        dispatch(
          setActiveElement({
            coordinateId: currentElementData.coordinateId,
            x: currentElementData.x,
            y: currentElementData.y,
          })
        );
      } else {
        signatureIndicatorRef.current.style.top = "10px";
        signatureIndicatorRef.current.style.left = "0px";

        window.scroll({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    if (pageIndex > -1) {
      dispatch(setCurrentPage({ pageIndex }));
    }

    return () => {};
  }, [currentPage]);

  // here x value change container direction !!!!!!!!!!
  const fetchingCordinates = async (
    uuid_template_instance: string,
    uuidS: string
  ) => {
    try {
      const {
        data: { data: responseData },
      }: AxiosResponse = await postRequest(
        API_ROUTES.COMMON_FETCHCORDINATESDATA,
        false,
        {
          uuid_template_instance: uuid_template_instance,
          uuid_signatory: uuidS,
        }
      );

      let coord = responseData.coord;
      const recordData = responseData.recordData;
      
      if(coord && coord.length>0) {
        const salesforceOrgId = coord[0].salesforce_org_id;
        dispatch(setSalesforceOrgId({ salesforceOrgId }));
      }

      let completedFieldCount = 0;
      if (Object.keys(recordData).length > 0) {
        coord = coord.map((item) => {
          if (item.value !== "") {
            completedFieldCount += 1;
          }
          if (
            item.isUpdateFromSalesforce &&
            item.mappingField &&
            item.mappingField !== ""
          ) {
            if (
              recordData.hasOwnProperty(item.mappingField) &&
              recordData[item.mappingField] != null
            ) {
              item.value =
                item.fieldType === "Date"
                  ? moment(recordData[item.mappingField], "YYYY-MM-DD").format(
                      "MM-DD-YYYY"
                    )
                  : recordData[item.mappingField];
            } else {
              item.value = item.fieldType === "Checkbox" ? false : "";
            }
          } else if (item.fieldType === "Date") {
            item.value = moment(item.value, "YYYY-MM-DD").format("MM-DD-YYYY");
          }
          return item;
        });

        console.log(coord);
      }

      const sortedCoordinateData: any = [
        ...(new Set(
          coord
            .map((item: any) => item.pageNo)
            .sort((a: number, b: number) => a - b)
        ) as any),
      ];

      const finalData: Array<Object> = [];

      sortedCoordinateData.map((currentPageNo: number) => {
        const data = coord.filter((item: any) => item.pageNo == currentPageNo);

        const t = data.sort((a: any, b: any) => {
          return a.y - b.y;
        });
        finalData.push(...t);
      });

      dispatch(setCoordinateData({ allCoordinateData: finalData }));
      dispatch(setRecordData({ recordData: recordData }));
      dispatch(setTotalNoOfFields({ allCoordinateData: finalData }));
      dispatch(
        setCompletedNoOfFields({ completedNoOfFields: completedFieldCount })
      );
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
      const {
        data: { data: responseData },
      }: AxiosResponse = await postRequest(
        API_ROUTES.COMMON_EXTERNALUSER_DATA_CHECKORADD,
        false,
        {
          uuidSignatory: uuidSignatory,
        }
      );

      const userId = responseData.userId;

      const {
        data: { data: signatureData },
      }: AxiosResponse = await postRequest(
        API_ROUTES.COMMON_EXTERNALUSER_SIGNATURE_FETCHALL,
        false,
        {
          userId: userId,
        }
      );

      dispatch(setUserData({ userId }));
      dispatch(
        setAllPreviousSignatures({ allPreviousSignatures: signatureData })
      );
    } catch (err: any) {
      // console.log(err);
      console.log(err.response);
    }
  };

  // const sendOtp = async (
  //   signatoryUniqUUID: string,
  //   uuidTemplateInstance: string
  // ) => {
  //   try {
  //     // {{baseUrl}}/api/fetchCordinatesData
  //     console.log("signatory",signatoryUniqUUID);
  //     console.log("uuidTemplateInstance",uuidTemplateInstance);
      

  //     const isOtpSent = localStorage.getItem("isOtpSent") ? true : false;
  //     const signatodyUUIDStorage = localStorage.getItem("signatoryUUID")
  //       ? localStorage.getItem("signatoryUUID")
  //       : "";
      
  //     console.log("isOtpSent",isOtpSent);
  //     console.log("signatodyUUIDStorage",signatodyUUIDStorage);
      
  //     const isOtpVerifyOffline = localStorage.getItem("isOtpVerifyOffline")
  //     ? true
  //     : false;
      
  //     console.log("isOtpVerifyOffline",isOtpVerifyOffline);

  //     if (isOtpVerifyOffline && signatodyUUIDStorage === signatoryUniqUUID) {
  //       console.log("i am from app.tsx in if condition function body on line no 581");
  //       setIsOtpVerificationDone(true);
  //     }
      
  //     console.log("isOtpSent",isOtpSent);
  //     console.log("isResendOtp",isResendOtp);
      
  //     if (isOtpSent && signatodyUUIDStorage === signatoryUniqUUID) {
  //       console.log("i am from app.tsx in if condition function body on line no 588");
  //       const otpValue = localStorage.getItem("otpValue") || "";
  //       console.log("otpValue",otpValue);
  //       setOriginalOtpValue(otpValue);
  //       console.log("originalOtpValue",originalOtpValue);
       
  //     } 
  //     else if (!isOtpSent || isResendOtp != false || signatodyUUIDStorage !== signatoryUniqUUID)
  //       {
  //       localStorage.clear();
  //       console.log("=============else if");
  //       console.log("i am from app.tsx in if condition function body on line no 597");
  //       const {
  //         data: { data: responseData },
  //       }: AxiosResponse = await postRequest(API_ROUTES.SENDOTP, false, {
  //         uuid_signatory: signatoryUniqUUID,
  //         uuid_template_instance: uuidTemplateInstance,
  //       });
        
  //       localStorage.setItem("isOtpSent", "true");
  //       localStorage.setItem("otpValue", responseData.otpValue);
  //       localStorage.setItem("signatoryUUID", signatoryUniqUUID);
  //       localStorage.setItem("signatoryName", responseData.signatoryName);
  //       setOriginalOtpValue(responseData.otpValue);
  //       console.log(responseData.otpValue);
  //     }

  //     await trackDocumentViewed(uuidTemplateInstance, signatoryUniqUUID);
  //   } catch (err: any) {  
  //     console.log(err);
  //     console.log(err.response);
  //     console.log("i am from app.tsx in catch block in sentotp body on line no 620");

  //     if (err.response.data.msg) {
  //       if (
  //         err.response.data.msg.toLowerCase() ==
  //         "Sorry Your Signature Is Already Done".toLowerCase()
  //       ) {
  //         const msg: string = "Sorry You Had Already Done Your Work";
  //         setUserErrorMsg(msg);
  //         setIsAlreadySign(true);
  //       } else if (
  //         err.response.data.msg.toLowerCase() ==
  //         "Sorry Your Template Is Already Signed".toLowerCase()
  //       ) {
  //         const msg: string =
  //           "Sorry Your Template Is Already Signed Either By You Or By SomeOne Else In Your Group";
  //         setUserErrorMsg(msg);
  //         setIsAlreadySign(true);
  //       } else if (
  //         err.response.data.msg.toLowerCase() ==
  //         "Sorry Someone Had Rejected This Template".toLowerCase()
  //       ) {
  //         const msg: string =
  //           "Sorry one of the signatory had rejected this template so you are unable to go further";
  //         setUserErrorMsg(msg);
  //         setIsAlreadySign(true);
  //       }

  //       localStorage.clear();
  //     }
  //     console.log("i am from app.tsx above finally block on line no 654");
  //     } finally {
  //     setIsLoading(false);
  //   }
  // };


  const checkStatus = async (
    signatoryUniqUUID: string,
    uuidTemplateInstance: string
  ) => {
    try {
      console.log("uuidTemplateInstance",uuidTemplateInstance);
      console.log("signatoryUniqUUID",signatoryUniqUUID);
      const {
            data: { data: responseData },
          }: AxiosResponse = await postRequest(API_ROUTES.CHECKSTATUS, false, {
            uuid_signatory: signatoryUniqUUID,
            uuid_template_instance: uuidTemplateInstance,
          });
          console.log("calling track....",JSON.stringify(responseData));

          const expiryDate = responseData?.expiryDate;
          if (expiryDate) {
            const currentDate = new Date();
            const expiryDateObj = new Date(expiryDate);
      
            if (currentDate > expiryDateObj) {
              const msg: string = "Sorry, the document has expired.";
              setUserErrorMsg(msg);
              setIsAlreadySign(true);
              localStorage.clear();
              return;
            }
          }
          
      await trackDocumentViewed(uuidTemplateInstance, signatoryUniqUUID);
    } catch (err: any) {   

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
            "Sorry one of the signatory had rejected this template so you are unable to go further";
          setUserErrorMsg(msg);
          setIsAlreadySign(true);
        }

        localStorage.clear();
      }
      console.log("i am from app.tsx above finally block on line no 654");
      } finally {
      setIsLoading(false);
    }
  };



  const trackDocumentViewed = async (
    uuidTemplateInstance: any,
    signatoryUniqUUID: any
  ) => {
    try {
      console.log("inside trackDocumentViewed")
      const locationData: any = await fetchIpInfo();
      console.log("locationData::"+JSON.stringify(locationData));

      const {
        data: { data: responseData },
      }: AxiosResponse = await postRequest(
        API_ROUTES.AUDIT_TRACKDOCUMENTVIEWED,
        false,
        {
          tiUUID: uuidTemplateInstance,
          signatoryUUID: signatoryUniqUUID,
          location: locationData,
        }
      );
      console.log("Response",JSON.stringify(responseData));
    } catch (err) {
      console.log(err);
    }
  };
  console.log("trackDocumentViewed outside function",JSON.stringify(trackDocumentViewed));

  useEffect(() => {
    // if (isOtpVerificationDone) {
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
        await uploadPdf(uuid, uuidTemplateInstance);
      };
      fetchingAsync();
    // }

    return () => {};
  }, []);



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
      setIsOtpVerificationDone(true);

      if (
        // originalOtpValue.length == 0 &&
        uuid &&
        uuidTemplateInstance &&
        uuidSignatory
      ) {
        console.log("--------");
        console.log(
          "i am from app.tsx in if condition above sentotp on line no 739"
        );
        console.log("--------");
        // track document viewed, call api
        await checkStatus(
          uuidSignatory as string,
          uuidTemplateInstance as string
        );
        // await sendOtp(
        //   uuidSignatory as string,
        //   uuidTemplateInstance as string
        // );
        // setIsOtpVerificationDone(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
console.log("isOtpVerificationDone",isOtpVerificationDone);

  useEffect(() => {
    fetchParamsAndFetchPdf();
  }, []);

  return (
    <>
      <Container style={{ margin: 30 }}>
        {/* thank you */}

        <div id="thankyou-container"></div>

        {/*  */}

        {isLoading ? <Loading /> : null}

        {isAlreadySign ? (
          <AlreadySignedComponent
            userErrorMsg={userErrorMsg}
            setIsAuditHistoryShown={setIsAuditHistoryShown}
          />
        ) : 
        (
          <>
                <MenuBar
                  rejectSign={handleSignRejection}
                  savePdf={handleSavePdf}
                  savingPdfStatus={isSaving}
                  isPdfLoaded={!!file}
                  setIsAuditHistoryShown={setIsAuditHistoryShown}
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
                              {/*  */}
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
                                handleStartAndScrollElement={
                                  handleStartAndScrollElement
                                }
                                signatureIndicatorRef={signatureIndicatorRef}
                              />

                              {/*  */}
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
                  />
                ) : null}
              </>
        )
        
        // (
        //   <>
        //     {!isOtpVerificationDone ? (
        //       <OtpModal
        //         otp={otp}
        //         setOtp={setOtp}
        //         originalOtpValue={originalOtpValue}
        //         setIsOtpVerificationDone={setIsOtpVerificationDone}
        //         setIsResendOtp={setIsResendOtp}
        //         setOriginalOtpValue={setOriginalOtpValue}
        //       />
        //     ) : 
        //     (
        //       <>
        //         <MenuBar
        //           rejectSign={handleSignRejection}
        //           savePdf={handleSavePdf}
        //           savingPdfStatus={isSaving}
        //           isPdfLoaded={!!file}
        //           setIsAuditHistoryShown={setIsAuditHistoryShown}
        //         />
        //         <div className="pdf-viewer-div">
        //           {!file || isFetchingCordinatesData ? (
        //             <Loading />
        //           ) : (
        //             <div className=" d-flex justify-content-center align-items-center overflow-x-scroll">
        //               <div className="inner-container">
        //                 {currentPage && (
        //                   <div className="border mb-5 position-relative">
        //                     {" "}
        //                     <div>
        //                       {/*  */}
        //                       <Page
        //                         dimensions={dimensions}
        //                         updateDimensions={setDimensions}
        //                         page={currentPage}
        //                         allPages={pages}
        //                         goToPage={goToPage}
        //                         isFetchingCordinatesData={
        //                           isFetchingCordinatesData
        //                         }
        //                         setDrawingModalOpen={setDrawingModalOpen}
        //                         handleStartAndScrollElement={
        //                           handleStartAndScrollElement
        //                         }
        //                         signatureIndicatorRef={signatureIndicatorRef}
        //                       />

        //                       {/*  */}
        //                     </div>
        //                   </div>
        //                 )}
        //               </div>
        //             </div>
        //           )}
        //         </div>

        //         {drawingModalOpen ? (
        //           <DrawingModal
        //             open={drawingModalOpen}
        //             dismiss={() => setDrawingModalOpen(false)}
        //           />
        //         ) : null}
        //       </>
        //     )
        //      } 
        //   </>
        // )
        }

        {isAuditHistoryShown && (
          <AuditTrailModal setIsAuditHistoryShown={setIsAuditHistoryShown} />
        )}
      </Container>

      <footer
        className=" text-light d-flex justify-content-end"
        style={{ backgroundColor: "#354259" }}
      >
        {/* Copyright */}
        <div
          className="text-center p-3 fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://www.eruditeworks.com/", "_blank");
          }}
        >
          Powered By EW Sign
        </div>
        {/* Copyright */}
      </footer>
    </>
  );
};

export default App;
