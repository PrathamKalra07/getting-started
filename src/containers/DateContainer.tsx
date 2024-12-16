import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

//
import { DatePad } from "components/Elements/DatePad";
import { changeDateData, setDateData } from "redux/slices/dateReducer";

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

  console.log("isFetchingCordinatesData",isFetchingCordinatesData);
  const reduxState = useSelector((state: RootState) => state);
  const allCordinatesData = useSelector(
    (state: RootState) => state.coordinatesList.allCoordinateData
  );

  const allDateElementDataSelector = useSelector(
    (state: RootState) => state.dateList.allDateData[currentPageNo]
  );
  console.log("dateList container:",allDateElementDataSelector);
  console.log("dateList container:",JSON.stringify(allDateElementDataSelector));

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
          console.log("date",item.value);
          if (!dateDataPagesWise[item.pageNo]) {
            dateDataPagesWise[item.pageNo] = [];
          }

          dateDataPagesWise[item.pageNo] = [
            ...dateDataPagesWise[item.pageNo],
            { ...item, id: item.eleId, index: i },
          ];
        }
      });
      console.log("dateDataPagesWise",dateDataPagesWise);
      console.log("dateDataPagesWise",JSON.stringify(dateDataPagesWise));
      dispatch(setDateData({ allDateData: dateDataPagesWise }));
    }
    return () => {};
  }, [isFetchingCordinatesData]);

  //
  const handleTextChange = (e: any, targetElementIndex: number) => {
    try {
      const value = e.target.value;
      console.log("value",value);
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
            const formattedValue = item.value
              ? moment(item.value, "YYYY-MM-DD").format("MM-DD-YYYY")
              : "";
  
            return (
              <DatePad
                key={i}
                {...item}
                value={formattedValue}  
                handleTextChange={handleTextChange}
                textElementIndex={item.index}
              />
            );
          })
        : null}
    </>
  );
};
  
