import React, { useState, createRef, useEffect, memo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";

import { useDropzone } from "react-dropzone";
import {
  Menu,
  Icon,
} from "semantic-ui-react";

import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import { Row, Col, Card, CardBody } from "reactstrap";
import SignaturePad from "react-signature-pad-wrapper";
import BounceLoader from "react-spinners/BounceLoader";

//
import { createTextSignature } from "../../../utils/textSignature";

//
import {
  setAllPreviousSignatures,
} from "../../../redux/slices/signatureReducer";
import trimCanvas from "../../../utils/module/trimCanvasModule";
import { DrawingAttachment, SignatureObject } from "../../../types";
import { updateSignatorySignatureValue } from "../../../redux/slices/inPersonSigning/coordinatesReducer";

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
  const [allSignatureData, setAllSignatureData] = useState([]);
  const [signatureInputText, setSignatureInputText] = useState(
    localStorage.getItem("signatoryName") ?? ""
  );
  const [openModal, setOpenModal] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [activeSignatureIndex, setActiveSignatureIndex] = useState(0);
  const [removedSignatureId, setRemovedSignatureId] = useState<number>(-1);
  const [isSignatureAdding, setIsSignatureAdding] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const inputRef = useRef<any>("");

  //
  const reduxState = useSelector((state: any) => state);
  const allPreviousSignatures = useSelector(
    (state: any) => state.signatureList.allPreviousSignatures
  );
  const externalUsersData = useSelector((state: any) => state.externalUser);

  const activeSignatory = useSelector(
    (state: any) => state.inPersonActiveSignatory.activeSignatory
  );

  const allSignatureList = useSelector(
    (state: any) => state.inPersonSignatureList.allSignatureData
  );

  const dispatch = useDispatch();

  var keyEventTimeoutStamp: any;

  useEffect(() => {
    createSignatures();
    createSignatures();
    createSignatures();

    return () => {};
  }, []);

  const closeModal = () => {
    setOpenModal("");
    dismiss();
  };

  const createSignatures = async () => {
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const allData = (await createTextSignature(
          signatureInputText ? signatureInputText : "Sample"
        )) as any;
        setAllSignatureData(allData);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }, 500);
    } catch (err) {
      createSignatures();
      console.log(err);
    }
  };

  const handleDone = async () => {
    const encodedImgData = allPreviousSignatures[activeSignatureIndex].data;
    
    dispatch(
      updateSignatorySignatureValue({
        signatoryUUID: activeSignatory.value,
        newValue: encodedImgData
      })
    );

    setOpenModal("");
    closeModal();
  };

  const handleTypeSignatureComponentDone = async () => {
    if (signatureInputText.length >= 4 && signatureInputText.length <= 20) {
      const encodedImgData = allSignatureData[0];

      await handleAddSignature(encodedImgData);
      setErrorMsg("");
      setOpenModal("");
      closeModal();
    } else {
      inputRef.current.focus();
      setErrorMsg("Please Enter Minimum 4 And Max 20 Character");
    }
  };

  //
  const fetchAllSignatures = async () => {
    try {
      //
      var reqOptions = {
        url: `${process.env.REACT_APP_API_URL}/api/common/externalUser/signature/fetchAll`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          userId: externalUsersData.userId,
        }),
      };
      var {
        data: { data: signatureData },
      } = await Axios.request(reqOptions);
      dispatch(
        setAllPreviousSignatures({ allPreviousSignatures: signatureData })
      );

      //
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteSignature = async (signatureId: number) => {
    try {
      var reqOptions = {
        url: `${process.env.REACT_APP_API_URL}/api/common/externalUser/signature/removeSignature`,
        method: "DELETE",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          signatureId: signatureId,
        }),
      };

      await Axios.request(reqOptions);

      await fetchAllSignatures();

      if (allPreviousSignatures.length === 1) {

        dispatch(
          updateSignatorySignatureValue({
            signatoryUUID: activeSignatory.value,
            newValue: ""
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddSignature = async (signatureDataBase64: string) => {
    try {
      setIsSignatureAdding(true);
      var reqOptions = {
        url: `${process.env.REACT_APP_API_URL}/api/common/externalUser/signature/add`,
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          userId: externalUsersData.userId,
          type: "signature",
          data: signatureDataBase64,
        }),
      };
      await Axios.request(reqOptions);
      dispatch(
        updateSignatorySignatureValue({
          signatoryUUID: activeSignatory.value,
          newValue: signatureDataBase64
        })
      );


      await fetchAllSignatures();
    } catch (err) {
      console.log(err);
    } finally {
      setIsSignatureAdding(false);
    }
  };

  const handleCancel = async () => {
    try {
      if (allPreviousSignatures.length == 0) {
        dispatch(
          updateSignatorySignatureValue({
            signatoryUUID: activeSignatory.value,
            newValue: ""
          })
        );
      }

      setTimeout(() => {
        closeModal();
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  const RenderComponent = () => {
    switch (openModal) {
      case "draw":
        return (
          <DrawSignature
            setOpenModal={setOpenModal}
            closeModal={closeModal}
            handleAddSignature={handleAddSignature}
          />
        );
      case "generate":
        return (
          <GenerateSignature
            setOpenModal={setOpenModal}
            closeModal={closeModal}
            allSignatureData={allSignatureData}
            handleAddSignature={handleAddSignature}
          />
        );
      case "upload":
        return (
          <UploadSignature
            setOpenModal={setOpenModal}
            closeModal={closeModal}
            handleAddSignature={handleAddSignature}
          />
        );

      default:
        return <></>;
    }
  };

  return (
    <>
      {allPreviousSignatures.length > 0 && openModal == "" ? (
        <Modal
          isOpen={open}
          onClosed={closeModal}
          centered
          className="modal-container "
          toggle={closeModal}
          fade={false}
          size={"xl"}
          fullscreen={"sm"}
        >
          <ModalHeader>
            <h4 className="fs-4" style={{ color: "#2f373e" }}>
              Select Your Signature
            </h4>
          </ModalHeader>
          <ModalBody className="">
            <div className=" mt-2">
              Select the signature you would like to use or create a new one
              <Row className="my-3 fonts-list-container">
                <Col
                  md="6"
                  className="my-2 d-flex align-items-center justify-content-center "
                >
                  <Card
                    style={{
                      maxWidth: "100%",
                      // backgroundColor: "#f6f8fb",
                    }}
                    className=" h-100 custom-addnewcard shadow-none p-4"
                    onClick={() => {
                      setOpenModal("options");
                    }}
                  >
                    {/* <i className="fa-solid fa-circle-plus"></i> */}
                    <i
                      // className="fa-regular fa-square-plus"
                      className="fa-solid fa-circle-plus"
                      style={{
                        fontSize: "3vw",
                        color: "#0777CF",
                        // "#354259"
                      }}
                    ></i>
                    <h5 className="mt-2">Add New Signature</h5>
                  </Card>
                </Col>

                {allPreviousSignatures.map(
                  (item: SignatureObject, index: number) => {
                    return (
                      <Col
                        md="6"
                        className="my-2 d-flex align-items-center justify-content-center"
                        key={index}
                      >
                        <Card
                          style={{
                            maxWidth: "100%",
                            backgroundColor: "#f6f8fb",
                            border: "2px solid transparent",
                          }}
                          className={` h-100 custom-cards position-relative shadow-none p-4 ${
                            removedSignatureId == item.id ? "destroy-card" : ""
                          } ${
                            activeSignatureIndex === index ? "active-card" : ""
                          }`}
                          onClick={() => {
                            setActiveSignatureIndex(index);
                          }}
                        >
                          {removedSignatureId == item.id ? (
                            <div className="">
                              <PropagateLoader color="#546470" />
                            </div>
                          ) : (
                            <>
                              <img
                                src={item.data}
                                alt="Fetching Data"
                                style={{
                                  maxHeight: "100%",
                                  maxWidth: "100%",
                                  overflowClipMargin: "content-box",
                                  overflow: "clip",
                                }}
                              />

                              <div
                                className="position-absolute delete-btn-container"
                                onClick={() => {
                                  setRemovedSignatureId(item.id);

                                  handleDeleteSignature(item.id);
                                }}
                              >
                                <div className="icon icon-fill">
                                  <i className="fa-solid fa-trash"></i>
                                </div>
                              </div>
                            </>
                          )}
                        </Card>
                      </Col>
                    );
                  }
                )}
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn " onClick={closeModal}>
              Cancel
            </button>
            <span className="px-2"> </span>

            <button onClick={handleDone} className="btn custom-btn1">
              Done
            </button>
          </ModalFooter>
        </Modal>
      ) : (
        <>
          <Modal
            isOpen={open}
            onClosed={closeModal}
            centered
            className="modal-container "
            // toggle={closeModal}
            fade={false}
            size={"xl"}
            fullscreen={"sm"}
          >
            <ModalHeader>
              <h4 className="fs-4" style={{ color: "#2f373e" }}>
                Add Your Signature
              </h4>
            </ModalHeader>
            <ModalBody className="">
              <div className="mt-3">
                <h5>Type Your Signature</h5>

                <input
                  className="form-control mt-2"
                  placeholder="Your Full Name"
                  value={signatureInputText}
                  ref={inputRef}
                  onChange={(e) => {
                    const value = e.target.value;

                    if (value.length <= 30) {
                      setSignatureInputText(value);

                      setTimeout(() => {
                        setIsLoading(true);
                      }, 800);
                    } else {
                      alert("Max 30 Character Allowed Here !!!");
                    }
                  }}
                  onKeyUp={(e: any) => {
                    clearTimeout(keyEventTimeoutStamp);
                    keyEventTimeoutStamp = setTimeout(() => {
                      createSignatures();
                    }, 1200);
                  }}
                  onKeyDown={() => {
                    clearTimeout(keyEventTimeoutStamp);
                  }}
                />
                <h6 className="text-danger my-1">{errorMsg}</h6>

                <div
                  style={{
                    backgroundColor: "#f6f8fb",
                    height: 100,
                    cursor: isLoading ? "none" : "pointer",
                  }}
                  className="my-4 d-flex justify-content-center align-items-center p-3 position-relative"
                  onClick={() => {
                    if (!isLoading) {
                      setOpenModal("generate");
                    }
                  }}
                >
                  {isLoading ? (
                    <div className="d-flex justify-content-center align-items-center">
                      <BounceLoader color="#354259" size={28} />
                    </div>
                  ) : (
                    <div>
                      <img
                        src={allSignatureData[0]}
                        alt="Fetching Data"
                        style={{
                          maxHeight: "100%",
                          maxWidth: "100%",
                          overflowClipMargin: "content-box",
                          overflow: "clip",
                        }}
                      />

                      <div
                        className="position-absolute text-primary"
                        style={{ right: 5, top: 5 }}
                      >
                        <u>
                          <span className="m-1">More</span>
                        </u>
                        {/* <i className="fa-regular fa-rectangle-list "></i> */}
                      </div>
                      {/* <Icon name="" /> */}
                    </div>
                  )}
                </div>
              </div>

              <div className="my-4 ">
                <div
                  style={{ border: "1px solid #EAECEE" }}
                  className="position-relative"
                >
                  <div
                    className="position-absolute p-2"
                    style={{
                      backgroundColor: "white",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      color: "#546470",
                    }}
                  >
                    Or
                  </div>
                </div>
              </div>

              <div className="">
                {/*  */}
                <Row>
                  <Col
                    sm="6"
                    lg="6"
                    className="my-3 d-flex justify-content-center "
                  >
                    <Card
                      style={{ maxWidth: "100%" }}
                      className="py-3 h-100 custom-container-cards"
                      onClick={() => {
                        setOpenModal("draw");
                      }}
                    >
                      <CardBody className="w-100 h-100">
                        <Row className="h-100">
                          <Col
                            className="d-flex align-items-center justify-content-center"
                            lg={4}
                          >
                            <img
                              alt="Sample"
                              className="w-100"
                              src={require("../../../assets/illustrations/undraw_learning_sketching_nd4f.png")}
                            />
                          </Col>
                          <Col
                            lg={8}
                            className="d-flex justify-content-center flex-column"
                          >
                            <div>
                              <h5 className="fw-bold">Draw Your Signature</h5>
                            </div>
                            <div
                              style={{ lineHeight: "1.4", color: "#38424b" }}
                              className="mt-2"
                            >
                              Draw your signature here using your mouse or
                              trackpad.
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  {/*  */}{" "}
                  <Col
                    sm="6"
                    lg="6"
                    className="my-3 d-flex justify-content-center "
                  >
                    <Card
                      style={{ maxWidth: "100%" }}
                      className=" h-100 custom-container-cards"
                      onClick={() => {
                        setOpenModal("upload");
                      }}
                    >
                      <CardBody>
                        <Row className="h-100">
                          <Col
                            className="d-flex align-items-center justify-content-center"
                            lg={4}
                          >
                            <img
                              alt="Sample"
                              className="w-100"
                              src={require("../../../assets/illustrations/undraw_Updated_resume_re_7r9j.png")}
                            />
                          </Col>
                          <Col
                            lg={8}
                            className="d-flex justify-content-center flex-column"
                          >
                            <div>
                              <h5 className="fw-bold">Upload Your Signature</h5>
                            </div>
                            <div
                              style={{ lineHeight: "1.4", color: "#38424b" }}
                              className="mt-2"
                            >
                              Upload an image of your handwritten signature
                              here.
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  {/*  */}
                </Row>
                {/*  */}
              </div>
            </ModalBody>
            <ModalFooter>
              <button className="btn " onClick={handleCancel}>
                Cancel
              </button>
              <span className="px-2"> </span>
              <button
                onClick={handleTypeSignatureComponentDone}
                className="btn custom-btn1"
                disabled={isLoading}
              >
                Done
              </button>
            </ModalFooter>
          </Modal>
        </>
      )}
      <RenderComponent />
      {isSignatureAdding ? (
        <div
          style={{
            position: "fixed",
            zIndex: 1100,
            backgroundColor: "rgba(200,200,200,0.4)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          id="lplp"
        >
          <BounceLoader />
        </div>
      ) : null}
    </>
  );
};

const DrawSignature = memo(
  ({
    setOpenModal,
    closeModal,
    handleAddSignature,
  }: {
    setOpenModal: any;
    closeModal: any;
    handleAddSignature: any;
  }) => {
    const [isOpen, setIsOpen] = useState(true);

    //
    const svgRef = createRef<any>();

    //
    const undoSign = () => {
      const data = svgRef.current.toData();
      data.pop();

      svgRef.current.fromData(data);
    };

    const handleDone = async () => {
      if (!svgRef.current.isEmpty()) {
        // const encodedImgData = svgRef.current.toDataURL();

        const trimedCanvasElement = trimCanvas(
          svgRef.current.signaturePad.canvas
        );

        // here is work
        // await handleAddSignature(encodedImgData);
        await handleAddSignature(trimedCanvasElement.toDataURL());

        closeCurrentModal();
        closeModal();
      }
    };

    const closeCurrentModal = () => {
      setOpenModal("");
      setIsOpen(false);
    };

    return (
      <Modal
        isOpen={isOpen}
        onClosed={closeCurrentModal}
        centered
        className="modal-container"
        toggle={closeCurrentModal}
        fade={false}
        size={"xl"}
        fullscreen={"sm"}
      >
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
                minWidth: 100,
                // maxWidth: 10,
                penColor: "black",
                dotSize: 0.8,
              }}
              ref={svgRef}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn go-back-button custom-btn2"
            onClick={() => closeCurrentModal()}
          >
            Go Back
          </button>
          <button className="btn " onClick={closeCurrentModal}>
            Cancel
          </button>
          <span className="px-2"> </span>
          <button onClick={handleDone} className="btn custom-btn1">
            Done
          </button>
        </ModalFooter>
      </Modal>
    );
  }
);

const GenerateSignature = ({
  setOpenModal,
  closeModal,
  allSignatureData,
  handleAddSignature,
}: {
  setOpenModal: any;
  closeModal: any;
  allSignatureData: Array<string>;
  handleAddSignature: any;
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSignatureIndex, setActiveSignatureIndex] = useState<number>(0);

  const handleDone = async () => {
    const encodedImgData = allSignatureData[activeSignatureIndex];

    await handleAddSignature(encodedImgData);

    closeCurrentModal();
    closeModal();
  };

  const closeCurrentModal = () => {
    setOpenModal("");
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClosed={closeCurrentModal}
      centered
      className="modal-container"
      toggle={closeCurrentModal}
      fade={false}
      size={"xl"}
      fullscreen={"sm"}
    >
      {/* #f6f8fb */}
      <ModalHeader>Change Style</ModalHeader>
      <ModalBody>
        <div className="fonts-list-container">
          <Row>
            {allSignatureData.map((item, index) => {
              return (
                <Col
                  md="6"
                  className="my-2 d-flex align-items-center justify-content-center"
                  key={index}
                >
                  <Card
                    style={{
                      maxWidth: "100%",
                      backgroundColor: "#f6f8fb",
                      border:
                        activeSignatureIndex === index
                          ? `2px solid #348fd7`
                          : "2px solid transparent",
                    }}
                    className={` h-100 custom-cards shadow-none p-4 ${
                      activeSignatureIndex === index ? "active-card" : ""
                    }`}
                    onClick={() => {
                      setActiveSignatureIndex(index);
                    }}
                  >
                    <img
                      src={item}
                      alt="Fetching Data"
                      style={{
                        maxHeight: "100%",
                        maxWidth: "100%",
                        overflowClipMargin: "content-box",
                        overflow: "clip",
                      }}
                    />
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="btn go-back-button custom-btn2"
          onClick={() => closeCurrentModal()}
        >
          Go Back
        </button>
        <button className="btn " onClick={closeCurrentModal}>
          Cancel
        </button>
        <span className="px-2"> </span>
        <button onClick={handleDone} className="btn custom-btn1">
          Done
        </button>
      </ModalFooter>
    </Modal>
  );
};

const UploadSignature = memo(
  ({
    setOpenModal,
    closeModal,
    handleAddSignature,
  }: {
    setOpenModal: any;
    closeModal: any;
    handleAddSignature: any;
  }) => {
    const [isOpen, setIsOpen] = useState(true);
    //

    //
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
      accept: {
        "image/png": [".png"],
      },
    });

    useEffect(() => {
      const file = acceptedFiles[0];
      if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const encodedImgData = reader.result;

          await handleAddSignature(encodedImgData);
          closeCurrentModal();
          closeModal();
        };
        reader.onerror = function (error) {
          console.log("Error: ", error);
        };
      }

      return () => {};
    }, [acceptedFiles]);

    const closeCurrentModal = () => {
      setOpenModal("");
      setIsOpen(false);
    };

    return (
      <Modal
        isOpen={isOpen}
        onClosed={closeCurrentModal}
        centered
        className="modal-container"
        toggle={closeCurrentModal}
        fade={false}
        size={"xl"}
        fullscreen={"sm"}
      >
        {/* #f6f8fb */}
        <ModalHeader>Change Style</ModalHeader>
        <ModalBody>
          <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />

              <img
                style={{ maxWidth: "300px" }}
                src={require("../../../assets/illustrations/undraw_Going_up_re_86kg.png")}
                className="my-2 w-100"
                alt="img"
              />

              <p className="mb-3">
                Drag 'n' drop some files here, or click to select files
              </p>
              <h5 className="text-dark">* Upload Only Png File</h5>
            </div>
          </section>
        </ModalBody>
        <ModalFooter>
          <button
            className="btn go-back-button custom-btn2"
            onClick={() => closeCurrentModal()}
          >
            Go Back
          </button>
          <button className="btn " onClick={closeCurrentModal}>
            Cancel
          </button>
          <span className="px-2"> </span>
          {/* <button onClick={handleDone} className="btn custom-btn1">
            Done
          </button> */}
        </ModalFooter>
      </Modal>
    );
  }
);
