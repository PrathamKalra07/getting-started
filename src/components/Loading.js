import React from "react";

export default function Loading({}) {
  return (
    <>
      <div className="already-sign-model-container" style={{ zIndex: 6 }}>
        {/* https://mir-s3-cdn-cf.behance.net/project_modules/fs/628a4e68110473.5b511c318e34c.png */}
        <div
          style={{
            position: "fixed",
            zIndex: 5,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#E8EFF5",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100vw",
              flexDirection: "column",
              backgroundColor: "white",
            }}
          >
            <img
              src={require("../assets/img/loading.gif")}
              alt="img"
              style={{ height: "50%" }}
            />
            <h3>We Are Fetching Your Data Please Wait...</h3>
          </div>
        </div>
      </div>
    </>
  );
}
