import React, { useState } from 'react';
import Select from 'react-select';


const CustomSelect = ({options, value, onChange}) => {

  return (
    <>
      <Select 
      defaultValue={options[0]}
      options={options}
      value={value} 
      onChange={(e) => {
        console.log(e);
        
        onChange(e);
        // setSelectedSignatory(e);
      }}/>
    </>
  );
};

export default CustomSelect;