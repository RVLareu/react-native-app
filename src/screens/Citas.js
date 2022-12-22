import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, FlatList, Image, StyleSheet  } from 'react-native';
import {
	Layout,
	TopNav,
	Text,
	themeColor,
	useTheme,
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

export default function ({ navigation }) {

	const [citas, setCitas] = useState([])

	const [citasProfesional, setCitasProfesional] = useState([])

	useEffect(()=>{
		getData()
		.then((user_id) => { 
			fetch(`https://tdp-backend-develop.onrender.com/appointments/user?user_id=${user_id}`)
			.then(response => response.json())
			.then(result => {
				setCitas(result)
			})
		})
		getData()
		.then((user_id) => { 
			fetch(`https://tdp-backend-develop.onrender.com/appointments/professional?professional_id=${user_id}`)
			.then(response => response.json())
			.then(result => {
				setCitasProfesional(result)
			})
		})
	}, [])

	const headerComponentCliente = () => {
		return <Text style={ styles.listHeadline }>Citas como cliente</Text>        
	  }
	const headerComponentProfesional = () => {
	return <Text style={ styles.listHeadline }>Citas como profesional</Text>        
	}
	const unaCita = ({ item }) => (
		<View >
			<TouchableOpacity style={ styles.item } onPress={()=>{
			navigation.navigate("Work", {
				'appointment_id': item.id,
				'professional_id': item.professional_id
			})
			}}>
			<Text style={ styles.name }>{item.date.split('T')}</Text>
			</TouchableOpacity>
		</View>    
		);
	
		const listSeparator = () => {
		return <View style={ styles.separator } />
		}    
		const { isDarkmode } = useTheme();
		return (
		<Layout>
			<TopNav
			middleContent="Citas"
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
			<FlatList 
              ListHeaderComponentStyle = { styles.listHeader }
			  ListHeaderComponent = { headerComponentCliente }
			ListEmptyComponent = { <Text style={{textAlign:'center'}}>Aún no tienes citas</Text> }
			data = { citas }
			renderItem={unaCita}        
			ItemSeparatorComponent={ listSeparator }
			// keyExtractor={ professions => professions.whatever }
			/>
			<FlatList 
                    ListHeaderComponentStyle = { styles.listHeader }
					ListHeaderComponent = { headerComponentProfesional }
			ListEmptyComponent = { <Text style={{textAlign:'center'}}>Aún no tienes citas</Text> }
			data = { citasProfesional }
			renderItem={unaCita}        
			ItemSeparatorComponent={ listSeparator }
			// keyExtractor={ professions => professions.whatever }
			/>          
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
		marginTop: 10
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
	
