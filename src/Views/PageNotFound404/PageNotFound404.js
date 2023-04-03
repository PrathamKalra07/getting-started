import React from "react";

export default function PageNotFound404() {
  // require("./pageNotFound404.css");

  import("./pageNotFound404.css");

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div className="face">
        <div className="band">
          <div className="red" />
          <div className="white" />
          <div className="blue" />
        </div>
        <div className="eyes" />
        <div className="dimples" />
        <div className="mouth" />
      </div>
      <h1>Oops! Something went wrong!</h1>
    </div>
  );
}
