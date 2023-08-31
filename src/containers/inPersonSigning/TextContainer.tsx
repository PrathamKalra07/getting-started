import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//
import { TextPad } from "components/inPersonSigning/TextPad";
import {
  changeTextData,
  setTextData,
} from "redux/slices/inPersonSigning/textReducer";
import { fetchCoordsPageAndTypeWise } from "utils/InPersonSigning/fetchCoordPageWise";
import { updateCoordinateData } from "redux/slices/inPersonSigning/coordinatesReducer";

//
import { RootState } from "redux/store";

interface Props {
  page: any;
  isFetchingCordinatesData: any;
  // allCordinatesData: any;
}

export const TextContainer: React.FC<Props> = ({
  page,
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

  const allTextElementDataSelector = useSelector(
    (state: RootState) =>
      state.inPerson.inPersonTextList.allTextData[currentPageNo]
  );
  const reduxState = useSelector((state: RootState) => state);

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
    console.log("@@@ TEXT CONTAINER called....");
    const { coordsPagesWise } = fetchCoordsPageAndTypeWise(
      allCordinatesData,
      activeSignatory.value,
      "Text"
    );
    dispatch(setTextData({ allTextData: coordsPagesWise }));
    return () => {};
  }, [activeSignatory]);

  //
  const handleTextChange = (e: any, targetElementIndex: number) => {
    try {
      const value = e.target.value;

      dispatch(
        changeTextData({
          elementIndex: targetElementIndex,
          textValue: value,
          currentPageNo: currentPageNo,
          reduxState,
        })
      );
      dispatch(
        updateCoordinateData({
          signatoryUUID: activeSignatory.value,
          eleId: targetElementIndex,
          newValue: value,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {allTextElementDataSelector
        ? allTextElementDataSelector.map((item: any, i: number) => {
            return (
              <TextPad
                key={i}
                {...item}
                handleTextChange={handleTextChange}
                textElementIndex={item.eleId}
              />
            );
          })
        : null}
    </>
  );
};
