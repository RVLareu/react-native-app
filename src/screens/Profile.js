import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView,
     } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Layout, TextInput, Button, useTheme, TopNav } from "react-native-rapi-ui";
import AsyncStorage from '@react-native-async-storage/async-storage';

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


export default function ({ navigation }) {


    const [name, setName] = useState('')
    const [profession, setProfession] = useState('')
    const [rating, setRating] = useState('')
    const { isDarkmode} = useTheme();

    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        getData()
        .then((user_id) => {
        fetch(`https://tdp-backend-develop.onrender.com/profile/?user_id=${user_id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setName(result.name)
                fetch(`https://tdp-backend-develop.onrender.com/professions?profession_id=${result.profession_id}`, requestOptions)
                .then(response => response.json())
                .then(result2 => {
                    console.log("res",result2)
                    setProfession(result2.title)})
                fetch(`https://tdp-backend-develop.onrender.com/rating?professional_id=${user_id}`, requestOptions)
                .then(response => response.json())
                .then(result => setRating(result.mean))
                console.log(result)
            })
            .catch(error => console.log('error', error));
    })
    }, [])
    return (
		<Layout>
            <TopNav
            middleContent="Perfil"
            leftContent={
            <Ionicons
                name="chevron-back"
                size={20}
                color={isDarkmode ? themeColor.white100 : "#191921"}
            />
            }
            leftAction={() => navigation.goBack()}
            rightContent={
                <Ionicons name="settings" size={24} color="#52575D"></Ionicons>
            }
            rightAction={() => navigation.navigate("ProfileEdit")}
        />
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                   
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("../../assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.active}></View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{name}</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{profession}</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>137</Text>
                        <Text style={[styles.text, styles.subText]}>Trabajos</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{rating}</Text>
                        <Text style={[styles.text, styles.subText]}>Calificación</Text>
                    </View>

                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("../../assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                    <View style={styles.jobsCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>3</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Destacados</Text>
                    </View>
                </View>

                <Text style={[styles.subText, styles.recent]}>Últimos Trabajos</Text>

                <View style={{ alignItems: "center" }}>
				
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Realizó un trabajo de  <Text style={{ fontWeight: "400" }}>reparación</Text> y fue calificado con  <Text style={{ fontWeight: "400" }}>5</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
							Realizó un trabajo por <Text style={{ fontWeight: "400" }}>encargo</Text> y fue calificado con  <Text style={{ fontWeight: "400" }}>4</Text>
                            </Text>
                        </View>
                    </View>

                </View>
                
                <View style={styles.section}>
                        <Button
                            text={"Editar"}
                            onPress={() => navigation.navigate("ProfileEdit")}
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
        backgroundColor: "#FFF"
    },
    text: {
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },

    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    jobsCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -95,
        marginLeft: 15,
        width: 90,
        height: 80,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    section: {
        paddingTop: 20,
        paddingBottom: 20
    }
});
