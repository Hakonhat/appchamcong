import React from 'react';
import { Button, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { COLORS } from "../../contants/index"
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';


const HomeScreen = () => {
  const navigation = useNavigation();
  const buttonScale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
    
    <View style={styles.container}>
     
    <TouchableOpacity
      onPress={() => navigation.navigate('Đăng Ký')}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
        <Ionicons name="person-add-outline" size={24} color="white" style={styles.icon} />
        <Button
          onPress={() => navigation.navigate('Đăng Ký')}
          title="Đăng Ký"
          color="white"
        />
      </Animated.View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('Chấm Công')}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.8}
    >
      <Animated.View style={[styles.buttonContainer, { transform: [{ scale: buttonScale }] }]}>
        <Ionicons name="time-outline" size={24} color="white" style={styles.icon} />
        <Button
          onPress={() => navigation.navigate('Chấm Công')}
          title="Chấm Công"
          color="white"
        />
      </Animated.View>
    </TouchableOpacity>
    
  </View>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flexDirection: 'row',
  padding: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#E33B4C',
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#E33B4C',
  padding: 10,
  borderRadius: 20,
  marginHorizontal: 10,
  borderColor: 'white', // Màu của đường viền
    borderWidth: 1, // Độ rộng của đường viền
},
icon: {
  marginRight: 5,
  color: 'white',
},
});
export default HomeScreen;