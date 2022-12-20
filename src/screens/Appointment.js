import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
  ScrollView,
  ImageBackground
} from 'react-native';
import DatePicker, { getFormatedDate }  from 'react-native-modern-datepicker';
import Api from "../components/api/Session";
import { format } from 'date-fns';
import Moment from 'moment';
//import { useNavigate } from "react-router-dom";
import { AsyncStorage } from 'AsyncStorage'; 
 

export default function ({ navigation }) {

  const [date, setDate] = useState(new Date());  
  //const navigate = useNavigate();        
       
  let selected = AsyncStorage.getItem("selected");     
       
  const Agendar = () => {     
    Api.post("/appointments/", 
                  JSON.stringify({ 'user_id': 1, 'professional_id': selected.id, 'date': getFormatedDate(date, "yyyy-MM-dd") }),
                {
                    headers: { 'Content-Type': 'application/json' }
                })    
  }
  
  const CambiarFecha = (date) => {
     setDate(date)
  }
  
  
  useEffect(() => {
    Agendar();
    }, []);
  

    return (
      <ScrollView style={styles.container}>
          <View style={styles.header}>
            <ImageBackground
              source={require('../../assets/background.png')}
              style={styles.background}
            ></ImageBackground>
          </View>
          <Image style={styles.avatar} source={{uri: 'https://image.shutterstock.com/mosaic_250/2780032/1854697390/stock-photo-head-shot-young-attractive-businessman-in-glasses-standing-in-modern-office-pose-for-camera-1854697390.jpg'}}/>

          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Lucas Monk</Text>
              <Text style={styles.info}>Electricista</Text>
            </View>
          </View>
   
        <Text style={styles.textSelect}>Seleccione una fecha</Text>
         
        <View style={styles.datePickerView}>
          <DatePicker style={styles.datePicker}
            date={date}
            onSelectedChange={(date) => CambiarFecha(getFormatedDate(date, 'YYYY/MM/DD'))}
          />
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={()=>{Agendar(); navigation.navigate("Home")}}>
            <Text style={styles.text}>Aceptar</Text>  
          </TouchableOpacity>        
          <TouchableOpacity style={styles.buttonContainerCancel} onPress={() => navigation.navigate("Perfil")}>
            <Text style={styles.text}>Cancelar</Text>  
          </TouchableOpacity>        
        </View>
        
      </ScrollView>
    )
} 


const styles = StyleSheet.create({
  header:{
    height:200,
  },
  background: {
    width: '100%',
    height: 200
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#54b6e9',
    color: 'black',
    width: 300,
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    marginTop: '4%'

  },
  buttonContainerCancel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
    color: 'black',
    width: 300,
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: "2%",
    marginTop: '4%'

  },
  text: {
    fontSize: 27
  },

  textSelect: {
    fontSize: 27,
    color: 'white',
    marginTop: '4%',
    textAlign: 'center'

  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:5,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:10,
  },
  name:{
    fontSize:30,
    color:"#FFFFFF",
    fontWeight: "600",
    marginTop:50,
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10,
  },
  datePicker:{
    fontSize:15,
    color: "#ffffff",
    width: 350,
    alignSelf: 'center',
    mode: "datetime",
    current: "2022-11-01"
  },
  container: {
      backgroundColor: "#0a0a1a",
      height: '100%',

  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#0a0a1a",
    marginTop: '-10'
  },
  icon:{
    width: 20,
    height: 20,
    marginRight: 20
  },


  profileDetail:{
    marginTop:70,
    flex:1,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailContent:{
    margin:10,
    alignItems: 'center'
  },
  title:{
    fontSize:20,
    color: "#00CED1"
  },
  count:{
    fontSize:18,
  },

  datePickerView:{

    backgroundColor: "#0a0a1a",

    
  }
  
});
