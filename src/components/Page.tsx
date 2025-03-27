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
  const [pdfLiveUrl, setPdfLiveUrl] = useState("");

  const allTextData = useSelector(
    (state: RootState) => state.textList.allTextData
  );
  const allDateData = useSelector(
    (state: RootState) => state.dateList.allDateData
  );
  const allCheckboxData = useSelector(
    (state: RootState) => state.checkboxList.allCheckboxData
  );
  const basicInfoData = useSelector((state: RootState) => state.basicInfoData);
  const scrollContainer = React.useRef(null);

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

    // const disableBodyScroll = () => {
    //   document.body.style.position = "fixed";
    //   document.body.style.width = "98%";
    // };

    // disableBodyScroll();

    if (basicInfoData) {
      const { uuid, uuidTemplateInstance } = basicInfoData;
      const newPdfLiveUrl = `${process.env.REACT_APP_API_URL}/fetchpdf?uuid=${uuid}&uuid_template_instance=${uuidTemplateInstance}`;
      const newDocumentLiveUrl = `${process.env.REACT_APP_API_URL}/fetchPdfWithCoordinates?uuid=${uuid}&uuid_template_instance=${uuidTemplateInstance}`;

      setPdfLiveUrl(newDocumentLiveUrl);
    }
    renderPage(page);
  }, [page, updateDimensions]);

  const handleNextClick = () => {
    const allRequiredFieldsFilled = checkAllRequiredFieldsFilled();
    if (allRequiredFieldsFilled) {
      console.log("logggggg" + showPopup);

      setShowPopup(true);
    } else {
      handleStartAndScrollElement();
    }
  };

  const checkAllRequiredFieldsFilled = () => {
    const requiredTextFieldsFilled = Object.values(allTextData).every(
      (pageData) =>
        (pageData as any[]).every((field) => !field.isRequired || field.value)
    );
    const requiredDateFieldsFilled = Object.values(allDateData).every(
      (pageData) =>
        (pageData as any[]).every(
          (field) => !field.isRequired || field.value !== "Invalid date"
        )
    );
    // const requiredCheckboxFieldsFilled = Object.values(allCheckboxData).every(pageData =>
    //   (pageData as any[]).every(field => !field.isRequired || field.value)
    // );

    console.log("requiredTextFieldsFilled" + requiredTextFieldsFilled);
    console.log("requiredDateFieldsFilled" + requiredDateFieldsFilled);

    // return requiredTextFieldsFilled && requiredDateFieldsFilled && requiredCheckboxFieldsFilled;
    return requiredTextFieldsFilled && requiredDateFieldsFilled;
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
      {/* <TransformComponent > */}

      <SignatureContainer
        page={page}
        addDrawing={() => setDrawingModalOpen(true)}
        isFetchingCordinatesData={isFetchingCordinatesData}
      />

      <CommonPDFViewer pdfUrl={pdfLiveUrl} />

      {/* </TransformComponent>    */}
    </>
  );
};
