import React from "react";
import { Icon } from "semantic-ui-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

//
import { setActiveElement } from "../../redux/slices/elementsNavigationHelperReducer";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  value: any;
  textElementIndex: number;
  handleTextChange: Function;
  coordinateId: number;
}

export const CheckboxPad = ({
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
          // style={{ height: height, width: width }}
          onChange={(e) => handleTextChange(e, textElementIndex)}
          type="checkbox"
          onClick={() => {
            dispatch(setActiveElement({ coordinateId, y, x }));
          }}
          checked={textInputValue}
          className={`form-check-input
          ${
            elementsNavigationHelperState.activeElementCoordinateId ===
            coordinateId
              ? "active-data-container-input-checkbox"
              : textInputValue
              ? "filled-data-container-input-checkbox"
              : "empty-data-container-input-checkbox"
          }
        `}
        />
      </div>
    </>
  );
};
