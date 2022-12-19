import { FormControl } from '@mui/material';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import {View} from 'react-native';
   
      
function ProfessionalPicker (props) {  

  const data = {"Plomero": 1, "Electricista":2, "Gasista":3};
  
  const [selected, setSelected] = useState(props.selected ? props.selected : "");    
      
  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
    props.setText(data(selected));
   // props.passFilters();
  };    
          
  return (          
          <View sx={{width: '100%'}}>
           <SelectDropdown
             selectedValue={selected}
             data={Object.keys(data)}
             style={{ height: 50, width: 150 }}
             onSelect={(itemValue, itemIndex) => {selectionChangeHandler}}
            >
           </SelectDropdown>
         </View>  
       )    
}; export default ProfessionalPicker      
