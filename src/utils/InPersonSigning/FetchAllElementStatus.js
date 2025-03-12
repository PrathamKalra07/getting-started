const FetchAllElementsStatus = (allPayload) => {
    const {
        signatureList: { encodedImgData },
        textList: { allTextData: textData },
        dateList: { allDateData: dateData },
        checkboxList: { allCheckboxData: checkboxData },
        coordinatesList: { allCoordinateData },
      } = allPayload.reduxState;

      console.log('allPayload', allPayload);
      console.log('all payload.reduxState', allPayload.reduxState);
      
      const totalPages = allCoordinateData[allCoordinateData.length - 1].pageNo;

      console.log('alllCoordinateData', allCoordinateData);
      

      const listOfCompletedElements = [];

      for (let i = 0; i <= totalPages; i++) {
        console.log('textData', textData);
        
        textData[i] &&
          textData[i].map((item) => {
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
    
      console.log('before items sign');
      allCoordinateData.map((item, i) => {
        console.log('after items sign' + JSON.stringify(item));
        
        if(item.isRequired){
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
      
    
      return {
        totalDoneElements: listOfCompletedElements.length,
      };
}

export { FetchAllElementsStatus }