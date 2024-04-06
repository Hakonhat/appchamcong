import axios from 'axios';

const HOST = "http://192.168.1.7:97/api";
const URL_RECOGNITION = `${HOST}/recognition`;

const registerRecognition = async (image, location) => {
  const formData = new FormData();
  formData.append('image', {
    uri: image,
    name: `image.${image.split('.').pop()}`,
    type: 'image/jpeg', // Adjust the type if necessary
  });
  formData.append('location', location);

  try {
    const response = await axios.post(URL_RECOGNITION, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { registerRecognition };
