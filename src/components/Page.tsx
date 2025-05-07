//-------------> C:\Users\shiva\Desktop\ew-sign-signpad\src\components\Page.tsx
import React, { useEffect, useRef, useState } from "react";
import { PaginationContainer } from "containers/PaginationContainer";

import { SignatureContainer } from "containers/SignatureContainer";
import { TextContainer } from "containers/TextContainer";
import { DateContainer } from "containers/DateContainer";
import { CheckboxContainer } from "containers/CheckboxContainer";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Dimensions } from "types";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
// import { Modal } from "semantic-ui-react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import CommonPDFViewer from "./Common/CommonPDFviewer";
import { EmailContainer } from "containers/EmailContainer";
import { PicklistContainer } from "containers/PicklistContainer";

interface Props {
  page: any;
  dimensions?: Dimensions;
  updateDimensions: ({ width, height }: any) => void;
  allPages: any;
  goToPage: (pageNo: number) => void;
  isFetchingCordinatesData: any;
  setDrawingModalOpen: any;
  handleStartAndScrollElement: any;
  signatureIndicatorRef: any;
  updateViewportHeight: (height: number) => void;
  // updateViewportWidth: (width: number) => void;
}

export const Page = ({
  page,
  dimensions,
  updateDimensions,
  allPages,
  goToPage,
  isFetchingCordinatesData,
  setDrawingModalOpen,
  handleStartAndScrollElement,
  signatureIndicatorRef,
  updateViewportHeight,
  // updateViewportWidth,
}: Props) => {
  const canvasRefs = useRef<HTMLCanvasElement[]>([]);
  const [width, setWidth] = useState(595.303);
  const [height, setHeight] = useState(841.889);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [isStartShown, setIsStartShown] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [fieldCounter, setFieldCounter] = useState(1);
  const [visiblePages, setVisiblePages] = useState<number[]>([1]); // Start with Page 1

  const allTextData = useSelector(
    (state: RootState) => state.textList.allTextData
  );
  const allEmailData = useSelector(
    (state: RootState) => state.emailList.allEmailData
  );
  const allDateData = useSelector(
    (state: RootState) => state.dateList.allDateData
  );
  const allPicklistData = useSelector(
    (state: RootState) => state.pickList.allPicklistData
  );
  const allCheckboxData = useSelector(
    (state: RootState) => state.checkboxList.allCheckboxData
  );
  const allSignatureData = useSelector(
    (state: RootState) => state.signatureList
  );
  const allCoordinatesData = useSelector(
    (state: RootState) => state.coordinatesList
  );
  const [isAllRequiredFieldsFilled, setIsAllRequiredFieldsFilled] =
    useState(false);
  const [isAllFieldsFilled, setIsAllFieldsFilled] = useState(false);

  const lastPageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('signature indicator ref in page.tsx' + (signatureIndicatorRef));
    
    const observer = new IntersectionObserver(
      (entries) => {
        const lastEntry = entries[0];
        if (lastEntry.isIntersecting) {
          setVisiblePages((prevPages) => {
            const nextPage = prevPages[prevPages.length - 1] + 1;
            return nextPage <= allPages.length
              ? [...prevPages, nextPage]
              : prevPages;
          });
        }
      },
      { threshold: 0.5 }
    );

    if (lastPageRef.current) {
      observer.observe(lastPageRef.current);
    }

    return () => observer.disconnect();
  }, [visiblePages, allPages]);

  useEffect(() => {
    const renderPage = async (p: any, index: number) => {
      if (!p) return;
      const _page = await p;
      const canvas = canvasRefs.current[index];
      if (!canvas) return;
      const context = canvas.getContext("2d");
      const viewport = _page.getViewport({ scale: 1 });

      if (!viewport) return;
      setWidth(viewport.width);
      console.log('widthhh' + viewport.width);
      console.log('heighttt' + viewport.height);
      
      
      setHeight(viewport.height);
      updateViewportHeight(viewport.height);
      // updateViewportWidth(viewport.width);

      if (context) {
        await _page.render({ canvasContext: context, viewport }).promise;
        updateDimensions({ width: viewport.width, height: viewport.height });
      }
    };

    visiblePages.forEach((pageNumber, index) => {
      if (allPages[pageNumber - 1]) {
        console.log('3' + pageNumber);
        
        renderPage(allPages[pageNumber - 1], index);
      }
    });
  }, [visiblePages, allPages]);

  const updateFieldStatus = React.useCallback(() => {
    // console.log('allll date data' + JSON.stringify(allDateData));
    
    const requiredTextFieldsFilled = Object.values(allTextData).every(
      (pageData) =>
        (pageData as any[]).every((field) => !field.isRequired || field.value)
    );
    const requiredEmailFieldsFilled = Object.values(allEmailData).every(
      (pageData) =>
        (pageData as any[]).every((field) => !field.isRequired || field.value)
    );
    const requiredDateFieldsFilled = Object.values(allDateData).every(
      (pageData) =>
        (pageData as any[]).every(
          (field) => !field.isRequired || field.value !== "Invalid date"
        )
    );
    const requiredPicklistFieldsFilled = Object.values(allDateData).every(
      (pageData) => (pageData as any[]).every((field) => !field.isRequired)
    );
    const requiredSignatureFieldsFilled =
      allSignatureData.encodedImgData !== "";

    const allTextFieldsFilled = Object.values(allTextData).every((pageData) =>
      (pageData as any[]).every((field) => field.value)
    );
    const allPicklistFieldsFilled = Object.values(allTextData).every((pageData) =>
      (pageData as any[]).every((field) => field.value)
    );
    const allEmailFieldsFilled = Object.values(allEmailData).every((pageData) =>
      (pageData as any[]).every((field) => field.value)
    );
    const allDateFieldsFilled = Object.values(allDateData).every((pageData) =>
      (pageData as any[]).every((field) => field.value !== "Invalid date")
    );

    const allFieldsFilled =
      requiredTextFieldsFilled &&
      requiredDateFieldsFilled &&
      requiredPicklistFieldsFilled &&
      requiredSignatureFieldsFilled &&
      requiredEmailFieldsFilled &&
      allEmailFieldsFilled &&
      allTextFieldsFilled &&
      allPicklistFieldsFilled &&
      allDateFieldsFilled;

    setIsAllRequiredFieldsFilled(
      requiredEmailFieldsFilled &&
        requiredPicklistFieldsFilled &&
        requiredTextFieldsFilled &&
        requiredDateFieldsFilled &&
        requiredSignatureFieldsFilled
    );
    setIsAllFieldsFilled(allFieldsFilled);
  }, [allTextData, allDateData, allSignatureData, allEmailData, allPicklistData]);

  useEffect(() => {
    updateFieldStatus();
  }, [allTextData, allDateData, allSignatureData, allEmailData, allPicklistData, updateFieldStatus]);

  const handleNextClick = () => {
    console.log('page in handleNextClick ' + JSON.stringify(page));
    console.log('all page in handleNextClick ' + JSON.stringify(allPages));
    
    const { allCoordinateData } = allCoordinatesData;
    console.log("coordinates data length " + allCoordinateData.length);
    console.log("all date data @@" + JSON.stringify(allDateData));
    
    if (fieldCounter === allCoordinateData.length) {
      const allRequiredFieldsFilled = checkAllRequiredFieldsFilled();
      console.log('all requiredd fields filled ' + allRequiredFieldsFilled);
      
      if (allRequiredFieldsFilled) {
        console.log("logggggg" + showPopup);

        setShowPopup(true);
      } else {
        console.log("@@@ allRequiredFieldsFilled FALSE...");
        const emptyRequiredField =
        findEmptyRequiredField(allDateData, "Date") ||
        findEmptyRequiredField(allTextData, "Text") ||
        findEmptyRequiredField(allEmailData, "Email") ||
        findEmptyRequiredField(allPicklistData, "PickList") ||
        findEmptyRequiredSignatureField(allSignatureData.allSignatureData);

    if (emptyRequiredField) {
        console.log("Scrolling to empty required field:", emptyRequiredField);
        handleStartAndScrollElement(emptyRequiredField);
    }
        
      }
    } else {
      console.log("field counter" + fieldCounter);
      handleStartAndScrollElement();
      setFieldCounter((fieldCounter) => fieldCounter + 1);
    }
  };

  const findEmptyRequiredField = (data: any, fieldType: string) => {
    for (const pageData of Object.values(data)) {
      console.log('pageData' + JSON.stringify(pageData));
      
        for (const field of pageData as any[]) {
          console.log('page data field' + JSON.stringify(field));
          
            if (field.isRequired && (field.value === "" || field.value === 'Invalid date')) {
              console.log('qwertyuioihgfdsasdfghnjm');
              
              console.log('fields checking' + JSON.stringify({ ...field, fieldType }));
              
                return { ...field, fieldType };
            }
        }
    }
    return null;
};

