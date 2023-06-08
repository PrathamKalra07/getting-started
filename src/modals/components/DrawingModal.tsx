import React, { useState, createRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  // Modal,
  // Button,
  Menu,
  Dropdown,
  Label,
  Icon,
} from "semantic-ui-react";

import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { Row, Col, Card, CardBody, CardSubtitle, Button } from "reactstrap";
import SignaturePad from "react-signature-pad-wrapper";

//
import { Color } from "../../entities";

//
import { setSignaturePathWithEncoddedImg } from "../../redux/slices/signatureReducer";

interface Props {
  open: boolean;
  dismiss: () => void;
  confirm: (drawing?: {
    width: number;
    height: number;
    path: string;
    strokeWidth: number;
    stroke: string;
    encodedImgData: string;
  }) => void;
  drawing?: DrawingAttachment;
}

export const DrawingModal = ({ open, dismiss, confirm, drawing }: Props) => {
  const [currentView, setCurrentView] = useState("options");

  const closeModal = () => {
    // resetDrawingBoard();
    dismiss();
  };

  const RenderElement = ({ view }: { view: any }): any => {
    switch (view) {
      case "options":
        return (
          <OptionsList
            closeModal={closeModal as Function}
            setCurrentView={setCurrentView}
          />
        );
      case "draw":
        return (
          <DrawSignature
            closeModal={closeModal as Function}
            setCurrentView={setCurrentView}
          />
        );
      case "generate":
        return (
          <GenerateSignature
            closeModal={closeModal as Function}
            setCurrentView={setCurrentView}
          />
        );

      default:
        return <>Nothing Is Here To See</>;
    }
  };

  return (
    <Modal
      isOpen={open}
      onClosed={closeModal}
      centered
      className="modal-container"
      toggle={closeModal}
      fade={false}
      size={"lg"}
      fullscreen={"md"}
    >
      {}
      <RenderElement view={currentView} />
    </Modal>
  );
};

const OptionsList = ({
  closeModal,
  setCurrentView,
}: {
  closeModal: any;
  setCurrentView: any;
}) => {
  return (
    <>
      <ModalHeader>Choose Option</ModalHeader>
      <ModalBody>
        <div className="">
          {/*  */}
          <Row>
            <Col sm="6" lg="6" className="my-2">
              <Card
                style={{ maxWidth: "100%" }}
                className="p-5 h-100 custom-cards"
                onClick={() => setCurrentView("draw")}
              >
                <img
                  alt="Sample"
                  style={{ maxWidth: "100%" }}
                  src={require("../../assets/illustrations/undraw_learning_sketching_nd4f.png")}
                  className="h-100"
                />
                <CardBody>
                  <CardSubtitle
                    className="mb-2 text-muted text-center"
                    tag="h6"
                  >
                    Manually Sign
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
            {/*  */}{" "}
            <Col sm="6" lg="6" className="my-2">
              <Card
                style={{ maxWidth: "100%" }}
                className="p-5 h-100 custom-cards"
                onClick={() => setCurrentView("generate")}
              >
                <img
                  alt="Sample"
                  style={{ maxWidth: "100%" }}
                  src={require("../../assets/illustrations/undraw_search_app_oso2.png")}
                  className="h-100"
                />
                <CardBody>
                  <CardSubtitle
                    className="mb-2 text-muted text-center"
                    tag="h6"
                  >
                    Generate Sign
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
            {/*  */}
          </Row>
          {/*  */}
        </div>
      </ModalBody>
      <ModalFooter>
        <button className="btn " onClick={closeModal}>
          Cancel
        </button>
        <span className="px-2"> </span>
        <button onClick={closeModal} className="btn custom-btn1">
          Done
        </button>
      </ModalFooter>
    </>
  );
};

const DrawSignature = ({
  closeModal,
  setCurrentView,
}: {
  closeModal: any;
  setCurrentView: any;
}) => {
  //
  const svgRef = createRef<any>();
  //
  const dispatch = useDispatch();

  //
  const undoSign = () => {
    const data = svgRef.current.toData();
    data.pop();

    svgRef.current.fromData(data);
  };

  const handleDone = async () => {
    const encodedImgData = svgRef.current.toDataURL();

    dispatch(
      setSignaturePathWithEncoddedImg({
        path: "",
        encodedImgData: encodedImgData,
      })
    );

    closeModal();
  };

  return (
    <>
      <ModalHeader>Draw Your Sign</ModalHeader>
      <ModalBody>
        <Menu size="tiny">
          <Menu.Item header>Tools</Menu.Item>
          <Menu.Item onClick={() => undoSign()}>
            <Icon name="undo" />
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              svgRef.current.clear();
            }}
          >
            <Icon name="eraser" />
          </Menu.Item>
        </Menu>
        <div className="drawing-modal-grey-container">
          <SignaturePad
            options={{
              minWidth: 1,
              // maxWidth: 10,
              penColor: "black",
              dotSize: 0.5,
            }}
            ref={svgRef}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn go-back-button custom-btn2"
          onClick={() => setCurrentView("options")}
        >
          Go Back
        </button>
        <button className="btn " onClick={closeModal}>
          Cancel
        </button>
        <span className="px-2"> </span>
        <button onClick={handleDone} className="btn custom-btn1">
          Done
        </button>
      </ModalFooter>
    </>
  );
};
const GenerateSignature = ({
  closeModal,
  setCurrentView,
}: {
  closeModal: any;
  setCurrentView: any;
}) => {
  // //
  // const svgRef = createRef<any>();
  // //
  // const dispatch = useDispatch();

  // //
  // const undoSign = () => {
  //   const data = svgRef.current.toData();
  //   data.pop();

  //   svgRef.current.fromData(data);
  // };

  const handleDone = async () => {
    // const encodedImgData = svgRef.current.toDataURL();

    // dispatch(
    //   setSignaturePathWithEncoddedImg({
    //     path: "",
    //     encodedImgData: encodedImgData,
    //   })
    // );

    closeModal();
  };

  return (
    <>
      <ModalHeader>Generating Sign</ModalHeader>
      <ModalBody>
        <Menu size="tiny">
          <Menu.Item header>Tools</Menu.Item>
          <Menu.Item>
            <Icon name="undo" />
          </Menu.Item>
          <Menu.Item>
            <Icon name="eraser" />
          </Menu.Item>
        </Menu>
        <div className="container">
          Here Is Your Sign List That Are Currently In Development Phase
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn go-back-button custom-btn2"
          onClick={() => setCurrentView("options")}
        >
          Go Back
        </button>
        <span className="px-2"> </span>
        <button className="btn " onClick={closeModal}>
          Cancel
        </button>
        <span className="px-2"> </span>
        <button onClick={handleDone} className="btn custom-btn1">
          Done
        </button>
      </ModalFooter>
    </>
  );
};
