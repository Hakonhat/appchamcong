import axios from "axios";
const HOST = "http://192.168.1.7:97/api"; // Cập nhật địa chỉ IP của máy chủ
const URL_REGISTER = `${HOST}/person`;
const URL_IMAGES = `${HOST}/image`;
const URL_RECOGNITION = `${HOST}/attendance`;

const registerPerson = async(data) => {
    console.log(data)
    return axios.post(URL_REGISTER, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};

const registerImage = (image1, image2, image3, personId) => {
    const formData = new FormData();
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);
    formData.append('person', personId);
    console.log("formData",formData)
    return axios.post(URL_IMAGES, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};


const registerRecognition = async (image, location) => {
    const formData = new FormData();
    formData.append('image', {
      uri: image,
      type: 'image/jpeg', 
      name: 'photo.jpg', 
    });
    formData.append('location', location);
  
    try {
      const response = await axios.post(URL_RECOGNITION, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Trả về dữ liệu từ server
    } catch (error) {
      throw error; // Ném ra lỗi nếu có lỗi xảy ra trong quá trình gửi ảnh
    }
  };

export {
    registerPerson,
    registerImage,
    registerRecognition
};
