import axios from 'axios';
import { message } from 'antd';
const apiKey = 'AIzaSyAqu6fqJ9JMsC83CNtkOje2X-KylbDnoss';
const language = 'en';

const cors = 'https://cors-anywhere.herokuapp.com/';

const country_list = [
  'AN',
  'AE',
  'AF',
  'AC',
  'AV',
  'AL',
  'AM',
  'NT',
  'AO',
  'AY',
  'AR',
  'AQ',
  'AU',
  'AS',
  'AA',
  'AJ',
  'BK',
  'BB',
  'BG',
  'BE',
  'UV',
  'BU',
  'BA',
  'BY',
  'BN',
  'TB',
  'BD',
  'BX',
  'BL',
  'BR',
  'BF',
  'BT',
  'BV',
  'BC',
  'BO',
  'BH',
  'CA',
  'CK',
  'CG',
  'CT',
  'CF',
  'SZ',
  'IV',
  'CW',
  'CI',
  'CM',
  'CH',
  'CO',
  'CS',
  'YI',
  'CU',
  'CV',
  'UC',
  'KT',
  'CY',
  'EZ',
  'GM',
  'DJ',
  'DA',
  'DO',
  'DR',
  'AG',
  'EC',
  'EN',
  'EG',
  'WI',
  'ER',
  'SP',
  'ET',
  'FI',
  'FJ',
  'FK',
  'FM',
  'FO',
  'FR',
  'GB',
  'UK',
  'GJ',
  'GG',
  'FG',
  'GK',
  'GH',
  'GI',
  'GL',
  'GA',
  'GV',
  'GP',
  'EK',
  'GR',
  'SX',
  'GT',
  'GQ',
  'PU',
  'GY',
  'HK',
  'HM',
  'HO',
  'HR',
  'HA',
  'HU',
  'ID',
  'EI',
  'IS',
  'IM',
  'IN',
  'IO',
  'IZ',
  'IR',
  'IC',
  'IT',
  'JE',
  'JM',
  'JO',
  'JA',
  'KE',
  'KG',
  'CB',
  'KR',
  'CN',
  'SC',
  'KN',
  'KS',
  'KU',
  'CJ',
  'KZ',
  'LA',
  'LE',
  'ST',
  'LS',
  'CE',
  'LI',
  'LT',
  'LH',
  'LU',
  'LG',
  'LY',
  'MO',
  'MN',
  'MD',
  'MJ',
  'RN',
  'MA',
  'RM',
  'MK',
  'ML',
  'BM',
  'MG',
  'MC',
  'CQ',
  'MB',
  'MR',
  'MH',
  'MT',
  'MP',
  'MV',
  'MI',
  'MX',
  'MY',
  'MZ',
  'WA',
  'NC',
  'NG',
  'NF',
  'NI',
  'NU',
  'NL',
  'NO',
  'NP',
  'NR',
  'NE',
  'NZ',
  'MU',
  'PM',
  'PE',
  'FP',
  'PP',
  'RP',
  'PK',
  'PL',
  'SB',
  'PC',
  'RQ',
  'WE',
  'PO',
  'PS',
  'PA',
  'QA',
  'RE',
  'RO',
  'RI',
  'RS',
  'RW',
  'SA',
  'BP',
  'SE',
  'SU',
  'SW',
  'SN',
  'SH',
  'SI',
  'SV',
  'LO',
  'SL',
  'SM',
  'SG',
  'SO',
  'NS',
  'OD',
  'TP',
  'ES',
  'NN',
  'SY',
  'WZ',
  'TK',
  'CD',
  'FS',
  'TO',
  'TH',
  'TI',
  'TL',
  'TT',
  'TX',
  'TS',
  'TN',
  'TU',
  'TD',
  'TV',
  'TW',
  'TZ',
  'UP',
  'UG',
  'US',
  'UY',
  'UZ',
  'VT',
  'VC',
  'VE',
  'VI',
  'VQ',
  'VM',
  'NH',
  'WF',
  'WS',
  'KV',
  'YM',
  'MF',
  'SF',
  'ZA',
  'ZI',
];

const country_list1 = ['in', 'bt', 'np', 'pk', 'af'];

const country = country_list
  .map((result, i) => {
    return `country:${result.toLowerCase()}`;
  })
  .join('|');

// const country = 'country:in|country:bt|country:np|country:pk|country:af';

// const onChange={e => setplace(e)}

export const getPlaceList = async param => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${cors}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=` +
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
      .get(
        `${cors}https://maps.googleapis.com/maps/api/geocode/json?address=` +
          address +
          '&key=' +
          apiKey,
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
        let _fire = fetch(
          `${cors}https://maps.googleapis.com/maps/api/geocode/json?` + obj + '&key=' + apiKey,
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
          .get(`${cors}https://api.ipify.org/?format=json`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(result => {
            console.log(result);
            console.log(result.data.ip);
            const ip = result.data.ip;
            axios.get(`${cors}http://ip-api.com/json/${ip}`).then(({ data }) => {
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

export const getPincode = place_id => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
          place_id +
          '&key=' +
          apiKey,
      )
      .then(resp => {
        console.log('***', resp);
        const { data } = resp;
        resolve(data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
};
