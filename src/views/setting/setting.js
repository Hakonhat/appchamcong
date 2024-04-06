  import React, { useState} from 'react';
  import { View, Text, Button,StyleSheet,  Switch } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  const  Setting = () => {
    


    const navigation = useNavigation();
    
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);
    const [notificationEnabled, setNotificationEnabled] = useState(true);

    // Hàm xử lý thay đổi cài đặt chế độ tối
    const toggleDarkMode = () => {
      setDarkModeEnabled(previousState => !previousState);
      // Thực hiện các hành động liên quan đến thay đổi chế độ tối
    };

    // Hàm xử lý thay đổi cài đặt thông báo
    const toggleNotification = () => {
      setNotificationEnabled(previousState => !previousState);
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
        <Button title="Go back"  onPress={() => navigation.navigate('Splash')} />
      </View>
    );
  }

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
