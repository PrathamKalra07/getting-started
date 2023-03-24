import React, { useState, useLayoutEffect, useEffect } from "react";
import Axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { useSearchParams } from "react-router-dom";
import "./App.css";

import { Container, Grid, Button, Segment } from "semantic-ui-react";
import { MenuBar } from "./components/MenuBar";
import { DrawingModal } from "./modals/components/DrawingModal";
import { usePdf, Pdf } from "./hooks/usePdf";
import { AttachmentTypes } from "./entities";
import { ggID } from "./utils/helpers";
import { useAttachments } from "./hooks/useAttachments";
import { useUploader, UploadTypes } from "./hooks/useUploader";
import { Empty } from "./components/Empty";
import { Page } from "./components/Page";
import { Attachments } from "./components/Attachments";
import { SignatureContainer } from "./containers/SignatureContainer";

const App: React.FC = () => {
  const [drawingModalOpen, setDrawingModalOpen] = useState(false);
  const [isFetchingCordinatesData, setIsFetchingCordinatesData] =
    useState(true);

  const [allCordinatesData, setAllCordinatesData] = useState([]);
  const {
    file,
    initialize,
    pageIndex,
    isMultiPage,
    isFirstPage,
    isLastPage,
    currentPage,
    isSaving,
    savePdf,
    previousPage,
    nextPage,
    setDimensions,
    name,
    dimensions,
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
    if (!drawing) return;

    setSignatureData(drawing);

    const newDrawingAttachment: DrawingAttachment = {
      id: ggID(),
      type: AttachmentTypes.SIGNATURE,
      ...drawing,
      x: 0,
      y: 0,
      scale: 1,
    };
    addAttachment(newDrawingAttachment);
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

  const handleSavePdf = () => savePdf(allPageAttachments);

  //
  const [searchParams] = useSearchParams();

  const fetchingCordinates = async (uuidTI: string, uuidS: string) => {
    try {
      // {{baseUrl}}/api/fetchCordinatesData

      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        uuid_template_instance: uuidTI,
        uuid_signatory: uuidS,
      });

      let reqOptions = {
        url: `${process.env.REACT_APP_API_URL}/api/fetchCordinatesData`,
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await Axios.request(reqOptions);
      setAllCordinatesData(response.data.data);

      setIsFetchingCordinatesData(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchParamsAndFetchPdf = async () => {
      const uuid = searchParams.get("uuid");
      const uuidTemplateInstance = searchParams.get("uuid_template_instance");
      const uuidSignatory = searchParams.get("uuid_signatory");

      localStorage.setItem("uuid", uuid as string);
      await uploadPdf(uuid);

      await fetchingCordinates(
        uuidTemplateInstance as string,
        uuidSignatory as string
      );
    };
    fetchParamsAndFetchPdf();

    return () => {};
  }, []);

  return (
    <Container style={{ margin: 30 }}>
      {hiddenInputs}
      <MenuBar
        savePdf={handleSavePdf}
        addText={addText}
        addImage={handleImageClick}
        addDrawing={() => setDrawingModalOpen(true)}
        savingPdfStatus={isSaving}
        uploadNewPdf={handlePdfClick}
        isPdfLoaded={!!file}
      />

      {/* thank you */}

      <div id="thankyou-container"></div>

      {/*  */}

      <div className="pdf-viewer-div">
        {!file ? (
          <Empty loading={isUploading && isFetchingCordinatesData} />
        ) : (
          <Grid>
            <Grid.Row>
              <Grid.Column width={3} verticalAlign="middle" textAlign="left">
                {isMultiPage && !isFirstPage && (
                  <Button
                    circular
                    icon="angle left"
                    onClick={previousPage}
                    size={"huge"}
                  />
                )}
              </Grid.Column>
              <Grid.Column width={10}>
                {/* <div
                  className="signature-indicator"
                  onClick={(e) => {
                    e.currentTarget.style.top = "600px";

                    window.scroll({
                      top: 400,
                      behavior: "smooth",
                    });
                  }}
                >
                  Start
                </div> */}

                {currentPage && (
                  <Segment
                    data-testid="page"
                    compact
                    stacked={isMultiPage && !isLastPage}
                  >
                    <div style={{ position: "relative" }}>
                      <Page
                        dimensions={dimensions}
                        updateDimensions={setDimensions}
                        page={currentPage}
                      />
                      {/* {dimensions && (
                      <Attachments
                        pdfName={name}
                        removeAttachment={remove}
                        updateAttachment={update}
                        pageDimensions={dimensions}
                        attachments={pageAttachments}
                      />
                    )} */}
                      <SignatureContainer
                        page={currentPage}
                        addDrawing={() => setDrawingModalOpen(true)}
                        isFetchingCordinatesData={isFetchingCordinatesData}
                        signatureData={signatureData}
                        allCordinatesData={allCordinatesData}
                      />
                    </div>
                  </Segment>
                )}
              </Grid.Column>
              <Grid.Column width={3} verticalAlign="middle" textAlign="right">
                {isMultiPage && !isLastPage && (
                  <Button
                    circular
                    icon="angle right"
                    onClick={nextPage}
                    size={"huge"}
                  />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
      <DrawingModal
        open={drawingModalOpen}
        dismiss={() => setDrawingModalOpen(false)}
        confirm={addDrawing}
      />
    </Container>
  );
};

export default App;
