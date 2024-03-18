import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../views/home/HomeScreen"
import RegisterScreen from "../views/resgister/RegisterScreen"
import Timekeeping from "../views/timekeeping/Timekeeping";
import SettingScreen from "../views/setting/setting";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#E33B4C', // Màu của tab được chọn
        tabBarInactiveTintColor: 'black', // Màu của tab không được chọn
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={32} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person-add" size={32} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Timekeeping" 
        component={Timekeeping} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={32} color={color} />
          )
        }} 
      />
      <Tab.Screen 
        name="Setting" 
        component={SettingScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={32} color={color} />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

export default MyTabs;
