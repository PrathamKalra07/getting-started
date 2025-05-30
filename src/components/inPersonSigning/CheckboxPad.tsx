import React from "react";
import { Icon } from "semantic-ui-react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

//
import { setActiveElement } from "redux/slices/elementsNavigationHelperReducer";
import { RootState } from "redux/store";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  value: any;
  textElementIndex: number;
  editable:boolean;
  isRequired:boolean;
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
  editable,
  isRequired,
  handleTextChange,
  coordinateId,
}: Props) => {
  const dispatch = useDispatch();

  const elementsNavigationHelperState = useSelector(
    (state: RootState) => state.elementsNavigationHelper
  );

  return (
    <>
      {/* <div
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
      </div> */}
      <div
              className="checkboxfields"
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
              <span style={{ position: "relative" }}>
                {!editable && 
                <span className="checkbox-readOnly" style={{position:"absolute",fontSize:'smaller',top:'10px',backgroundColor:'gray',color:'white',borderRadius:"5px",padding:'1px',width:'max-content'}}>Cannot Edit</span>
                }
                <input
      
                  style={editable?{}:{pointerEvents:'none'}}
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
      
                {isRequired && (
                  <span
                    style={{
                      position: "absolute",
                      fontWeight: "bold",
                      color: "#BB2525",
                      fontSize: "1.2rem",
                      top: "-10px",
                      right: "-10px",
                    }}
                  >
                    *
                  </span>
                )}
              </span>
            </div>
    </>
  );
};
