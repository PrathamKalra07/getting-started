const fetchAllElementsStatus = (signatoryUUID, allCoordinatesState) => {
    const updatedSignatoryList = allCoordinatesState.signatoryList.map(signatory => {
        
        if (signatory.signatoryUUID === signatoryUUID) {
            
            let completedFields = allCoordinatesState.allCoordinateData.filter(coordinate => {
                return coordinate.signatoryUUID === signatoryUUID && coordinate.fieldType !== 'Checkbox' && coordinate.value !== '';
            }).length;
            
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
  