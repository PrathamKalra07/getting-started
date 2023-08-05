const updateValueByEleId = (dataList, eleId, newValue) => {
  for (const data of dataList) {
    if (data.eleId === eleId) {
      data.value = newValue;
      return dataList;
    }
  }
}

export { updateValueByEleId };