import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from './AppContext';

const Setting = () => {
  const { darkModeEnabled, setDarkModeEnabled, notificationEnabled, setNotificationEnabled } = useContext(AppContext);
  const navigation = useNavigation();

  const toggleDarkMode = () => {
    setDarkModeEnabled((previousState) => !previousState);
    // Thực hiện các hành động liên quan đến thay đổi chế độ tối
  };

  const toggleNotification = () => {
    setNotificationEnabled((previousState) => !previousState);
    // Thực hiện các hành động liên quan đến thay đổi cài đặt thông báo
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.setting}>
          <Text>Dark Mode</Text>
          <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
        </View>
        <View style={styles.setting}>
          <Text>Notifications</Text>
          <Switch value={notificationEnabled} onValueChange={toggleNotification} />
        </View>
        <Button title="Thoát"  onPress={() => navigation.navigate('Splash')} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10,
  },
}); 
  

export default Setting;
