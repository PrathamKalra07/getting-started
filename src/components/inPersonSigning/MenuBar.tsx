import React, { useEffect, useState, useRef } from "react";

import ProgressBar from "@ramonak/react-progress-bar";

import { useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//
import { RootState } from "redux/store";

interface Props {
  isPdfLoaded: boolean;
  savePdf: () => void;
  rejectSign: (commentText: string) => void;
  setIsAuditHistoryShown: any;
}

export const MenuBar: React.FC<Props> = ({
  isPdfLoaded,
  savePdf,
  setIsAuditHistoryShown,
}) => {
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [isFinishAlertShown, setIsFinishAlertShown] = useState(false);
  const [isAgreeCheckBoxChecked, setIsAgreeCheckBoxChecked] = useState(false);
  const [pdfLiveUrl, setPdfLiveUrl] = useState("");
  const [documentLiveUrl, setDocumentLiveUrl] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [brandLogo, setBrandLogo] = useState("");

  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);
  const activeSignatory = useSelector(
    (state: RootState) => state.inPerson.inPersonActiveSignatory.activeSignatory
  );
  const inPersonCoordinatesList = useSelector(
    (state: RootState) => state.inPerson.inPersonCoordinatesList
  );
  // const trackerData = useSelector((state: any) => state.inPersonCoordinatesList.signatoryList.find(signatory => signatory.signatoryUUID === activeSignatory.value));
  const basicInfoData = useSelector(
    (state: RootState) => state.inPerson.inPersonBasicInfoData
  );
  console.log("inPerson:", basicInfoData);


  const inPerson = useSelector((state: RootState) => state.inPerson);
  console.log("inPerson:", inPerson);

  let totalNoOfFields = 0;
  let completedNoOfFields = 0;
  if (inPersonCoordinatesList.signatoryList.length > 0) {
    const trackerData: any = inPersonCoordinatesList.signatoryList.find(
      (signatory: any) => signatory.signatoryUUID === activeSignatory.value
    );
    totalNoOfFields = trackerData.totalNoOfFields;
    completedNoOfFields = trackerData.completedNoOfFields;
  }
  // console.log(inPersonCoordinatesList);
  useEffect(() => {
    if (basicInfoData) {
      console.log("basicInfo", basicInfoData);
      const { uuid, uuidTemplateInstance, salesforceOrgId } = basicInfoData;
  
      // Set the URLs
      const newPdfLiveUrl = `${process.env.REACT_APP_API_URL}/fetchpdf?uuid=${uuid}`;
      const newDocumentLiveUrl = `${process.env.REACT_APP_API_URL}/fetchPdfWithCoordinates?uuid=${uuid}&uuid_template_instance=${uuidTemplateInstance}`;
      
      setPdfLiveUrl(newPdfLiveUrl);
      setDocumentLiveUrl(newDocumentLiveUrl);
      setBrandLogo(`${process.env.REACT_APP_API_URL}/api/admin/branding/fetchBrandLogo?orgId=${salesforceOrgId}`);
      
      // Log the new URLs
      console.log("PdfLiveUrl", newPdfLiveUrl);
      console.log("DocumentLiveUrl", newDocumentLiveUrl);
    }
  }, [basicInfoData]); 

  const closeCurrentModal = () => {
    setIsFinishAlertShown(false);
  };

  const handleViewPdf = async () => {
    try {
      setIsPdfViewerOpen(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePrintPdf = async () => {
    try {
      window.open(pdfLiveUrl, "_blank", "");
    } catch (err) {
      console.log(err);
    }
  };
  const handleDownloadPdf = () => {
    try {
      const a = document.createElement("a");
      a.href = `${pdfLiveUrl}&isDownload=true`;
      a.download = "document.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.log(err);
    }
  };


  const handleViewDocument = async () => {
    try {
      setIsPdfViewerOpen(true); // Reuse the PDF viewer state to show the document
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleDownloadDocument = () => {
    try {
      const a = document.createElement("a");
      a.href = `${documentLiveUrl}&isDownload=true`; // Use the document URL
      a.download = "document.pdf"; // Specify the file name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.log(err);
    }
  };
  
  

  return (
    <>
      <div className="menubar-container p-2 px-3 ">
        <div
          className="d-flex menubar-inner-container"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          
          <img
              src= {brandLogo}
              className="logo"
              alt="logo img"
            />

          <div className="custom-progressbar-container">

            <ProgressBar
              completed={completedNoOfFields}
              maxCompleted={totalNoOfFields}
              isLabelVisible={false}
              height="5px"
              bgColor="#ece5c7"
              baseBgColor="#878479"
            />
            <div
              className="text-center mb-1"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {completedNoOfFields} of {totalNoOfFields} required fields
              completed
            </div>

            {/*  */}
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center header-main-container gap-sm-2 ">
          {isPdfLoaded && (
            <>
              <button
                className="submit-btn btn"
                onClick={() => setIsFinishAlertShown(true)}
              >
                Finish
              </button>

              <Dropdown
                isOpen={dropdownOpen}
                toggle={toggleDropDown}
                direction={"down"}
              >
                <DropdownToggle
                  caret
                  style={{ backgroundColor: "#cdc2ae" }}
                  color="black"
                  className="fw-bold"
                >
                  Options
                </DropdownToggle>
                <DropdownMenu style={{ minWidth: 150 }}>
                  <DropdownItem
                    onClick={() => {
                      handlePrintPdf();
                    }}
                  >
                    Print
                  </DropdownItem>
                  <DropdownItem onClick={() => handleDownloadPdf()}>
                    Download
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      handleViewPdf();
                    }}
                  >
                    View PDF
                  </DropdownItem>

                  <DropdownItem onClick={handleViewDocument}>View Document</DropdownItem> 
                  <DropdownItem onClick={handleDownloadDocument}>Download Document</DropdownItem> 

                  <DropdownItem
                    onClick={() => {
                      window.open("https://www.eruditeworks.com/", "_blank");
                    }}
                  >
                    Help & Support
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
                                {/* <DropdownItem
                    onClick={() => {
                      setIsAuditHistoryShown(true);
                    }}
                  >
                    View History
                  </DropdownItem> */}
              

            </>
          )}
        </div>
      </div>

      {/*  */}
      <PdfViewer
        isPdfViewerOpen={isPdfViewerOpen}
        setIsPdfViewerOpen={setIsPdfViewerOpen}
        pdfLiveUrl={pdfLiveUrl}
        handleDownloadPdf={handleDownloadPdf}
      />
      <DocumentViewer
  isViewerOpen={isPdfViewerOpen} 
  setIsViewerOpen={setIsPdfViewerOpen}
  documentLiveUrl={documentLiveUrl} 
  handleDownloadDocument={handleDownloadDocument}
/>
          
      {/*  */}

      {/* check to agree modal */}
      <Modal
        isOpen={isFinishAlertShown}
        onClosed={closeCurrentModal}
        centered
        className="modal-container"
        toggle={closeCurrentModal}
        fade={false}
        size={"lg"}
      >
        <ModalHeader>Do You Agree ?</ModalHeader>
        <ModalBody>
          <div>
            <div className="form-group mb-0">
              <div className="d-flex gap-2">
                <input
                  type="checkbox"
                  className="inline d-flex align-self-start mt-1"
                  id="terms"
                  defaultValue="false"
                  onChange={(e) => {
                    setIsAgreeCheckBoxChecked(e.target.checked);
                  }}
                />
                <label
                  className="x-small font-weight-normal mx-2"
                  htmlFor="terms"
                >
                  By clicking this checkbox and the Sign Document button, I
                  agree that this mark will be the electronic representation of
                  my signature for the electronic document. I also understand
                  that recipients of electronic documents I sign will be able to
                  see my signing details, including but not restricted to my
                  Email ID/Phone Number and IP address.
                </label>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn " onClick={closeCurrentModal}>
            Cancel
          </button>
          <span className="px-2"> </span>
          <button
            onClick={() => {
              savePdf();
              closeCurrentModal();
            }}
            className={`btn custom-btn1 ${
              !isAgreeCheckBoxChecked ? "text-dark bg-secondary" : null
            }`}
            disabled={!isAgreeCheckBoxChecked}
          >
            Done
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};


const DocumentViewer = ({
  isViewerOpen,
  setIsViewerOpen,
  documentLiveUrl,
  handleDownloadDocument,
}: {
  isViewerOpen: boolean;
  setIsViewerOpen: (open: boolean) => void;
  documentLiveUrl: string;
  handleDownloadDocument: () => void;
}) => {
  return (
    <Modal
      isOpen={isViewerOpen}
      onClosed={() => setIsViewerOpen(false)}
      centered
      className="modal-container"
      toggle={() => setIsViewerOpen(false)}
      fade={false}
      fullscreen
    >
      <ModalBody>
        {/* <div className="document-viewer-header">
          <button onClick={handleDownloadDocument}>Download Document</button>
        </div> */}
        <iframe
          src={documentLiveUrl}
          style={{ width: "100%", height: "100%" }}
          title="Document Viewer"
        />
      </ModalBody>
      <ModalFooter>
        <button className="btn custom-btn1" onClick={() => setIsViewerOpen(false)}>
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};


const PdfViewer = ({
  isPdfViewerOpen,
  setIsPdfViewerOpen,
  pdfLiveUrl,
  handleDownloadPdf,
}: {
  isPdfViewerOpen: any;
  setIsPdfViewerOpen: any;
  pdfLiveUrl: any;
  handleDownloadPdf: any;
}) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(0);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const zoomContainerRef = useRef<any>(null);

  const zoomControl = (operation: string) => {
    switch (operation) {
      case "in":
        zoomContainerRef.current.zoomIn(0.1);
        break;
      case "out":
        zoomContainerRef.current.zoomOut();
        break;

      default:
        break;
    }
  };

  return (
    <Modal
      isOpen={isPdfViewerOpen}
      onClosed={() => setIsPdfViewerOpen(false)}
      centered
      className="modal-container"
      toggle={() => setIsPdfViewerOpen(false)}
      fade={false}
      fullscreen
    >
      <ModalBody className="">
        <div
          className="pdfviewer-header d-flex justify-content-center gap-3 py-2 text-light mb-2"
          style={{
            fontSize: "1rem",
            backgroundColor: "#354259",
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          {deviceWidth >= 600 && (
            <>
              <span>
                <i
                  className="fa-solid fa-magnifying-glass-plus cursor-pointer"
                  onClick={() => zoomControl("in")}
                ></i>
              </span>
              <span>
                <i
                  className="fa-solid fa-magnifying-glass-minus cursor-pointer"
                  onClick={() => zoomControl("out")}
                ></i>
              </span>
            </>
          )}
          <span>
            <i
              className="fa-solid fa-download cursor-pointer"
              onClick={() => handleDownloadPdf()}
            ></i>
          </span>
          <span>
            <i className="fa-solid fa-print"></i>
          </span>
        </div>
        <div className="d-flex justify-content-center print-pdf-main-container">
          <TransformWrapper
            maxScale={3}
            initialScale={1}
            disablePadding
            wheel={{ disabled: true }}
            disabled={deviceWidth <= 600}
            ref={zoomContainerRef}
          >
            <TransformComponent>
              <Document
                file={pdfLiveUrl}
                onLoadSuccess={({ numPages }) => {
                  setNumPages(numPages);
                }}
                renderMode="canvas"
              >
                {[...Array(numPages)].map((_, index) => {
                  return (
                    <div key={index} className="m-0 p-0 mb-5 my-3">
                      <Page
                        pageNumber={index + 1}
                        className="border animated-pdf-page"
                      />
                      <div style={{ textAlign: "right" }} className="fw-bold">
                        {index + 1} of {numPages}
                      </div>
                    </div>
                  );
                })}
              </Document>
            </TransformComponent>
          </TransformWrapper>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn custom-btn1"
          onClick={() => setIsPdfViewerOpen(false)}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};
