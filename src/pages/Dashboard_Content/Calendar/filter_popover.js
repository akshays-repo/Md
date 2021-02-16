import React, { useState, useEffect } from 'react';
import { Popover, Row, Col, Button, Divider, Avatar } from 'antd';

export const FilterPopover = props => {
  const [cancelled, setcancelled] = useState(false);
  const [provider, setProvider] = useState([]);
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = val => {
    setVisible(val);
  };

  useEffect(() => {
    console.log('Provider list', provider);

    if (cancelled) {
      props.fetchAppointment({
        provider_id: provider.length > 0 ? [...provider] : [],
        status: 'cancelled',
      });
    } else if (provider.length > 0) {
      props.fetchAppointment({
        provider_id: provider.length > 0 ? [...provider] : [],
      });
    }
  }, [provider, cancelled]);

  const content = (
    <Row style={{ padding: 0, margin: 0 }}>
      <Col className="provider__filter" span="24" style={{ maxHeight: 400, overflowY: 'scroll' }}>
        {props.provider.map((result, i) => {
          return (
            <Row
              className="cancelled_appointment"
              style={{ padding: 8 }}
              align={'middle'}
              onClick={() => {
                if (provider.includes(result.id)) {
                  setProvider(provider.filter(re => re !== result.id));
                } else {
                  setProvider(prev => [...prev, result.id]);
                }
              }}
            >
              <Col span={3}>
                <Avatar
                  shape="circle"
                  src={
                    result.image ||
                    'https://storage.googleapis.com/nexassets/app/img/icon/avatar.svg'
                  }
                ></Avatar>
              </Col>
              <Col span={20}>
                <b>{result.fullName}</b>
              </Col>
              <Col span={1}>
                {provider.includes(result.id) && (
                  <i style={{ color: '#00CBE6' }} className="fa fa-check" />
                )}
              </Col>
            </Row>
          );
        })}
      </Col>
      <Divider style={{ margin: 5 }} />
      <Col span={24}>
        <Row
          className="cancelled_appointment"
          style={{ padding: 8 }}
          onClick={() => setcancelled(!cancelled)}
        >
          <Col span="22" style={{ fontSize: 16 }}>
            Show cancelled appointments
          </Col>
          <Col span="2">
            {cancelled && <i style={{ color: '#00CBE6' }} className="fa fa-check"></i>}
          </Col>
        </Row>
      </Col>
    </Row>
  );
  return (
    <Popover
      trigger={'click'}
      visible={visible}
      onVisibleChange={handleVisibleChange}
      content={content}
      title="SHOW APPOINTMENTS FOR"
      placement="leftTop"
    >
      <Button
        style={{
          marginTop: 10,
          backgroundColor: '#e6f1fb',
          padding: '5px 30px',
          borderRadius: '5px',
          border: '1px solid #daebf9',
        }}
        shape="round"
      >
        FILTER &nbsp; <i className="fa fa-chevron-down"></i>
      </Button>
    </Popover>
  );
};
