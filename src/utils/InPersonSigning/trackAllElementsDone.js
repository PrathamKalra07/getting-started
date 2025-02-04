const fetchAllElementsStatus = (signatoryUUID, allCoordinatesState) => {
    const updatedSignatoryList = allCoordinatesState.signatoryList.map(signatory => {
        console.log('@@@ signatory::'+ JSON.stringify(signatory));
        
        if (signatory.signatoryUUID === signatoryUUID) {
            
            const completedFieldsList = allCoordinatesState.allCoordinateData.filter(coordinate => {
                console.log('@@@ coordinate::'+ JSON.stringify(coordinate));

                return coordinate.signatoryUUID === signatoryUUID && coordinate.fieldType !== 'Checkbox' && coordinate.value !== '';
            });
            
            let completedFields = completedFieldsList ? completedFieldsList.length : 0;

            if(signatory.value !== "") {
                for (const item of allCoordinatesState.activeSignatoriesCoordinateData) {
                    if (item.fieldType === 'Signature') {
                        completedFields++;
                    }
                }
            }

            return {
                ...signatory,
                completedNoOfFields: completedFields
            };
        } else {
          return signatory;
        }
      });
    return updatedSignatoryList;
  };
  export { fetchAllElementsStatus };
  