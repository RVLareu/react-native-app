import React, { useLayoutEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, Image, StyleSheet  } from 'react-native';
import {
	Layout,
	TopNav,
	Text,
	themeColor,
	useTheme,
    Button,
    TextInput
  } from "react-native-rapi-ui";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';


const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id')
        console.log("value:", value)
        return value
    } catch(e) {
      // error reading value
        console.log(e)
    }
}

export default function ({ navigation, route }) {

	const [work, setWork] = useState(false)
    const [userIsProfessional, setUserIsProfessional] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [appId, setAppId] = useState(0)
    const [paid, setPaid] = useState(false)
    const [comments, setComments] = useState(false)
    

	useLayoutEffect(()=>{
        console.log("aa",route.params)
        const {appointment_id, professional_id} = route.params;
        console.log("app",appointment_id)
        setAppId(appointment_id)
		getData()
		.then((user_id) => {
            if (parseInt(user_id) === parseInt(professional_id)) setUserIsProfessional(true)
			fetch(`https://tdp-backend-develop.onrender.com/work?appointment_id=${appointment_id}`)
			.then(response => response.json())
			.then(result => {
                if (result == null) {

                }else {
                        console.log(result)
                        setTitle(result.title)
                        setDescription(result.description)
                        setPrice(result.price)
                        console.log(result.paid)
                        if(result.paid == 'true') setPaid(true)
                        setWork(true)
                    }         

			}) 
		})
	}, [])
	

    const cargarTrabajo = () => {
        var myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "title": title,
      "description": description,
      'price': price,
      "appointment_id": appId,
      'paid': false
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://tdp-backend-develop.onrender.com/work", requestOptions)
      .then(response => response.json())
        .then(()=> {
            navigation.navigate("Citas")
        })
      .catch(error => {
        console.log('error', error)
      });
    }

		const { isDarkmode } = useTheme();
            return (
                <Layout>
                    <TopNav
                    middleContent="Trabajo"
                    leftContent={
                        <Ionicons
                        name="chevron-back"
                        size={20}
                        color={isDarkmode ? themeColor.white100 : "#191921"}
                        />
                    }
                    leftAction={() => navigation.goBack()}
                    />
                    <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    >
                    {/* This text using ubuntu font */}
                    <SafeAreaView style={ styles.container }>
                        {userIsProfessional && !work ? (            <>
                                    <TextInput
                                    containerStyle={{ marginTop: 15 }}
                                    placeholder="Trabajo"
                                    value={title}
                                    autoCapitalize="none"
                                    autoCompleteType="off"
                                    autoCorrect={false}
                                    keyboardType="title"
                                    onChangeText={(text) => setTitle(text)}
                                  />
                                    <TextInput
                                    containerStyle={{ marginTop: 15 }}
                                    placeholder="Descripcion"
                                    value={description}
                                    autoCapitalize="none"
                                    autoCompleteType="off"
                                    autoCorrect={false}
                                    keyboardType="text"
                                    onChangeText={(text) => setDescription(text)}
                                  />
                                    <TextInput
                                    containerStyle={{ marginTop: 15 }}
                                    placeholder="Precio"
                                    value={price}
                                    autoCapitalize="none"
                                    autoCompleteType="off"
                                    autoCorrect={false}
                                    keyboardType="number"
                                    onChangeText={(text) => setPrice(text)}
                                  />
                                    <Button
                                        text="Cargar trabajo"
                                        onPress={() => {
                                            cargarTrabajo()
                                        }}
                                        style={{
                                            marginTop: 20,
                                        }}
                                        
                                        />
                                                                    </>
                                                        ):  userIsProfessional && work ? (<View style={{flex:1, alignItems: 'center'}}>
                                                        <Text style={{alignText: 'center', marginTop: 20, fontSize: 40, fontWeight: 'bold', textTransform: 'uppercase'}}> {title}</Text>
                                                        <Text style={{alignText: 'center', marginTop: 20, fontSize: 20}}> {description}</Text>
                                                        <Text style={{alignText: 'center', marginTop: 20, fontWeight: 'bold', fontSize: 30}}> ${price}</Text>
                                                        <Text style={{alignText: 'center', marginTop: 20, fontWeight: 'bold', fontSize: 30}}> {paid ? <><Ionicons name="chackmark-circle-outline" size={24} color="#52575D"></Ionicons><Text>PAGADO</Text></> : <View style={{flex:1, justifyContent: 'center', alignContent:'center'}}><Text>SIN PAGAR</Text><Ionicons name="close-circle-outline" size={40} color="#52575D"></Ionicons></View>}</Text>

                                                        </View>
                                                        ): !userIsProfessional && work ? <View style={{flex:1, alignItems: 'center'}}>
                                                        <Text style={{alignText: 'center', marginTop: 20, fontSize: 40, fontWeight: 'bold', textTransform: 'uppercase'}}> {title}</Text>
                                                        <Text style={{alignText: 'center', marginTop: 20, fontSize: 20}}> {description}</Text>
                                                        <Text style={{alignText: 'center', marginTop: 20, fontWeight: 'bold', fontSize: 30}}> ${price}</Text>
                                                        <Text style={{alignText: 'center', marginTop: 20, fontWeight: 'bold', fontSize: 30}}> {paid ? <><Ionicons name="chackmark-circle-outline" size={24} color="#52575D"></Ionicons><Text>PAGADO</Text></> :                                                         
                                                        <View style={{flex:1}}>
                                                            <TextInput
                                                            containerStyle={{ marginTop: 15}}
                                                            placeholder=" Comentarios "
                                                            value={comments}
                                                            autoCapitalize="none"
                                                            autoCompleteType="off"
                                                            autoCorrect={false}
                                                            keyboardType="text"
                                                            multiline={true}
                                                            numberOfLines={5}
                                                            onChangeText={(text) => setComments(text)}
                                                        />
                                                        <Button text="Pagar"
                                                        onPress={() => {
                                                            pagar()
                                                        }}
                                                        style={{
                                                            marginTop: 20,
                                                        }}></Button></View>}</Text>
                                                        

                                                        </View> : <Text style={{alignText: 'center', marginTop: 20, fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase'}}>El profesional no ha crgado el trabajo aún</Text>
}
                        
                </SafeAreaView>
                    </View>
                </Layout>
                );
	}
	
	
	const styles = StyleSheet.create({
		container: {
		flex: 1,
		marginHorizontal: 21,
		width: '95%'
		},
	
		listHeader: {
		height: 55,    
		alignItems: 'center',
		justifyContent: 'center',    
		marginBottom: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#7B52AB',
		},
	
		listHeadline: {
		color: '#333333',
		fontWeight: 'bold',
		fontSize: 21,
		},
	
		item: {
		flex: 1,
		flexDirection: 'row',    
		alignItems: 'center',
		paddingVertical: 20,    
		},
	
		avatarContainer: {        
		backgroundColor: '#D9D9D9',
		height: 89,
		width: 89,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',    
		},
		
		avatar: {
		height: '100%',
		width: '100%',
		borderRadius: 100,
		},
	
		name: {
		fontWeight: '600',
		fontSize: 16,
		marginLeft: 13,
		},
	
		separator: {
		height: 1,
		width: '100%',
		backgroundColor: '#CCC',
		},
	
	});
	