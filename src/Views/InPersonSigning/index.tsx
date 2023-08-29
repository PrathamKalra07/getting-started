import { useState, useLayoutEffect, useEffect, useRef } from "react";
import Axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../../App.css";

import { Container } from "semantic-ui-react";

import { MenuBar } from "../../components/inPersonSigning/MenuBar";
import { DrawingModal } from "../../modals/components/InPersonSigningModal/DrawingModal";
import { usePdf, Pdf } from "../../hooks/usePdf";
import { useAttachments } from "../../hooks/useAttachments";
import { useUploader, UploadTypes } from "../../hooks/useUploader";
import { Page } from "../../components/inPersonSigning/Page";

//
import AlreadySignedComponent from "../../components/AlreadySignedComponent";

//
import { setFullData } from "../../redux/slices/inPersonSigning/originalSignatoryWithCoordsDataReducer";
import { setInfo } from "../../redux/slices/inPersonSigning/basicInfoReducer";
import { setActiveSignatory } from "../../redux/slices/inPersonSigning/activeSignatoryReducer";
import { setCoordinateData, setActiveSignatoriesCoordinateData, setSingatoryList } from "../../redux/slices/inPersonSigning/coordinatesReducer";
import { setUserData } from "../../redux/slices/externalUserReducer";
import { setAllPreviousSignatures } from "../../redux/slices/inPersonSigning/signatureReducer";
import Loading from "../../components/Loading";

//
// import { setTotalNoOfFields } from "../../redux/slices/inPersonSigning/allFinalDataReducer";
import {
  setActiveElement,
  setCurrentPage,
} from "../../redux/slices/inPersonSigning/elementsNavigationHelperReducer";
import { fetchIpInfo } from "../../utils/fetchIpInfo";
import { AuditTrailModal } from "../../modals/components/AuditTrailModal";
import CustomSelect from "../../components/inPersonSigning/CustomSelectComponent";
// import { fetchCoordsPageWise } from "../../utils/InPersonSigning/fetchCoordPageWise";
import { transformData } from "../../utils/InPersonSigning/transformCoordData";
import { savePdfDataToServer } from "../../utils/InPersonSigning/savePdfDataToServer";

