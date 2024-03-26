import React, { useState } from 'react';
import {
  Button, View, Text, TextInput, Dimensions, Image, Alert, TouchableOpacity,
  ScrollView, StyleSheet, selectedGender, handleGenderChange,
} from 'react-native';
import { Camera } from 'expo-camera';

import { COLORS } from "../../contants/index";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

const RegisterScreen = ({ navigation }) => { // Đảm bảo có biến navigation trong props

  const [gender, setGender] = useState('');
  const [capturedImages, setCapturedImages] = useState([]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  let cameraRef = null;

  const handleDeleteImage = (index) => {
    const newImages = [...capturedImages];
    newImages.splice(index, 1);
    setCapturedImages(newImages);
  };

  const takePicture = async () => {
    if (capturedImages.length >= 3) {
     
    Alert.alert('Thông báo', 'Bạn đã chụp đủ 3 ảnh.');
    setShowCamera(false); // Tắt camera sau khi chụp đủ 3 ảnh
    return;
  }
  if (cameraRef) {
    const data = await cameraRef.takePictureAsync();
    setCapturedImages([...capturedImages, data.uri]);
  }
  };

  if (!permission || !permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>We need your permission to show the camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSelectGender = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, color: '#EEEEEE', flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng ký nhân viên mới</Text>
        {showCamera && (
          <View style={styles.cameraContainer}>
            <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={(ref) => { cameraRef = ref; }} />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={() => setShowCamera(takePicture)}>
          <Text style={styles.buttonText}>Chụp ảnh</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {capturedImages.map((imageUri, index) => (
            <View key={index} style={styles.imageItem}>
              <TouchableOpacity onPress={() => handleDeleteImage(index)}>
                <Image source={{ uri: imageUri }} style={styles.image} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(index)}>
                <Ionicons name="close-circle" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title1}>Họ và Tên</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title1}>Email</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title1}>Mật Khẩu</Text>
          <TextInput secureTextEntry={true} style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title1}>Số Điện Thoại</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title1}>Ngày Sinh</Text>
          <TextInput style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title1}>Chọn giới tính</Text>
          <View style={styles.inputContainer1}>
            <TouchableOpacity
              style={[styles.genderOption, gender === 'Nam' && styles.selectedOption]}
              onPress={() => handleSelectGender('Nam')}
            >
              <Ionicons name="md-male" size={15} color="#E33B4C" style={styles.icon} />
              <Text style={styles.optionText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, gender === 'Nữ' && styles.selectedOption]}
              onPress={() => handleSelectGender('Nữ')}
            >
              <Ionicons name="md-female" size={15} color="#E33B4C" style={styles.icon} />
              <Text style={styles.optionText}>Nữ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption, gender === 'Khác' && styles.selectedOption]}
              onPress={() => handleSelectGender('Khác')}
            >
              <Ionicons name="md-transgender" size={15} color="#E33B4C" style={styles.icon} />
              <Text style={styles.optionText}>Khác</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.selectedGender}>Giới tính đã chọn: {gender}</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Setting')}>
          <Text style={styles.buttonText}>Đăng Ký</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E33B4C',
    textAlign: 'center',
  },
  title1: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E33B4C',

  },
  cameraContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
   
  },
  camera: {
    width: width / 3 - 10,
    height: height / 5,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,


  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#E33B4C',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,

  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    height:100,
  },
  image: {
    
    width: 90,
    height: 90,
    margin: 1,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    padding: 5,
    height:40,
    borderRadius: 5,
  },
  imageItem: {
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  inputContainer1:{
    flexDirection: 'row',
    flexWrap: 'wrap',
   
    
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#E33B4C',
    marginBottom: 10,
    margin:5,
    
  },
  selectedOption: {
   
  },
  optionText: {
    marginLeft: 5,
    color:'#E33B4C',
  },
  icon: {
    marginRight: 5,
  },
  selectedGender: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color:'#E33B4C',
  },

});


export default RegisterScreen;
