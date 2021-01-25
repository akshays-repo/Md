import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { Select, message } from 'antd';
import _ from 'lodash';
import { Foodcan } from 'index';
import axios from 'axios';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiKey = 'AIzaSyAqu6fqJ9JMsC83CNtkOje2X-KylbDnoss';

export const GoogleComponent = props => {
  const [collectionShow, setcollectionShow] = useState(false);
  const [currentLocation, setcurrentLocation] = useState('');
  const [currentCoordinates, setcurrentCoordinates] = useState({});
  const [result, setresult] = useState([]);
  const [search, setsearch] = useState(null);
  const { city, setcity } = useContext(Foodcan);

  const { backgroundColor } = props;

  const getCurrentLocation = () => {
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
          let _fire = fetch(
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?' +
              obj +
              '&key=' +
              apiKey,
          );
          return _fire
            .then(resp => {
              return resp.json().then(res => {
                console.log('**current location', res);
                localStorage.setItem('latitude', location.coords.latitude);
                localStorage.setItem('longitude', location.coords.longitude);
                // localStorage.setItem('address', res.results[0].formatted_address);
                localStorage.setItem(
                  'address',
                  res.plus_code.compound_code
                    .split(' ')
                    .slice(1)
                    .join(' '),
                );
                setcity(
                  res.plus_code.compound_code
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
            .get('https://cors-anywhere.herokuapp.com/https://api.ipify.org/?format=json', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(result => {
              console.log(result);
              console.log(result.data.ip);
              const ip = result.data.ip;
              axios
                .get(`https://cors-anywhere.herokuapp.com/http://ip-api.com/json/${ip}`)
                .then(({ data }) => {
                  console.log(data);
                  const { city, country, lat, lon } = data;
                  localStorage.setItem('latitude', lat);
                  localStorage.setItem('longitude', lon);
                  // localStorage.setItem('address', res.results[0].formatted_address);
                  localStorage.setItem('address', `${city},${country}`);
                  setcity(`${city},${country}`);
                });
            })
            .catch(err => {
              console.log(err);
            });
        },
      );
    }
  };

  useEffect(() => {
    try {
      getCurrentLocation();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleChange = async values => {
    setsearch(values);

    window.localStorage.setItem('address', values);
    setcity(values);
    const {
      results: [
        {
          geometry: { location },
        },
      ],
    } = await getCoordinates(values);
    console.log(location);
    window.localStorage.setItem('latitude', location.lat);
    window.localStorage.setItem('longitude', location.lng);
    setcurrentCoordinates(location);
  };

  const handleSearch = param => {
    console.log(param);
    let _co = props.country ? 'components=' + props.country + '&' : '';
    let _lang = props.language ? 'language=' + props.language + '&' : '';
    let _fire = fetch(
      proxyUrl +
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
        param +
        '&' +
        'types=(cities)' +
        '&' +
        _lang +
        // _co +
        '&key=' +
        props.apiKey,
    );

    _fire
      .then(dataJson => {
        console.log(dataJson);
        setsearch(param);

        return dataJson.json().then(data => {
          if (data.status == 'OK' && data.predictions.length > 0) {
            setresult(data.predictions);
          } else if (data.status == 'REQUEST_DENIED') {
            message.error(data.error_message);
            setresult([]);
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  function getCoordinates(address) {
    if (props.apiKey) {
      let _fire = fetch(
        proxyUrl +
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
          address +
          '&key=' +
          props.apiKey,
      );
      return _fire
        .then(resp => {
          return resp.json().then(res => {
            return res;
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  return (
    <div
      className="location-box-cover"
      style={backgroundColor ? { backgroundColor: `${backgroundColor} !important` } : {}}
    >
      <i className="fal fa-map-marker-alt mapicon"></i>
      <Select
        showSearch
        defaultActiveFirstOption={false}
        showArrow={true}
        filterOption={false}
        onChange={handleChange}
        onSearch={handleSearch}
        notFoundContent={null}
        value={_.truncate(city, {
          length: 80,
          separator: '....',
        })}
        placeholder="Location"
        style={{ width: 200, backgroundColor: 'var(--primarys) !important', border: 0, outline: 0 }}
      >
        {result.map((result, i) => (
          <Select.Option value={result.description} key={i}>
            {result.description}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};
