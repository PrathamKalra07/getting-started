import React from "react";
import { Icon } from "semantic-ui-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

//
import { setActiveElement } from "../redux/slices/elementsNavigationHelperReducer";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  value: string;
  textElementIndex: number;
  handleTextChange: Function;
  coordinateId: number;
}

export const DatePad = ({
  x,
  y,
  width,
  height,
  value: textInputValue,
  textElementIndex,
  handleTextChange,
  coordinateId,
}: Props) => {
  const dispatch = useDispatch();

  const elementsNavigationHelperState = useSelector(
    (state: any) => state.elementsNavigationHelper
  );

  return (
    <>
      <div
        style={{
          // backgroundColor: "#ffe185",
          position: "absolute",
          height: height,
          width: width,
          top: y,
          left: x,
          right: 0,
          bottom: 0,
          borderRadius: 5,
        }}
      >
        <input
          placeholder="Enter Data Here..."
          style={{ height: height, width: width }}
          onChange={(e) => handleTextChange(e, textElementIndex)}
          value={moment(textInputValue, "MM-DD-YYYY").format("YYYY-MM-DD")}
          type="date"
          // className="form-control"
          className={`${
            elementsNavigationHelperState.activeElementCoordinateId ===
            coordinateId
              ? "active-data-container-input-date"
              : textInputValue
              ? "filled-data-container-input-date"
              : "empty-data-container-input-date"
          }`}
          onClick={(e: any) => {
            e.currentTarget.showPicker();
            dispatch(setActiveElement({ coordinateId, y }));
          }}
        />
      </div>
    </>
  );
};
