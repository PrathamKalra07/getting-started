import React from "react";
import { Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveElement } from "redux/slices/elementsNavigationHelperReducer";
import { RootState } from "redux/store";

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

export const TextPad = ({
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
    (state: RootState) => state.elementsNavigationHelper
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
        // onClick={addDrawing}
      >
        {/* signatureData */}

        <input
          maxLength={width / 7}
          placeholder="Click To Enter Text Here..."
          style={{ height: height, width: width }}
          onClick={(e: any) => {
            dispatch(setActiveElement({ coordinateId, y, x }));

            e.target.focus();
          }}
          onChange={(e) => {
            handleTextChange(e, textElementIndex);
          }}
          value={textInputValue}
          className={`
            ${
              elementsNavigationHelperState.activeElementCoordinateId ===
              coordinateId
                ? "active-data-container-input-text"
                : textInputValue
                ? "filled-data-container-input-text"
                : "empty-data-container-input-text"
            }
          `}
        />
      </div>
    </>
  );
};
