import { View, SafeAreaView, FlatList, Image, StyleSheet } from 'react-native';
import React from "react";
import { useState, useEffect } from 'react';
import {
  Layout,
  TopNav,
  Text,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native';

export default function ({ navigation, route }) {
  const [professionals, setProfessionals] = useState([])
  

  useEffect(()=>{
    const { itemId} = route.params;
    console.log(itemId)
    fetch(`https://tdp-backend-develop.onrender.com/professionals?profession_id=${itemId}`)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        setProfessionals(result.professionals)})
  }, [])

  const oneProfessional = ({ item }) => (
    <View >
      <TouchableOpacity style={ styles.item } onPress={()=>{
        navigation.navigate("ProfessionalProfile", {
            'name2': item.name,
            'profession_id': item.profession_id,
            'id': item.id
        })
      }}>
        <View style={ styles.avatarContainer }>
          <Image source={ {uri:item.link_pic} } style={ styles.avatar }  />
        </View>      
        <Text style={ styles.name }>{item.name}</Text>
        </TouchableOpacity>
    </View>    
  );

  headerComponent = () => {
    return <Text style={ styles.listHeadline }>Profesionales</Text>        
  }

  listSeparator = () => {
    return <View style={ styles.separator } />
  }    
  const { isDarkmode } = useTheme();
  return (
    <Layout>
      <TopNav
        middleContent="Profesionales"
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
        ListHeaderComponent = { headerComponent }              
        ListEmptyComponent = { <Text>Aún no hay profesionales</Text> }
        data = { professionals }
        renderItem={oneProfessional}        
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
    paddingVertical: 13,    
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