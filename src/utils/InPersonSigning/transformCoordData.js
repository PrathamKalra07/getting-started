const transformData = (inputData) => {
    const transformedData = [];
    
    for (const entry of inputData.coord) {
      for (const coordData of entry.coordData) {
        transformedData.push({
          coordinateId: coordData.coordinateId,
          x: coordData.x,
          y: coordData.y,
          height: coordData.height,
          width: coordData.width,
          pageNo: coordData.pageNo,
          fieldId: coordData.fieldId,
          fieldType: coordData.fieldType,
          eleId: coordData.eleId,
          value: coordData.value,
          signatoryUUID: entry.signatoryUUID,
          signatoryName: entry.signatoryName,
        });
      }
    }
    console.log("transformedData",transformedData);
    return transformedData;
  }

export { transformData };
