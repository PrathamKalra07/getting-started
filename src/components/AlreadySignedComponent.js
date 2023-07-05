import PuffLoader from "react-spinners/PuffLoader";
import { Button } from "reactstrap";

export default function AlreadySignedComponent({
  userErrorMsg,
  setIsAuditHistoryShown,
}) {
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
            <svg
              viewBox="0 0 24.00 24.00"
              className="mb-5"
              height={150}
              width={150}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#354259"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 16.99V17M12 7V14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#354259"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>

            {/* <img
              src={require("../assets/img/stopimg.png")}
              alt="img"
              style={{ height: "50%" }}
            /> */}
            <h4 className="text-center">{userErrorMsg}</h4>

            <div
              className="position-absolute "
              style={{ right: "20px", top: "20px" }}
            >
              <Button
                style={{ backgroundColor: "#354259" }}
                onClick={() => {
                  setIsAuditHistoryShown(true);
                }}
              >
                Show Audit Log
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
    </>
  );
}
