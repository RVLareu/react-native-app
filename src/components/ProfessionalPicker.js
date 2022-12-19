import { FormControl } from '@mui/material';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import {View} from 'react-native';
   
      
function ProfessionalPicker (props) {  

  const data = ["Plomero", "Electricista", "Gasista"];

  const [selected, setSelected] = useState(props.selected ? props.selected : "");    
      
  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
    props.setText(1);
   // props.passFilters();
  };    
          
  return (          
          <View sx={{width: '100%'}}>
           <SelectDropdown
             selectedValue={selected}
             data={data}
             style={{ height: 50, width: 150 }}
             onSelect={(itemValue, itemIndex) => {selectionChangeHandler}}
            >
           </SelectDropdown>
         </View>  
       )    
}; export default ProfessionalPicker      
