import React, { useEffect, useRef, useState } from "react";
import { PaginationContainer } from "containers/PaginationContainer";

import { SignatureContainer } from "containers/inPersonSigning/SignatureContainer";
import { TextContainer } from "containers/inPersonSigning/TextContainer";
import { DateContainer } from "containers/inPersonSigning/DateContainer";
import { CheckboxContainer } from "containers/inPersonSigning/CheckboxContainer";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Dimensions } from "types";
import { useSelector } from "react-redux";
//
import { RootState } from "redux/store";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface Props {
  page: any;
  dimensions?: Dimensions;
  updateDimensions: ({ width, height }: Dimensions) => void;
  allPages: any;
  goToPage: (pageNo: number) => void;
  isFetchingCordinatesData: any;
  setDrawingModalOpen: any;
  handleStartAndScrollElement: any;
  signatureIndicatorRef: any;
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
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState((dimensions && dimensions.width) || 0);
  const [height, setHeight] = useState((dimensions && dimensions.height) || 0);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [isStartShown, setIsStartShown] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [fieldCounter, setFieldCounter] = useState(1);
  
    const allTextData = useSelector((state: RootState) => state.inPerson.inPersonTextList.allTextData);
    const allDateData = useSelector((state: RootState) => state.inPerson.inPersonDateList.allDateData);
    // const allCheckboxData = useSelector((state: RootState) => state.checkboxList.allCheckboxData);
  const activeSignatory = useSelector(
    (state: RootState) => state.inPerson.inPersonActiveSignatory.activeSignatory
  );

  const inPersonCoordinatesList = useSelector(
    (state: RootState) => state.inPerson.inPersonCoordinatesList.activeSignatoriesCoordinateData
  );

  const allSignatureData = useSelector((state: RootState) => state.inPerson.inPersonSignatureList)
  useEffect(() => {
    setIsStartShown(true);
    signatureIndicatorRef.current.style.top = `10px`;
    signatureIndicatorRef.current.style.left = `0px`;
  }, [activeSignatory]);

  useEffect(() => {
    const renderPage = async (p: Promise<any>) => {
      const _page = await p;
      if (_page) {
        const context = canvasRef.current?.getContext("2d");
        const viewport = _page.getViewport({ scale: 1 });

        setWidth(viewport.width);
        setHeight(viewport.height);

        if (context) {
          await _page.render({
            canvasContext: canvasRef.current?.getContext("2d"),
            viewport,
          }).promise;

          const newDimensions = {
            width: viewport.width,
            height: viewport.height,
          };

          updateDimensions(newDimensions as Dimensions);
        }
      }
    };

    renderPage(page);
  }, [page, updateDimensions]);

  const handleNextClick = () => {
    if (fieldCounter === inPersonCoordinatesList.length) {
      console.log('in person coordinates data length ' + inPersonCoordinatesList.length);
      const allRequiredFieldsFilled = checkAllRequiredFieldsFilled();
      console.log('signature data encoded ' + JSON.stringify(allSignatureData.encodedImgData));
      
      if (allRequiredFieldsFilled) {
        console.log('logggggg' + showPopup);
        
        setShowPopup(true);
      } else {
        handleStartAndScrollElement();
      }
    }else {
      handleStartAndScrollElement();
      console.log('field counter' + fieldCounter);
      
      setFieldCounter(fieldCounter => fieldCounter + 1);
    }
  };

  const checkAllRequiredFieldsFilled = () => {
    const requiredTextFieldsFilled = Object.values(allTextData).every(pageData =>
      (pageData as any[]).every(field => {
        console.log('Text Field:', field);
        return !field.isRequired || field.value;
      })
    );
    const requiredDateFieldsFilled = Object.values(allDateData).every(pageData =>
      (pageData as any[]).every(field => !field.isRequired || field.value !== 'Invalid date')
    );

    let requiredSignatureFieldsFilled = false;
    if(allSignatureData.encodedImgData !== ""){
      requiredSignatureFieldsFilled = true;
    }

    // const requiredSignatureFieldsFilled = Object.values(allSignatureData)
    // const requiredCheckboxFieldsFilled = Object.values(allCheckboxData).every(pageData =>
    //   (pageData as any[]).every(field => !field.isRequired || field.value)
    // );

    console.log('requiredTextFieldsFilled' + requiredTextFieldsFilled);
    console.log('requiredDateFieldsFilled' + requiredDateFieldsFilled);
    

    // return requiredTextFieldsFilled && requiredDateFieldsFilled && requiredCheckboxFieldsFilled;
    return requiredSignatureFieldsFilled && requiredDateFieldsFilled && requiredTextFieldsFilled;
  };

  // console.log("width => ", width);
  // console.log("height => ", height);
  console.log("IN PERSON Signing Page....");
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
            className='btn custom-btn1 text-dark bg-secondary'
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
      <div className="signature-indicator-inperson">

      Start
    </div>
    ) : (
      <div className="next-hidden"></div>
    )}
  </div>
    <div style={{ position: "relative" }} className="pdf-viewer-container-inperson">
      <TransformWrapper
        maxScale={3}
        initialScale={1}
        disabled={deviceWidth <= 600}
        centerZoomedOut
        disablePadding
        wheel={{ disabled: true }}
        doubleClick={{ disabled: true }}
        // // pinch={{ disabled: true }}
        // // panning={{ disabled: true }}
      >
        <TransformComponent>
          <div>
            <canvas
              ref={canvasRef}
              width={width}
              height={height}
              // width={595}
              // height={840}
              style={{
                borderRadius: "5px",
                boxShadow: "0 2px 5px gray",
              }}
            />

            {/*  */}
            <SignatureContainer
              page={page}
              addDrawing={() => setDrawingModalOpen(true)}
              isFetchingCordinatesData={isFetchingCordinatesData}
            />
            <TextContainer
              page={page}
              isFetchingCordinatesData={isFetchingCordinatesData}
            />
            <DateContainer
              page={page}
              isFetchingCordinatesData={isFetchingCordinatesData}
            />
            <CheckboxContainer
              page={page}
              isFetchingCordinatesData={isFetchingCordinatesData}
            />
        {!isStartShown && (
                <div
                  ref={signatureIndicatorRef}
                  className="signature-indicator-next"
                  onClick={handleNextClick}
                >
                  <span>
                    <i className="fa-solid fa-circle-arrow-down"></i> Next
                  </span>
                </div>
              )}

          </div>
        </TransformComponent>

        <React.Fragment>
          {/* pagination start */}
          <PaginationContainer
            page={page}
            allPages={allPages}
            goToPage={goToPage}
          />

          {/* pagination end */}
        </React.Fragment>
      </TransformWrapper>
    </div>
    </>
  );
};
