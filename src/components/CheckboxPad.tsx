import React from "react";
import { Icon } from "semantic-ui-react";
import moment from "moment";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  value: string;
  textElementIndex: number;
  handleTextChange: Function;
}

export const CheckboxPad = ({
  x,
  y,
  width,
  height,
  value: textInputValue,
  textElementIndex,
  handleTextChange,
}: Props) => {
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
          className="form-check-input"
        />
      </div>
    </>
  );
};
