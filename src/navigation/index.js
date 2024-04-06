import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../views/home/HomeScreen"
import RegisterScreen from "../views/resgister/RegisterScreen"
import Timekeeping from "../views/timekeeping/Timekeeping";
import SettingScreen from "../views/setting/setting";
import SplashScreen from '../views/Splash/Splash';
import { Ionicons } from '@expo/vector-icons';
import History from "../views/timekeeping/History";
import HistoryContext from "../views/timekeeping/HistoryContext";
import HistoryProvider from "../views/timekeeping/HistoryProvider";
import { AppProvider } from "../views/setting/AppContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
// const drawer=createDrawerNavigator();
// const HomeDrawer1 =()=>{
//   return(
//     <drawer.Navigator>
//       <drawer.Screen
//         name="Trang Chủ"
//         component={HomeDrawer}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" size={32} color={color} />
//           )
//         }}
//       />
//        <drawer.Screen
//         name="Đăng Ký"
//         component={RegisterScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="ios-person-add" size={32} color={color} />
//           )
//         }}
//       />
//     </drawer.Navigator>
//   );
// }
const HomeDrawer = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#E33B4C', // Màu của tab được chọn
        tabBarInactiveTintColor: 'black', // Màu của tab không được chọn
      }}>
      <Tab.Screen
        name="Trang Chủ"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={32} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Đăng Ký"
        component={RegisterScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-person-add" size={32} color={color} />
          )
        }}
      />
       <Tab.Screen
        name="Lịch sử chấm công"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="timer-outline" size={32} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Cài Đặt"
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

export default function App() {
  return (
    <AppProvider>
    <HistoryProvider>
    <NavigationContainer independent={true}>
      <Stack.Navigator  initialRouteName="Splash" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
        <Stack.Screen name="Timekeeping" component={Timekeeping} />
       <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>
     </HistoryProvider>
     </AppProvider>
  );
}