// Helper function to check for empty required signature fields
const findEmptyRequiredSignatureField = (data: any) => {
    if (allSignatureData.encodedImgData === "") {
      console.log('fields checking signature' + JSON.stringify(allSignatureData.allSignatureData));

        for(const pageData of Object.values(data)){
          for(const field of pageData as any[]){
            console.log('sigantureee fields' + JSON.stringify({...field}));
            
            return {...field};
          }
        }
      
        // return { fieldType: "Signature", isRequired: true, value: "" };
    }
    return null;
};

  const checkAllRequiredFieldsFilled = () => {
    const requiredTextFieldsFilled = Object.values(allTextData).every(
      (pageData) =>
        (pageData as any[]).every((field) => !field.isRequired || field.value)
    );
    const requiredEmailFieldsFilled = Object.values(allEmailData).every(
      (pageData) =>
        (pageData as any[]).every((field) => !field.isRequired || field.value)
    );
    const requiredPicklistFieldsFilled = Object.values(allPicklistData).every(
      (pageData) =>
        (pageData as any[]).every((field) => !field.isRequired || field.value)
    );
    const requiredDateFieldsFilled = Object.values(allDateData).every(
      (pageData) =>
        (pageData as any[]).every(
          (field) => !field.isRequired || field.value !== "Invalid date"
        )
    );

    let requiredSignatureFieldsFilled = false;
    if (allSignatureData.encodedImgData !== "") {
      requiredSignatureFieldsFilled = true;
    }

    // const requiredCheckboxFieldsFilled = Object.values(allCheckboxData).every(pageData =>
    //   (pageData as any[]).every(field => !field.isRequired || field.value)
    // );

    console.log("requiredTextFieldsFilled" + requiredTextFieldsFilled);
    console.log("requiredDateFieldsFilled" + requiredDateFieldsFilled);

    // return requiredTextFieldsFilled && requiredDateFieldsFilled && requiredCheckboxFieldsFilled;
    return (
      requiredEmailFieldsFilled &&
      requiredTextFieldsFilled &&
      requiredDateFieldsFilled &&
      requiredPicklistFieldsFilled &&
      requiredSignatureFieldsFilled
    );
  };
  // console.log("width => ", width);
  // console.log("height => ", height);

  return (
    <>
      <Modal
        isOpen={showPopup}
        onClosed={() => setShowPopup(false)}
        centered
        className="modal-container"
        toggle={() => setShowPopup(false)}
        fade={false}
        size={"large"}
      >
        {/* <ModalHeader>All Required Fields Filled</ModalHeader> */}
        <ModalBody>
          <div>
            <p>All required fields are filled.</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              setShowPopup(false);
            }}
            className="btn custom-btn1 text-dark bg-secondary"
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
      <div
        ref={signatureIndicatorRef}
        // className="signature-indicator"
        onClick={(e) => {
          if (isStartShown) {
            setIsStartShown(false);
          }
          handleStartAndScrollElement(e);
        }}
      >
        {isStartShown ? (
          <div className="signature-indicator">Start</div>
        ) : (
          <div className="next-hidden"></div>
        )}
      </div>
      <div
        style={{ position: "relative", overflow: "hidden" }}
        className="pdf-viewer-container"
      >
        <TransformWrapper
          maxScale={2.5}
          initialScale={deviceWidth < 600 ? 0.6 : 1}
          disabled={deviceWidth <= 600}
          centerZoomedOut
          disablePadding
          wheel={{ disabled: true }}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent>
            <div>
              {visiblePages.map((pageNumber, index) => (
                <div
                  style={{ position: "relative" }}
                  key={pageNumber}
                  ref={
                    pageNumber === visiblePages[visiblePages.length - 1]
                      ? lastPageRef
                      : null
                  }
                >
                  <canvas
                    ref={(el) => (canvasRefs.current[index] = el!)}
                    width={width}
                    height={height}
                    style={{
                      borderRadius: "5px",
                      boxShadow: "0 2px 5px gray",
                      marginBottom: "20px",
                    }}
                  />
                  <SignatureContainer
                    page={allPages[pageNumber - 1]}
                    addDrawing={() => setDrawingModalOpen(true)}
                    isFetchingCordinatesData={isFetchingCordinatesData}
                  />
                  <TextContainer
                    page={allPages[pageNumber - 1]}
                    isFetchingCordinatesData={isFetchingCordinatesData}
                  />
                  <DateContainer
                    page={allPages[pageNumber - 1]}
                    isFetchingCordinatesData={isFetchingCordinatesData}
                  />
                  <CheckboxContainer
                    page={allPages[pageNumber - 1]}
                    isFetchingCordinatesData={isFetchingCordinatesData}
                  />
                  <EmailContainer
                    page={allPages[pageNumber - 1]}
                    isFetchingCordinatesData={isFetchingCordinatesData}
                  />
                  <PicklistContainer
                    page={allPages[pageNumber - 1]}
                    isFetchingCordinatesData={isFetchingCordinatesData}
                  />
                </div>
              ))}

              {!isStartShown && (
                <div
                  ref={signatureIndicatorRef}
                  className="signature-indicator-next"
                  onClick={handleNextClick}
                >
                  <span>
                    <i className="fa-solid fa-circle-arrow-down"></i>{" "}
                    {isAllFieldsFilled ? "Finish" : "Next"}
                  </span>
                </div>
              )}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </>
  );
};
