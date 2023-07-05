import React, { useState } from "react";
// import { Menu, Dropdown, Icon } from "semantic-ui-react";
import ProgressBar from "@ramonak/react-progress-bar";
// import { Navbar, NavbarBrand } from "reactstrap";
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
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
  setIsAuditHistoryShown: any;
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
  setIsAuditHistoryShown,
}) => {
  const [isRejectMenuOpen, setIsRejectMenuOpen] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);

  const trackerData = useSelector((state: any) => state.allFinalDataReducer);

  const handleRejection = () => {
    if (commentText) {
      rejectSign(commentText);
      setIsRejectMenuOpen(false);
    }
  };

  const closeCurrentModal = () => {
    setIsRejectMenuOpen(false);
  };

  return (
    <>
      <div className="menubar-container p-2 px-3 ">
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

        <div className="d-flex justify-content-center align-items-center header-main-container">
          {isPdfLoaded && (
            <>
              <button className="submit-btn btn" onClick={savePdf}>
                FINISH
              </button>

              <Dropdown
                isOpen={dropdownOpen}
                toggle={toggleDropDown}
                direction={"down"}
              >
                <DropdownToggle
                  caret
                  style={{ backgroundColor: "#cdc2ae" }}
                  color="black"
                  className="fw-bold"
                >
                  MORE ACTIONS
                </DropdownToggle>
                <DropdownMenu>
                  {/* <DropdownItem header>Header</DropdownItem> */}
                  <DropdownItem onClick={() => setIsRejectMenuOpen(true)}>
                    Reject
                  </DropdownItem>
                  <DropdownItem text>Print And Sign</DropdownItem>
                  <DropdownItem text>Asign To Someone Else</DropdownItem>
                  {/* <DropdownItem disabled>Action (disabled)</DropdownItem> */}
                  <DropdownItem divider />
                  <DropdownItem>View PDF</DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      setIsAuditHistoryShown(true);
                    }}
                  >
                    View History
                  </DropdownItem>
                  <DropdownItem>Help & Support</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              {/* <button
                className="submit-btn btn"
                onClick={() => setIsRejectMenuOpen(true)}
              >
                Reject
              </button> */}
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={isRejectMenuOpen}
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
              <Label for="exampleText" className="text-dark">
                You're about to reject to sign,
                <br /> Note that all the changes you've made to this document
                will be lost. We advise you to carefully review this again.
              </Label>

              <h6 className="fw-bold my-3" style={{ fontSize: "1rem" }}>
                Please provide your reason for declining here:
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
            className={`btn custom-btn1 ${
              !commentText ? "text-dark bg-secondary" : null
            }`}
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
