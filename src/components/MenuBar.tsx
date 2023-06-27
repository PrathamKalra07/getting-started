import React, { useState } from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import ProgressBar from "@ramonak/react-progress-bar";
import { Navbar, NavbarBrand } from "reactstrap";
import { useSelector } from "react-redux";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

interface Props {
  uploadNewPdf: () => void;
  addText: () => void;
  addImage: () => void;
  addDrawing: () => void;
  isPdfLoaded: boolean;
  savingPdfStatus: boolean;
  savePdf: () => void;
  rejectSign: (commentText: string) => void;
}

const whiteText = { color: "white" };

export const MenuBar: React.FC<Props> = ({
  uploadNewPdf,
  addDrawing,
  addText,
  addImage,
  isPdfLoaded,
  savingPdfStatus,
  savePdf,
  rejectSign,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const trackerData = useSelector((state: any) => state.allFinalDataReducer);

  const handleRejection = () => {
    if (commentText) {
      rejectSign(commentText);
      setIsOpen(false);
    }
  };

  const closeCurrentModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="menubar-container p-2 ">
        <div
          className="d-flex menubar-inner-container"
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h4 className="text-light fw-bold">
            Ew<span className="mx-1">Sign</span>Pad
          </h4>
          <div className="custom-progressbar-container">
            {/*  */}

            <ProgressBar
              completed={trackerData.completedNoOfFields}
              maxCompleted={trackerData.totalNoOfFields}
              isLabelVisible={false}
              height="5px"
              bgColor="#ece5c7"
              baseBgColor="#878479"
            />
            <div
              className="text-center mb-1"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {trackerData.completedNoOfFields} of {trackerData.totalNoOfFields}{" "}
              required fields completed
            </div>

            {/*  */}
          </div>
        </div>

        <div className="d-flex">
          {isPdfLoaded && (
            <>
              <button
                className="submit-btn btn"
                onClick={() => setIsOpen(true)}
              >
                Reject
              </button>

              <button className="submit-btn btn" onClick={savePdf}>
                Submit
              </button>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onClosed={closeCurrentModal}
        centered
        className="modal-container"
        toggle={closeCurrentModal}
        fade={false}
        size={"lg"}
      >
        <ModalHeader>Reject To Sign</ModalHeader>
        <ModalBody>
          <div>
            <FormGroup>
              <Label for="exampleText" className="text-secondary ">
                You're about to reject to sign Note that all the changes you've
                made to this document will be lost. We advise you to carefully
                review this again.
              </Label>

              <h6 className="fw-bold my-2" style={{ fontSize: "1rem" }}>
                please provide your reason for declining here:
              </h6>
              <Input
                type="textarea"
                name="text"
                id="exampleText"
                style={{ minHeight: 150 }}
                placeholder="Reason For Reject"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className="btn " onClick={closeCurrentModal}>
            Cancel
          </button>
          <span className="px-2"> </span>
          <button
            onClick={handleRejection}
            className="btn custom-btn1"
            disabled={!commentText}
          >
            Done
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

// <Menu pointing className="menubar-container p-2">
//   <Menu.Item header style={whiteText}>
//     Ew Sign Pad
//   </Menu.Item>

//   <Menu.Item>
//     Helllo
//     {/* <Line percent={10} strokeWidth={4} strokeColor="#D3D3D3" style={{}} /> */}
//   </Menu.Item>

//   <Menu.Menu position="right">
//     {isPdfLoaded && (
//       <>
//         <Menu.Item
//           data-testid="save-menu-item"
//           name={"Reject"}
//           // disabled={savingPdfStatus}
//           onClick={rejectSign}
//           className="submit-btn"
//         />

//         <Menu.Item
//           data-testid="save-menu-item"
//           name={"Submit"}
//           // disabled={savingPdfStatus}
//           onClick={savePdf}
//           className="submit-btn"
//         />
//       </>
//     )}
//   </Menu.Menu>
// </Menu>
