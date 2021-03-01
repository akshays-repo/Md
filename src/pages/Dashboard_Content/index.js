import React, { useState } from 'react';
import { Row, Col } from 'antd';
import Sidebar from './sidebar';
//import { isMobile } from 'react-device-detect';
import { Drawer, Button, Radio, Space } from 'antd';
import { useMediaQuery } from 'react-responsive'



const Dashboard_Content = ({ content }) => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  
  const onClose = () => {
    setVisible(false);
  };
  const isMobile = useMediaQuery({ maxWidth: 767})

  return (
    <div className="dashboard__content">
      <Row>
        <Col xs={24} xl={6} md={10} lg={8}>
          {isMobile && 
          <Button className="ml4 mblButton" type="primary"  onClick={showDrawer}>
                <i class="fas fa-bars"></i>
            </Button>}
          <div className="leftblock-sidenav" 
        >
            {isMobile ? (
              <div className="mbl-button pl4"> 
                <Drawer
                  title=""
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
        <Col xs={24} xl={18} lg={16} md={14}>
          <div className="rightblock-content">{content}</div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard_Content;

