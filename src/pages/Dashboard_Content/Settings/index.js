import React , {useState , useEffect } from 'react';
import Dashboard_Content from '..';
import { Tabs } from 'antd';
import { UsergroupAddOutlined, SettingFilled } from '@ant-design/icons';
import AddUsers from '../AddUsers/index';
const { TabPane } = Tabs;
const Settings = () => {

  const [isAdmin ,setIsAdmin] = useState('')
  useEffect(() =>{
      let data = JSON.parse(localStorage.getItem('user_data'));
      setIsAdmin(data.isAdmin)
  },[])

  const settingsContent = () => {
    function callback(key) {
      console.log(key);
    }


    return (
      <div>
        <div className="pageTitle">
          <h4>SETTINGS</h4>
        </div>
        <div className="settingTab">
          <Tabs defaultActiveKey="1">

          <TabPane
              tab={
                <span>
                  <SettingFilled />
                  Profile Settings
                </span>
              }
              key="1"
            ></TabPane>

{isAdmin && 
       <TabPane
       tab={
         <span>
           <UsergroupAddOutlined />
           Manage Users
         </span>
       }
       key="2"
     >
       <AddUsers />
     </TabPane>
}
     

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
