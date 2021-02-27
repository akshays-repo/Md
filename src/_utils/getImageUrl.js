import callApi from '_utils/callApi';
import { notification } from 'antd';

export  async function getImageUrl(image)  {
  const url = '/api/backend/v1/uploadImage';
  const formData = new FormData();
  formData.append('image', image);
  const options = {
    method: 'POST',
    body: formData,
  };
  let Imageurl = null;
  try {
    const responseJSON = await callApi(url, options);
    console.log('responseKson', responseJSON);
    if (responseJSON && responseJSON.success) {
      Imageurl = responseJSON.data;
    }
    return Imageurl;
  } catch (err) {
    console.log('error', err);
    notification.error({
      message: 'Error!',
    });
  }
};
