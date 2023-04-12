import React from "react";
import { Icon } from "semantic-ui-react";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  addDrawing: any;
  signatureEncodedImgData: string;
  // signatureData: any;
}

export const SignaturePad = ({
  x,
  y,
  width,
  height,
  addDrawing,
  signatureEncodedImgData,
}: // signatureData,
Props) => {
  return (
    <>
      <div
        className="signature-pad-container"
        style={{
          height: height,
          width: width,
          top: y,
          left: x,
        }}
        onClick={addDrawing}
      >
        {/* signatureData */}
        {signatureEncodedImgData ? (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <img
              src={signatureEncodedImgData}
              // style={{ maxHeight: 200, maxWidth: 200 }}
              alt={"imgg"}
              style={{ width: "80%", padding: 5 }}
            />
          </span>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              // flexDirection: "column",
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
