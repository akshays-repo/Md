import React from 'react';
import { List, Card } from 'antd';

const data = [
  {
    title: 'Booked Via health Nex dashboard',
    number: '100',
  },
  {
    title: 'Title 2',
    number: '50',
  },
  {
    title: 'Booked Via health Nex dashboard',
    number: '0',
  },
  {
    title: 'Titfgfgfgle 4',
    number: '10',
  },
  {
    title: 'Booked Via health Nex dashboard ',
    number: '100',
  },
  {
    title: 'Booked Via health Nex dashboard ',
    number: '0',
  },
  {
    title: 'Booked Via health Nex dashboard ',
    number: '40',
  },
  {
    title: 'Booked Via health Nex dashboard ',
    number: '670',
  },
];
const CardsSection = () => {
  return (
    <div className="card-section"> 
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item >
            <Card>
              <div className="inline-card-item">
            <span className="count-round-bg">{item.number}</span>
            <span>{item.title}</span>
            <span><i className="fas fa-chevron-right"/></span>
            </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default CardsSection;
