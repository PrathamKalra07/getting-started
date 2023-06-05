import React, { useState, useLayoutEffect, useEffect } from "react";
import Axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { SignatureContainer } from "./containers/SignatureContainer";
import { TextContainer } from "./containers/TextContainer";
import { DateContainer } from "./containers/DateContainer";

//
import AlreadySignedComponent from "./components/AlreadySignedComponent";

//
import { setInfo } from "./redux/slices/basicInfoReducer";
import { setCoordinateData } from "./redux/slices/coordinatesReducer";
import OtpModal from "./modals/components/OtpModal";
import Loading from "./components/Loading";
import { CheckboxContainer } from "./containers/CheckboxContainer";

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

  //
  const currentReduxState = useSelector((state) => state);

  // const [allCordinatesData, setAllCordinatesData] = useState([]);
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

  const [signatureData, setSignatureData]: any = useState({
    height: 0,
    path: "",
    stroke: "",
    strokeWidth: 0,
    width: 0,
    encodedImgData: "",
  });

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

  const handleSignRejection = async () => {
    setIsSaving(true);
    const tempState = currentReduxState as any;

    const signatoryUUID = tempState.basicInfoData.uuidSignatory;

    let headersList = {
      Accept: "*/*",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      uuid_signatory: signatoryUUID,
    });

    let reqOptions = {
      url: `${process.env.REACT_APP_API_URL}/api/common/handleSignRejection`,
      method: "POST",
      headers: headersList,
      data: bodyContent,
    };

    let response = await Axios.request(reqOptions);

    setIsSaving(false);

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

      // console.log(response.data);

      dispatch(setCoordinateData({ allCoordinateData: response.data.data }));

      // setAllCordinatesData(response.data.data);

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

  const sendOtp = async (
    signatoryUniqUUID: string,
    uuidTemplateInstance: string
  ) => {
    try {
      // {{baseUrl}}/api/fetchCordinatesData

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

      setOriginalOtpValue(response.data.data.otpValue);
      // console.log(response.data.data.otpValue);
    } catch (err: any) {
      console.log(err);
      console.log(err.response);

      if (
        err.response.data.msg.toLowerCase() ==
        "Sorry Your Signature Is Already Done".toLowerCase()
      ) {
        setIsAlreadySign(true);
      } else if (
        err.response.data.msg.toLowerCase() ==
        "Sorry Your Template Is Already Signed".toLowerCase()
      ) {
        setIsAlreadySign(true);
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
          // await sendOtp(
          //   uuidSignatory as string,
          //   uuidTemplateInstance as string
          // );
          setIsOtpVerificationDone(true);
          setIsLoading(false);
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
        <AlreadySignedComponent />
      ) : (
        <>
          {!isOtpVerificationDone ? (
            <OtpModal
              otp={otp}
              originalOtpValue={originalOtpValue}
              setIsOtpVerificationDone={setIsOtpVerificationDone}
              setIsResendOtp={setIsResendOtp}
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
                  <BootstrapContainer className=" d-flex justify-content-center align-items-center overflow-x-scroll">
                    <div>
                      {currentPage && (
                        <div className="border mb-5">
                          {" "}
                          <div style={{ position: "relative" }}>
                            <Page
                              dimensions={dimensions}
                              updateDimensions={setDimensions}
                              page={currentPage}
                              allPages={pages}
                              goToPage={goToPage}
                            />

                            {/*  */}

                            <SignatureContainer
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
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </BootstrapContainer>
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
