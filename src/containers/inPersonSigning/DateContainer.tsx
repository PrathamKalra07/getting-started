import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//
import { DatePad } from "components/inPersonSigning/DatePad";
import {
  changeDateData,
  setDateData,
} from "redux/slices/inPersonSigning/dateReducer";
import { fetchCoordsPageAndTypeWise } from "utils/InPersonSigning/fetchCoordPageWise";
import { updateCoordinateData } from "redux/slices/inPersonSigning/coordinatesReducer";

//
import { RootState } from "redux/store";

interface Props {
  page: any;
  isFetchingCordinatesData: any;
}

export const DateContainer: React.FC<Props> = ({
  page,
  isFetchingCordinatesData,
}) => {
  const [currentPageNo, setCurrentPageNo] = useState(0);

  const reduxState = useSelector((state: RootState) => state);
  const allCordinatesData = useSelector(
    (state: RootState) =>
      state.inPerson.inPersonCoordinatesList.allCoordinateData
  );
  const activeSignatory = useSelector(
    (state: RootState) => state.inPerson.inPersonActiveSignatory.activeSignatory
  );
  const allDateElementDataSelector = useSelector(
    (state: RootState) =>
      state.inPerson.inPersonDateList.allDateData[currentPageNo]
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
    console.log("@@@ DATE CONTAINER called....");
    const { coordsPagesWise } = fetchCoordsPageAndTypeWise(
      allCordinatesData,
      activeSignatory.value,
      "Date"
    );

    dispatch(setDateData({ allDateData: coordsPagesWise }));
    return () => {};
  }, [activeSignatory]);

  const handleTextChange = (e: any, targetElementIndex: number) => {
    try {
      const value = e.target.value;

      const formatValue = value
        ? moment(value, "YYYY-MM-DD").format("MM-DD-YYYY")
        : "";

      console.log(
        "@@@ DATE CONTAINER targetElementIndex...." + targetElementIndex
      );
      console.log("@@@ DATE CONTAINER formatValue...." + formatValue);

      dispatch(
        changeDateData({
          elementIndex: targetElementIndex,
          textValue: formatValue,
          currentPageNo: currentPageNo,
          reduxState,
        })
      );
      dispatch(
        updateCoordinateData({
          signatoryUUID: activeSignatory.value,
          eleId: targetElementIndex,
          newValue: formatValue,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {allDateElementDataSelector
        ? allDateElementDataSelector.map((item: any, i: number) => {
            return (
              <DatePad
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
