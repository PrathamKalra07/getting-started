const fetchCoordsPageAndTypeWise = (signatoryCoords, uuid, type) => {
    return signatoryCoords.reduce(
      (acc, item, i) => {
        const { signatoryUUID, fieldType, pageNo } = item;
        const newItem = { ...item, id: item.eleId, value: item.value?? '', index: i };
        
        console.log('@@@ newItem: '+ JSON.stringify(newItem));
        if(signatoryUUID === uuid && fieldType === type) {
          acc.coordsPagesWise[pageNo] = [
            ...(acc.coordsPagesWise[pageNo] || []),
            newItem,
          ];
        }
  
        return acc;
      },
      {
        coordsPagesWise: {},
      }
    );
  };
  
export { fetchCoordsPageAndTypeWise };