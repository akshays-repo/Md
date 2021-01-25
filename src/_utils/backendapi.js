import axios from 'axios';
const apiKey = 'AIzaSyAqu6fqJ9JMsC83CNtkOje2X-KylbDnoss';
const language = 'en';

export const getPlaceList = async param => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
          param +
          '&(types=cities)' +
          '&lang=' +
          language +
          // '&components=' +
          //  country +
          '&key=' +
          apiKey,
      )
      .then(res => {
        const { data } = res;
        if (data.status == 'OK' && data.predictions.length > 0) {
          resolve(data.predictions);
        } else if (data.status == 'REQUEST_DENIED') {
          message.error(data.error_message);
          reject(data.error_message);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
export const getCoordinates = address => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + apiKey,
      )
      .then(resp => {
        const { data } = resp;
        const {
          results: [
            {
              geometry: { location },
            },
          ],
        } = data;
        resolve(location);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const getIPDetails = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://ip-api.com/json/${ip}`)
      .then(({ data }) => resolve(data))
      .catch(err => reject(err));
  });
};
