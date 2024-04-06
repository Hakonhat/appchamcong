
import axios from 'axios';

const HOST = "http://192.168.1.7:97/api";
const URL_IMAGES = `${HOST}/image`;

const registerImage = async (images, personId) => {
  const formData = new FormData();
  let dt = []
  images.forEach((uri, index) => {
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const fileName = `image_${index}.${fileType}`;
    dt.push({
      uri,
      name: fileName,
      type: `image/${fileType}`,
    })
  });
  console.log('dt',dt)
  formData.append('person', personId);
  formData.append('image1', dt[0]);
  formData.append('image2', dt[1]);
  formData.append('image3', dt[2]);
  console.log('formData',formData)
  try {
    const response = await axios.post(`${URL_IMAGES}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { registerImage };