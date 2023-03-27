import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//
import { SignaturePad } from "../components/SignaturePad";

//

import { setSignatureData } from "../redux/slices/signatureReducer";

interface Props {
  page: any;
  addDrawing: any;
  // signatureData: any;
  isFetchingCordinatesData: any;
  // allCordinatesData: any;
}

export const SignatureContainer: React.FC<Props> = ({
  page,
  addDrawing,
  // signatureData,
  isFetchingCordinatesData,
  // allCordinatesData,
}) => {
  const [currentPageNo, setCurrentPageNo] = useState(0);

  const allCordinatesData = useSelector(
    (state: any) => state.coordinatesList.allCoordinateData
  );

  const signatureEncodedImgData = useSelector(
    (state: any) => state.signatureList.encodedImgData
  );

  const allCoordinatesElementDataSelector = useSelector(
    (state: any) => state.signatureList.allSignatureData[currentPageNo]
  );

  //
  const dispatch = useDispatch();

  useEffect(() => {
    page
      .then((data: any) => {
        const { pageIndex } = data;
        setCurrentPageNo(pageIndex);
      })
      .catch((err: any) => {
        console.log(err);
      });
    return () => {};
  }, [page]);

  useEffect(() => {
    var signatureDataPagesWise: any = {};

    if (allCordinatesData) {
      //
      allCordinatesData.map((item: any, i: number) => {
        if (item.fieldType == "Signature") {
          if (!signatureDataPagesWise[item.pageNo]) {
            signatureDataPagesWise[item.pageNo] = [];
          }

          signatureDataPagesWise[item.pageNo] = [
            ...signatureDataPagesWise[item.pageNo],
            { ...item, id: item.eleId, value: "", index: i },
          ];
        }
      });

      dispatch(setSignatureData({ allSignatureData: signatureDataPagesWise }));
    }
    return () => {};
  }, [isFetchingCordinatesData]);

  return (
    <>
      {allCoordinatesElementDataSelector
        ? allCoordinatesElementDataSelector.map((item: any, i: number) => {
            return (
              <SignaturePad
                key={i}
                {...item}
                addDrawing={addDrawing}
                signatureEncodedImgData={signatureEncodedImgData}
              />
            );
          })
        : null}
    </>
  );
};
