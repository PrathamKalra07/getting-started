import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//
import { SignaturePad } from "components/inPersonSigning/SignaturePad";
import { fetchCoordsPageAndTypeWise } from "utils/InPersonSigning/fetchCoordPageWise";
import { setSignatureData } from "redux/slices/inPersonSigning/signatureReducer";

//
import { RootState } from "redux/store";

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
  const activeSignatory = useSelector(
    (state: RootState) => state.inPerson.inPersonActiveSignatory.activeSignatory
  );
  const allCordinatesData = useSelector(
    (state: RootState) =>
      state.inPerson.inPersonCoordinatesList.allCoordinateData
  );

  const signatureEncodedImgData = useSelector(
    (state: RootState | any) =>
      state.inPerson.inPersonCoordinatesList.signatoryList.filter(
        (signatory: any) => signatory.signatoryUUID === activeSignatory.value
      )[0]?.value as any
  );

  const allCoordinatesElementDataSelector = useSelector(
    (state: RootState) =>
      state.inPerson.inPersonSignatureList.allSignatureData[currentPageNo]
  );


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
    console.log("@@@ SIGNATURE CONTAINER called....");
    const { coordsPagesWise } = fetchCoordsPageAndTypeWise(
      allCordinatesData,
      activeSignatory.value,
      "Signature"
    );

    dispatch(setSignatureData({ allSignatureData: coordsPagesWise }));
    return () => {};
  }, [activeSignatory]);

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
