const updateValueByEleId = (dataList, eleId, newValue) => {
  return dataList.map(data => {
    console.log('@@@ data::'+ JSON.stringify(data));
    if (data.eleId === eleId) {
      data.value = newValue;
    }
    return data;
  }) 
}

export { updateValueByEleId };