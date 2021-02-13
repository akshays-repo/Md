import React from 'react';
import { List, Card } from 'antd';

const data = [
  {
    title: 'Booked ',
    number: '100',
    hex:"#007C44"
  },
  {
    title: 'Appointments',
    number: '50',
    hex:'#00767C'
  },
  {
    title: 'Appointments Confirmed',
    number: '0',
    hex:'#00387C'
  },
  {
    title: 'Recalls',
    number: '10',
    hex:'#06007C',
  },
  {
    title: 'No Show follow Ups  ',
    number: '100',
    hex:'#007C00'
  },
  {
    title: 'Cancellation  ',
    number: '0',
    hex:'#33FFBD'
  },
  {
    title: 'Pateint Satisfication  ',
    number: '40',
    hex:'#337FFF'
  },
  {
    title: 'Payments  ',
    number: '670',
    hex:'#7C1500'
  },
];
const CardsSection = () => {
  return (
    <div className="card-section"> 
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Card>
              <div className="inline-card-item">
            <span className="count-square-bg" style={{backgroundColor:item.hex}}>{item.number}</span>
            <span>{item.title}</span>
       
            </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default CardsSection;
