import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//
import {
  changeCheckboxData,
  setCheckBoxData,
} from "redux/slices/inPersonSigning/checkboxReducer";
import { CheckboxPad } from "components/inPersonSigning/CheckboxPad";
import { fetchCoordsPageAndTypeWise } from "utils/InPersonSigning/fetchCoordPageWise";
import { updateCoordinateData } from "redux/slices/inPersonSigning/coordinatesReducer";

//
import { RootState } from "redux/store";

interface Props {
  page: any;
  isFetchingCordinatesData: any;
}

export const CheckboxContainer: React.FC<Props> = ({
  page,
  isFetchingCordinatesData,
}) => {
  const [currentPageNo, setCurrentPageNo] = useState(0);
  const activeSignatory = useSelector(
    (state: RootState) => state.inPerson.inPersonActiveSignatory.activeSignatory
  );
  const allCordinatesData = useSelector(
    (state: RootState) =>
      state.inPerson.inPersonCoordinatesList.allCoordinateData
  );

  const allCheckboxElementDataSelector = useSelector(
    (state: RootState) =>
      state.inPerson.inPersonCheckboxList.allCheckboxData[currentPageNo]
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
    console.log("@@@ CHECKBOX CONTAINER called....");
    const { coordsPagesWise } = fetchCoordsPageAndTypeWise(
      allCordinatesData,
      activeSignatory.value,
      "Checkbox"
    );

    dispatch(setCheckBoxData({ allCheckboxData: coordsPagesWise }));
    return () => {};
  }, [activeSignatory]);

  //
  const handleTextChange = (e: any, targetElementIndex: number) => {
    try {
      const value = e.target.checked;

      dispatch(
        changeCheckboxData({
          elementIndex: targetElementIndex,
          textValue: value,
          currentPageNo: currentPageNo,
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
      {allCheckboxElementDataSelector
        ? allCheckboxElementDataSelector.map((item: any, i: number) => {
            return (
              <CheckboxPad
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
