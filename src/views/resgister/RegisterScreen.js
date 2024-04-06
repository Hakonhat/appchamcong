import React, { useState } from 'react';
import { Button, View, Text, TextInput, Dimensions, Image, Alert, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { registerPerson } from '../api/index';
import { registerImage } from '../api/image';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from "../../contants/index";
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('screen');

const RegisterScreen = ({ navigation }) => {

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [registerData, setRegisterData] = useState({
    fullname: '',
    address: '',
    gender: ''

  });

  const [capturedImages, setCapturedImages] = useState([]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');

  let cameraRef = null;

  const handleDeleteImage = (index) => {
    const newImages = [...capturedImages];
    newImages.splice(index, 1);
    setCapturedImages(newImages);
  };

  const takePicture = async () => {
    if (capturedImages.length >= 3) {
        Alert.alert('Thông báo', 'Bạn đã chụp đủ 3 ảnh.');
        setShowCamera(false);
        return;
    }
    
    if (cameraRef) {
      const options = { quality: 1, base64: true, format: 'jpeg' };
        const data = await cameraRef.takePictureAsync(options);
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

  

  const handleRegister = () => {
    if (!registerData.fullname || !registerData.dateOfBirth || !registerData.address || !registerData.gender || capturedImages.length !== 3) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin và chụp đủ 3 ảnh.');
      return;
    }

    registerPerson(registerData)
      .then(response => {
        const personId = response.data.message;
        registerImage(capturedImages, personId)
          .then(imageResponse => {
            console.log('Tải hình ảnh lên thành công:', imageResponse);
          
          })
          .catch(imageError => {
            console.error('Tải hình ảnh lên thất bại', imageError);
     
          });
  
        console.log('Đăng ký nhân viên thành công:', response);
       
      })
      .catch(error => {
        console.error('Đã xảy ra lỗi khi đăng ký nhân viên:', error);
      
      });
  };

  const handleSelectGender = (gender) => {
    const genderValue = gender === 'Nam' ? 'Nam' : 'Nữ';
    setRegisterData({ ...registerData, gender: genderValue });
    setSelectedGender(genderValue); 
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    const formattedDate = currentDate.toISOString().split('T')[0];
    setRegisterData({ ...registerData, dateOfBirth: formattedDate });
  };

  const showPicker = () => {
    setShow(true);
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
          <Text style={styles.title1} >Họ và Tên</Text>
          <TextInput value={registerData.fullname} onChangeText={(e) => setRegisterData({ ...registerData, fullname: e })} style={styles.input} />
        </View>
        <View style={styles.inputContainer}>
          <Text>Ngày Sinh:</Text>
          <View style={styles.dateInputContainer}>
            <TouchableOpacity onPress={showPicker}>
              <Ionicons name="calendar" size={24} color="black" />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <TextInput
              style={styles.dateInput}
              value={registerData.dateOfBirth}
              placeholder="Chọn ngày sinh"
              editable={false}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title1}>Chọn giới tính</Text>
          <View style={styles.inputContainer1}>
            <TouchableOpacity
              style={[styles.genderOption, registerData.gender === 0 && styles.selectedOption]}
              onPress={() => handleSelectGender('Nam')}
            >
              <Ionicons name="md-male" size={15} color="#E33B4C" style={styles.icon} />
              <Text style={styles.optionText}>Nam</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.genderOption,  registerData.gender === 1 && styles.selectedOption]}
              onPress={() => handleSelectGender('Nữ',)}
            >
              <Ionicons name="md-female" size={15} color="#E33B4C" style={styles.icon} />
              <Text style={styles.optionText}>Nữ</Text>
            </TouchableOpacity>

          </View>
        </View>
        <Text style={styles.selectedGender}>Giới tính đã chọn: {selectedGender}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.title1}>Địa Chỉ</Text>
          <TextInput value={registerData.address} onChangeText={(e) => setRegisterData({ ...registerData, address: e })} style={styles.input} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 5,
    padding: 5,
    marginTop: 5,

  },
  dateInput: {
    flex: 1,
    marginLeft: 10,
    color: '#E33B4C',
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
    height: 100,

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
    height: 40,
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
  inputContainer1: {
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
    margin: 5,


  },

  selectedOption: {

  },
  optionText: {
    marginLeft: 5,
    color: '#E33B4C',
  },
  icon: {
    marginRight: 5,
  },
  selectedGender: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E33B4C',
  },

});


export default RegisterScreen;