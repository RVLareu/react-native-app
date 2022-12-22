import React, { useState, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    ScrollView,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text
} from "react-native";
//import DocumentPicker from 'react-native-document-picker';
//import types from 'react-native-document-picker';
//import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';

//import { useNavigate } from "react-router-dom";

//const FILELOADER_URL = '/loadFiles';


const storeData = async (value) => {
  console.log("IMAGE_URL"+value)
  try {
    await AsyncStorage.setItem('image_url', value.toString())
  } catch (e) {
    // saving error
    console.log(e)
  }
}



export default function ({ navigation }) {

    const [file, setFile] = useState({})
    
    let file_uri = ""

    const storeImage = async (value) => {
       console.log("IMAGEN: "+value)
       try {
         setFile(file => ({
              ...file,
              ...value }));
      } catch (e) {
      // saving error
       console.log(e)
      }
    }
    

    const getImage = async () => {
      try {
          const value = await file
          console.log("value:", value)
          return value
      } catch(e) {
        // error reading value
          console.log(e)
      }
  }

    const CLOUD_NAME = 'dwx9rqfjh';
    const UPLOAD_PRESET = 'z87owhgv';
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    
    const [url, setUrl] = useState({});

    const [success, setSuccess] = useState(false);
    
    //const navigate = useNavigate();

    const upload = async () => {
        const data = new FormData();
        console.log(file_uri);
        data.append('file', file_uri);
        data.append('upload_preset', UPLOAD_PRESET);
        data.append('cloud_name', CLOUD_NAME);

        await fetch(cloudinaryUrl,
            {method: "POST",
                body: data})
            .then(resp => resp.json())
            .then(data => {storeData(data.url); setUrl(value.toString())})
            .then(setSuccess(true))
            //const data2 = await response.json()
            .catch(err => console.log(err))
       
     }
    
     const handleDocumentSelection = async () => {
       //try {
         const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [4, 3],
                quality: 1,
                })
         //storeImage(response.assets[0])
         //const response = (result.uri.toString())
         /*setFile(file => ({
              ...file,
              ...response }));*/
         //setFile(response.toString())  
         file_uri = result.uri   
         //console.log("IMAGEN: "+response.toString())
         await upload()
        /*} catch (err) {
        console.warn(err);
      }*/
     };


    return (
        <>
            {success ? (
                    <View style={{backgroundColor: 'grey'}}>
                        <Text>Foto cargada con Exito!</Text>
                        <Image source={url} alt="Preview"/>
                        
                    </View>)

                : (<View className="custom" style={{backgroundColor: 'grey'}}>

                    <Text>
                        Cargar foto
                    </Text>

                    <SafeAreaView style={styles.container} >
                      <StatusBar barStyle={'dark-content'} />
                      
                     
                      <TouchableOpacity
                        onPress={() => handleDocumentSelection()}
                      >
                         <Text size="md"
                    fontWeight="bold"
                    style={{
                        marginLeft: 5,
                    }}> Seleccione </Text>
                      </TouchableOpacity>   
                      
                    </SafeAreaView>
                    
                    
                </View>)}
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
