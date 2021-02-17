import React from 'react';
import { List, Card } from 'antd';

const data = [
  {
    title: 'Booked ',
    number: '100',
    hex:"#71bd1d"
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
    hex:'#de5474',
  },
  {
    title: 'No Show follow Ups  ',
    number: '100',
    hex:'#1abb9c'
  },
  {
    title: 'Cancellation  ',
    number: '0',
    hex:'#eb5424'
  },
  {
    title: 'Pateint Satisfication  ',
    number: '40',
    hex:'#3b94dd'
  },
  {
    title: 'Payments  ',
    number: '670',
    hex:'#15558d'
  },
];
const CardsSection = () => {
  return (
    <div className="card-section"> 
      <List
        grid={{ gutter: 16, column: 1 }}
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
