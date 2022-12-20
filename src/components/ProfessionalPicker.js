import { FormControl } from '@mui/material';
import React, { useState } from 'react';
import SelectDropdown from 'react-native-select-dropdown'
import {View} from 'react-native';


const Data = {"Plomero": 1, "Electricista":2, "Gasista":3};   
      
function ProfessionalPicker (props) {  
  
  const [selected, setSelected] = useState(props.selected ? props.selected : "");    
      
  const selectionChangeHandler = (selectedValue, index) => {
    setSelected(selectedValue);
    props.setText(index+1);
   // props.passFilters();
   console.log(selectedValue)
   console.log(index)
  };    
          
  return (          
          <View sx={{width: '100%'}}>
           <SelectDropdown
             selectedValue={selected}
             data={Object.keys(Data)}
             style={{ height: 50, width: 150 }}
             onSelect={(selectedValue, index) => {selectionChangeHandler(selectedValue, index)}}
            >
           </SelectDropdown>
         </View>  
       )    
}; export default ProfessionalPicker      