const InPersonSigningPage = () => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);
  const [isFetchingCordinatesData, setIsFetchingCordinatesData] =
    useState(true);
  const [isAlreadySign, setIsAlreadySign] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userErrorMsg, setUserErrorMsg] = useState("");
  const [isAuditHistoryShown, setIsAuditHistoryShown] = useState(false);
  const [signatories, setSignatories] = useState<{ label: string; value: string, coordData: []}[] | null>(null);
  const [selectedSignatory, setSelectedSignatory] = useState<{ label: string; value: string } | null>(null);
  // const [isStartNeeded, setIsStartNeeded] = useState<boolean>(true);

  const signatureIndicatorRef = useRef<any>(null);
  const currentReduxState = useSelector((state) => state);

  const fullData = useSelector(
    (state: any) => state.inPersonOriginalSignatoryWithCoordsData.data
  );

  const activeSignatory = useSelector(
    (state: any) => state.inPersonActiveSignatory.activeSignatory
  );
  const allCoordinateDataWithCordinates = useSelector(
    (state: any) => state.inPersonCoordinatesList.allCoordinateData
  );

  const activeSignatoriesCoordinateData = useSelector(
    (state: any) => state.inPersonCoordinatesList.activeSignatoriesCoordinateData
  );
  const elementsNavigationData = useSelector(
    (state: any) => state.inPersonElementsNavigationHelper
  );
  const {
    file,
    initialize,
    pageIndex,
    currentPage,
    savePdf,
    setDimensions,
    dimensions,
    pages,
    goToPage,
  } = usePdf();
  const {
    add: addAttachment,
    allPageAttachments,
    reset: resetAttachments,
    setPageIndex,
  } = useAttachments();
  const dispatch = useDispatch();
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

  const addDrawing = (drawing?: {
    width: number;
    height: number;
    path: string;
    encodedImgData: string;
  }) => {};

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

  const handleSavePdf = async () => {
    const tempState = currentReduxState as any;

    if (tempState.inPersonCoordinatesList.length === 0) {
      alert("oops there is no fields are seems");

      return;
    }

    const firstSignatoryWithEmptyValue = tempState.inPersonCoordinatesList.signatoryList.find(signatory => signatory.value.length === 0);
    const firstFieldWithEmptyValue = tempState.inPersonCoordinatesList.allCoordinateData.find(field => field.fieldType !== 'Signature' && field.value.length === 0);

    if (firstSignatoryWithEmptyValue) {
      alert(`Please Fill Signature, ${firstSignatoryWithEmptyValue.signatoryName}'s signature is pending.`);
    } else if (firstFieldWithEmptyValue) {
      alert(`Please Fill All ${firstFieldWithEmptyValue.fieldType} fields.`);
    } else {
      // savePdf(allPageAttachments, tempState);
      const uuidTemplateInstance = searchParams.get("uuid_template_instance");
      const result = await savePdfDataToServer(tempState, uuidTemplateInstance);

    }
  };

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleStartAndScrollElement = async () => {
    try {
      const { activeElementCoordinateId } = elementsNavigationData;

      const nextIndex =
        activeSignatoriesCoordinateData.findIndex(
          (item: any) => item.coordinateId === activeElementCoordinateId
        ) + 1;

      const indexNo =
        activeElementCoordinateId === 0 ||
        nextIndex === activeSignatoriesCoordinateData.length
          ? 0
          : nextIndex;

      const currentElementData = activeSignatoriesCoordinateData[indexNo];

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

  // ******************** //
  //      USE EFFECT      //
  // ******************** //
  useEffect(() => {
    const { y, x } = elementsNavigationData;

    if (signatureIndicatorRef.current && y > 0 && x > -1) {
      const currentPageElements = activeSignatoriesCoordinateData.find(
        (item: any) => item.pageNo === pageIndex
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

  useEffect(() => {
    if (elementsNavigationData.activeElementCoordinateId > 0) {
      const indexNoList: Array<number> = [];

      const currentPageElements = activeSignatoriesCoordinateData.filter(
        (item: any, index: number) => {
          if (item.pageNo == pageIndex) {
            indexNoList.push(index);

            return item;
          }
        }
      );

      if (currentPageElements[0]) {
        const currentElementData = currentPageElements[0];

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

  const sortData = (originalData) => {
    const sortedCoordinateData: any = [
      ...(new Set(
          originalData
          .map((item: any) => item.pageNo)
          .sort((a: number, b: number) => a - b)
      ) as any),
    ];

    const finalData: Array<any> = [];

    sortedCoordinateData.map((currentPageNo: number) => {
      const data = originalData.filter(
        (item: any) => item.pageNo == currentPageNo
      );

      const t = data.sort((a: any, b: any) => {
        return a.y - b.y;
      });
      finalData.push(...t);
    });

    return finalData;
  }

  const fetchingCordinates = async (
    uuid: string,
    uuid_template_instance: string,
  ) => {
    try {
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let reqOptions = {
        url: `${process.env.REACT_APP_API_URL}/api/common/documents/inPersonSigning/fetchSignatories/?tiUUID=${uuid_template_instance}`,
        method: "GET",
        headers: headersList,
        data: {},
      };

      let response = await Axios.request(reqOptions);

      const responseData = response.data.data;
      console.log('@@@ FULL DATA: '+ JSON.stringify(responseData));

      dispatch(setFullData({data: responseData}))
      
      let tempSignatories: { label: string; value: string, coordData: []}[] = [];
      let signatoryList: {signatoryName: string, signatoryUUID: string; value: string; totalNoOfFields: number; completedNoOfFields: number;}[] = [];
      responseData.forEach(ele => {
        tempSignatories.push({"label": ele.signatoryName, "value": ele.signatoryUUID, ...ele});
        signatoryList.push({"signatoryName": ele.signatoryName, "signatoryUUID": ele.signatoryUUID, "value": "", "totalNoOfFields": ele.coordData.filter(coordinate => coordinate.fieldType !== 'Checkbox').length, "completedNoOfFields": 0});
      })
      console.log(signatoryList);
      
      setSignatories(tempSignatories );
      dispatch(setSingatoryList({signatoryList: signatoryList}));
      
      const firstSignatoryData = responseData[0].coordData;
      const signatoryUUID = responseData[0].signatoryUUID;
      const signatoryName = responseData[0].signatoryName;

      localStorage.setItem("signatoryUUID", signatoryUUID);
      localStorage.setItem("signatoryName", signatoryName);

      dispatch(setActiveSignatory({activeSignatory: {"label": signatoryName, "value": signatoryUUID}}));
      dispatch(setInfo({ uuid, uuidTemplateInstance: uuid_template_instance, uuidSignatory: signatoryUUID }));
      await fetchingUsersResources(signatoryUUID as string);
      const coordList = transformData(responseData);
      dispatch(setCoordinateData({ allCoordinateData: coordList }));
      const finalData = sortData(firstSignatoryData);
      dispatch(setActiveSignatoriesCoordinateData({ activeSignatoriesCoordinateData: finalData }));
      
      trackDocumentViewed(uuid_template_instance, signatoryUUID);
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

  const trackDocumentViewed = async (
    uuidTemplateInstance: any,
    signatoryUniqUUID: any
  ) => {
    try {
      const locationData: any = await fetchIpInfo();

      const headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };
      const bodyContent = JSON.stringify({
        tiUUID: uuidTemplateInstance,
        signatoryUUID: signatoryUniqUUID,
        location: locationData,
      });
      const reqOptions = {
        url: `${process.env.REACT_APP_API_URL}/api/audit/trackDocumentViewed`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
      await Axios.request(reqOptions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
      
      const fetchParamsAndFetchPdf = async () => {
          try {
            const uuid = searchParams.get("uuid");
            const uuidTemplateInstance = searchParams.get("uuid_template_instance");
           
            
            if (!uuid || !uuidTemplateInstance) {
                navigate("/page404", { replace: true });
                
                return;
            }
            
        
            await fetchingCordinates(
                uuid as string,
                uuidTemplateInstance as string,
            );
            await uploadPdf(uuid, uuidTemplateInstance);

           
            setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchParamsAndFetchPdf();

    return () => {};
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
        ) : (
          <>
           
              <>
                {hiddenInputs}
                <MenuBar
                  rejectSign={() => {}}
                  savePdf={handleSavePdf}
                  isPdfLoaded={!!file}
                  setIsAuditHistoryShown={setIsAuditHistoryShown}
                />
                <div className="pdf-viewer-div">
                  {!file || isFetchingCordinatesData ? (
                    <Loading />
                  ) : (
                    <div className=" d-flex justify-content-center align-items-center overflow-x-scroll">
                      <div className="inner-container">
                     
                        <CustomSelect  options={signatories}
                            value={activeSignatory}
                            onChange={(e) => {
                              console.log('CustomSelect: '+e);

                              localStorage.setItem("signatoryUUID", e.value);
                              localStorage.setItem("signatoryName", e.label);

                              if(activeSignatory.value === e.value) {
                                return;
                              }
                              dispatch(setActiveSignatory({activeSignatory: e}));
                              dispatch(setInfo({ uuid: searchParams.get("uuid"), uuidTemplateInstance: searchParams.get("uuid_template_instance"), uuidSignatory: e.value }));
                              fetchingUsersResources(e.value as string);
                              const coordData = allCoordinateDataWithCordinates.filter(coord => coord.signatoryUUID === e.value );
                              dispatch(setActiveSignatoriesCoordinateData({ activeSignatoriesCoordinateData: coordData }));
                              // dispatch(setTotalNoOfFields({ allCoordinateData: coordData }));
                            }} 
                            />

                    
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
                                handleStartAndScrollElement={
                                  handleStartAndScrollElement
                                }
                                signatureIndicatorRef={signatureIndicatorRef}
                              />
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
          </>
        )}

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

export default InPersonSigningPage;
