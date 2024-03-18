import React, { useState } from 'react';
import { Button, View, Text, TextInput, Dimensions, Image, Alert, TouchableOpacity, 
  ScrollView,StyleSheet, selectedGender, handleGenderChange, } from 'react-native';
import { Camera } from 'expo-camera';
import { Picker } from '@react-native-picker/picker';
import { COLORS } from "../../contants/index";
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('screen');
const RegisterScreen = () => {
  const [capturedImages, setCapturedImages] = useState([]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  let cameraRef = null;
  const handleDeleteImage = (index) => {
    const newImages = [...capturedImages];
    newImages.splice(index, 1);
    setCapturedImages(newImages);
  };
  const takePicture = async () => {
    if (capturedImages.length >= 3) {
      Alert.alert('Thông báo', 'Bạn đã chụp đủ 3 ảnh.');
      return;
    }
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync();
      setCapturedImages([...capturedImages, data.uri]);
    }
  };
  if (!permission || !permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={{ padding: 20, color: '#EEEEEE', flexGrow: 1 }}>
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký nhân viên mới</Text>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={(ref) => { cameraRef = ref; }} />
      </View>
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Chụp ảnh</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {capturedImages.map((imageUri, index) => (
          <View key={index} style={styles.imageItem}>
            <TouchableOpacity onPress={() => handleDeleteImage(index)}>
              <Image source={{ uri: imageUri }} style={styles.image} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(index)}>
              <Ionicons name="close-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={styles.inputContainer}>
        <Text>Họ và Tên</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Mật Khẩu</Text>
        <TextInput secureTextEntry={true} style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Số Điện Thoại</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Ngày Sinh</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Chọn giới tính</Text>
        <Picker
          selectedValue={selectedGender}
          style={styles.picker}
          onValueChange={handleGenderChange}
        >
          <Picker.Item label="Nam" value="male" />
          <Picker.Item label="Nữ" value="female" />
          <Picker.Item label="Khác" value="other" />
        </Picker>
      </View>
      <Button onPress={() => navigation.navigate('Register')} title="Đăng Ký" color={COLORS.PRIMARY} />
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
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginLeft: 100,
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
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    padding: 5,
  },
 
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
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
});


export default RegisterScreen;
