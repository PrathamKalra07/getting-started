import { useEffect, useState } from "react";
import "./customModal.css";

export default function OtpModal({
  otp,
  originalOtpValue,
  setIsOtpVerificationDone,
  setIsResendOtp,
  setOriginalOtpValue,
  setOtp,
}) {
  const [errorMsg, setErrorMsg] = useState("");
  var [timer, setTimer] = useState(60);

  const OTPInput = () => {
    const inputs = document.querySelectorAll("#otp > *[id]");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keydown", (event) => {
        if (event.key === "Backspace") {
          inputs[i].value = "";
          if (i !== 0) inputs[i - 1].focus();
        } else if (event.key === "Enter") {
          handleConfirmOtp();
          event.preventDefault();
        } else if (event.key === "Control" || event.key === "v") {
          // console.log(event);
          // handleConfirmOtp();
          // event.preventDefault();
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
  }, [originalOtpValue]);

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
  ];

  const handleConfirmOtp = () => {
    // originalOtpValue
    if (otp.join("") !== originalOtpValue || otp.join("").length === 0) {
      setErrorMsg("wrong otp please re enter");
      setOtp((oldData) => {
        return oldData.map((item) => "");
      });
      document.getElementById(inputList[0].id).focus();
    } else if (otp.join("") === originalOtpValue) {
      setIsOtpVerificationDone(true);
      localStorage.setItem("isOtpVerifyOffline", "true");
    }
  };

  return (
    <div className="otp-model-container">
      {/* https://mir-s3-cdn-cf.behance.net/project_modules/fs/628a4e68110473.5b511c318e34c.png */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
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
          className="card py-5 custom-otp-card"
        >
          {" "}
          <h6>
            Please enter the one time password <br /> to verify your account
          </h6>{" "}
          <div className="my-3">
            {" "}
            {errorMsg ? (
              <span style={{ color: "red" }}>{errorMsg ? errorMsg : " "}</span>
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
                  type="number"
                  id={item.id}
                  maxLength={1}
                  autoFocus={i === 0 ? true : false}
                  value={otp[i]}
                  onKeyDown={(e) => {
                    otp[i] = e.target.value;
                  }}
                  onPaste={(e) => {
                    const pasteText = e.clipboardData.getData("Text");
                    if (parseInt(pasteText) && pasteText.length === 4) {
                      const allDigit = pasteText.split("");
                      setOtp((oldData) => {
                        return oldData.map(
                          (innerItem, indexNo) => allDigit[indexNo]
                        );
                      });
                    }
                    e.preventDefault();
                  }}
                />
              );
            })}
          </div>{" "}
          <div className="mt-4">
            {" "}
            <button
              className="btn custom-btn3 px-4 validate"
              style={{ cursor: "pointer" }}
              onClick={() => handleConfirmOtp()}
            >
              Confirm
            </button>{" "}
          </div>{" "}
          <div className="mt-3">
            {timer != 0 ? (
              <b>
                {" "}
                Resend OTP In {"   "}
                {timer}
              </b>
            ) : (
              <b
                style={{ color: "rgb(0, 92, 185)", cursor: "pointer" }}
                className="text-light"
                onClick={() => {
                  localStorage.clear();
                  setOriginalOtpValue("");
                  setTimer(60);
                  setIsResendOtp(Math.random());
                }}
              >
                Resend OTP
              </b>
            )}
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
