import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//
import {
  changeCheckboxData,
  setCheckBoxData,
} from "../redux/slices/checkboxReducer";
import { CheckboxPad } from "../components/CheckboxPad";

interface Props {
  page: any;
  isFetchingCordinatesData: any;
}

export const CheckboxContainer: React.FC<Props> = ({
  page,
  isFetchingCordinatesData,
}) => {
  const [currentPageNo, setCurrentPageNo] = useState(0);

  const allCordinatesData = useSelector(
    (state: any) => state.coordinatesList.allCoordinateData
  );

  const allCheckboxElementDataSelector = useSelector(
    (state: any) => state.checkboxList.allCheckboxData[currentPageNo]
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
    var checkboxDataPagesWise: any = {};

    if (allCordinatesData) {
      //
      allCordinatesData.map((item: any, i: number) => {
        if (item.fieldType === "Checkbox") {
          if (!checkboxDataPagesWise[item.pageNo]) {
            checkboxDataPagesWise[item.pageNo] = [];
          }

          checkboxDataPagesWise[item.pageNo] = [
            ...checkboxDataPagesWise[item.pageNo],
            { ...item, id: item.eleId, index: i },
          ];
        }
      });

      dispatch(setCheckBoxData({ allCheckboxData: checkboxDataPagesWise }));
    }
    return () => {};
  }, [isFetchingCordinatesData]);

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
                textElementIndex={item.index}
              />
            );
          })
        : null}
    </>
  );
};
