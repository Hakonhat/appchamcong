import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

// Màn hình chào mừng
const SplashScreen = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Điều hướng người dùng đến màn hình đăng nhập
    navigation.navigate('HomeDrawer');
  };

  const handleRegister = () => {
    // Điều hướng người dùng đến màn hình đăng ký
    navigation.navigate();
  };

  return (

   

      <View style={styles.container}>
        <View>
        <LottieView style={{height:400,width:350,}} source={require('../assets/aa.json')} autoPlay loop />
        </View>
        <Text style={styles.title}>Welcome to My App</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Lest Go</Text>
        </TouchableOpacity>

       
      </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fffff',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E33B4C',
    marginBottom: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#E33B4C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default SplashScreen;
