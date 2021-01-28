import React from 'react';
import { List, Avatar } from 'antd';
import { Link } from 'react-router-dom';
const sideMenuList = [
  {
    title: 'Dashboard',
    icon: 'fas fa-columns',
    path: '/',
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
    title: 'Schedule Timings',
    icon: 'fas fa-hourglass-start',
    path: '/schedule-timings',
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
    path: '/froms',
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
];

const Sidebar = () => {
  return (
    <div className="dashboard__sidebar">
      <div className="content"> 
      <div className="sidebar_header">
        <img src="https://images.livemint.com/img/2020/07/06/600x338/apollo_1594043446600_1594043458520.jpg" />

        <h2>Billroth Hospitals</h2>
        <h5 className="hospital_address">Curabitur aliquet quam id dui posuere blandit.</h5>
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
