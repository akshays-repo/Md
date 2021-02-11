import React, { useState } from 'react';
import { Popover, Row, Col, Button, Divider, Avatar } from 'antd';

const provider_list = [
  {
    id: 1,
    name: 'Shailesh Kandel',
    image: 'https://storage.googleapis.com/nexassets/app/img/icon/avatar.svg',
  },
  {
    id: 2,
    name: 'Bikash Sapkota',
    image: 'https://storage.googleapis.com/nexassets/app/img/icon/avatar.svg',
  },
  {
    id: 3,
    name: 'Sabitra Kandel',
    image: 'https://storage.googleapis.com/nexassets/app/img/icon/avatar.svg',
  },
];
export const FilterPopover = () => {
  const [cancelled, setcancelled] = useState(false);
  const [provider, setProvider] = useState([]);
  const content = (
    <Row style={{ padding: 0, margin: 0 }}>
      <Col span="24">
        {provider_list.map((result, i) => {
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
                <Avatar shape="circle" src={result.image}></Avatar>
              </Col>
              <Col span={20}>
                <b>{result.name}</b>
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
    <Popover content={content} title="SHOW APPOINTMENTS FOR">
      <Button
        style={{ marginTop: 10, backgroundColor: '#edeeee', padding: '5px 30px' }}
        shape="round"
      >
        FILTER &nbsp; <i className="fa fa-chevron-down"></i>
      </Button>
    </Popover>
  );
};
