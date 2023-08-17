import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//
import { DatePad } from "../components/DatePad";
import { changeDateData, setDateData } from "../redux/slices/dateReducer";

interface Props {
  page: any;
  isFetchingCordinatesData: any;
}

export const DateContainer: React.FC<Props> = ({
  page,
  isFetchingCordinatesData,
}) => {
  const [currentPageNo, setCurrentPageNo] = useState(0);

  const reduxState = useSelector((state: any) => state);
  const allCordinatesData = useSelector(
    (state: any) => state.coordinatesList.allCoordinateData
  );

  const allDateElementDataSelector = useSelector(
    (state: any) => state.dateList.allDateData[currentPageNo]
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
    var dateDataPagesWise: any = {};

    if (allCordinatesData) {
      //
      allCordinatesData.map((item: any, i: number) => {
        if (item.fieldType == "Date") {
          if (!dateDataPagesWise[item.pageNo]) {
            dateDataPagesWise[item.pageNo] = [];
          }

          dateDataPagesWise[item.pageNo] = [
            ...dateDataPagesWise[item.pageNo],
            { ...item, id: item.eleId, index: i },
          ];
        }
      });

      dispatch(setDateData({ allDateData: dateDataPagesWise }));
    }
    return () => {};
  }, [isFetchingCordinatesData]);

  //
  const handleTextChange = (e: any, targetElementIndex: number) => {
    try {
      const value = e.target.value;

      const formatValue = value
        ? moment(value, "YYYY-MM-DD").format("MM-DD-YYYY")
        : "";

      dispatch(
        changeDateData({
          elementIndex: targetElementIndex,
          textValue: formatValue,
          currentPageNo: currentPageNo,
          reduxState,
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
                textElementIndex={item.index}
              />
            );
          })
        : null}
    </>
  );
};
