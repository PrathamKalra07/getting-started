import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//
import { SignaturePad } from "../../components/inPersonSigning/SignaturePad";
import { fetchCoordsPageAndTypeWise } from "../../utils/InPersonSigning/fetchCoordPageWise";
import { setSignatureData } from "../../redux/slices/inPersonSigning/signatureReducer";

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
    (state: any) => state.inPersonActiveSignatory.activeSignatory
  );
  const allCordinatesData = useSelector(
    (state: any) => state.inPersonCoordinatesList.allCoordinateData
  );

  const signatureEncodedImgData = useSelector(
    (state: any) => state.inPersonCoordinatesList.signatoryList.filter(signatory => signatory.signatoryUUID === activeSignatory.value)[0].value
  );

  const allCoordinatesElementDataSelector = useSelector(
    (state: any) => state.inPersonSignatureList.allSignatureData[currentPageNo]
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
    console.log('@@@ SIGNATURE CONTAINER called....');
    const {coordsPagesWise} = fetchCoordsPageAndTypeWise(allCordinatesData, activeSignatory.value, 'Signature');
    
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
