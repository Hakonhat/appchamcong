import React, { useState ,useContext} from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity, Button, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
const { width, height } = Dimensions.get('screen');
const URL_RECOGNITION = require('../api/time').URL_RECOGNITION;
import { registerRecognition } from '../api/index';
import HistoryContext from './HistoryContext';
import { useNavigation } from '@react-navigation/native';


const Timekeeping = () => {
  const currentDate = new Date();
  const navigation = useNavigation();
  const ngayTrongTuan = currentDate.toLocaleDateString('vi-VN', { weekday: 'long' });
  const [capturedImages, setCapturedImages] = useState([]);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [anhChup, setAnhChup] = useState(null);
  const { addRecordToHistory } = useContext(HistoryContext);
  const currentTime = new Date().toLocaleTimeString('vi-VN');
  let cameraRef = null;

  const handleDeleteImage = (index) => {
    const newImages = [...capturedImages];
    newImages.splice(index, 1);
    setCapturedImages(newImages);
  };

  const takePicture = async () => {
    if (capturedImages.length >= 1) {
      Alert.alert('Thông báo', 'Bạn đã chụp đủ 1 ảnh.');
      setShowCamera(false);
      return;
    }

    if (cameraRef) {
      const options = { quality: 1, base64: true, format: 'jpeg' };
      const data = await cameraRef.takePictureAsync(options);
      setCapturedImages([...capturedImages, data.uri]);
      setAnhChup(data.uri);
      setShowCamera(false);
    
      addRecordToHistory(currentTime);
    }
  };

  const sendImageToServer = async (recognitionUrl) => {
    if (!anhChup) {
      Alert.alert('Thông báo', 'Bạn cần chụp ảnh trước khi gửi.');
      return;
    }
  
    try {
      const response = await registerRecognition(anhChup, recognitionUrl);
      console.log(response); // Xử lý phản hồi từ server
      // Reset capturedImages và anhChup sau khi gửi thành công
      setCapturedImages([]);
      setAnhChup(null);
      Alert.alert('Thông báo', 'Gửi ảnh thành công.');
    } catch (error) {
      console.error(error);
      Alert.alert('Thông báo', 'Đã có lỗi xảy ra khi gửi ảnh.');
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

  return (
    <ScrollView contentContainerStyle={{ padding: 20, color: '#EEEEEE', flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text className='time' style={styles.time}>{ngayTrongTuan}</Text>
          <View style={styles.subContainer}>
          </View>
          <View style={styles.subContainer1}>
          </View>
          <View>
            {showCamera && (
              <View style={styles.cameraContainer}>
                <Camera style={styles.camera} type={Camera.Constants.Type.front} ref={(ref) => { cameraRef = ref; }} />
              </View>
            )}
          </View>
          <View style={styles.imageContainer}>
            {capturedImages.map((imageUri, index) => (
              <View key={index} style={styles.imageItem}>
                <Image source={{ uri: imageUri }} style={styles.image} />
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteImage(index)}>
                  <Ionicons name="close-circle" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <View style={styles.horizontalButtonRow}>
          <TouchableOpacity style={styles.button} onPress={async() => {
                  await setShowCamera(takePicture)
                  await sendImageToServer(URL_RECOGNITION);
              }}>
            <Text style={styles.buttonText}>Chấm công</Text>
              </TouchableOpacity>
           </View>
           <Button title="Quay lại"  onPress={() => navigation.navigate('Splash')} />
        </View>
        
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  camera: {
    width: width / 3 - 10,
    height: height / 5,
    borderWidth: 1,
  },
  cameraContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  mainContainer: {
    margin: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#E33B4C',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    alignItems: 'center',
    fontSize: 14,
    height: 350,
    width: 350,
  },
  time: {
    fontSize: 16,
    color: '#E33B4C',
    fontWeight: 'bold',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  subContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#E33B4C',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  horizontalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  timeText: {
    marginTop: 5,
    fontSize: 14,
    color: '#E33B4C',
  },
};

export default Timekeeping;
