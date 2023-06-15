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

export const DatePad = ({
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
          placeholder="Enter Data Here..."
          style={{ height: height, width: width }}
          onChange={(e) => handleTextChange(e, textElementIndex)}
          value={moment(textInputValue, "MM-DD-YYYY").format("YYYY-MM-DD")}
          type="date"
          className="form-control"
        />
      </div>
    </>
  );
};
