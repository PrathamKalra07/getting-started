import PuffLoader from "react-spinners/PuffLoader";

export default function AlreadySignedComponent({}) {
  return (
    <>
      {/* error msg model */}
      <div className="already-sign-model-container">
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
            }}
          >
            <img
              src={require("../assets/img/stopimg.png")}
              alt="img"
              style={{ height: "50%" }}
            />
            <h3>You Had Already Done Your Work, Thank You</h3>
          </div>
        </div>
      </div>

      {/*  */}
    </>
  );
}
