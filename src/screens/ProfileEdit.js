import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { Layout, TextInput, Button,useTheme, TopNav } from "react-native-rapi-ui";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import FileLoader from '../components/FileLoader';


const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('user_id')
        return value
    } catch(e) {
        console.log(e)
    }
}

export default function ({ navigation }) {
    const [newName, setNewName] = useState(undefined);
    const [newProfessionId, setNewProfessionId] = useState(undefined);

    const [newLinkpic, setNewLinkpic] = useState(undefined);
    const [newLongitude, setNewLongitude] = useState(undefined);
    const [newLatitude, setNewLatitude] = useState(undefined);

    const [professions, setProfessions] = useState([]);
    const { isDarkmode} = useTheme();


    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        var getOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(`https://tdp-backend-develop.onrender.com/professions`, getOptions)
            .then(response => response.json())
            .then(result => setProfessions(result))
            .catch(error => console.log('error', error));

        getData()
            .then((user_id) => {
            fetch(`https://tdp-backend-develop.onrender.com/profile/?user_id=${user_id}`, getOptions)
                .then(response => response.json())
                .then(result => { 
                    setNewName(result.name)
                    setNewProfessionId(result.profession_id)
                })
                .catch(error => console.log('error', error));
        })
    }, [])

    const saveProfileChanges = () => {
        getData()
            .then((user_id) => {
                var myHeaders = new Headers();
                myHeaders.append("accept", "application/json");
                myHeaders.append("Content-Type", "application/json");
                
                var raw = JSON.stringify({
                    "user_id": user_id,
                    "name": newName,
                    "link_pic": newLinkpic,
                    "longitude": newLongitude,
                    "latitude": newLatitude,
                    "profession_id": newProfessionId
                  });

                var putOptions = {
                    method: 'PUT',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };

                fetch(`https://tdp-backend-develop.onrender.com/profile/?user_id=${user_id}`, putOptions)
                .catch(error => console.log('error', error));
            })
    }

    return (
		<Layout>
            <TopNav
            middleContent="Editar Perfil"
            leftContent={
            <Ionicons
                name="chevron-back"
                size={20}
                color={isDarkmode ? themeColor.white100 : "#191921"}
            />
            }
            leftAction={() => navigation.goBack()}
        />
            <SafeAreaView style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.section}>
                        <Text>Nombre</Text>
                        <TextInput
                            containerStyle={{ marginTop: 15 }}
                            placeholder="Ingrese su nuevo nombre"
                            value={newName}
                            autoCapitalize="none"
                            autoCompleteType="off"
                            autoCorrect={false}
                            keyboardType="name-address"
                            onChangeText={(text) => setNewName(text)}
                        />
                    </View>
                
                    <Text>Elegi tu profesion </Text>
                    <View style={styles.section}>
                        {professions.map(profession =>
                        <Button
                            color ={newProfessionId == profession.id ? "#1E6738" : "#3366FF"}
                            key={profession.id}
                            text={profession.title}
                            onPress={() => {
                                setNewProfessionId(profession.id)
                            }}
                        />) }
                    </View>
                    
                    <Text>Cargar foto de perfil </Text>
                    
                    <FileLoader/>
                    
                    <View style={styles.section}>
                        <Button
                            text={"Guarda tus cambios"}
                            onPress={() => saveProfileChanges()}
                        />
                    </View>

                    <View style={styles.section}>
                        <Button
                            text={"Regresar"}
                            onPress={() => navigation.navigate("Home")}
                        />
                    </View>

                </ScrollView>      
            </SafeAreaView>
		</Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#FFF"
    },
    headerTitle: {
        color: "black",
        fontWeight: 'bold',
        fontSize: 23
    },
    title: {
        paddingTop: 20
    },
    section: {
        paddingTop: 20,
        paddingBottom: 20
    }
});
