import { emailRegex } from "helpers/constants/validation_constants";

const FetchAllElementsStatus = (allPayload) => {
  const {
    signatureList: { encodedImgData },
    textList: { allTextData: textData },
    emailList: { allEmailData: emailData },
    dateList: { allDateData: dateData },
    pickList: { allPicklistData: pickListData },
    checkboxList: { allCheckboxData: checkboxData },
    coordinatesList: { allCoordinateData },
  } = allPayload.reduxState;

  const totalPages = allCoordinateData[allCoordinateData.length - 1].pageNo;

  // Keep track of completed elements
  const listOfCompletedElements = [];

  for (let i = 0; i <= totalPages; i++) {
    // Check for text fields
    textData[i] &&
      textData[i].map((item) => {
        if (item.isRequired) {
          // If the current input has a value, mark as completed
          if (
            allPayload.textValue?.length > 0 &&
            item.index === allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          } else if (
            item.value?.length > 0 &&
            item.index !== allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          }
        }
      });

    // Check for email fields
    emailData[i] &&
      emailData[i].map((item) => {
        if (item.isRequired) {
          // Check if the email value is valid (matches emailRegex)
          if (
            allPayload.textValue?.length > 0 &&
            item.index === allPayload.elementIndex
          ) {
            if (allPayload.textValue.match(emailRegex)) {
              // Add to completed elements if the email is valid
              listOfCompletedElements.push(item.index);
            }
          } else if (
            item.value?.length > 0 &&
            item.index !== allPayload.elementIndex
          ) {
            if (item.value.match(emailRegex)) {
              // Add to completed elements if the email value is valid
              listOfCompletedElements.push(item.index);
            }
          }
        }
      });

    // Check for date fields
    dateData[i] &&
      dateData[i].map((item) => {
        if (item.isRequired && item.value !== "Invalid date") {
          if (
            allPayload.textValue.length > 0 &&
            item.index === allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          } else if (
            item.value?.length > 0 &&
            item.index !== allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          }
        }
      });

    // Check for checkbox fields
    checkboxData[i] &&
      checkboxData[i].map((item) => {
        if (item.isRequired) {
          if (allPayload.textValue && item.index === allPayload.elementIndex) {
            listOfCompletedElements.push(item.index);
          } else if (item.value && item.index !== allPayload.elementIndex) {
            listOfCompletedElements.push(item.index);
          }
        }
      });

    // Check for PickList fields
    // pickListData[i] &&
    //   pickListData[i].map((item) => {
    //     if (
    //       item.isRequired &&
    //       item.value //&&
    //       // item.index !== allPayload.elementIndex
    //     ) {
    //       listOfCompletedElements.push(item.index);
    //     }
    //   });

    if (
      pickListData[i] &&
      Array.isArray(pickListData[i])
    ) {
      pickListData[i].forEach((item) => {
        if (
          item.isRequired &&
          item.options &&
          item.options.includes(item.value) &&
          item.value?.length>0
        ) {
          listOfCompletedElements.push(item.index);
        }
      });
    }
  }
  

  // Check for signature fields
  allCoordinateData.map((item, i) => {
    if (item.isRequired) {
      if (
        item.fieldType === "Signature" &&
        allPayload.isSignature &&
        allPayload.encodedImgData.length > 0
      ) {
        listOfCompletedElements.push("sign" + i);
      } else if (item.fieldType === "Signature" && encodedImgData.length > 0) {
        listOfCompletedElements.push("sign" + i);
      }
    }
  });

  // Return the total count of completed elements (text and valid emails)
  return {
    totalDoneElements: listOfCompletedElements.length,
  };
};

export { FetchAllElementsStatus };
