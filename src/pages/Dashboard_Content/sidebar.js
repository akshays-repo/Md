import React from 'react';
import { List, Avatar } from 'antd';
import { Link } from "react-router-dom";
const sideMenuList = [
  {
    title: 'Dashboard',
    icon: '',
    path: '/',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Appointments',
    icon: '',
    path: '/appointments',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'My Patients',
    icon: '',
    path: '/mypatients',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Schedule Timings',
    icon: '',
    path: '/schedule-timings',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Calendar',
    icon: '',
    path: '/calender',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Message',
    icon: '',
    path: '/message',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Templates',
    icon: '',
    path: '/templates',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Campaigns',
    icon: '',
    path: '/campaigns',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Forms',
    icon: '',
    path: '/froms',
    wologin: true,
    wlogin: true,
  },
  {
    title: 'Analytics',
    icon: '',
    path: '/analytics',
    wologin: true,
    wlogin: true,
  },
];

const Sidebar = () => {
  return (
    <div className="dashboard__sidebar">
      <div className="sidebar_header">
        <img src="https://images.livemint.com/img/2020/07/06/600x338/apollo_1594043446600_1594043458520.jpg" />

        <p>Hospital Name</p>
        <p>Hospital Address</p>
      </div>

      <div className="sidebar_list">
        <List
          itemLayout="horizontal"
          dataSource={sideMenuList}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<Link to={item.path}>{item.title}</Link>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Sidebar;
