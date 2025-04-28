import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setPicklistData,
  changePicklistData,
} from "redux/slices/inPersonSigning/picklistReducer";
//
import { RootState } from "redux/store";
import { PicklistPad } from "components/inPersonSigning/PicklistPad";
import { fetchCoordsPageAndTypeWise } from "utils/InPersonSigning/fetchCoordPageWise";
import { updateCoordinateData } from "redux/slices/inPersonSigning/coordinatesReducer";


interface Props {
  page: any;
  isFetchingCordinatesData: any;
  // allCordinatesData: any;
}

export const PicklistContainer: React.FC<Props> = ({
  page,
  isFetchingCordinatesData,
  // allCordinatesData,
}) => {
  const [currentPageNo, setCurrentPageNo] = useState(0);

  
  const activeSignatory = useSelector(
    (state: RootState) => state.inPerson.inPersonActiveSignatory.activeSignatory
  );
  // const recordData = useSelector(
  //   (state: RootState) => state.inPerson.inPersonCoordinatesList.allCoordinateData
  // );
const allCordinatesData = useSelector(
    (state: RootState) =>
      state.inPerson.inPersonCoordinatesList.activeSignatoriesCoordinateData
  );
  const allPicklistElementDataSelector = useSelector(
    (state: RootState) => state.inPerson.inPersonPicklistList.allPicklistData[currentPageNo]
  );
    // const allEmailElementDataSelector = useSelector(
    //   (state: RootState) =>
    //     state.inPerson.inPersonEmailList.allEmailData[currentPageNo]
    // );
  const reduxState = useSelector((state: RootState) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    page
      .then((data: any) => {
        const { pageIndex } = data;
        setCurrentPageNo(pageIndex);
      })
      .catch((err: any) => {
        console.log("catch err at 'PicklistContainer': ", err);
      });
    return () => {};
  }, [page]);

  useEffect(() => {
      const { coordsPagesWise } = fetchCoordsPageAndTypeWise(
        allCordinatesData,
        activeSignatory.value,
        "PickList"
      );
      console.log("picklist coords page wise : ",coordsPagesWise);
      dispatch(setPicklistData({ allPicklistData : coordsPagesWise }));
      return () => {};
    }, [activeSignatory]);
  // useEffect(() => {
  //   var picklistDataPagesWise: any = {};

  //   if (allCordinatesData) {
  //     //
  //     allCordinatesData.map((item: any, i: number) => {
  //       if (item.fieldType === "PickList") {
  //         if (!picklistDataPagesWise[item.pageNo]) {
  //           picklistDataPagesWise[item.pageNo] = [];
  //         }

  //         picklistDataPagesWise[item.pageNo] = [
  //           ...picklistDataPagesWise[item.pageNo],
  //           { ...item, id: item.eleId, index: i },
  //         ];
  //       }
  //     });
  //     dispatch(setPicklistData({ allPicklistData: picklistDataPagesWise }));
  //   }
  //   return () => {};
  // }, [isFetchingCordinatesData]);

  //
  const handlePicklistValueChange = (
    // value: any,
    targetElementIndex: number,
    selectedValue: String
  ) => {
    try {
      if (selectedValue) {
        console.log("TargetElementIndexPicklist : ",targetElementIndex)
        dispatch(
          changePicklistData({
            elementIndex: targetElementIndex,
            selectedValue: selectedValue, //value,
            currentPageNo: currentPageNo,
            reduxState,
          })
        );
        console.log("TargetElementIndexPicklist : ",targetElementIndex)
        dispatch(
            updateCoordinateData({
              signatoryUUID: activeSignatory.value,
              eleId: targetElementIndex,
              newValue: selectedValue,
        })
      );
      } else {
        console.log("Invalid selectedValue ", selectedValue);
      }
    } catch (err) {
      console.log(" catch err at 'handlePicklistValueChange': ", err);
    }
  };

  return (
    <>
      {allPicklistElementDataSelector
        ? allPicklistElementDataSelector.map((item: any, i: number) => {
            return (
              <PicklistPad
                key={i}
                {...item}
                pickListArray={item.options?.split(',') || []}
                value={item.value}
                handlePicklistValueChange={handlePicklistValueChange}
                picklistElementIndex={item.id}
              />
            );
          })
        : null}
    </>
  );
};
