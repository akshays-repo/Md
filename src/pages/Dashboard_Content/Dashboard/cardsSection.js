import React from 'react';
import { List, Card } from 'antd';

const data = [
  {
    title: 'Title 1',
    number: '0',
  },
  {
    title: 'Title 2',
    number: '0',
  },
  {
    title: 'Title 3',
    number: '0',
  },
  {
    title: 'Title 4',
    number: '0',
  },
  {
    title: 'Title 5',
    number: '0',
  },
  {
    title: 'Title 6',
    number: '0',
  },
  {
    title: 'Title 7',
    number: '0',
  },
  {
    title: 'Title 8',
    number: '0',
  },
];
const CardsSection = () => {
  return (
    <div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={item => (
          <List.Item >
            <Card className="card">
            <span>{item.number}</span>
            <span>{item.title}</span>
            <span><i className="fas fa-chevron-right"/></span>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default CardsSection;
