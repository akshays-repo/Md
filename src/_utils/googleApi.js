import axios from 'axios';
import { message } from 'antd';
const apiKey = 'AIzaSyAqu6fqJ9JMsC83CNtkOje2X-KylbDnoss';
const language = 'en';

const cors = 'https://cors-anywhere.herokuapp.com/';

export const getPlaceList = async param => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/backend/v1/location_api/${param}`)
      .then(res => {
        const { data } = res;

        console.log(res.data);

        if (data.success && data.data.length > 0) {
          console.log(res);
          resolve(data.data);
        } else if (!data.success) {
          message.error('Location not found');
          reject('Location not found');
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
      .get(`/api/backend/v1/coordinates?address=` + address)
      .then(resp => {
        const { data } = resp;
        const {
          data: {
            results: [
              {
                geometry: { location },
              },
            ],
          },
        } = data;
        resolve(location);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};

export const getCurrentLocation = () => {
  if (
    localStorage.getItem('address') &&
    localStorage.getItem('latitude') &&
    localStorage.getItem('longitude')
  ) {
    console.log('Already exist');
  } else {
    navigator.geolocation.getCurrentPosition(
      location => {
        var obj = 'latlng=' + location.coords.latitude + ',' + location.coords.longitude;
        let _fire = fetch(`/api/backend/v1/coordinates?${obj}`);
        return _fire
          .then(resp => {
            return resp.json().then(res => {
              console.log('**current location', res);
              localStorage.setItem('latitude', location.coords.latitude);
              localStorage.setItem('longitude', location.coords.longitude);
              // localStorage.setItem('address', res.results[0].formatted_address);
              localStorage.setItem(
                'address',
                res.data.plus_code.compound_code
                  .split(' ')
                  .slice(1)
                  .join(' '),
              );

              return res;
            });
          })
          .catch(error => {
            console.log(error);
          });
      },
      error => {
        console.log(error);

        axios
          .get(`https://api.ipify.org/?format=json`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(result => {
            console.log(result);
            console.log(result.data.ip);
            const ip = result.data.ip;
            axios.get(`/api/backend/v1/ip/${ip}`).then(({ data }) => {
              console.log(data);
              const { city, country, lat, lon } = data;
              localStorage.setItem('latitude', lat);
              localStorage.setItem('longitude', lon);
              // localStorage.setItem('address', res.results[0].formatted_address);
              localStorage.setItem('address', `${city},${country}`);
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
    );
  }
};
