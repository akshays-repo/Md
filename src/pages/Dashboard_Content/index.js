import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Sidebar from './sidebar';
import { isMobile } from 'react-device-detect';
import { Drawer, Button, Radio, Space } from 'antd';



const Dashboard_Content = ({ content }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className="dashboard__content">
      <Row>
        <Col xs={24} xl={6} md={6}>
          {isMobile && <Button className="ml4 mblButton" type="primary"  onClick={showDrawer}>
                <i class="fas fa-bars"></i>
                </Button>}
          <div className="leftblock-sidenav" 
        //   style={{  overflow: 'auto',
        // height: '100vh',
        // position: 'fixed', zIndex: '100' }}
        >
            {isMobile ? (
              <div className="mbl-button pl4"> 
                <Drawer
                  title=""
                  // width={ 100% }
                  placement="left"
                  closable={true}
                  onClose={onClose}
                  visible={visible}
                >
                  <Sidebar />
                </Drawer>
              </div>
            ) : (
              <Sidebar />
            )}
          </div>
        </Col>
        <Col xs={24} xl={18} md={18}>
          <div className="rightblock-content">{content}</div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard_Content;

