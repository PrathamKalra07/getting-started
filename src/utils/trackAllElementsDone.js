const FetchAllElementsStatus = (allPayload) => {
  const {
    signatureList: { encodedImgData },
    textList: { allTextData: textData },
    emailList: { allEmailData: emailData },
    dateList: { allDateData: dateData },
    checkboxList: { allCheckboxData: checkboxData },
    coordinatesList: { allCoordinateData },
  } = allPayload.reduxState;
  const totalPages = allCoordinateData[allCoordinateData.length - 1].pageNo;

  console.log("allPayload", allPayload);
  

  // var totalDoneElements = 0;
  const listOfCompletedElements = [];

  for (let i = 0; i <= totalPages; i++) {
    console.log("textData", textData);
    
    textData[i] &&
      textData[i].map((item) => {
        if (item.isRequired) {
          if (
            allPayload.textValue.length > 0 &&
            item.index === allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          } else if (
            item.value.length > 0 &&
            item.index !== allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          }
        }
      });
      
    emailData[i] &&
      emailData[i].map((item) => {
        if (item.isRequired) {
          if (
            allPayload.textValue.length > 0 &&
            item.index === allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          } else if (
            item.value.length > 0 &&
            item.index !== allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          }
        }
      });

    dateData[i] &&
      dateData[i].map((item) => {
        if (item.isRequired && item.value !== "Invalid date") {
          if (
            allPayload.textValue.length > 0 &&
            item.index === allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          } else if (
            item.value.length > 0 &&
            item.index !== allPayload.elementIndex
          ) {
            listOfCompletedElements.push(item.index);
          }
        }
      });
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
  }

  allCoordinateData.map((item, i) => {
    if(item.isRequired){
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

  return {
    totalDoneElements: listOfCompletedElements.length,
  };
};
export { FetchAllElementsStatus };
