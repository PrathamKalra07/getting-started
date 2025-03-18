import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AxiosResponse } from "axios";
import moment from "moment";
import momentTz from "moment-timezone";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Table,
  UncontrolledDropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "reactstrap";

import BounceLoader from "react-spinners/BounceLoader";

//
import { API_ROUTES } from "helpers/constants/apis";
import { postRequest } from "helpers/axios";

//
import { RootState } from "redux/store";

//

interface Props {
  setIsAuditHistoryShown: any;
}

export const AuditTrailModal = ({ setIsAuditHistoryShown }: Props) => {
  const [openModal, setOpenModal] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [auditTrailData, setAuditTrailData] = useState<any>([]);
  const [templateData, setTemplateData] = useState<any>({});

  const basicInfoData = useSelector((state: RootState) => state.basicInfoData);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  useEffect(() => {
    fetchAuditTrailData();

    return () => {};
  }, []);

  const fetchAuditTrailData = async () => {
    try {
      const {
        data: { data: responseData },
      }: AxiosResponse = await postRequest(
        API_ROUTES.AUDIT_FETCHAUDITTRAILS,
        false,
        {
          templateInstanceUUID: basicInfoData.uuidTemplateInstance,
        }
      );

      const { auditData, templateData } = responseData;

      setAuditTrailData(auditData);
      setTemplateData(templateData);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsAuditHistoryShown(false);
  };

  const handleClose = async () => {
    closeModal();
  };

  const handlePrint = async (e: any) => {
    try {
      setIsLoading(true);
      var mywindow: any = window.open("", "PRINT", "height=1000,width=1000");

      var allTableDataInHTML: string = "";

      auditTrailData.forEach((item: any, index: number) => {
        allTableDataInHTML += `<tr>
        <td colspan="1" data-columns="ide7e3ffe8ca1d48-col-0">
            ${index + 1}
        </td>
        <td data-priority="1" colspan="1" data-columns="ide7e3ffe8ca1d48-col-1">
            <div class="d-flex flex-column ">
                <span class="fw-normal ">
                    ${moment(item.created_at).format("MM/DD/YYYY")}
                </span>
                <span class="fw-lighter ">
                    ${moment(item.created_at).format("hh:mm:ss a")}
                </span>
             </div>
        </td>
        <td data-priority="2" colspan="1" data-columns="ide7e3ffe8ca1d48-col-2">
        ${item.action}
        </td>
        <td data-priority="3" colspan="1" data-columns="ide7e3ffe8ca1d48-col-3">
            ${item.ip_address}
            <div className="fw-bold">(${item.location})</div>
        </td>
        <td data-priority="4" colspan="1" data-columns="ide7e3ffe8ca1d48-col-4">
            ${item.recipient}
        </td>
        <td data-priority="5" colspan="1" data-columns="ide7e3ffe8ca1d48-col-5">
            ${item.message}
        </td>
    </tr>`;
      });

      const htmlString = `<!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8" />
          <title>${templateData.name}</title>
      
          <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" /> -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      
      
          <style id="INLINE_PEN_STYLESHEET_ID">
              h2 {
                  text-align: center;
                  padding: 20px 0;
              }
      
              /*.table-bordered {
                  border: 1px solid #ddd !important;
              }*/
      
              /*table caption {
                  padding: 0.5em 0;
              }*/

      
              .p {
                  text-align: center;
                  padding-top: 140px;
                  font-size: 14px;
              }
              
              /*
              table{
                border-collapse: collapse;
              }
              */
          </style>
          <style type="text/css" media="print">
              @page { size: landscape; }
          </style>
      </head>
      
      <body cz-shortcut-listen="true">
          <h2>Document - ${templateData.name}</h2>
      
          <div class="container-fluid">
      
              <div class="d-flex flex-row  gap-sm-5 mb-4">
                  <div>
                      <h6 class="fw-bold ">Last change on</h6><span>${moment(
                        templateData.lastChangedOn
                      ).format("MM/DD/YYYY | hh:mm:ss a")}</span>
                  </div>
                  <div>
                      <h6 class="fw-bold">Sent on</h6><span>${moment(
                        templateData.sentOn
                      ).format("MM/DD/YYYY | hh:mm:ss a")}</span>
                  </div>
                  <div>
                      <h6 class="fw-bold">Time Zone</h6><span>
                      ${momentTz.tz.guess()}
                      </span>
                  </div>
              </div>
      
              <div class="row">
                  <div class="col-xs-12">
                          
                              <table
                                  class="table table-bordered">
                                  <!--table-borderless -->
                                  <thead >
                                      <tr>
                                          <th >No</th>
                                          <th >
                                          CreatedOn
                                          </th>
                                          <th >
                                            Status
                                          </th>
                                          <th >
                                            IP Address
                                          </th>
                                          <th >
                                            Recipient
                                          </th>
                                          <th >
                                            Message
                                          </th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                   ${allTableDataInHTML}
                                  </tbody>
                                  <!-- <tfoot>
                                      <tr>
                                          <td colspan="5" class="text-center">
                                              <a href="https://www.eruditeworks.com/" target="_blank">EW Sign</a>
                                          </td>
                                      </tr>
                                  </tfoot>-->
                              </table>
                      <!--end of .table-responsive-->
                  </div>
              </div>
          </div>
      </body>
      
      </html>`;
      mywindow.document.write(htmlString);

      setTimeout(() => {
        mywindow.focus(); // necessary for IE >= 10*/
        mywindow.document.close(); // necessary for IE >= 10
        mywindow.print();
        mywindow.close();
        setIsLoading(false);
      }, 1500);

      return true;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!isLoading && (
        <Modal
          isOpen={true}
          onClosed={closeModal}
          centered
          className="modal-container "
          toggle={closeModal}
          fade={false}
          // size={"xl"}
          // fullscreen={"lg"}
          fullscreen
        >
          <ModalHeader>
            <h4 className="fs-4" style={{ color: "#2f373e" }}>
              Audit Trail History
            </h4>
          </ModalHeader>
          <ModalBody id="audit-trail-main-body" >
            {auditTrailData.length > 0 ? (
              <div className="mt-2" >
                <div className="d-flex justify-content-between  mb-4 mx-2">
                  <div className="d-flex flex-column gap-sm-2  flex-md-row gap-md-3 flex-lg-row gap-lg-5 ">
                    <div>
                      <h6 className="fw-bold ">Last change on</h6>
                      <span>
                        {moment(templateData.lastChangedOn).format(
                          "MM/DD/YYYY | hh:mm:ss a"
                        )}
                      </span>
                    </div>
                    <div>
                      <h6 className="fw-bold">Sent on</h6>
                      <span>
                        {moment(templateData.sentOn).format(
                          "MM/DD/YYYY | hh:mm:ss a"
                        )}
                      </span>
                    </div>
                  </div>

                  {/*  */}
                  <div>
                    <Button
                      style={{
                        backgroundColor: "#354259",
                        borderColor: "#354259",
                        color: "#fff",
                        fontWeight: "bold",
                      }}
                      onClick={(e) => handlePrint(e)}
                    >
                      Print Logs
                    </Button>
                    {/* <UncontrolledDropdown group>
                      <Button
                        style={{
                          backgroundColor: "#354259",
                          borderColor: "#354259",
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        Download
                      </Button>
                      <DropdownToggle
                        caret
                        style={{
                          // backgroundColor: "rgba(205,194,174,0.7)",
                          backgroundColor: "#354259",
                          // borderColor: "#fff",
                          color: "#fff",
                        }}
                      />
                      <DropdownMenu>
                        <DropdownItem onClick={() => handlePrint()}>
                          Print Logs
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown> */}
                  </div>
                </div>

                {/*  */}
                <Table hover responsive size="" color="dark">
                  <thead style={{ backgroundColor: "#354259", color: "white" }}>
                    <tr>
                      <th>No</th>
                      <th>
                        Created On{" "}
                        <i
                          className="fa-solid fa-circle-info"
                          id="timezon-help-tooltip"
                        ></i>
                        <Tooltip
                          isOpen={tooltipOpen}
                          target="timezon-help-tooltip"
                          toggle={toggle}
                        >
                          Time Zone {momentTz.tz.guess()}
                        </Tooltip>
                      </th>
                      <th>Status</th>
                      <th>IP Address</th>
                      <th>Recipient</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditTrailData.map((item: any, index: number) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <th className="fw-normal ">
                            <div className="d-flex flex-column ">
                              <span className="fw-normal ">
                                {moment(item.created_at).format("MM/DD/YYYY")}
                              </span>
                              <span className="fw-lighter ">
                                {moment(item.created_at).format("hh:mm:ss a")}
                              </span>
                            </div>
                          </th>
                          <td>{item.action}</td>
                          <td>
                            {item.ip_address}
                            <div className="fw-bold">({item.location})</div>
                          </td>
                          <td>{item.recipient}</td>
                          <td>{item.message}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                {/*  */}
              </div>
            ) : (
              <div className="d-flex  justify-content-center align-items-center h-100 ">
                <h4 className="fw-bold ">No Data Foud</h4>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            {/* <button className="btn " onClick={closeModal}>
            Cancel
          </button>
          <span className="px-2"> </span> */}

            <button onClick={handleClose} className="btn custom-btn1">
              Close
            </button>
          </ModalFooter>
        </Modal>
      )}
      {isLoading ? (
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
