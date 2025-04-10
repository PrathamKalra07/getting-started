import { emailRegex } from "helpers/constants/validation_constants";
const FetchAllElementsStatus = (allPayload) => {
  const {
    inPerson: {
      inPersonSignatureList: { encodedImgData = [] } = {},
      inPersonTextList: { allTextData: textData = [] } = {},
      inPersonEmailList: { allEmailData: emailData = [] } = {},
      inPersonDateList: { allDateData: dateData = [] } = {},
      inPersonCheckboxList: { allCheckboxData: checkboxData = [] } = {},
      inPersonCoordinatesList: { activeSignatoriesCoordinateData = [] } = {},
    },
  } = allPayload.reduxState;

  console.log('allPayload', allPayload);
  console.log('all payload.reduxState', allPayload.reduxState);

  const totalPages = activeSignatoriesCoordinateData.length > 0
    ? activeSignatoriesCoordinateData[activeSignatoriesCoordinateData.length - 1].pageNo
    : 0;

  console.log('activeSignatoriesCoordinateDataaa', activeSignatoriesCoordinateData);

  const listOfCompletedElements = [];
  let totalDoneElements = listOfCompletedElements.length;

  for (let i = 0; i <= totalPages; i++) {
    console.log('textData', textData);

    if (textData[i]) {
      textData[i].forEach((item) => {
        console.log('items', item);
        console.log('item index', item.index);

        if (item.isRequired) {
          if (
            allPayload.textValue.length > 0 &&
            item.index === allPayload.elementIndex
          ) {
            console.log('item.index', item.index);

            listOfCompletedElements.push(item.index);
          } else if (
            // item.value.length > 0 &&
            item.index !== allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          }
        }
      });
    }

    // Check for email fields
    if (emailData[i]) {
      emailData[i].forEach((item) => {

        if (item.isRequired) {
          if (
            allPayload.textValue.length > 0 &&
            item.index === allPayload.elementIndex
          ) {
            if (allPayload.textValue.match(emailRegex)) {
              listOfCompletedElements.push(item.index);
            }
          } else if (
            item.value.length > 0 &&
            item.index !== allPayload.elementIndex
          ) {
            if (allPayload.textValue.match(emailRegex)) {
              listOfCompletedElements.push(item.index);
            }
          }
        }
      });
    }

    if (dateData[i]) {
      dateData[i].forEach((item) => {
        if (item.isRequired && item.value !== "Invalid date") {
          if (
            allPayload.textValue.length > 0 &&
            item.index === allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          } else if (
            // item.value.length > 0 &&
            item.index !== allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          }
        }
      });
    }

    if (checkboxData[i]) {
      checkboxData[i].forEach((item) => {
        if (item.isRequired) {
          if (allPayload.textValue && item.index === allPayload.elementIndex) {
            listOfCompletedElements.push(item.index);
          } else if (item.value && item.index !== allPayload.elementIndex) {
            listOfCompletedElements.push(item.index);
          }
        }
      });
    }
  }

  console.log('before items sign');
  activeSignatoriesCoordinateData.forEach((item, i) => {
    console.log('after items sign' + JSON.stringify(item));

    if (item.isRequired) {
      console.log('after  sign is required' + JSON.stringify(item));
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

  console.log('listOfCompletedElements', listOfCompletedElements);
  console.log('listOfCompletedElements length', listOfCompletedElements.length);

  return {
    totalDoneElements,
    listOfCompletedElements
  };
}

export { FetchAllElementsStatus }