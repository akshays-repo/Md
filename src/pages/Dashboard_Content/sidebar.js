import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

const sideMenuList = [
  {
    title: 'Dashboard',
    icon: 'fas fa-columns',
    path: '/dashboard',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Appointments',
    icon: 'fas fa-calendar-check',
    path: '/appointments',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Branch',
    icon: 'fas fa-network-wired',
    path: '/branch',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'My Patients',
    icon: 'fas fa-user-injured',
    path: '/mypatients',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Provider',
    icon: 'fas fa-user-md',
    path: '/provider',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Calendar',
    icon: 'far fa-calendar-alt',
    path: '/calender',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Message',
    icon: 'fas fa-comments',
    path: '/message',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Users',
    icon: 'fas fa-users',
    path: '/add-users',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Templates',
    icon: 'fas fa-stream',
    path: '/templates',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Campaigns',
    icon: 'fas fa-share-alt',
    path: '/campaigns',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Forms',
    icon: 'fab fa-wpforms',
    path: '/forms',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Analytics',
    icon: 'fas fa-chart-line',
    path: '/analytics',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Log Out',
    icon: 'fas fa-sign-out-alt',
    path: '/logout',
    wologin: true,
    wlogin: true,
  },
];
const Sidebar = () => {
  // const {
  //   avatarlocation = 'https://images.livemint.com/img/2020/07/06/600x338/apollo_1594043446600_1594043458520.jpg',
  // } = JSON.parse(localStorage.getItem('user_data'));

  const [hospitalData, setHospitalData] = useState('');
  const [logo, setLogo] = useState('');
  // useEffect(() => {
  //   let data = JSON.parse(localStorage.getItem('user_data'));
  //   setLogo(data.hospital.logo.path);
  //   setHospitalData(data);
  // }, []);
  // console.log('sdfsdfsds', logo);

  return (
    <div className="dashboard__sidebar">
      <div className="content">
        <div className="sidebar_header" >
          <div className="profileDashboard">
            {logo ? (
              <img src={`/${logo}`} />
            ) : (
              <Avatar
                round
                color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])}
                name={localStorage.getItem('name')}
              />
            )}
          </div>
          <h4 style={{ textTransform: 'uppercase' }}>{localStorage.getItem('name')}</h4>
          {/* <p className="hospital_address">Curabitur aliquet quam id dui posuere blandit.</p> */}
        </div>
        <div className="sidebar_list">
          <List
            itemLayout="horizontal"
            dataSource={sideMenuList}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<i className={item.icon} />}
                  title={<Link to={item.path}>{item.title}</Link>}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
