import React, { useEffect, useState }  from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity,
  Picker, Image} from "react-native";
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
  TextInput
} from "react-native-rapi-ui";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";



export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();
  const [professionals, setProfessionals] = useState([])
  useEffect(()=>{
    fetch('https://tdp-backend-develop.onrender.com/professionals')
    .then(response => response.json())
    .then(result => {
      console.log(result.professionals)
      setProfessionals(result.professionals)})
  }, [])

  const style = StyleSheet.create({
    header: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'green',
    },
    headerTitle: {
      color:  isDarkmode ? 'white' : "black",
      fontWeight: 'bold',
      fontSize: 23,
      marginTop: 10
    },
    inputContainer: {
      height: 60,
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 10,
      position: 'absolute',
      top: 90,
      flexDirection: 'row',
      paddingHorizontal: 30,
      alignItems: 'center',
      elevation: 12,
      paddingLeft: 10,
    },
    categoryContainer: {
      marginTop: 60,
      marginHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    iconContainer: {
      height: 60,
      width: 60,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    sectionTitle: {
      marginHorizontal: 20,
      marginVertical: 20,
      fontWeight: 'bold',
      fontSize: 20,
    },
  });
   
   
 const [text, setText] = useState('');  
  
 const handleText = (text) => {
  
    setText(text);
    AsyncStorage.setItem("professional", text);
  }

  const handleSelect = (p) => {
       console.log(p);
       navigation.navigate("ProfessionalProfile", {"name2": p.name, "profession_id": p.profession_id, "id": p.id});
       AsyncStorage.setItem("selected", p);
     }
   
  
  return (
    <Layout>
      <ScrollView vertical={true} showsVerticalScrollIndicator={false}>
      <View
          style={{
            backgroundColor: isDarkmode ? 'black' : 'white',
            height: 120,
            paddingHorizontal: 20,
          }}>
          
            <Text style={style.headerTitle}>La solución</Text>
            <Text style={style.headerTitle}>al alcance de la mano</Text>
          
            <TouchableOpacity onPress={() => {
                if (isDarkmode) {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }} style={{marginLeft: '90%'}}>
              <Ionicons name="bulb" size={24} color="#52575D"></Ionicons>

            </TouchableOpacity>  
        </View>

      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Section  style={{width:'100%'}}>
          <SectionContent>
          
            <Button
              text="Profesiones"
              onPress={() => {
                navigation.navigate("Profesiones");
              }}
              style={{
                marginTop: 10,
              }}
            />


            <Button
              text={isDarkmode ? "Light Mode" : "Dark Mode"}
              status={isDarkmode ? "success" : "warning"}
              onPress={() => {
                if (isDarkmode) {
                  setTheme("light");
                } else {
                  setTheme("dark");
                }
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
        <Text style={{ fontSize: 30, color: isDarkmode ? "white" : 'black', fontWeight: "300", marginTop:30, marginBottom: 20, marginLeft: -130}}>Mejores Puntados</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {console.log("p", professionals)}
            {professionals.map(p => {
              return (
                <View style={styles.mediaImageContainer} key={p.id}>
                  <Image source={{uri:p.link_pic}} style={styles.image} resizeMode="cover"></Image>
                  <Text style={{ fontWeight: "300", fontSize: 20, textAlign:'center' }}>{p.name}</Text>
                </View>
              )
            })}

        </ScrollView>
        <Text style={{ fontSize: 30, color: isDarkmode ? "white" : 'black', fontWeight: "300", marginBottom: 20, paddingTop: 10, marginLeft: 120}}>Mejores Plomeros</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {console.log("p", professionals)}
            {professionals.map(p => {
              return (
                <View style={styles.mediaImageContainer} key={p.id}>
                  <Image source={{uri:p.link_pic}} style={styles.image} resizeMode="cover"></Image>
                  <Text style={{ fontWeight: "300", fontSize: 20, textAlign:'center' }} onPress={() => handleSelect(p)}>{p.name}</Text>
                </View>
              )
            })}

        </ScrollView>
      </View>
      </ScrollView>

    </Layout>
  );
}



const styles = StyleSheet.create({

  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },

  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10,
      flex:1,
      alignContent:'center',
      backgroundColor: 'grey'  }
      ,

});
