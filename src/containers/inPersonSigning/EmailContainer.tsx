import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//
import { EmailPad } from "components/inPersonSigning/EmailPad";
import {
  changeEmailData,
  setEmailData,
} from "redux/slices/inPersonSigning/emailReducer";
import { fetchCoordsPageAndTypeWise } from "utils/InPersonSigning/fetchCoordPageWise";
import { updateCoordinateData } from "redux/slices/inPersonSigning/coordinatesReducer";

//
import { RootState } from "redux/store";

interface Props {
  page: any;
  isFetchingCordinatesData: any;
  // allCordinatesData: any;
}

export const EmailContainer: React.FC<Props> = ({
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

  const allEmailElementDataSelector = useSelector(
    (state: RootState) =>
      state.inPerson.inPersonEmailList.allEmailData[currentPageNo]
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
    const { coordsPagesWise } = fetchCoordsPageAndTypeWise(
      allCordinatesData,
      activeSignatory.value,
      "Email"
    );
    dispatch(setEmailData({ allEmailData: coordsPagesWise }));
    return () => {};
  }, [activeSignatory]);

  //
  const handleTextChange = (e: any, targetElementIndex: number) => {
    try {
      const value = e.target.value;

      dispatch(
        changeEmailData({
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
      console.error("Error in handleTextChange:", err);
    }
  };

  return (
    <>
      {allEmailElementDataSelector
        ? allEmailElementDataSelector.map((item: any, i: number) => {
            return (
              <EmailPad
                key={i}
                {...item}
                handleTextChange={handleTextChange}
                textElementIndex={item.id}
              />
            );
          })
        : null}
    </>
  );
};
