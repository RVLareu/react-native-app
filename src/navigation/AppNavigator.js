import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { themeColor, useTheme } from "react-native-rapi-ui";
import TabBarIcon from "../components/utils/TabBarIcon";
import TabBarText from "../components/utils/TabBarText";

import Home from "../screens/Home";
import Profesiones from "../screens/Profesiones";
import Profesionales from "../screens/Profesionales";
import ProfessionalProfile from "../screens/ProfessionalProfile";
import ProfileEdit from "../screens/ProfileEdit";
import Work from "../screens/Work";


import Citas from "../screens/Citas";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import Appointment from "../screens/Appointment";


const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Profesiones" component={Profesiones} />
      <MainStack.Screen name="Profesionales" component={Profesionales} />
      <MainStack.Screen name="ProfessionalProfile" component={ProfessionalProfile} />
      <MainStack.Screen name='ProfileEdit' component={ProfileEdit} />
      <MainStack.Screen name="Search" component={Search} />
      <MainStack.Screen name="Appointment" component={Appointment} />
      <MainStack.Screen name="Profile" component={Profile} />
      <MainStack.Screen name="Work" component={Work} />

    </MainStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const MainTabs = () => {
  const { isDarkmode } = useTheme();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: isDarkmode ? themeColor.dark100 : "#c0c0c0",
          backgroundColor: isDarkmode ? themeColor.dark200 : "#ffffff",
        },
      }}
    >
      {/* these icons using Ionicons */}
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Inicio" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"md-home"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Perfil" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"person"} />
          ),
        }}
      />
      <Tabs.Screen
        name="Citas"
        component={Citas}
        options={{
          tabBarLabel: ({ focused }) => (
            <TabBarText focused={focused} title="Citas" />
          ),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} icon={"ios-information-circle"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
