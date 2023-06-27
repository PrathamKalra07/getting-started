import React, { useEffect, useRef, useState } from "react";
import { PaginationContainer } from "../containers/PaginationContainer";

import { SignatureContainer } from "../containers/SignatureContainer";
import { TextContainer } from "../containers/TextContainer";
import { DateContainer } from "../containers/DateContainer";
import { CheckboxContainer } from "../containers/CheckboxContainer";

interface Props {
  page: any;
  dimensions?: Dimensions;
  updateDimensions: ({ width, height }: Dimensions) => void;
  allPages: any;
  goToPage: (pageNo: number) => void;
  isFetchingCordinatesData: any;
  setDrawingModalOpen: any;
}

export const Page = ({
  page,
  dimensions,
  updateDimensions,
  allPages,
  goToPage,
  isFetchingCordinatesData,
  setDrawingModalOpen,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState((dimensions && dimensions.width) || 0);
  const [height, setHeight] = useState((dimensions && dimensions.height) || 0);

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
    <div style={{ position: "relative" }} className="pdf-viewer-container">
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
      {/*  */}

      {/* pagination start */}

      <PaginationContainer
        page={page}
        allPages={allPages}
        goToPage={goToPage}
      />

      {/* pagination end */}

      {/*  */}

      {/*  */}
    </div>
  );
};
