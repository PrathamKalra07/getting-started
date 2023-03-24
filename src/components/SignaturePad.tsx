import React from "react";
import { Icon } from "semantic-ui-react";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  addDrawing: any;
  signatureData: any;
}

export const SignaturePad = ({
  x,
  y,
  width,
  height,
  addDrawing,
  signatureData,
}: Props) => {
  return (
    <>
      <div
        style={{
          backgroundColor: "#ffe185",
          position: "absolute",
          height: height,
          width: width,
          top: y,
          left: x,
          right: 0,
          bottom: 0,
          borderRadius: 5,
        }}
        onClick={addDrawing}
      >
        {/* signatureData */}
        {signatureData.height > 0 && signatureData.width > 0 ? (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <img
              src={signatureData.encodedImgData}
              // style={{ maxHeight: 200, maxWidth: 200 }}
              alt={"imgg"}
              style={{ maxHeight: height - 5 }}
            />
          </span>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <div>Sign</div>
            <div>
              <Icon name="signup" size="small" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
