import React from 'react';
import Dashboard_Content from '..';
import { Tabs } from 'antd';
import { UsergroupAddOutlined } from '@ant-design/icons';
import AddUsers from '../AddUsers/index'
const { TabPane } = Tabs;
const Settings = () => {
  const settingsContent = () => {
    function callback(key) {
      console.log(key);
    }
    return (
      <div>
        <div className="pageTitle">
          <h4>SETTINGS</h4>
        </div>
        <div>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  <UsergroupAddOutlined />Manage Users</span> } key="1">
<AddUsers/>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  };
  return (
    <div>
      <Dashboard_Content content={settingsContent()} />
    </div>
  );
};

export default Settings;
