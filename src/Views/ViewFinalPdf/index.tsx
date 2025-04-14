import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useSearchParams } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch } from "react-redux";
//
import { AuditTrailModal } from "modals/components/AuditTrailModal";
import { setInfo } from "redux/slices/basicInfoReducer";

const ViewFinalPdf = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  //
  const [numPages, setNumPages] = useState(0);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [pdfLiveUrl, setPdfLiveUrl] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuditHistoryShown, setIsAuditHistoryShown] = useState(false);

  //
  const zoomContainerRef = useRef<any>(null);
  //
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const uuid = searchParams.get("uuid");
    const uuidTemplateInstance = searchParams.get("uuid_template_instance");
    const uuidSignatory = searchParams.get("uuid_signatory");

    setPdfLiveUrl(
      `${process.env.REACT_APP_API_URL}/fetchPdfWithCoordinates?uuid=${uuid}&uuid_template_instance=${uuidTemplateInstance}`
    );
    console.log("pdf:",pdfLiveUrl);
    dispatch(setInfo({ uuid, uuidTemplateInstance, uuidSignatory }));

    return () => {};
  }, []);

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

  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);

  const handlePrintPdf = async () => {
    try {
      window.open(pdfLiveUrl, "_blank", "");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="pdfviewer-header d-flex justify-content-between gap-3 py-2 text-light mb-2 p-2 align-items-center"
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
        <h4 className="text-light fw-bold">
          Ew<span className="mx-1">Sign</span>
        </h4>

        <div className="d-flex gap-3">
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
            <i
              className="fa-solid fa-print cursor-pointer"
              onClick={() => handlePrintPdf()}
            ></i>
          </span>
        </div>
        <div>
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
                  setIsAuditHistoryShown(true);
                }}
              >
                View History
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
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
                      Page {index + 1} of {numPages}
                    </div>
                  </div>
                );
              })}
            </Document>
          </TransformComponent>
        </TransformWrapper>
      </div>

      {isAuditHistoryShown && (
        <AuditTrailModal setIsAuditHistoryShown={setIsAuditHistoryShown} />
      )}
    </>
  );
};

export default ViewFinalPdf;
