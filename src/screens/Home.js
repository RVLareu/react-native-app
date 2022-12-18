import React from "react";
import { View, Linking, StyleSheet } from "react-native";
import {
  Layout,
  Button,
  Text,
  Section,
  SectionContent,
  useTheme,
  TextInput
} from "react-native-rapi-ui";

import Icon from 'react-native-vector-icons/MaterialIcons';


export default function ({ navigation }) {
  const { isDarkmode, setTheme } = useTheme();

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
  return (
    <Layout>
      <View
          style={{
            backgroundColor: isDarkmode ? 'black' : 'white',
            height: 120,
            paddingHorizontal: 20,
          }}>
          <View style={{flex: 1, marginTop: 20}}>
            <Text style={style.headerTitle}>La solución</Text>
            <Text style={style.headerTitle}>al alcance de la mano</Text>
            <View style={style.inputContainer}>
              <Icon name="search" size={25} />
              <TextInput
                placeholder="Buscar Profesional"
                style={{color: 'grey'}}
              />
            </View>
          </View>
        </View>


      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Section>
          <SectionContent>
          
            <Button
              text="Vender"
              onPress={() => {
                navigation.navigate("SecondScreen");
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
      </View>


    </Layout>
  );
}


