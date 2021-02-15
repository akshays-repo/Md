import React from 'react';
import { List, Card } from 'antd';

import Button1 from './assets/button1.png';
import Button2 from './assets/booknow-button-2.png';
import Button3 from './assets/booknow-button-3.png';
import Button4 from './assets/booknow-button-4.png';
import Button5 from './assets/booknow-button-5.png';
import Button6 from './assets/booknow-button-6.png';
import Button7 from './assets/booknow-button-7.png';
import Button8 from './assets/booknow-button-8.png';
import Button9 from './assets/booknow-button-9.png';
import Button10 from './assets/booknow-button-10.png';

const CustomWidget = () => {


  const url = window.location.href 
  const hospitalId = localStorage.getItem('hospital_id')  
  const data = [
    {
      button: Button1,
      url:`<a href = ${window.location.protocol}//${window.location.hostname}.com/online-appointment/${hospitalId}> <img alt='Book now' src=${Button1}/> </a>`
    },
    {
      button: Button2,
      url:`<a href = ${window.location.protocol}//${window.location.hostname}.com/online-appointment/${hospitalId}> <img alt='Book now' src=${Button2}/> </a>`

    },
    {
      button: Button3,
      url:`<a href = ${window.location.protocol}//${window.location.hostname}.com/online-appointment/${hospitalId}> <img alt='Book now' src=${Button3}/> </a>`

    },
    {
      button: Button4,
      url:`<a href = ${window.location.protocol}//${window.location.hostname}.com/online-appointment/${hospitalId}> <img alt='Book now' src=${Button4}/> </a>`

    },
    {
      button: Button5,
      url:`<a href = ${window.location.protocol}//${window.location.hostname}.com/online-appointment/${hospitalId}> <img alt='Book now' src=${Button5}/> </a>`

    },
    {
      button: Button6,
      url:`<a href = ${window.location.protocol}//${window.location.hostname}.com/online-appointment/${hospitalId}> <img alt='Book now' src=${Button6}/> </a>`

    },
    {
      button: Button7,
      url:`<a href = ${window.location.protocol}//${window.location.hostname}.com/online-appointment/${hospitalId}> <img alt='Book now' src=${Button7}/> </a>`

    },
    {
      button: Button8,
      url:`<a href = ${window.location.protocol}//${window.location.hostname}.com/online-appointment/${hospitalId}> <img alt='Book now' src=${Button8}/> </a>`

    },
    {
      button: Button9,
      url:`<a href = ${window.location.protocol}//${window.location.hostname}.com/online-appointment/${hospitalId}> <img alt='Book now' src=${Button9}/> </a>`

    },
    {
      button: Button10,
      url:`<a href = ${window.location.protocol}//${window.location.hostname}.com/online-appointment/${hospitalId}> <img alt='Book now' src=${Button10}/> </a>`

    },
  ];
  return (
    <div>
      <List
        grid={{ gutter: 20, column: 5 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card>
              <img src={item.button} style={{ width: '100px', height: 'auto' }} />
              {/* <p> '{item.url}'</p> */}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CustomWidget;
