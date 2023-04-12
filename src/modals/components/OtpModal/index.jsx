import { useEffect, useState } from "react";
import "./customModal.css";

export default function OtpModal({
  otp,
  originalOtpValue,
  setIsOtpVerificationDone,
  setIsResendOtp,
}) {
  const [errorMsg, setErrorMsg] = useState("");
  var [timer, setTimer] = useState(60);

  const OTPInput = () => {
    const inputs = document.querySelectorAll("#otp > *[id]");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          inputs[i].value = "";
          if (i !== 0) inputs[i - 1].focus();
        } else {
          if (i === inputs.length - 1 && inputs[i].value !== "") {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[i].value = event.key;
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            inputs[i].value = String.fromCharCode(event.keyCode);
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    }
  };

  useEffect(() => {
    OTPInput();
    return () => {};
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (timer > 0) {
        setTimer((timer) => timer - 1);
      } else {
        clearInterval(t);
      }
    }, 1000);

    return () => {
      clearInterval(t);
    };
  }, [timer]);

  const inputList = [
    {
      id: "first",
    },
    {
      id: "second",
    },
    {
      id: "third",
    },
    {
      id: "fourth",
    },
    {
      id: "fifth",
    },
    {
      id: "sixth",
    },
  ];
  return (
    <div className="otp-model-container">
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
            // flexDirection: "row",
          }}
        >
          {/*  */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "space-around",
              textAlign: "center",
              borderRadius: 10,
            }}
            className="card "
          >
            {" "}
            <h6>
              Please enter the one time password <br /> to verify your account
            </h6>{" "}
            <div>
              {" "}
              {errorMsg ? (
                <span style={{ color: "red" }}>
                  {errorMsg ? errorMsg : " "}
                </span>
              ) : (
                <span>A code has been sent to your mail please check it</span>
              )}
            </div>{" "}
            <div
              id="otp"
              className="inputs d-flex flex-row justify-content-center mt-2"
            >
              {inputList.map((item, i) => {
                return (
                  <input
                    key={i}
                    type="text"
                    id={item.id}
                    maxLength={1}
                    autoFocus={i === 0 ? true : false}
                    value={otp[i]}
                    onKeyDown={(e) => {
                      otp[i] = e.target.value;
                    }}
                  />
                );
              })}
            </div>{" "}
            <div className="mt-4">
              {" "}
              <button
                className="btn btn-danger px-4 validate"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  // console.log("currnet otp", otp);
                  // console.log("originalOtpValue", originalOtpValue);

                  // originalOtpValue
                  if (otp.join("") != originalOtpValue) {
                    setErrorMsg("wrong otp please re enter");
                    for (let i = 0; i < 6; i++) {
                      otp[i] = "";
                    }
                  } else {
                    setIsOtpVerificationDone(true);
                  }
                }}
              >
                Confirm
              </button>{" "}
            </div>{" "}
            {timer != 0 ? (
              <b>
                {" "}
                Resend OTP In {"   "}
                {timer}
              </b>
            ) : (
              <a
                style={{ color: "rgb(0, 92, 185)", cursor: "pointer" }}
                onClick={() => {
                  setIsResendOtp(Math.random());
                  setTimer(60);
                }}
              >
                Resend OTP
              </a>
            )}
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
