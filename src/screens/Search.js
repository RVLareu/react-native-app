import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView,
  TextInput,
  ImageBackground,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Api from "../components/api/Session";
import ProfessionalPicker from "../components/ProfessionalPicker";
import Data from "../components/ProfessionalPicker";
import Icon from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage } from 'AsyncStorage';


export default function ({ navigation }) {

  const [professional_id, setProfessional_id] = useState('');
  const [profession_id, setProfession_id] = useState('');
  const [user_longitude, setUser_longitude] = useState('');
  const [user_latitude, setUser_latitude] = useState('');
  const [dist, setDist] = useState('');
  
  
  const [appliedFilters, setAppliedFilters] = useState(null);
  const [professionals, setProfessionals] = useState([]);
  
  
  let text = AsyncStorage.getItem("professional");
  
  
  const handleSearch = () => {
   
    let params = new URLSearchParams([['professional_id', professional_id], ['profession_id', profession_id], ['user_longitude', user_longitude],
                                        ['user_latitude', user_latitude], ['dist', dist]]);
   
    let keysForDel = [];
    
    
    for (let [key,value] of params)
    {
      if (value == '') {
        keysForDel.push(key);
      }
    };
    
    for (let key of keysForDel)
    {
        params.delete(key);
    };
    
    console.log(params) 
     
    const headers = {headers:{
                     'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }}
                          
    Api({method:'get', url:'/professionals', data: {}, params: params, headers: headers})
    .then((response) => {
      setAppliedFilters('');
      setProfessionals(response.data.professionals);
      console.log(professionals);
    })
    .catch((error) => {
      console.log(error);
    });

  }
  

    return (
      
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
           <TouchableOpacity onPress={() => {handleSearch()}}>
              <Icon name="search" size={25}/>
            </TouchableOpacity>   
           <ProfessionalPicker selected={profession_id} setText={setProfession_id}/>
         </View>
        <View>
        <FlatList 
          style={styles.notificationList} 
          enableEmptySections={true}
          data={professionals}
          renderItem={({item}) => {
            return (
              <View style={styles.notificationBox}>
                <Image style={styles.image}
                  source={{uri: item.link_pic}}/>                     
                    <Text style={styles.description} onPress={()=>navigation.navigate("Perfil")}>{item.profession_id}</Text>
                    <Text style={styles.distance}>{item.name} Km</Text>
                    <Text style={styles.icon}>{item.latitude}</Text>
                    <Text style={styles.icon}>{item.longitude}</Text>
                    <Image style={styles.star} source={{uri: "https://img.icons8.com/ios/512/christmas-star.png"}}/>
              </View>
            )}}/>
        </View>    
       </View>
     </View>
    );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      height:45,
      flexDirection: 'row',
      alignItems:'center',
      flex:1,
      margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  saveButton: {
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    width:70,
    alignSelf: 'flex-end',
    backgroundColor: '#40E0D0',
    borderRadius:30,
  },
  saveButtonText: {
    color: 'white',
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  notificationBox: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    borderColor: 'black',
    broder: '2px',
    flexDirection: 'row',
    borderRadius:10,
    boxShadow: '5px 5px 2px lightblue'
    },
  image:{
    width:45,
    height:45,
  },
  description:{
    fontSize:18,
    color: "#3498db",
    marginLeft:10,
  },
  distance:{
    // must be bottom right
    position: 'absolute',
    right: 70,
    bottom: 10,
    fontSize:18,
    color: "#3498db",
    },
    background: {
      width: '100%',
      height: '100%'
    },
  icon:{
    // must be bottom right
    position: 'absolute',
    right: 25,
    bottom: 10,
    fontSize:18,
    color: "#3498db",
    },
    star:{
        // will be bottom right
        position: 'absolute',
        right: 0,
        bottom: 12,
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
});
