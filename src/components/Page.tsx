import React, { useEffect, useRef, useState } from "react";
import { PaginationContainer } from "containers/PaginationContainer";

import { SignatureContainer } from "containers/SignatureContainer";
import { TextContainer } from "containers/TextContainer";
import { DateContainer } from "containers/DateContainer";
import { CheckboxContainer } from "containers/CheckboxContainer";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Dimensions } from "types";

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

  // console.log("width => ", width);
  // console.log("height => ", height);

  return (
    <>
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
                <div className="signature-indicator">

                  Start
                </div>
              ) : (
                <div className="next-hidden"></div>
              )}
            </div>
    <div style={{ position: "relative" }} className="pdf-viewer-container">
      <TransformWrapper
        maxScale={2.5}
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
                  onClick={(e) => handleStartAndScrollElement(e)}
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
