import React, { useState, ChangeEvent, ReactNode } from "react";
import "./inPersonSigningModal.css";
import { Signatory } from "types";

interface ModalProps {
  signatories: Signatory[];
  onSignatorySelected: (uuid: string) => void;
  children: ReactNode;
}

const InPersonSigningModal: React.FC<ModalProps> = ({
  signatories,
  onSignatorySelected,
  children,
}) => {
  const [selectedUUID, setSelectedUUID] = useState<null | string>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedUUID(event.target.value);
  };

  return (
    <div className="model-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
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
            Please choose signatory <br /> to continue
          </h6>{" "}
          <div className="my-3">
            {" "}
            <div>
              {signatories &&
                signatories.map((signatory, i) => {
                  return (
                    <>
                      <input
                        type="radio"
                        value={signatory.signatoryUUID}
                        name="signatory"
                        onChange={handleChange}
                      />
                      {signatory.signatoryName}
                    </>
                  );
                })}
            </div>
          </div>{" "}
          <div className="mt-4">
            {" "}
            {selectedUUID ? (
              <button
                className="btn custom-btn3 px-4 validate"
                style={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.669)",
                }}
                onClick={() => {
                  onSignatorySelected(selectedUUID);
                }}
              >
                Start signing
              </button>
            ) : (
              <button
                className="btn custom-btn3 px-4 validate"
                style={{
                  cursor: "not-allowed",
                  fontWeight: "bold",
                  color: "rgba(0, 0, 0, 0.669)",
                }}
                disabled
              >
                Start signing
              </button>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default InPersonSigningModal;
